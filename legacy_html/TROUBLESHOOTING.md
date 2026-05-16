# 🛠️ Troubleshooting & FAQ Técnico - Forbody V2

## 🔍 Problemas Comuns & Soluções

---

## ❌ Tailwind CSS Não Funcionando

### Sintoma
Estilos Tailwind não aplicam, página parece sem estilo.

### Solução 1: Usar CDN (Quickfix)
Se está usando CDN no HTML, deve funcionar imediatamente. Verifique se o script está no `<head>`:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

### Solução 2: Recompilar CSS
Se usou `npm run build`:

```bash
# Limpe cache
rm -rf dist/output.css node_modules/.cache

# Recompile
npm run build

# Ou modo watch
npm run dev
```

### Solução 3: Verificar tailwind.config.js
Certifique-se de que os paths estão corretos:

```javascript
content: [
  "./index.html",           // ✅ Correto
  "./src/**/*.{js,ts}",
],
```

---

## ❌ Formulário Não Envia

### Sintoma
Clica em "Enviar" mas nada acontece.

### Passo 1: Verificar Console
```bash
# Abra DevTools
F12 → Console

# Procure por mensagens de erro (em vermelho)
```

### Passo 2: Validar HTML
```html
<!-- Verifique se o form tem IDs -->
<form id="contactForm">
  <input id="formName" ...>
  <input id="formEmail" ...>
  <textarea id="formMessage" ...>
</form>
```

### Passo 3: Testar JavaScript
```javascript
// Cole no console e execute
const form = document.getElementById('contactForm');
console.log('Form encontrado:', form);
```

### Passo 4: Integrar com API Real
Se o formulário está "simulado", integre com sua API:

```javascript
// src/script.js - ~linha 150
const response = await fetch('https://seu-api.com/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
});
```

---

## ❌ Menu Mobile Não Funciona

### Sintoma
Botão menu não abre/fecha em mobile.

### Verificar HTML
```html
<!-- Verifique se existem -->
<button id="mobileMenuBtn">...</button>
<div id="mobileMenu">...</div>
```

### Verificar JavaScript
```javascript
// Procure em src/script.js
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (!mobileMenuBtn || !mobileMenu) {
  console.error('Elementos mobile menu não encontrados!');
}
```

### Teste Responsividade
```bash
F12 → Toggle device toolbar (Ctrl+Shift+M)
```

---

## ❌ Scroll Smooth Não Funciona

### Verificar CSS
```html
<!-- Verifique se existe em <head> -->
<style>
  html {
    scroll-behavior: smooth;
  }
</style>
```

### Verifique Links
```html
<!-- Os links devem ter href com # -->
<a href="#mercado">Mercado</a>

<!-- E a seção deve ter id -->
<section id="mercado">...</section>
```

### Browser Support
Alguns browsers antigos não suportam. Use fallback:

```javascript
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
```

---

## ❌ Imagens não Carregar

### Verificar Caminho
```html
<!-- ❌ Errado -->
<img src="imagem.jpg">

<!-- ✅ Correto -->
<img src="./imagem.jpg">

<!-- ✅ Também funciona -->
<img src="/imagem.jpg">

<!-- ✅ URLs absolutas -->
<img src="https://cdn.example.com/imagem.jpg">
```

### Verificar Permissões
```bash
# Verifique se arquivo existe
ls -la imagem.jpg

# Se em servidor, verifique CORS
```

### Usar WebP com Fallback
```html
<picture>
  <source srcset="imagem.webp" type="image/webp">
  <img src="imagem.jpg" alt="Descrição">
</picture>
```

---

## ❌ Página Branca ao Abrir

### Causa 1: Arquivo HTML Não Encontrado
```bash
# Verifique se existe
ls -la index.html

# Se em servidor, use URL correta
http://localhost:8000/Forbody-V2/index.html
```

### Causa 2: Falta Live Server
```bash
# Instale extensão VS Code "Live Server"
# Ou use Python
python -m http.server 8000

# Ou Node
npx serve
```

### Causa 3: JavaScript Erro
```bash
# Abra DevTools para ver erro
F12 → Console → Procure por erros em vermelho
```

---

## ❌ Estilos Conflitando com CSS Externo

### Diagnosticar
```bash
# DevTools → Elements → Inspecione elemento
# Veja qual CSS está sendo aplicado
```

### Aumentar Especificidade
```css
/* ❌ Baixa especificidade */
.card { color: red; }

/* ✅ Melhor */
.glass-effect.card { color: red; }

/* ✅ Ou com !important (último recurso) */
.card { color: red !important; }
```

### Ordem de Importação
```html
<!-- Seu CSS último (maior prioridade) -->
<link rel="stylesheet" href="css-externo.css">
<link rel="stylesheet" href="dist/output.css">
<style>/* Seus estilos aqui */</style>
```

---

## ❌ Performance Ruim (Slow Page Load)

