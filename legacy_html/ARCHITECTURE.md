# 🏗️ Arquitetura Técnica - Forbody V2

## 📦 Estrutura de Pastas

```
/workspaces/Forbody-V2/
├── index.html                 # HTML principal (7 seções)
├── package.json              # Dependências e scripts
├── tailwind.config.js        # Configuração Tailwind
├── .editorconfig            # Padrão de código
├── .gitignore               # Arquivos ignorados
├── LICENSE                  # Licença MIT
├── README.md                # Documentação principal
├── CUSTOMIZATION.md         # Guia de customização
├── ARCHITECTURE.md          # Este arquivo
├── src/
│   ├── input.css            # Estilos customizados
│   └── script.js            # JavaScript (todas as interações)
└── dist/
    └── output.css           # CSS compilado (gerado)
```

## 🎯 Fluxo de Desenvolvimento

```
Browser (HTML)
     ↓
   Tailwind CSS (Utility-first)
     ↓
   input.css (Custom styles)
     ↓
   script.js (Interatividade)
```

## 🔄 Ciclo de Vida de uma Seção

### Exemplo: Adicionar Nova Seção "Depoimentos"

#### 1️⃣ HTML (index.html)

```html
<!-- SETOR 08: DEPOIMENTOS -->
<section id="depoimentos" class="py-20 bg-forbody-darkgray">
  <div class="max-w-7xl mx-auto px-6">
    <h2 class="text-4xl md:text-5xl font-black text-white text-center mb-16">
      O que <span class="text-forbody-red">Dizem</span> Nossos Franqueados
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="reveal card-hover glass-effect p-8 rounded-xl border border-forbody-red border-opacity-30">
        <div class="flex gap-1 mb-4">
          <i class="fas fa-star text-forbody-red"></i>
          <i class="fas fa-star text-forbody-red"></i>
          <i class="fas fa-star text-forbody-red"></i>
          <i class="fas fa-star text-forbody-red"></i>
          <i class="fas fa-star text-forbody-red"></i>
        </div>
        <p class="text-forbody-silver mb-6">
          "Forbody transformou meu negócio. O ROI foi superior ao esperado."
        </p>
        <div class="flex gap-3 items-center">
          <img src="avatar1.jpg" alt="" class="w-12 h-12 rounded-full">
          <div>
            <p class="font-bold text-white text-sm">João Silva</p>
            <p class="text-forbody-silver text-xs">Franqueado SP</p>
          </div>
        </div>
      </div>
      
      <!-- Mais cards... -->
    </div>
  </div>
</section>
```

#### 2️⃣ CSS (input.css) - Se necessário

```css
.testimonial-card {
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-12px);
}
```

#### 3️⃣ JavaScript (script.js) - Se necessário

```javascript
// Adicionar ao final do arquivo

// Carousel de depoimentos (opcional)
const testimonialSlider = {
  current: 0,
  slides: document.querySelectorAll('.testimonial-card'),
  
  next() {
    this.current = (this.current + 1) % this.slides.length;
    this.update();
  },
  
  update() {
    this.slides.forEach((slide, index) => {
      slide.style.display = index === this.current ? 'block' : 'none';
    });
  }
};

// Auto-rotate a cada 5s
setInterval(() => testimonialSlider.next(), 5000);
```

#### 4️⃣ Atualizar Navegação (Header)

```html
<!-- Adicione em <nav> -->
<a href="#depoimentos" class="nav-tab px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium hover:bg-forbody-red hover:bg-opacity-20">
  Depoimentos
</a>
```

---

## 🎨 Sistema de Componentes

### Classes Reutilizáveis

#### Card Base
```html
<div class="glass-effect p-8 rounded-xl border border-forbody-red border-opacity-30">
  <!-- Conteúdo -->
</div>
```

#### Badge
```html
<span class="badge">Premium Feature</span>
```

#### CTA Button
```html
<button class="cta-button">Ação Principal</button>
```

#### Icon Wrapper
```html
<div class="icon-wrapper">
  <i class="fas fa-icon"></i>
</div>
```

#### Reveal Animation
```html
<div class="reveal">
  Elemento que anima no scroll
</div>
```

---

## 🔧 JavaScript Modular

### Estrutura de `script.js`

