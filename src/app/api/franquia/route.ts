import { NextResponse } from 'next/server';

interface FranchiseLeadPayload {
  name?: string;
  email?: string;
  whatsapp?: string;
  city?: string;
  capital?: string;
  message?: string;
  origin?: string;
  website?: string;
  startedAt?: number;
}

type ValidatedLead = Required<Omit<FranchiseLeadPayload, 'website' | 'startedAt'>>;

const RESEND_API_URL = 'https://api.resend.com/emails';
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const requestLog = new Map<string, number[]>();

function sanitizeText(value?: string) {
  return String(value ?? '').trim().slice(0, 2_000);
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character]!,
  );
}

function isRateLimited(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const ip = forwardedFor || request.headers.get('x-real-ip') || 'unknown';
  const now = Date.now();
  const recent = (requestLog.get(ip) || []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
}

function validatePhone(phone: string) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 11;
}

function buildLeadEmailHtml(data: ValidatedLead) {
  const rows = [
    ['Nome Completo', data.name],
    ['Email', data.email],
    ['Telefone / WhatsApp', data.whatsapp],
    ['Cidade/Estado', data.city],
    ['Capital Estimado', data.capital],
    ['Mensagem', data.message || 'Não informado'],
    ['Origem', data.origin],
  ];

  return `
    <div style="font-family: Arial, sans-serif; background:#0a0a0a; color:#f5f5f5; padding:24px;">
      <div style="max-width:640px; margin:0 auto; background:#111; border:1px solid #333; border-radius:14px; padding:28px;">
        <p style="margin:0 0 8px; color:#ef4444; font-size:12px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase;">Forbody Franquias</p>
        <h1 style="margin:0 0 20px; font-size:26px; color:#ffffff;">Novo lead de franquia</h1>
        <table style="width:100%; border-collapse:collapse;">
          ${rows.map(([label, value]) => `
            <tr>
              <td style="border-top:1px solid #2a2a2a; padding:12px 8px; color:#a3a3a3; width:190px; font-size:13px;">${label}</td>
              <td style="border-top:1px solid #2a2a2a; padding:12px 8px; color:#ffffff; font-size:14px;">${escapeHtml(value)}</td>
            </tr>
          `).join('')}
        </table>
      </div>
    </div>
  `;
}

async function saveLeadToSupabase(data: ValidatedLead) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Supabase lead save skipped: missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
    return { success: false, skipped: true };
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/franchise_leads`, {
    method: 'POST',
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      full_name: data.name,
      email: data.email,
      phone: data.whatsapp,
      city_state: data.city,
      estimated_capital: data.capital,
      message: data.message || null,
      origin: data.origin,
      status: 'new',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Supabase franchise lead save error:', errorText);
    return { success: false, skipped: false };
  }

  return { success: true, skipped: false };
}

async function sendLeadEmail(data: ValidatedLead) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.FRANCHISE_LEAD_TO_EMAIL || 'robertovalhiente@gmail.com';
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  if (!resendApiKey) {
    return { success: false, error: 'Envio indisponível. RESEND_API_KEY não configurada.', status: 503 };
  }

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: data.email,
      subject: `Novo lead de franquia — ${data.name}`,
      html: buildLeadEmailHtml(data),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Resend error:', errorText);
    return { success: false, error: 'Não foi possível enviar o lead.', status: 502 };
  }

  return { success: true };
}

export async function POST(request: Request) {
  try {
    if (isRateLimited(request)) {
      return NextResponse.json(
        { error: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' },
        { status: 429, headers: { 'Retry-After': '600' } },
      );
    }

    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > 20_000) {
      return NextResponse.json({ error: 'Dados enviados excedem o limite permitido.' }, { status: 413 });
    }

    const body = (await request.json()) as FranchiseLeadPayload;

    if (sanitizeText(body.website)) {
      return NextResponse.json({ success: true });
    }

    if (
      typeof body.startedAt !== 'number' ||
      Date.now() - body.startedAt < 2_500 ||
      Date.now() - body.startedAt > 24 * 60 * 60 * 1000
    ) {
      return NextResponse.json({ error: 'Envio inválido. Atualize a página e tente novamente.' }, { status: 400 });
    }

    const data: ValidatedLead = {
      name: sanitizeText(body.name),
      email: sanitizeText(body.email),
      whatsapp: sanitizeText(body.whatsapp),
      city: sanitizeText(body.city),
      capital: sanitizeText(body.capital),
      message: sanitizeText(body.message),
      origin: sanitizeText(body.origin) || 'Forbody-V2 /franquias',
    };

    const errors: string[] = [];

    if (data.name.split(/\s+/).length < 2) errors.push('Nome completo inválido.');
    if (!validateEmail(data.email)) errors.push('Email inválido.');
    if (!validatePhone(data.whatsapp)) errors.push('Telefone inválido.');
    if (!data.city) errors.push('Cidade/Estado obrigatório.');
    if (!data.capital) errors.push('Capital estimado obrigatório.');

    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(' ') }, { status: 400 });
    }

    const leadSaveResult = await saveLeadToSupabase(data);
    const emailResult = await sendLeadEmail(data);

    if (!emailResult.success) {
      return NextResponse.json(
        {
          error: emailResult.error,
          leadSaved: leadSaveResult.success,
        },
        { status: emailResult.status || 502 },
      );
    }

    return NextResponse.json({
      success: true,
      leadSaved: leadSaveResult.success,
      leadSaveSkipped: leadSaveResult.skipped,
    });
  } catch (error) {
    console.error('Franchise lead API error:', error);
    return NextResponse.json({ error: 'Erro interno ao enviar lead.' }, { status: 500 });
  }
}
