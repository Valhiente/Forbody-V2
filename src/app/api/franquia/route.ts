import { NextResponse } from 'next/server';

interface FranchiseLeadPayload {
  name?: string;
  email?: string;
  whatsapp?: string;
  city?: string;
  capital?: string;
  message?: string;
  origin?: string;
}

const RESEND_API_URL = 'https://api.resend.com/emails';

function sanitizeText(value?: string) {
  return String(value ?? '').trim();
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
}

function validatePhone(phone: string) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 11;
}

function buildLeadEmailHtml(data: Required<FranchiseLeadPayload>) {
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
              <td style="border-top:1px solid #2a2a2a; padding:12px 8px; color:#ffffff; font-size:14px;">${value}</td>
            </tr>
          `).join('')}
        </table>
      </div>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.FRANCHISE_LEAD_TO_EMAIL || 'robertovalhiente@gmail.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Forbody Franquias <onboarding@resend.dev>';

    if (!resendApiKey) {
      return NextResponse.json(
        { error: 'Envio indisponível. RESEND_API_KEY não configurada.' },
        { status: 503 },
      );
    }

    const body = (await request.json()) as FranchiseLeadPayload;

    const data: Required<FranchiseLeadPayload> = {
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
      return NextResponse.json({ error: 'Não foi possível enviar o lead.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Franchise lead API error:', error);
    return NextResponse.json({ error: 'Erro interno ao enviar lead.' }, { status: 500 });
  }
}
