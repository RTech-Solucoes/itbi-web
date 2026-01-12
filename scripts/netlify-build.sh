#!/bin/bash

# Script para substituir URLs após o build no Netlify

echo "🔧 Configurando variáveis de ambiente..."

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

echo "🚀 Build finalizado!"
