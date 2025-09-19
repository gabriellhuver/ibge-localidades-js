#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Executando todos os testes da SDK IBGE Localidades...\n');

try {
  // Compilar TypeScript primeiro
  console.log('📦 Compilando TypeScript...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('\n✅ Compilação concluída!\n');
  
  // Executar testes
  console.log('🧪 Executando testes...');
  execSync('npm test', { stdio: 'inherit' });
  
  console.log('\n🎉 Todos os testes foram executados com sucesso!');
  
} catch (error) {
  console.error('\n❌ Erro ao executar testes:', error.message);
  process.exit(1);
}
