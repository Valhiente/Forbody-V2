# 📦 Snippets & Componentes Prontos - Forbody V2

Use estes componentes como template para criar novas seções e elementos.

---

## 📄 Seção Padrão Completa

```html
<!-- SETOR XX: MEU_COMPONENTE -->
<section id="meu-componente" class="py-20 bg-forbody-black">
  <div class="max-w-7xl mx-auto px-6">
    <!-- Título -->
    <h2 class="text-4xl md:text-5xl font-black text-white mb-4 text-center">
      Meu <span class="text-forbody-red">Componente</span>
    </h2>
    
    <!-- Subtítulo -->
    <p class="text-forbody-silver text-center max-w-2xl mx-auto mb-16">
      Descrição do componente aqui.
    </p>
    
    <!-- Conteúdo Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Item 1 -->
      <div class="reveal card-hover p-8 glass-effect rounded-xl border border-forbody-red border-opacity-30">
        <!-- Item content -->
      </div>
    </div>
  </div>
</section>
```

---

## 🎴 Card com Imagem

```html
<div class="reveal card-hover group">
  <div class="glass-effect rounded-xl overflow-hidden border border-forbody-red border-opacity-30">
    <!-- Imagem -->
    <img src="imagem.jpg" alt="" class="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300">
    
    <!-- Conteúdo -->
    <div class="p-8">
      <h3 class="text-xl font-bold text-white mb-3">Título</h3>
      <p class="text-forbody-silver text-sm mb-6">Descrição breve aqui.</p>
      <button class="cta-button w-full">Saiba Mais</button>
    </div>
  </div>
</div>
```

---

## 🎯 CTA Section

```html
<section class="py-20 bg-forbody-darkgray">
  <div class="max-w-4xl mx-auto px-6 text-center">
    <h2 class="text-4xl font-black text-white mb-6">Pronto para Transformar?</h2>
    <p class="text-forbody-silver text-lg mb-12">
      Junte-se a centenas de franqueados bem-sucedidos.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button class="cta-button">Começar Agora</button>
      <button class="px-8 py-4 border-2 border-forbody-silver rounded-lg font-bold hover:border-forbody-red transition-all">
        Agendar Demo
      </button>
    </div>
  </div>
</section>
```

---

## 📊 Stats Card

```html
<div class="reveal glass-effect p-8 rounded-xl border border-forbody-red border-opacity-30 text-center">
  <div class="text-4xl font-black text-forbody-red mb-3">+40%</div>
  <div class="text-forbody-silver">Crescimento Anual</div>
</div>
```

---

## ✅ Feature List

```html
<div class="space-y-4">
  <div class="flex gap-4 items-start">
    <!-- Ícone -->
    <div class="text-forbody-red text-xl mt-1 flex-shrink-0">
      <i class="fas fa-check-circle"></i>
    </div>
    
    <!-- Conteúdo -->
    <div>
      <h4 class="font-bold text-white">Feature Name</h4>
      <p class="text-forbody-silver text-sm">Descrição da feature aqui</p>
    </div>
  </div>
  
  <!-- Repetir para mais items -->
</div>
```

---

## 🎨 Badge/Tag

```html
<!-- Variação 1: Primária -->
<span class="badge">
  <i class="fas fa-rocket mr-2"></i>Premium Feature
</span>

<!-- Variação 2: Secundária -->
<span class="px-3 py-1 bg-forbody-silver bg-opacity-10 border border-forbody-silver rounded-full text-forbody-silver text-xs font-semibold">
  New Feature
</span>
```

---

## 🖼️ Testimonial/Review

```html
<div class="glass-effect p-8 rounded-xl border border-forbody-red border-opacity-30">
  <!-- Stars -->
  <div class="flex gap-1 mb-4">
    <i class="fas fa-star text-forbody-red"></i>
    <i class="fas fa-star text-forbody-red"></i>
    <i class="fas fa-star text-forbody-red"></i>
    <i class="fas fa-star text-forbody-red"></i>
    <i class="fas fa-star text-forbody-red"></i>
  </div>
  
  <!-- Quote -->
  <p class="text-forbody-silver italic mb-6">
    "Excepcional resultado. Forbody mudou nossa academia para um novo patamar."
  </p>
  
  <!-- Author -->
  <div class="flex gap-3 items-center">
    <img src="avatar.jpg" alt="" class="w-12 h-12 rounded-full">
    <div>
      <p class="font-bold text-white text-sm">Nome Completo</p>
      <p class="text-forbody-silver text-xs">Cargo/Localização</p>
    </div>
  </div>
</div>
```

---

## 📝 Formulário Completo

```html
<form id="myForm" class="space-y-4">
  <!-- Text Input -->
  <input type="text" placeholder="Seu nome" required class="w-full">
  
  <!-- Email Input -->
  <input type="email" placeholder="seu@email.com" required class="w-full">
  
  <!-- Select -->
  <select class="w-full">
    <option value="">Escolha uma opção</option>
    <option value="op1">Opção 1</option>
    <option value="op2">Opção 2</option>
  </select>
  
  <!-- Textarea -->
  <textarea placeholder="Sua mensagem..." rows="4" class="w-full"></textarea>
  
  <!-- Checkbox -->
  <label class="flex items-center gap-3 text-forbody-silver">
    <input type="checkbox" required class="w-4 h-4">
    <span>Concordo com os termos</span>
  </label>
  
  <!-- Submit -->
  <button type="submit" class="cta-button w-full">Enviar</button>
</form>
```

---

