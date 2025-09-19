const { IBGELocalidades } = require('../dist/index');

async function exemploBasico() {
  const ibge = new IBGELocalidades();

  try {
    console.log('=== Exemplo de uso da SDK IBGE Localidades ===\n');

    // Buscar todos os estados
    console.log('1. Buscando todos os estados...');
    const estados = await ibge.estados.getAll();
    console.log(`Encontrados ${estados.length} estados`);
    console.log('Primeiros 3 estados:', estados.slice(0, 3).map(e => `${e.nome} (${e.sigla})`));
    console.log('');

    // Buscar estado específico
    console.log('2. Buscando estado de São Paulo...');
    const estadoSP = await ibge.estados.getByUF('SP');
    console.log(`Estado: ${estadoSP.nome} (${estadoSP.sigla})`);
    console.log(`Região: ${estadoSP.regiao.nome}`);
    console.log('');

    // Buscar municípios de SP
    console.log('3. Buscando municípios de São Paulo...');
    const municipiosSP = await ibge.municipios.getByEstado('SP');
    console.log(`Encontrados ${municipiosSP.length} municípios em SP`);
    console.log('Primeiros 5 municípios:', municipiosSP.slice(0, 5).map(m => m.nome));
    console.log('');

    // Buscar regiões
    console.log('4. Buscando todas as regiões...');
    const regioes = await ibge.regioes.getAll();
    console.log('Regiões do Brasil:', regioes.map(r => r.nome));
    console.log('');

    // Buscar municípios da região Sul
    console.log('5. Buscando municípios da região Sul...');
    const municipiosSul = await ibge.municipios.getByRegiaoSigla('S');
    console.log(`Encontrados ${municipiosSul.length} municípios na região Sul`);
    console.log('');

    // Buscar mesorregiões de SP
    console.log('6. Buscando mesorregiões de São Paulo...');
    const mesorregioesSP = await ibge.mesorregioes.getByEstado('SP');
    console.log(`Encontradas ${mesorregioesSP.length} mesorregiões em SP`);
    console.log('Mesorregiões:', mesorregioesSP.map(m => m.nome));
    console.log('');

    console.log('=== Exemplo concluído com sucesso! ===');

  } catch (error) {
    console.error('Erro ao executar exemplo:', error.message);
  }
}

// Executar exemplo
exemploBasico();
