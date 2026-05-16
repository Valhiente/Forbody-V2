# ⚡ Quick Start - Forbody V2

## 🚀 Iniciar em 5 Minutos

### Opção 1: Abrir Diretamente no Navegador (Sem Setup)

```bash
# Apenas abrir o arquivo
open index.html
# ou no Windows
start index.html
```

✅ A página funciona completamente com Tailwind CDN!

---

## 🛠️ Opção 2: Setup Completo com Node.js

### 1. Instalação
```bash
cd /workspaces/Forbody-V2
npm install
```

### 2. Desenvolvimento
```bash
npm run dev
```

Isto inicia o Tailwind em modo watch. Abra `index.html` em seu navegador.

### 3. Build para Produção
```bash
npm run build
```

---

## 📝 Customização Imediata

### Alterar Título Principal
`index.html` → Linha ~104
```html
<h1>Seu Novo Título Aqui</h1>
```

### Alterar Cores
`tailwind.config.js` → Colors section
```javascript
red: "#SEUACOR",
```

### Alterar Email de Contato
`index.html` → Linha ~528
```html
<a href="mailto:seu@email.com">seu@email.com</a>
```

---

## 🌐 Deploy Rápido

### Vercel (1 clique)
```bash
npm install -g vercel
vercel
```

### Netlify (Drag & Drop)
1. Vá para [netlify.com](https://netlify.com)
2. Arraste a pasta para deploy

### GitHub Pages
```bash
git add .
git commit -m "Deploy"
git push
```

---

## 📚 Documentação Completa

- [README.md](README.md) - Visão geral do projeto
- [CUSTOMIZATION.md](CUSTOMIZATION.md) - Guia de customização
- [ARCHITECTURE.md](ARCHITECTURE.md) - Arquitetura técnica

---

## ✅ Checklist de Implementação

- [ ] Alterar textos e cores
- [ ] Adicionar imagens/vídeos
- [ ] Configurar formulário com API real
- [ ] Integrar Google Analytics
- [ ] Testar responsividade mobile
- [ ] Otimizar performance
- [ ] Deploy inicial

---

## 🆘 Troubleshooting

### Tailwind não funcionando
```bash
npm run build
```

### Formulário não envia
Verifique console `F12` → Console aba para erros

### Página branca
Verifique se `index.html` está sendo servido com live server

---

## 🎯 Próximas Features

Pronto para adicionar:
- Depoimentos/Testimonios
- Blog/Notícias
- Calculadora de ROI
- Agenda (Calendário)
- Chat ao vivo

Veja [ARCHITECTURE.md](ARCHITECTURE.md) para como adicionar.

---

**Precisa de ajuda? Email: investimentos@forbody.com.br**
