# ☁️ Deploy no Netlify - ITBI Web

Guia completo para deploy da aplicação ITBI Web no Netlify.

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Arquivos de Configuração](#-arquivos-de-configuração)
- [Pré-requisitos](#-pré-requisitos)
- [Deploy Passo a Passo](#-deploy-passo-a-passo)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Troubleshooting](#-troubleshooting)
- [Configurações Avançadas](#-configurações-avançadas)

---

## 🎯 Visão Geral

O projeto está configurado para deploy automático no Netlify com:

| Recurso | Configuração |
|---------|--------------|
| **Build Command** | `npm run build:netlify` |
| **Publish Directory** | `dist/itbi/browser` |
| **Node Version** | 20 |
| **NPM Version** | 10 |
| **Redirects** | SPA (todas rotas → index.html) |
| **Headers** | Segurança + Cache otimizado |

---

## 📁 Arquivos de Configuração

### `netlify.toml`

Configuração principal do Netlify:

```toml
[build]
  command = "npm run build:netlify"
  publish = "dist/itbi/browser"

[build.environment]
  NODE_VERSION = "20"
  NPM_VERSION = "10"

# Redirecionamento SPA
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Headers de segurança
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

# Cache para arquivos estáticos
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### `public/_redirects`

Redirecionamento para SPA Angular:

```
/*    /index.html   200
```

### `.nvmrc`

Versão do Node.js:

```
20
```

### `scripts/netlify-build.sh`

Script pós-build para substituição de URLs:

```bash
#!/bin/bash

# Substitui api.itbi pela URL real configurada
if [ -n "$API_URL" ]; then
  find dist/itbi/browser -type f -name '*.js' \
    -exec sed -i "s#api\.itbi#$API_URL#g" {} +
fi

# Copia _redirects para garantia
cp _redirects dist/itbi/browser/
```

---

## ✅ Pré-requisitos

1. **Conta Netlify**: [app.netlify.com](https://app.netlify.com)
2. **Repositório GitHub**: Conectado à conta Netlify
3. **Variável `API_URL`**: URL do backend configurada

---

## 🚀 Deploy Passo a Passo

### Opção 1: Via Interface Netlify (Recomendado)

#### 1. Criar novo site

1. Acesse [app.netlify.com](https://app.netlify.com)
2. Clique em **Add new site** → **Import an existing project**
3. Selecione **GitHub**
4. Autorize o acesso (se necessário)
5. Selecione o repositório `itbi-web`

#### 2. Configurar build

As configurações serão detectadas automaticamente do `netlify.toml`:

| Campo | Valor (auto-detectado) |
|-------|------------------------|
| Branch to deploy | `main` |
| Build command | `npm run build:netlify` |
| Publish directory | `dist/itbi/browser` |

#### 3. Configurar variáveis de ambiente

**⚠️ OBRIGATÓRIO antes do primeiro deploy!**

1. Clique em **Show advanced**
2. Em **Environment variables**, clique em **New variable**
3. Adicione:
   - **Key**: `API_URL`
   - **Value**: `https://sua-api.com/api`
4. Clique em **Deploy site**

#### 4. Aguardar deploy

- O primeiro deploy pode levar 2-5 minutos
- Acompanhe o progresso em **Deploys**
- Após sucesso, acesse a URL gerada (ex: `https://itbi-web.netlify.app`)

---

### Opção 2: Via Netlify CLI

```bash
# 1. Instalar Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Vincular repositório (primeira vez)
netlify init

# 4. Build do projeto
npm run build

# 5. Deploy de preview (teste)
netlify deploy --dir=dist/itbi/browser

# 6. Deploy de produção
netlify deploy --prod --dir=dist/itbi/browser
```

---

### Opção 3: Deploy Manual (Drag & Drop)

1. Execute o build local:
   ```bash
   npm run build
   ```

2. Acesse [app.netlify.com/drop](https://app.netlify.com/drop)

3. Arraste a pasta `dist/itbi/browser` para a área de upload

4. Configure as variáveis de ambiente após o deploy

---

## ⚙️ Variáveis de Ambiente

### Configurar no Netlify

1. Vá em **Site settings** → **Environment variables**
2. Clique em **Add a variable**
3. Configure:

| Variável | Descrição | Exemplo | Obrigatório |
|----------|-----------|---------|-------------|
| `API_URL` | URL do backend | `https://api.itbi.com/api` | ✅ Sim |

### Valores por ambiente

| Ambiente | Valor sugerido |
|----------|----------------|
| **Produção** | `https://api.itbi.producao.com.br/api` |
| **Homologação** | `https://api.itbi.homologacao.com.br/api` |
| **Desenvolvimento** | `https://api.itbi.develop.com.br/api` |

### Como funciona

1. Durante o build, o Angular compila com placeholder `api.itbi`
2. O script `netlify-build.sh` substitui `api.itbi` pelo valor de `$API_URL`
3. A aplicação usa a URL real em produção

---

## 🔧 Troubleshooting

### ❌ Erro: "Page not found"

**Causa**: Redirecionamento SPA não configurado

**Solução**:
1. Verifique se `public/_redirects` existe
2. Verifique se `netlify.toml` tem a seção `[[redirects]]`
3. Faça um novo deploy: **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

### ❌ Erro: "Build failed"

**Causa comum**: Versão do Node.js incompatível

**Solução**:
1. Verifique se `.nvmrc` contém `20`
2. Verifique se `netlify.toml` tem:
   ```toml
   [build.environment]
     NODE_VERSION = "20"
   ```
3. Limpe cache e redeploy

### ❌ Erro: "API não conecta"

**Causa**: Variável `API_URL` não configurada

**Solução**:
1. Vá em **Site settings** → **Environment variables**
2. Adicione ou corrija `API_URL`
3. Redeploy o site

### ❌ Erro: "CORS blocked"

**Causa**: Backend não aceita requisições do domínio Netlify

**Solução**: Configure CORS no backend para aceitar o domínio Netlify

---

## ⚡ Configurações Avançadas

### Deploy Automático por Branch

Edite `netlify.toml`:

```toml
[context.production]
  command = "npm run build:netlify"

[context.develop]
  command = "npm run build:netlify"
  
[context.develop.environment]
  API_URL = "https://api.develop.exemplo.com/api"
```

### Domínio Customizado

1. Vá em **Site settings** → **Domain management**
2. Clique em **Add custom domain**
3. Adicione seu domínio (ex: `itbi.suacidade.gov.br`)
4. Configure DNS conforme instruções

### SSL/HTTPS

- Netlify configura SSL automaticamente via Let's Encrypt
- Forçar HTTPS: **Site settings** → **Domain management** → **HTTPS** → ✅ Force HTTPS

### Notificações de Deploy

1. Vá em **Site settings** → **Build & deploy** → **Deploy notifications**
2. Configure webhooks para Slack, Discord, etc.

---

## 📊 Monitoramento

### Logs de Build

- Acesse **Deploys** → Clique no deploy → **Deploy log**
- Verifique erros e avisos

### Analytics (Plano Pro)

- **Site settings** → **Analytics**
- Métricas de visitantes, pageviews, etc.

### Status Badge

Adicione ao README:

```markdown
[![Netlify Status](https://api.netlify.com/api/v1/badges/SEU-SITE-ID/deploy-status)](https://app.netlify.com/sites/SEU-SITE/deploys)
```

---

## 📝 Checklist de Deploy

- [ ] Repositório conectado ao Netlify
- [ ] Variável `API_URL` configurada
- [ ] Build passando sem erros
- [ ] Rotas funcionando (SPA redirect)
- [ ] API conectando corretamente
- [ ] SSL/HTTPS ativo
- [ ] Domínio customizado (opcional)

---

## 🔗 Links Úteis

- [Netlify Docs](https://docs.netlify.com/)
- [Angular Deployment Guide](https://angular.dev/tools/cli/deployment)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/)
- [Netlify Redirects](https://docs.netlify.com/routing/redirects/)

---

**Última atualização**: Janeiro 2026
