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
4. **Notificação**: Envia mensagem no Google Chat (opcional)

#### Configuração:

1. **Permissões** (obrigatório):
   - Vá em **Settings** → **Actions** → **General**
   - **Workflow permissions** → ✅ **Read and write permissions**
   - Clique em **Save**

2. **Secrets** (opcional):
   - **Settings** → **Secrets and variables** → **Actions**
   - Adicione `GOOGLE_CHAT_WEBHOOK` (URL do webhook do Google Chat)

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

### Deploy Manual

#### 1. Build local:

```bash
npm run build
```

#### 2. Build Docker:

```bash
docker build -t itbi-web .
```

#### 3. Push para registry (opcional):

```bash
docker tag itbi-web:latest seu-registry/itbi-web:latest
docker push seu-registry/itbi-web:latest
```

#### 4. Executar em produção:

```bash
docker run -d -p 80:80 \
  -e API_URL=https://api.itbi.producao.com.br/api \
  --name itbi-web-prod \
  --restart unless-stopped \
  itbi-web:latest
```

### Deploy Automático (GitHub Actions)

1. Faça push na branch `main`:
```bash
git add .
git commit -m "Deploy"
git push origin main
```

2. Acompanhe o pipeline:
   - Vá em **Actions** no GitHub
   - Veja o pipeline rodando

3. Após sucesso, baixe e execute:
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
├── src/
│   ├── app/
│   │   ├── components/           # Componentes reutilizáveis
│   │   ├── layouts/               # Layouts (público/privado)
│   │   ├── pages/                 # Páginas da aplicação
│   │   ├── services/              # Services (API, etc)
│   │   ├── app.config.ts          # Configuração da aplicação
│   │   └── app.routes.ts          # Rotas
│   ├── environments/
│   │   ├── environment.ts        # Dev local
│   │   ├── environment.develop.ts # Desenvolvimento
│   │   └── environment.prod.ts    # Produção
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── public/                        # Assets estáticos
├── .dockerignore                  # Arquivos ignorados no Docker
├── Dockerfile                     # Build multi-stage
├── build.Dockerfile               # Builder para Jenkins
├── Jenkinsfile                    # Pipeline Jenkins
├── nginx.conf                     # Configuração nginx
├── environment.sh                 # Script de substituição de URLs
├── angular.json                   # Configuração Angular
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

- [Angular CLI Overview](https://angular.dev/tools/cli)
- [GovBR-DS](https://gov.br/ds) - Design System do Governo
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Jenkins Pipeline](https://www.jenkins.io/doc/book/pipeline/)

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
