# 🚀 Deploy no Netlify

## 📋 Arquivos Criados

- `netlify.toml` - Configuração principal do Netlify
- `_redirects` - Arquivo de redirecionamento para SPA

## 🔧 Como Fazer Deploy

### Opção 1: Via Interface do Netlify

1. Acesse: https://app.netlify.com
2. Clique em **Add new site** → **Import an existing project**
3. Conecte seu repositório GitHub
4. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/itbi/browser`
5. Clique em **Deploy site**

### Opção 2: Via Netlify CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build do projeto
npm run build

# Deploy
netlify deploy --prod --dir=dist/itbi/browser
```

### Opção 3: Deploy Automático (GitHub)

1. Conecte o repositório no Netlify
2. Configure:
   - **Build command**: `npm run build:netlify` (já configurado no netlify.toml)
   - **Publish directory**: `dist/itbi/browser` (já configurado no netlify.toml)
3. **IMPORTANTE**: Configure a variável `API_URL` em **Site settings** → **Environment variables**
4. A cada push na branch `main`, o deploy será automático

## ⚙️ Variáveis de Ambiente (Netlify) - OBRIGATÓRIO

**IMPORTANTE:** Configure a variável `API_URL` antes do deploy!

1. Vá em **Site settings** → **Environment variables**
2. Clique em **Add a variable**
3. Adicione:
   - **Key**: `API_URL`
   - **Value**: `https://api.itbi.producao.com.br/api` (sua URL real)
4. Clique em **Save**

### Exemplos por ambiente:

- **Produção**: `https://api.itbi.producao.com.br/api`
- **Desenvolvimento**: `https://api.itbi.develop.com.br/api`
- **Homologação**: `https://api.itbi.homologacao.com.br/api`

## 🔄 Configuração Atual

- **Build command**: `npm run build`
- **Publish directory**: `dist/itbi/browser`
- **Redirecionamento**: Configurado para SPA Angular
- **Headers**: Segurança e cache configurados

## 📝 Notas

- O arquivo `_redirects` é copiado automaticamente para o build
- Todos os caminhos redirecionam para `index.html` (SPA)
- Cache configurado para arquivos estáticos
- Headers de segurança incluídos