### Diagnosticar
```bash
# Chrome DevTools
F12 → Network tab → Reload page
# Procure por arquivos grandes
```

### Soluções

#### 1. Otimizar Imagens
```bash
# Use TinyPNG ou ImageOptim
# Ou converta para WebP

# Verifique tamanho antes/depois
ls -lh imagem.jpg imagem.webp
```

#### 2. Minificar CSS/JS
```bash
npm run build

# Verifique tamanho
ls -lh dist/output.css
```

#### 3. Lazy Load Imagens
```html
<!-- Adicione loading="lazy" -->
<img src="grande.jpg" loading="lazy" alt="">
```

#### 4. Usar CDN
```html
<!-- Scripts de CDN costumam ser rápidos -->
<script src="https://cdn.jsdelivr.net/..."></script>
```

#### 5. Cache
```bash
# Adicione no servidor
Cache-Control: max-age=31536000

# Ou no código
<link rel="stylesheet" href="css.css?v=1.0.0">
```

---

## ❌ Lighthouse Score Baixo

### Rodar Teste
```bash
# Chrome → F12 → Lighthouse tab → Analyze page
```

### Problemas Comuns

#### Performance
- [ ] Imagens não otimizadas → Comprimir
- [ ] JavaScript bloqueante → Adicione `async` ou `defer`
- [ ] Render-blocking CSS → Inline CSS crítico

#### Accessibility
- [ ] Falta alt text em imagens → Adicione sempre
- [ ] Cores sem contraste → Use paleta validada
- [ ] Links sem label → Adicione aria-label

#### Best Practices
- [ ] Não usar console.error não tratados
- [ ] Usar HTTPS em produção
- [ ] Adicionar CSP headers

#### SEO
- [ ] Meta description ausente
- [ ] Title incorreto
- [ ] Falta Open Graph tags

---

## ❌ CORS Errors

### Erro
```
Access to XMLHttpRequest ... from origin ... has been blocked by CORS
```

### Solução 1: Backend (Recomendado)
```javascript
// Node.js/Express
app.use(cors());

// Ou específico
app.use(cors({
  origin: 'https://forbody.com'
}));
```

### Solução 2: Proxy
```javascript
// Use um proxy local
fetch('/api/leads', {
  method: 'POST',
  body: JSON.stringify(data)
});
```

### Solução 3: JSONP (Deprecated)
```javascript
// Evitar se possível
<script src="https://api.example.com/callback=myFunction"></script>
```

---

## ❌ Deploy Não Funciona

### Vercel
```bash
# Login
vercel login

# Deploy
vercel

# Verifique logs
vercel logs
```

### Netlify
```bash
# Conecte repositório GitHub
# Ou use CLI
npm install -g netlify-cli
netlify deploy
```

### GitHub Pages
```bash
# Crie branch gh-pages
git checkout -b gh-pages
git push origin gh-pages

# Configure em Settings → Pages
```

---

## ✅ Validação de Código

### HTML
```bash
# Valide HTML
npm install -g htmlhint
htmlhint index.html
```

### CSS
```bash
# Valide CSS
npm install -g stylelint
stylelint src/input.css
```

### JavaScript
```bash
# Valide JS
npm install -g eslint
eslint src/script.js
```

---

## 📊 Debug Tips

### Console Utilities
```javascript
// Ver estrutura
console.table(object);

// Tempo de execução
console.time('operação');
// ... código ...
console.timeEnd('operação');

// Agrupar logs
console.group('Grupo 1');
console.log('Item 1');
console.log('Item 2');
console.groupEnd();

// Condicional
console.assert(condition, 'Erro se false');
```

### DevTools Shortcuts
```
F12             = Abrir DevTools
Ctrl+Shift+M    = Toggle device (Mobile)
Ctrl+Shift+I    = Inspecionar elemento
Ctrl+Shift+C    = Seletor de elemento
Ctrl+Shift+J    = Console
Ctrl+Shift+E    = Network
Ctrl+Shift+P    = Command palette
```

---

## 🆘 Onde Procurar Ajuda

1. **Console do Browser** (F12 → Console)
2. **Network Tab** (F12 → Network) - para erros de API
3. **Elements Tab** (F12 → Elements) - para problemas CSS
4. **Google Search** - "erro de javascript"
5. **Stack Overflow** - com tags `javascript`, `css`, `html`
6. **ChatGPT/Claude** - for quick help
7. **Documentação Oficial**:
   - Tailwind: https://tailwindcss.com/docs
   - MDN: https://developer.mozilla.org/

---

## 📞 Suporte

Para problemas específicos:
- 📧 Email: investimentos@forbody.com.br
- 💬 Issues GitHub: [link ao repo]
- 📱 WhatsApp: +55 11 99999-9999

---

**Dicas:** Sempre comece pelo console do browser. 90% dos problemas aparece lá!
