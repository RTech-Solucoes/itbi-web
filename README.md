# ITBI Web

Sistema web para gerenciamento de ITBI (Imposto sobre Transmissão de Bens Imóveis).

Este projeto foi gerado usando [Angular CLI](https://github.com/angular/angular-cli) versão 21.0.4.

---

## 📋 Índice

- [Pré-requisitos](#-pré-requisitos)
- [Desenvolvimento](#-desenvolvimento)
- [Docker](#-docker)
- [CI/CD](#-cicd)
- [Deploy](#-deploy)
  - [Deploy Netlify](#-deploy-netlify)
  - [Deploy Docker](#-deploy-docker)
- [Ambientes](#-ambientes)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Recursos Adicionais](#-recursos-adicionais)

---

## 📋 Pré-requisitos

- **Node.js** 20+
- **npm** 11+
- **Docker** (opcional, para containerização)
- **Git** (para versionamento)

---

## 🚀 Desenvolvimento

### Instalação

```bash
npm install
```

### Servidor de desenvolvimento

```bash
npm start
# ou
ng serve
```

Acesse `http://localhost:4200/`. A aplicação recarrega automaticamente ao modificar os arquivos.

### Build

```bash
# Build de produção (padrão)
npm run build

# Build de desenvolvimento
npm run build -- --configuration=develop

# Build de desenvolvimento local
npm run build -- --configuration=development
```

Os artefatos serão gerados no diretório `dist/itbi/browser/`.

### Testes

```bash
npm test
# ou
ng test
```

---

## 🐳 Docker

### Build da imagem

```bash
docker build -t itbi-web .
```

### Executar container

#### Produção:
```bash
docker run -d -p 80:80 \
  -e API_URL=https://api.itbi.producao.com.br/api \
  --name itbi-web \
  itbi-web:latest
```

#### Desenvolvimento:
```bash
docker run -d -p 8080:80 \
  -e API_URL=https://api.itbi.develop.com.br/api \
  --name itbi-web-dev \
  itbi-web:latest
```

#### Homologação:
```bash
docker run -d -p 8081:80 \
  -e API_URL=https://api.itbi.homologacao.com.br/api \
  --name itbi-web-hml \
  itbi-web:latest
```

### Comandos úteis

```bash
# Ver logs
docker logs itbi-web

# Parar container
docker stop itbi-web

# Remover container
docker rm itbi-web

# Ver containers rodando
docker ps
```

### Estrutura do Dockerfile

O projeto utiliza **multi-stage build**:

1. **Stage 1 (build)**: Node.js 22.14.0-alpine
   - Instala dependências
   - Compila a aplicação Angular

2. **Stage 2 (runner)**: Nginx
   - Serve os arquivos estáticos
   - Executa `environment.sh` para substituir URLs
   - Configuração otimizada para SPA

---

## 🔄 CI/CD

O projeto suporta dois sistemas de CI/CD:

### GitHub Actions

Pipeline automático configurado em `.github/workflows/ci-cd.yml`.

#### Como funciona:

1. **Trigger**: Push na branch `main`
2. **Build**: Compila a aplicação Angular
3. **Docker**: Build e push da imagem para GHCR
4. **Notificação**: Envia mensagem no Google Chat

#### Configuração:

1. **Permissões** (obrigatório):
   - Vá em **Settings** → **Actions** → **General**
   - **Workflow permissions** → ✅ **Read and write permissions**
   - Clique em **Save**

2. **Webhook Google Chat** (já configurado):
   - As notificações são enviadas automaticamente
   - Para alterar o webhook, edite `.github/workflows/ci-cd.yml`

#### Notificações de Deploy

O pipeline envia notificações automáticas no Google Chat com o seguinte formato:

**✅ Sucesso:**
```
🚀 Deploy do projeto ITBI Web

Projeto
itbi-web

Branch
main

Status
SUCCESS ✅

Mensagem
Deploy para o ITBI Web realizado com sucesso!

Commit
Merge pull request #123 from feature/nova-funcionalidade...
```

**❌ Falha:**
```
❌ Deploy do projeto ITBI Web

Projeto
itbi-web

Branch
main

Status
FAILED ❌

Mensagem
Deploy para o ITBI Web falhou!

Commit
Mensagem do commit...
```

#### Imagem gerada:

Após o pipeline, a imagem estará disponível em:

```
ghcr.io/<seu-usuario-ou-org>/itbi-web:latest
ghcr.io/<seu-usuario-ou-org>/itbi-web:main_<commit-sha>
```

#### Baixar e usar:

```bash
# Login no GHCR
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Baixar imagem
docker pull ghcr.io/<seu-usuario-ou-org>/itbi-web:latest

# Executar
docker run -d -p 80:80 \
  -e API_URL=https://api.itbi.producao.com.br/api \
  ghcr.io/<seu-usuario-ou-org>/itbi-web:latest
```

### Jenkins

Pipeline configurado em `Jenkinsfile`.

#### Configuração:

1. Crie um job no Jenkins
2. Selecione **Pipeline from SCM**
3. Configure o repositório Git
4. O `Jenkinsfile` será detectado automaticamente

#### Parâmetros disponíveis:

- **Builder Parameters**:
  - `makeBuilder`: Atualizar builder image
  - `builderVersion`: Versão do builder

- **Build Parameters**:
  - `build`: Executar build
  - `selectedBuilderVersion`: Versão do builder a usar

- **Deploy Parameters**:
  - `deploy`: Executar deploy
  - `ambiente`: Ambiente (prd/hml)

#### Configurar emails:

Edite a linha 67 do `Jenkinsfile`:

```groovy
def emails = "seu-email@empresa.com.br"
```

---

## 🚀 Deploy

O projeto suporta múltiplas opções de deploy:

| Plataforma | Tipo | Uso Recomendado |
|------------|------|-----------------|
| **Netlify** | Estático/Serverless | Produção web rápida |
| **Docker + GHCR** | Container | Infraestrutura própria |
| **Jenkins** | CI/CD Enterprise | Ambientes corporativos |

---

### ☁️ Deploy Netlify

> **Recomendado para deploy rápido e escalável**

#### Pré-requisitos Netlify

- Conta no [Netlify](https://app.netlify.com)
- Repositório conectado ao GitHub

#### Arquivos de Configuração

| Arquivo | Descrição |
|---------|-----------|
| `netlify.toml` | Configuração principal (build, redirects, headers) |
| `public/_redirects` | Redirecionamento SPA |
| `.nvmrc` | Versão do Node.js (20) |

#### Opção 1: Deploy via Interface Netlify

1. Acesse [app.netlify.com](https://app.netlify.com)
2. Clique em **Add new site** → **Import an existing project**
3. Conecte seu repositório GitHub
4. As configurações serão detectadas automaticamente do `netlify.toml`:
   - **Build command**: `npm run build:netlify`
   - **Publish directory**: `dist/itbi/browser`
   - **Node version**: 20
5. Configure a variável de ambiente (ver abaixo)
6. Clique em **Deploy site**

#### Opção 2: Deploy via Netlify CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build do projeto
npm run build

# Deploy de preview
netlify deploy --dir=dist/itbi/browser

# Deploy de produção
netlify deploy --prod --dir=dist/itbi/browser
```

#### Opção 3: Deploy Automático (CI/CD)

1. Conecte o repositório no Netlify
2. Configure a variável `API_URL` (obrigatório)
3. A cada push na branch configurada, o deploy será automático
4. Notificações de status serão enviadas (se configurado)

#### ⚙️ Variáveis de Ambiente Netlify

**OBRIGATÓRIO:** Configure antes do primeiro deploy!

1. Vá em **Site settings** → **Environment variables**
2. Clique em **Add a variable**
3. Adicione:

| Variável | Valor | Obrigatório |
|----------|-------|-------------|
| `API_URL` | `https://api.itbi.producao.com.br/api` | ✅ Sim |

#### Configuração do `netlify.toml`

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
```

#### 🔧 Troubleshooting Netlify

| Problema | Solução |
|----------|---------|
| Page not found | Verifique se `_redirects` está em `public/` |
| Build falha | Verifique versão do Node (precisa 20+) |
| API não conecta | Configure `API_URL` nas variáveis de ambiente |

---

### 🐳 Deploy Docker

#### Deploy Manual

##### 1. Build local:

```bash
npm run build
```

##### 2. Build Docker:

```bash
docker build -t itbi-web .
```

##### 3. Push para registry (opcional):

```bash
docker tag itbi-web:latest seu-registry/itbi-web:latest
docker push seu-registry/itbi-web:latest
```

##### 4. Executar em produção:

```bash
docker run -d -p 80:80 \
  -e API_URL=https://api.itbi.producao.com.br/api \
  --name itbi-web-prod \
  --restart unless-stopped \
  itbi-web:latest
```

#### Deploy Automático (GitHub Actions)

1. Faça push na branch `main`:
```bash
git add .
git commit -m "Deploy: sua mensagem"
git push origin main
```

2. Acompanhe o pipeline:
   - Vá em **Actions** no GitHub
   - Veja o pipeline rodando

3. Notificação no Google Chat (se configurado):
   ```
   🚀 Deploy do projeto ITBI Web
   
   Projeto: itbi-web
   Branch: main
   Status: SUCCESS ✅
   Mensagem: Deploy para o ITBI Web realizado com sucesso!
   Commit: sua mensagem de commit...
   ```

4. Após sucesso, baixe e execute:
```bash
docker pull ghcr.io/<seu-usuario>/itbi-web:latest
docker run -d -p 80:80 \
  -e API_URL=https://api.itbi.producao.com.br/api \
  ghcr.io/<seu-usuario>/itbi-web:latest
```

---

## 🌍 Ambientes

### Configuração de Ambientes

O projeto suporta múltiplos ambientes através de arquivos de environment:

| Arquivo | Uso | API URL (placeholder) |
|---------|-----|------------------------|
| `environment.ts` | Dev local | `http://localhost:8080/api` |
| `environment.develop.ts` | Desenvolvimento | `api.itbi` |
| `environment.prod.ts` | Produção | `api.itbi` |

### Como Funciona

1. **Build**: O Angular compila com o placeholder `api.itbi`
2. **Docker**: Quando o container inicia, o `environment.sh` substitui `api.itbi` pela variável `$API_URL`
3. **Resultado**: A aplicação usa a URL real configurada

### Variáveis de Ambiente

| Variável | Descrição | Exemplo | Obrigatório |
|----------|-----------|---------|-------------|
| `API_URL` | URL do backend API | `https://api.itbi.producao.com.br/api` | ✅ Sim |

### Exemplos por Ambiente

#### Produção:
```bash
docker run -d -p 80:80 \
  -e API_URL=https://api.itbi.producao.com.br/api \
  itbi-web:latest
```

#### Desenvolvimento:
```bash
docker run -d -p 8080:80 \
  -e API_URL=https://api.itbi.develop.com.br/api \
  itbi-web:latest
```

#### Homologação:
```bash
docker run -d -p 8081:80 \
  -e API_URL=https://api.itbi.homologacao.com.br/api \
  itbi-web:latest
```

### Usar a API no Código

```typescript
import { environment } from '../environments/environment';

// Em um service
export class ApiService {
  private readonly apiUrl = environment.apiUrl;

  getImoveis() {
    return this.http.get(`${this.apiUrl}/imoveis`);
  }
}
```

Veja exemplo completo em: `src/app/services/api.service.ts`

---

## 📁 Estrutura do Projeto

```
itbi-web/
├── .github/
│   └── workflows/
│       └── ci-cd.yml              # Pipeline GitHub Actions
├── scripts/
│   └── netlify-build.sh           # Script pós-build Netlify
├── src/
│   ├── app/
│   │   ├── components/            # Componentes reutilizáveis
│   │   ├── layouts/               # Layouts (público/privado)
│   │   ├── pages/                 # Páginas da aplicação
│   │   ├── services/              # Services (API, etc)
│   │   ├── app.config.ts          # Configuração da aplicação
│   │   └── app.routes.ts          # Rotas
│   ├── environments/
│   │   ├── environment.ts         # Dev local
│   │   ├── environment.develop.ts # Desenvolvimento
│   │   └── environment.prod.ts    # Produção
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── public/
│   ├── _redirects                 # Redirecionamento SPA (Netlify)
│   ├── assets/                    # Assets estáticos
│   └── favicon.ico
├── .nvmrc                         # Versão Node.js (Netlify)
├── .dockerignore                  # Arquivos ignorados no Docker
├── _redirects                     # Redirecionamento SPA (backup)
├── angular.json                   # Configuração Angular
├── build.Dockerfile               # Builder para Jenkins
├── DEPLOY-NETLIFY.md              # Documentação Netlify
├── Dockerfile                     # Build multi-stage
├── environment.sh                 # Script de substituição de URLs
├── Jenkinsfile                    # Pipeline Jenkins
├── netlify.toml                   # Configuração Netlify
├── nginx.conf                     # Configuração nginx
├── package.json                   # Dependências
└── README.md                      # Este arquivo
```

---

## 🛠️ Scaffolding (Angular CLI)

```bash
# Gerar componente
ng generate component component-name

# Gerar serviço
ng generate service service-name

# Gerar guard
ng generate guard guard-name

# Ver todos os schematics disponíveis
ng generate --help
```

---

## 📚 Recursos Adicionais

### Documentação do Projeto

- [DEPLOY-NETLIFY.md](./DEPLOY-NETLIFY.md) - Guia completo de deploy no Netlify

### Links Externos

- [Angular CLI Overview](https://angular.dev/tools/cli)
- [GovBR-DS](https://gov.br/ds) - Design System do Governo
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Jenkins Pipeline](https://www.jenkins.io/doc/book/pipeline/)
- [Netlify Docs](https://docs.netlify.com/)

---

## 📝 Notas Importantes

- ⚠️ **URLs de API**: Use sempre `environment.apiUrl` no código, nunca URLs hardcoded
- ⚠️ **Placeholder**: O valor `api.itbi` nos environments é um placeholder que será substituído no Docker
- ⚠️ **Variáveis de Ambiente**: Sempre passe `-e API_URL=...` ao rodar o container Docker
- ✅ **Build**: O build de produção é otimizado e minificado
- ✅ **Nginx**: Configurado para SPA (Single Page Application) com roteamento

---

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto é privado e proprietário.

---

**Desenvolvido com ❤️ usando Angular 21**
