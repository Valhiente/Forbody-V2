# 🚀 Como Começar - Forbody V2

## ⚡ 30 Segundos para Começar

### Opção 1: Abrir no Navegador (Recomendado para Visualização)
1. Clique com botão direito em `index.html`
2. Selecione "Abrir com Live Server" (se tiver extensão)
3. Página abre em `http://localhost:5500`

### Opção 2: Linha de Comando (Recomendado para Desenvolvimento)
```bash
cd /workspaces/Forbody-V2

# Instale dependências
npm install

# Inicie modo desenvolvimento
npm run dev

# Abra http://localhost:3000 no navegador
```

### Opção 3: Python (Se não tem Node.js)
```bash
python -m http.server 8000

# Abra http://localhost:8000 no navegador
```

---

## 📁 Arquivos Importantes

```
index.html          ← PÁGINA PRINCIPAL (edite aqui para mudar conteúdo)
src/script.js       ← INTERATIVIDADES (menu, formulário, animações)
src/input.css       ← ESTILOS CUSTOMIZADOS
tailwind.config.js  ← CONFIGURAÇÃO DE CORES E FONTS
```

---

## 🎨 Primeiras Customizações

### 1. Mudar Título Principal
Abra `index.html` → Procure "Performance sem limites" → Substitua

### 2. Mudar Email de Contato
Abra `index.html` → Procure "investimentos@forbody.com.br" → Substitua

### 3. Mudar Cores
Abra `tailwind.config.js` → Vá até `colors: { forbody: { ... } }` → Mude valores hex

### 4. Adicionar Logo
Abra `index.html` → Localize a seção "Logo" (~linha 40) → Substitua pela sua

---

## 📚 Documentação Rápida

| Arquivo | Para Quem? | Ler Quando? |
|---------|-----------|-----------|
| QUICKSTART.md | Iniciantes | Primeira vez |
| README.md | Todos | Entender projeto |
| CUSTOMIZATION.md | Designers | Mudar cores/conteúdo |
| ARCHITECTURE.md | Programadores | Adicionar features |
| SNIPPETS.md | Copiar+Colar | Novos componentes |
| TROUBLESHOOTING.md | Debug | Algo não funciona |
| ROADMAP.md | PMs | Próximas features |

---

## 🔧 Comandos Úteis

```bash
# Instalar dependências
npm install

# Modo desenvolvimento (compila CSS)
npm run dev

# Build para produção
npm run build

# Limpar node_modules
rm -rf node_modules && npm install

# Ver estrutura de pastas
tree -L 2

# Validar HTML
npm install -g htmlhint && htmlhint index.html
```

---

## 🌐 Deploy em 5 Minutos

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
# Siga instruções na tela
```

### Netlify
1. Vá para https://netlify.com
2. Conecte seu repositório GitHub
3. Deploy automático!

### GitHub Pages
```bash
git add .
git commit -m "Deploy"
git push
# Seu site estará em username.github.io/Forbody-V2
```

---

## ✅ Checklist Inicial

- [ ] Abrir index.html no navegador
- [ ] Ver página funcionando
- [ ] Clicar em "Comece Agora" (deve descer até formulário)
- [ ] Testar FAQ (expandir/fechar)
- [ ] Testar menu mobile (redimensionar para 375px)
- [ ] Abrir menu mobile (botão hambúrguer)
- [ ] Enviar formulário (testar feedback)

---

## 🎯 Próximas Etapas

### Essa Semana
1. [ ] Customizar textos principais
2. [ ] Adicionar logo da marca
3. [ ] Configurar email de contato real
4. [ ] Configurar redes sociais

### Próximo Mês
1. [ ] Integrar formulário com CRM
2. [ ] Adicionar Google Analytics
3. [ ] Deploy em produção
4. [ ] Testar em mobile real

### Próximo Trimestre
1. [ ] Adicionar mais seções (depoimentos, blog)
2. [ ] Implementar chat ao vivo
3. [ ] Criar dashboard para franqueados
4. [ ] Lançar mobile app

---

## 🆘 Problema Comum?

### "Página branca quando abro index.html"
→ Use Live Server (extensão VS Code) ou `python -m http.server 8000`

### "Estilos Tailwind não aparecem"
→ O CDN está carregando. Se customizar, rode `npm run build`

### "Menu mobile não funciona"
→ Redimensione a janela para < 768px (F12 → Toggle device)

### "Formulário não envia"
→ Verifique F12 → Console para erros

### "Preciso de mais ajuda"
→ Leia [TROUBLESHOOTING.md](TROUBLESHOOTING.md) ou [CUSTOMIZATION.md](CUSTOMIZATION.md)

---

## 📞 Suporte Rápido

Tem dúvida? Procure aqui:

1. **Documentação** → Leia os .md do projeto
2. **Troubleshooting** → [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
3. **Snippets** → [SNIPPETS.md](SNIPPETS.md)
4. **Google** → Procure o erro específico
5. **Suporte** → investimentos@forbody.com.br

---

## 🎓 Recursos Externos

- [Tailwind CSS Docs](https://tailwindcss.com) - Styling
- [MDN Web Docs](https://developer.mozilla.org) - JavaScript
- [FontAwesome](https://fontawesome.com) - Ícones
- [VS Code Tips](https://code.visualstudio.com/tips-and-tricks) - Editor

---

## 💪 Bora Começar!

1. Abra `index.html` no navegador
2. Altere os textos que deseja
3. Customizar cores em `tailwind.config.js`
4. Deploy com `vercel` ou `netlify`
5. Pronto! Seu site está no ar! 🚀

---

**Dúvida? Comece por [QUICKSTART.md](QUICKSTART.md)**