## 🎬 Modal/Popup

```html
<!-- Botão para abrir -->
<button id="openModal" class="cta-button">Abrir Modal</button>

<!-- Modal -->
<div id="modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
  <div class="glass-effect p-8 rounded-xl max-w-md w-full border border-forbody-red border-opacity-30">
    <h3 class="text-2xl font-bold text-white mb-4">Título Modal</h3>
    <p class="text-forbody-silver mb-6">Conteúdo do modal aqui.</p>
    
    <div class="flex gap-4">
      <button id="closeModal" class="px-6 py-2 border border-forbody-silver rounded-lg font-bold hover:bg-forbody-silver hover:bg-opacity-10 transition-all">
        Fechar
      </button>
      <button class="cta-button flex-1">Confirmar</button>
    </div>
  </div>
</div>

<!-- JavaScript -->
<script>
const modal = document.getElementById('modal');
document.getElementById('openModal').addEventListener('click', () => {
  modal.classList.remove('hidden');
});
document.getElementById('closeModal').addEventListener('click', () => {
  modal.classList.add('hidden');
});
</script>
```

---

## 📱 Responsive Grid

```html
<!-- 2 colunas em desktop, 1 em mobile -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- 3 colunas em desktop, 1 em mobile -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- 4 colunas em desktop, 2 em tablet, 1 em mobile -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

---

## 🔄 Carousel/Slider (Vanilla JS)

```html
<!-- HTML -->
<div class="carousel">
  <div class="carousel-item" data-slide="0">Slide 1</div>
  <div class="carousel-item" data-slide="1" style="display:none">Slide 2</div>
  <div class="carousel-item" data-slide="2" style="display:none">Slide 3</div>
</div>

<button id="prevSlide">← Anterior</button>
<button id="nextSlide">Próximo →</button>

<!-- JavaScript -->
<script>
const carousel = {
  current: 0,
  items: document.querySelectorAll('.carousel-item'),
  
  show(n) {
    this.items.forEach(item => item.style.display = 'none');
    this.items[n].style.display = 'block';
  },
  
  next() {
    this.current = (this.current + 1) % this.items.length;
    this.show(this.current);
  },
  
  prev() {
    this.current = (this.current - 1 + this.items.length) % this.items.length;
    this.show(this.current);
  }
};

document.getElementById('nextSlide').addEventListener('click', () => carousel.next());
document.getElementById('prevSlide').addEventListener('click', () => carousel.prev());

// Auto-rotate
setInterval(() => carousel.next(), 5000);
</script>
```

---

## 🔍 Search/Filter

```html
<!-- Input -->
<input type="text" id="searchInput" placeholder="Procurar..." class="w-full">

<!-- Items -->
<div id="items">
  <div class="item" data-name="item1">Item 1</div>
  <div class="item" data-name="item2">Item 2</div>
  <div class="item" data-name="item3">Item 3</div>
</div>

<!-- JavaScript -->
<script>
document.getElementById('searchInput').addEventListener('keyup', (e) => {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll('.item').forEach(item => {
    const match = item.dataset.name.includes(query);
    item.style.display = match ? 'block' : 'none';
  });
});
</script>
```

---

## 🎯 Smooth Scroll to Element

```javascript
function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Usar
document.getElementById('ctaButton').addEventListener('click', () => {
  scrollToElement('footer');
});
```

---

## 💾 Local Storage (Salvar Dados)

```javascript
// Salvar
localStorage.setItem('usuario_nome', 'João Silva');
localStorage.setItem('preferencias', JSON.stringify({ tema: 'dark' }));

// Recuperar
const nome = localStorage.getItem('usuario_nome');
const prefs = JSON.parse(localStorage.getItem('preferencias'));

// Limpar
localStorage.removeItem('usuario_nome');
localStorage.clear(); // Limpa tudo
```

---

## 📍 Geolocalização

```javascript
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    console.log(`Localização: ${latitude}, ${longitude}`);
    
    // Enviar para backend
    sendToAPI({ latitude, longitude });
  });
}
```

---

## 🎨 Dark Mode Toggle

```html
<!-- Button -->
<button id="themeToggle">🌙</button>

<!-- JavaScript -->
<script>
const html = document.documentElement;

document.getElementById('themeToggle').addEventListener('click', () => {
  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
});

// Recuperar preferência salva
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') html.classList.add('dark');
</script>
```

---

## 📧 Newsletter Signup

```html
<div class="glass-effect p-8 rounded-xl">
  <h3 class="text-2xl font-bold text-white mb-4">Fique Atualizado</h3>
  
  <form id="newsletterForm" class="flex gap-2">
    <input type="email" placeholder="seu@email.com" required class="flex-1">
    <button type="submit" class="cta-button px-8">Inscrever</button>
  </form>
  
  <p id="newsStatus" class="text-sm text-forbody-silver mt-3"></p>
</div>

<script>
document.getElementById('newsletterForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input').value;
  
  try {
    // Integrar com seu backend
    await fetch('https://seu-api.com/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
    
    document.getElementById('newsStatus').textContent = '✓ Inscrição confirmada!';
    e.target.reset();
  } catch (error) {
    document.getElementById('newsStatus').textContent = '✗ Erro ao inscrever';
  }
});
</script>
```

---

**Mais snippets? Consulte documentação oficial:**
- [Tailwind CSS Components](https://tailwindcss.com/docs/customization)
- [FontAwesome Icons](https://fontawesome.com/search)
- [MDN Web Docs](https://developer.mozilla.org/)
