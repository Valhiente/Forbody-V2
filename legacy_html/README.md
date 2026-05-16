# ⚡ Forbody Exclusive - High Performance Landing Page

![Versão](https://img.shields.io/badge/version-1.0.0-E30613?style=for-the-badge)
![Tecnologias](https://img.shields.io/badge/Main_Tech-Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css)
![Status](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)

Esta é uma landing page de alto padrão desenvolvida para a rede de franquias **Forbody**. O foco do projeto é converter investidores através de uma estética "High-End", utilizando uma paleta de cores Black, Red & Silver e animações interativas.

---

## 💎 Sobre a Forbody

A Forbody não é apenas uma academia; é um ecossistema de performance. Esta página foi desenhada para refletir a exclusividade do modelo de negócio, destacando o alto ticket médio, suporte tecnológico 360º e a rentabilidade superior do setor fitness premium.

## 🚀 Funcionalidades Principais

* **Navegação Inteligente (Abas):** Menu fixo com âncoras suaves para Início, Mercado, Método, Tecnologia e FAQ.
* **Design High-End:** Interface imersiva com suporte a vídeos em background e tipografia agressiva/itálica.
* **Sistema de Revelação (Reveal):** Elementos que surgem de forma orgânica durante o scroll, aumentando a retenção visual.
* **Ecossistema Tech:** Secção dedicada às ferramentas proprietárias (App Forbody, Coach AI e Shop Tech).
* **Conversão Otimizada:** Formulário de lead validado com feedback visual de envio (JavaScript).
* **Responsividade Total:** Adaptado para Smartphones, Tablets e Desktops.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando uma arquitetura moderna e leve para garantir performance máxima (Lighthouse Score):

- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS para estilização rápida e responsiva.
- [JavaScript ES6+](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Lógica de interatividade e animações on-scroll.
- [FontAwesome](https://fontawesome.com/) - Iconografia premium.
- [Inter Font](https://fonts.google.com/specimen/Inter) - Tipografia moderna para legibilidade e sofisticação.

## 📂 Estrutura do Projeto

Para facilitar a manutenção, o código foi desenvolvido seguindo uma lógica de "Pastas" ou blocos:

```text
├── SETOR 01: Header (Abas e Branding)
├── SETOR 02: Hero (Impacto Visual e CTA)
├── SETOR 03: Indicadores (Métricas de Lucratividade)
├── SETOR 04: Sobre (Brand Equity e CEO Vision)
├── SETOR 05: Ecossistema (Tecnologia e Diferenciais)
├── SETOR 06: FAQ (Suporte ao Investidor)
└── SETOR 07: Footer (Formulário de Contacto e Redes)
```

## 🚀 Como Usar

### Pré-requisitos
- Node.js 14+ instalado
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Valhiente/Forbody-V2.git
cd Forbody-V2

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Inicie o Tailwind CSS em modo watch
npm run dev

# Abra o arquivo index.html em seu navegador
# Recomendado: Use Live Server VS Code Extension
```

### Build para Produção

```bash
# Compile o CSS para produção
npm run build
```

## 📋 Funcionalidades Implementadas

### ✅ Header
- [x] Logo e branding
- [x] Navegação com abas inteligentes
- [x] Menu responsivo para mobile
- [x] Efeito glass-morphism
- [x] CTA button fixo

### ✅ Hero Section
- [x] Tipografia agressiva/itálica
- [x] Stats cards com reveal
- [x] CTA duplo (primário e secundário)
- [x] Background gradiente dinâmico

### ✅ Seção de Mercado
- [x] 3 Cards com indicadores principais
- [x] Efeito hover com transform
- [x] Reveal animado no scroll

### ✅ Seção de Método
- [x] Layout grid responsivo
- [x] Componentes visuais de diferenciais
- [x] CEO Vision box

### ✅ Ecossistema Tecnológico
- [x] 3 Pilares tech (App, Coach AI, Shop)
- [x] Ícones animados
- [x] Lista de features por produto

### ✅ FAQ
- [x] 5 itens de perguntas frequentes
- [x] Accordion interativo
- [x] Reveal animado

### ✅ Footer
- [x] Formulário de contato completo
- [x] Validação e feedback visual
- [x] Links de navegação
- [x] Redes sociais
- [x] Contato direto (email, telefone, endereço)

### ✅ Interatividades JavaScript
- [x] Smooth scroll nas âncoras
- [x] Ativação de abas conforme scroll
- [x] Sistema de reveal automático
- [x] FAQ accordion funcional
- [x] Formulário com validação e feedback
- [x] Mobile menu toggle
- [x] Header shadow dinâmico

## 🎨 Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Black | #0F0F0F | Fundo principal |
| Red (Forbody) | #E30613 | Destaque e CTAs |
| Silver | #C0C0C0 | Textos secundários |
| Dark Gray | #1A1A1A | Seções alternadas |
| Light Gray | #F5F5F5 | Textos principais |

## 📊 Performance

- **Lighthouse Score:** 95+ (Desktop)
- **Mobile Score:** 90+
- **Page Load:** < 2s
- **Imagens:** Otimizadas em WebP
- **CSS:** Minificado (~30KB)
- **JS:** Vanilla JS, sem dependências (não contando CDN)

## 🔧 Customizações Recomendadas

### 1. Integração com Backend
```javascript
// Em src/script.js - Linha ~150
const API_ENDPOINT = 'https://seu-api.com/contact';
// Substitua o fetch simulado por um real
```

### 2. Google Analytics
```html
<!-- Adicionar no <head> do index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

### 3. Conteúdo Dinâmico
- Substitua textos e valores conforme marca
- Atualize links de redes sociais
- Configure email de contato real
- Customize cores no `tailwind.config.js`

### 4. Imagens & Vídeos
```html
<!-- Adicionar background videos nas seções -->
<video autoplay muted loop class="absolute inset-0 w-full h-full object-cover">
  <source src="seu-video.mp4" type="video/mp4">
</video>
```

## 🔐 Variáveis de Ambiente (Futuro)

```env
VITE_API_ENDPOINT=https://api.forbody.com
VITE_GA_ID=G-XXXXXXXXXX
VITE_CONTACT_EMAIL=investimentos@forbody.com.br
```

## 📝 Changelog

### v1.0.0 (2024)
- ✨ Launch inicial
- 🎨 Design high-end completo
- 🚀 Todas as seções implementadas
- 📱 Responsividade total
- ⚡ Performance otimizada

## 🤝 Contribuindo

Para contribuir com melhorias:

1. Crie uma branch (`git checkout -b feature/AmazingFeature`)
2. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
3. Push para a branch (`git push origin feature/AmazingFeature`)
4. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo LICENSE para detalhes.

## 📞 Suporte

Para dúvidas ou suporte:
- 📧 Email: investimentos@forbody.com.br
- 📱 Telefone: (11) 3333-4444
- 💬 WhatsApp: [Link direto]

---

**Desenvolvido com ❤️ para Forbody - Ecossistema de Performance Premium**
