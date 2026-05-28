import { ReactNode } from 'react';

function Block({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0d0d0d] p-6 shadow-sm shadow-black/20">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="mt-2 mb-6 text-sm text-gray-400">{description}</p>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function SettingRow({ label, description, action }: { label: string; description: string; action: ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-white/5 last:border-0 last:pb-0">
      <div className="mb-4 sm:mb-0 pr-4">
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
      <div>{action}</div>
    </div>
  );
}

function DisabledButton({ children, danger }: { children: ReactNode; danger?: boolean }) {
  return (
    <button
      disabled
      className={`px-4 py-2 text-xs font-semibold rounded-lg opacity-50 cursor-not-allowed ${
        danger ? 'bg-red-600/10 text-red-500 border border-red-600/20' : 'bg-white/5 text-gray-300 border border-white/10'
      }`}
    >
      {children}
    </button>
  );
}

function DisabledInput({ value }: { value: string }) {
  return (
    <input
      type="text"
      disabled
      value={value}
      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-gray-400 w-full max-w-[200px] cursor-not-allowed"
    />
  );
}

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-[#111] p-8 shadow-xl shadow-black/20">
        <p className="text-xs font-bold uppercase tracking-[0.36em] text-red-600">Admin / Configurações</p>
        <h1 className="mt-4 text-4xl font-black text-white">Central de Configurações</h1>
        <p className="mt-3 max-w-2xl text-sm text-gray-400">
          Gerenciamento completo das preferências da plataforma, integrações, segurança e manutenção do sistema.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 1. Integrações */}
        <Block title="1. Integrações" description="Conexões com serviços de terceiros e APIs externas.">
          <SettingRow
            label="Gateway de Pagamento"
            description="Integração para processamento de pagamentos."
            action={<DisabledButton>Configurar Stripe</DisabledButton>}
          />
          <SettingRow
            label="Envio de E-mails"
            description="Serviço SMTP ou API para e-mails transacionais."
            action={<DisabledButton>Conectar Resend</DisabledButton>}
          />
          <SettingRow
            label="Armazenamento de Arquivos"
            description="Configuração de CDN e buckets para mídia."
            action={<DisabledButton>Ajustar S3</DisabledButton>}
          />
        </Block>

        {/* 2. Aparência */}
        <Block title="2. Aparência" description="Customização visual da interface do portal de franquias.">
          <SettingRow
            label="Cores da Marca"
            description="Defina as cores primárias e secundárias (Hex)."
            action={<DisabledInput value="#FF0000" />}
          />
          <SettingRow
            label="Logotipo do Painel"
            description="Faça upload do logotipo em formato SVG ou PNG."
            action={<DisabledButton>Alterar Arquivo</DisabledButton>}
          />
          <SettingRow
            label="Modo de Exibição"
            description="Forçar modo claro, escuro ou seguir sistema."
            action={<DisabledButton>Tema: Escuro</DisabledButton>}
          />
        </Block>

        {/* 3. SEO & Analytics */}
        <Block title="3. SEO & Analytics" description="Metadados globais e scripts de rastreamento.">
          <SettingRow
            label="Google Analytics / GTM"
            description="Insira o ID de acompanhamento (G-XXXXX)."
            action={<DisabledInput value="G-00000000" />}
          />
          <SettingRow
            label="Meta Título Global"
            description="Sufixo padrão para títulos de páginas."
            action={<DisabledInput value=" | Forbody" />}
          />
          <SettingRow
            label="Indexação de Motores"
            description="Controlar diretivas robots.txt globalmente."
            action={<DisabledButton>Permitir Indexação</DisabledButton>}
          />
        </Block>

        {/* 4. Segurança */}
        <Block title="4. Segurança" description="Políticas de acesso e proteção do painel administrativo.">
          <SettingRow
            label="Autenticação em Duas Etapas (2FA)"
            description="Obrigar todos os administradores a usar 2FA."
            action={<DisabledButton>Ativar 2FA Global</DisabledButton>}
          />
          <SettingRow
            label="Duração da Sessão"
            description="Tempo até a desconexão automática por inatividade."
            action={<DisabledInput value="24 horas" />}
          />
          <SettingRow
            label="Restrição de IP"
            description="Limitar acesso ao painel a IPs específicos."
            action={<DisabledButton>Configurar Lista Branca</DisabledButton>}
          />
        </Block>

        {/* 5. Sistema */}
        <Block title="5. Sistema" description="Ajustes de infraestrutura e performance da plataforma.">
          <SettingRow
            label="Modo de Manutenção"
            description="Bloquear acesso público ao site principal."
            action={<DisabledButton danger>Ativar Manutenção</DisabledButton>}
          />
          <SettingRow
            label="Limpeza de Cache"
            description="Invalidar cache global do Next.js e CDN."
            action={<DisabledButton>Limpar Cache Agora</DisabledButton>}
          />
          <SettingRow
            label="Limite de Upload"
            description="Tamanho máximo para imagens e documentos."
            action={<DisabledInput value="5 MB" />}
          />
        </Block>

        {/* 6. Logs */}
        <Block title="6. Logs e Auditoria" description="Registro de atividades e eventos de erro.">
          <SettingRow
            label="Logs de Acesso"
            description="Histórico de logins de administradores."
            action={<DisabledButton>Baixar CSV</DisabledButton>}
          />
          <SettingRow
            label="Logs de Erros (App)"
            description="Visualizar exceções não tratadas no servidor."
            action={<DisabledButton>Acessar Terminal</DisabledButton>}
          />
          <SettingRow
            label="Auditoria de Modificações"
            description="Quem alterou qual registro e quando."
            action={<DisabledButton>Ver Histórico</DisabledButton>}
          />
        </Block>
      </div>

      {/* 7. Recursos futuros */}
      <div className="rounded-3xl border border-red-600/20 bg-[#111] p-6 shadow-sm shadow-black/20">
        <h2 className="text-xl font-bold text-white mb-2">7. Recursos Futuros (Roadmap)</h2>
        <p className="text-sm text-gray-400 mb-6">
          Funcionalidades planejadas para as próximas atualizações da plataforma Forbody.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <h3 className="text-sm font-semibold text-white mb-1">Webhooks Customizados</h3>
            <p className="text-xs text-gray-500">Disparo de eventos em tempo real para sistemas de parceiros.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <h3 className="text-sm font-semibold text-white mb-1">API Pública (GraphQL)</h3>
            <p className="text-xs text-gray-500">Interface de consulta flexível para desenvolvedores externos.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <h3 className="text-sm font-semibold text-white mb-1">SSO Corporativo</h3>
            <p className="text-xs text-gray-500">Login único via Google Workspace e Azure AD para administradores.</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <h3 className="text-sm font-semibold text-white mb-1">Backup Automatizado</h3>
            <p className="text-xs text-gray-500">Rotinas de exportação de dados com agendamento diário.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