```
1. Navegação & Header
   ├─ Update nav tabs
   ├─ Mobile menu
   └─ Header shadow

2. Reveal on Scroll
   ├─ IntersectionObserver
   └─ .active class toggle

3. FAQ Accordion
   ├─ Toggle content
   └─ Toggle icons

4. Form Submission
   ├─ Validação
   ├─ API call
   └─ Feedback visual

5. CTA Buttons
   └─ Scroll to footer

6. Smooth Scroll
   └─ Smooth behavior

7. Performance
   └─ Lazy loading (ready)

8. Easter Egg
   └─ Console logging

9. Analytics
   └─ Tracking setup
```

### Adicionar Novo Módulo

```javascript
// ========================================
// X. MEU_NOVO_MODULO
// ========================================

const meuModulo = {
  init() {
    this.setupEventListeners();
  },
  
  setupEventListeners() {
    // ... seu código
  }
};

// Executar na página
document.addEventListener('DOMContentLoaded', () => {
  meuModulo.init();
});
```

---

## 🎯 Padrões de Código

### Naming Conventions

```javascript
// Variables: camelCase
const heroSection = document.getElementById('hero');

// Functions: camelCase
function updateNavigation() { }

// Classes/Components: PascalCase
class FormValidator { }

// Constants: UPPER_SNAKE_CASE
const API_ENDPOINT = 'https://api.forbody.com';
```

### Estrutura HTML

```html
<!-- IDs para JavaScript -->
<div id="elemento-principal">
  
  <!-- Classes para estilo -->
  <div class="card glass-effect reveal">
    
    <!-- Data attributes para configuração -->
    <button data-action="submit" data-target="form-1">
      Enviar
    </button>
  </div>
</div>
```

---

## 🚀 Performance Best Practices

### 1. CSS
- ✅ Use Tailwind utilities
- ✅ Evite CSS customizado quando possível
- ✅ Minify em produção

### 2. JavaScript
- ✅ Use event delegation
- ✅ Debounce scroll events
- ✅ Lazy load scripts não-críticos

```javascript
// Bom
document.addEventListener('scroll', debounce(function() {
  // lógica
}, 300));

// Função debounce
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
```

### 3. Imagens
- ✅ Use WebP com fallback
- ✅ Especifique dimensions
- ✅ Lazy load off-screen images

### 4. HTML
- ✅ Semântica correta
- ✅ Alt text em imagens
- ✅ Meta tags apropriadas

---

## 🔄 Integração com APIs Externas

### Exemplo: Integração com CRM

```javascript
class CRMIntegration {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseURL = 'https://api.crm.com';
  }
  
  async submitLead(formData) {
    try {
      const response = await fetch(`${this.baseURL}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('API Error');
      
      return await response.json();
    } catch (error) {
      console.error('CRM Integration Error:', error);
      throw error;
    }
  }
}

// Usar
const crm = new CRMIntegration(process.env.VITE_CRM_API_KEY);
```

---

## 🧪 Testes (Estrutura)

```javascript
// tests/form.test.js
describe('Contact Form', () => {
  test('should validate email', () => {
    const input = document.getElementById('formEmail');
    input.value = 'invalid-email';
    expect(input.validity.valid).toBe(false);
  });
  
  test('should submit form with valid data', async () => {
    // ... test logic
  });
});
```

---

## 📊 Monitoramento & Logging

```javascript
// Logging estruturado
const logger = {
  info: (message, data) => {
    console.log(`[INFO] ${message}`, data);
  },
  
  warn: (message, data) => {
    console.warn(`[WARN] ${message}`, data);
  },
  
  error: (message, error) => {
    console.error(`[ERROR] ${message}`, error);
    // Enviar para serviço de error tracking
  }
};

// Usar
logger.info('Form submitted', formData);
```

---

## 🔐 Segurança

### CSRF Protection
```html
<!-- Token no formulário -->
<input type="hidden" name="_csrf" value="token-value">
```

### XSS Prevention
```javascript
// ❌ Evitar
element.innerHTML = userInput;

// ✅ Fazer
element.textContent = userInput;
// ou
element.innerHTML = DOMPurify.sanitize(userInput);
```

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'">
```

---

## 📚 Recursos para Desenvolvedores

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [Web.dev Performance](https://web.dev/performance/)

---

## 🎓 Próximas Melhorias

- [ ] Implementar PWA (Progressive Web App)
- [ ] Adicionar Service Worker
- [ ] Integrar CMS (Headless)
- [ ] Dark mode toggle
- [ ] Multilanguage support
- [ ] Component library
- [ ] Automated testing
- [ ] CI/CD pipeline

---

**Desenvolvido com ❤️ para máxima performance e escalabilidade**
