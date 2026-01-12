#!/bin/bash

# Script para substituir URLs após o build no Netlify

echo "🔧 Configurando variáveis de ambiente..."
echo "📍 Node version: $(node -v)"
echo "📍 NPM version: $(npm -v)"

# Se API_URL estiver definida, substitui o placeholder
if [ -n "$API_URL" ]; then
  echo "✅ Substituindo api.itbi por: $API_URL"
  find dist/itbi/browser -type f -name '*.js' -exec sed -i "s#api\.itbi#$API_URL#g" {} + 2>/dev/null || true
  find dist/itbi/browser -type f -name '*.js' -exec sed -i "s#\"api\.itbi\"#\"$API_URL\"#g" {} + 2>/dev/null || true
  find dist/itbi/browser -type f -name '*.js' -exec sed -i "s#'api\.itbi'#'$API_URL'#g" {} + 2>/dev/null || true
  echo "✅ URLs substituídas com sucesso!"
else
  echo "⚠️  API_URL não definida, usando valor padrão do environment"
fi

# Copiar _redirects para o diretório de build (garantia extra)
if [ -f "_redirects" ]; then
  cp _redirects dist/itbi/browser/
  echo "✅ _redirects copiado para dist/itbi/browser/"
fi

echo "🚀 Build finalizado!"
