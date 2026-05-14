# 🎨 Guia de Customização - Forbody V2

Este documento fornece instruções detalhadas para customizar a landing page de acordo com suas necessidades específicas.

## 📋 Índice

1. [Cores e Branding](#cores-e-branding)
2. [Conteúdo](#conteúdo)
3. [Formulário e API](#formulário-e-api)
4. [Imagens e Mídias](#imagens-e-mídias)
5. [Analytics](#analytics)
6. [Performance](#performance)

---

## 🎨 Cores e Branding

### Alterar Paleta de Cores

No arquivo `tailwind.config.js`, atualize as cores:

```javascript
colors: {
  forbody: {
    black: "#0F0F0F",      // Cor principal do fundo
    red: "#E30613",        // Cor destaque (vermelho)
    silver: "#C0C0C0",     // Cor secundária
    darkgray: "#1A1A1A",   // Fundo alternado
    lightgray: "#F5F5F5",  // Texto principal
  }
}
```

### Personalizar Tipografia

Em `tailwind.config.js`, customize a fonte:

```javascript
fontFamily: {
  inter: ["Sua-Fonte", "sans-serif"],
  // ou adicione uma nova:
  // heading: ["Seu-Font-Heading", "serif"],
}
```

### Customizar Logo

No `index.html`, linha ~40, atualize:

```html
<div class="w-10 h-10 bg-forbody-red rounded-lg flex items-center justify-center text-white font-bold text-lg">
  SEU_LOGO_AQUI
</div>
```

Ou use uma imagem:

```html
<img src="seu-logo.png" alt="Logo" class="h-10">
```

---

## 📝 Conteúdo

### Atualizar Textos Principais

Todos os textos estão no `index.html`. Procure pelas seções:

- **Hero (linha ~100):** Título principal e subtítulo
- **Mercado (linha ~200):** Cards de indicadores
- **Método (linha ~260):** Sobre a marca
- **Tecnologia (linha ~330):** Pilares tech
- **FAQ (linha ~400):** Perguntas frequentes
- **Footer (linha ~470):** Contatos e links

### Exemplo: Alterar Hero Title

```html
<!-- Antes -->
<h1 class="text-5xl md:text-7xl font-black text-white mb-6 leading-tight text-shadow">
  <span class="text-forbody-red">Performance</span> sem <span class="italic">limites</span>
</h1>

<!-- Depois -->
<h1 class="text-5xl md:text-7xl font-black text-white mb-6 leading-tight text-shadow">
  Seu <span class="text-forbody-red">Título</span> <span class="italic">Aqui</span>
</h1>
```

---

## 🔗 Formulário e API

### Integrar com Backend Real

No `src/script.js`, localize a função `contactForm.addEventListener` (linha ~150):

```javascript
// Antes: Simulado
await new Promise(resolve => setTimeout(resolve, 1500));

// Depois: API Real
const response = await fetch('https://seu-api.com/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
});

if (!response.ok) throw new Error('API error');
const result = await response.json();
```

### Adicionar Campos ao Formulário

No `index.html`, seção footer (linha ~470):

```html
<!-- Adicionar novo campo -->
<input type="text" id="formCompany" placeholder="Sua Empresa" required class="w-full">
```

Depois, atualize em `src/script.js`:

```javascript
const formData = {
  name: document.getElementById('formName').value,
  email: document.getElementById('formEmail').value,
  phone: document.getElementById('formPhone').value,
  company: document.getElementById('formCompany').value,  // Novo
  message: document.getElementById('formMessage').value
};
```

### Integrar Serviço de Email

Opções populares:
- **EmailJS:** `npm install @emailjs/browser`
- **Formspree:** Use `formspree.io` (sem código)
- **SendGrid:** API com Node.js backend
- **Mailchimp:** Para newsletter

---

## 🖼️ Imagens e Mídias

### Adicionar Background Image/Video

Em qualquer seção, adicione:

```html
<!-- Background Image -->
<div class="absolute inset-0 -z-10">
  <img src="sua-imagem.jpg" alt="" class="w-full h-full object-cover opacity-20">
</div>

<!-- Background Video -->
<video autoplay muted loop class="absolute inset-0 w-full h-full object-cover">
  <source src="seu-video.mp4" type="video/mp4">
</video>
```

### Otimizar Imagens

Use ferramentas:
- **TinyPNG:** Comprimir sem perda
- **Squoosh:** Converter para WebP
- **ImageOptim:** Otimização automática

```html
<!-- WebP com fallback -->
<picture>
  <source srcset="imagem.webp" type="image/webp">
  <source srcset="imagem.jpg" type="image/jpeg">
  <img src="imagem.jpg" alt="">
</picture>
```

### Gallery/Portfólio

Adicione uma nova seção com grid de imagens:

```html
<section class="py-20">
  <h2 class="text-4xl font-black text-white text-center mb-12">Nossas Unidades</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <img src="unidade-1.jpg" alt="Unidade 1" class="rounded-xl">
    <img src="unidade-2.jpg" alt="Unidade 2" class="rounded-xl">
    <img src="unidade-3.jpg" alt="Unidade 3" class="rounded-xl">
  </div>
</section>
```

---

## 📊 Analytics

### Google Analytics

Adicione no `<head>` do `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Rastrear Eventos Customizados

Em `src/script.js`:

```javascript
// Rastrear clique em CTA
ctaButtons.forEach(button => {
  button.addEventListener('click', () => {
    gtag('event', 'cta_click', {
      'button_text': button.textContent
    });
  });
});
```

### Facebook Pixel

```html
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  // ... (copie código do Facebook Ads)
</script>
```

---

## ⚡ Performance

### Minificar CSS

```bash
npm run build
```

### Lazy Loading Images

```html
<img src="imagem.jpg" loading="lazy" alt="">
```

### Code Splitting (Para JS complexo)

```html
<!-- Carregar script.js de forma assíncrona -->
<script src="src/script.js" async defer></script>
```

### Cache Busting

Adicione versão em URLs:

```html
<link rel="stylesheet" href="dist/output.css?v=1.0.0">
<script src="src/script.js?v=1.0.0"></script>
```

---

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Netlify

Conecte seu repositório GitHub direto no painel.

### GitHub Pages

```bash
git add .
git commit -m "Deploy"
git push origin main
```

---

## 🔐 Variáveis de Ambiente (Para Futuro)

Crie arquivo `.env.local`:

```env
VITE_API_ENDPOINT=https://api.forbody.com.br
VITE_GA_ID=G-XXXXXXXXXX
VITE_CONTACT_EMAIL=investimentos@forbody.com.br
VITE_PHONE=+551133334444
```

Use em JavaScript:

```javascript
const API_URL = process.env.VITE_API_ENDPOINT;
```

---

## 📱 Testes de Responsividade

- **Mobile:** 375px - 425px (iPhone)
- **Tablet:** 768px - 1024px (iPad)
- **Desktop:** 1920px+ (Monitores)

Use Chrome DevTools: `F12` → Toggle device toolbar (`Ctrl+Shift+M`)

---

## 🐛 Troubleshooting

### Tailwind não aplicando estilos

```bash
# Limpe cache e recompile
npm run build
```

### Formulário não enviando

1. Verifique console (`F12`)
2. Verifique CORS no backend
3. Teste com Postman antes

### Scroll lento

1. Reduza quantidade de reveals
2. Desabilite animações em mobile
3. Otimize imagens

---

## 📚 Recursos Úteis

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)
- [FontAwesome Icons](https://fontawesome.com/icons)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

**Dúvidas? Entre em contato:** investimentos@forbody.com.br
