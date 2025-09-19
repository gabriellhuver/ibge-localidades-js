# Exemplos Práticos - IBGE Localidades SDK (Unofficial)

Esta documentação contém exemplos práticos de uso do SDK não-oficial para diferentes cenários comuns.

⚠️ **Aviso**: Este é um SDK não-oficial desenvolvido pela comunidade. Não é mantido ou endossado pelo IBGE.

## 📊 Fonte dos Dados

Este SDK consome dados diretamente da **API oficial do IBGE**:

- **URL Base**: `https://servicodados.ibge.gov.br/api/v1/localidades`
- **Documentação Oficial**: [servicodados.ibge.gov.br/api/docs/localidades](https://servicodados.ibge.gov.br/api/docs/localidades)
- **Fonte dos Dados**: Instituto Brasileiro de Geografia e Estatística (IBGE)
- **Atualização**: Os dados são atualizados conforme a API oficial do IBGE

## Índice

- [Exemplos Básicos](#exemplos-básicos)
- [Exemplos Intermediários](#exemplos-intermediários)
- [Exemplos Avançados](#exemplos-avançados)
- [Casos de Uso Reais](#casos-de-uso-reais)

## Exemplos Básicos

### 1. Listar todos os estados do Brasil

```typescript
import { IBGELocalidades } from 'ibge-localidades-sdk';

const ibge = new IBGELocalidades();

async function listarEstados() {
  try {
    const estados = await ibge.estados.getAll();
    
    console.log(`Total de estados: ${estados.length}`);
    
    estados.forEach(estado => {
      console.log(`${estado.sigla} - ${estado.nome} (${estado.regiao.nome})`);
    });
  } catch (error) {
    console.error('Erro ao buscar estados:', error);
  }
}

listarEstados();
```

### 2. Buscar informações de um estado específico

```typescript
import { IBGELocalidades } from 'ibge-localidades-sdk';

const ibge = new IBGELocalidades();

async function buscarEstado() {
  try {
    // Buscar por ID
    const estado = await ibge.estados.getById(35);
    console.log('Estado por ID:', estado.nome);
    
    // Buscar por UF
    const estadoUF = await ibge.estados.getByUF('SP');
    console.log('Estado por UF:', estadoUF[0].nome);
  } catch (error) {
    console.error('Erro ao buscar estado:', error);
  }
}

buscarEstado();
```

### 3. Listar municípios de um estado

```typescript
import { IBGELocalidades } from 'ibge-localidades-sdk';

const ibge = new IBGELocalidades();

async function listarMunicipiosEstado() {
  try {
    const municipios = await ibge.municipios.getByEstado('SP');
    
    console.log(`Total de municípios em SP: ${municipios.length}`);
    
    // Mostrar os primeiros 10 municípios
    municipios.slice(0, 10).forEach(municipio => {
      console.log(`- ${municipio.nome}`);
    });
  } catch (error) {
    console.error('Erro ao buscar municípios:', error);
  }
}

listarMunicipiosEstado();
```

## Exemplos Intermediários

### 4. Buscar informações completas de um município

```typescript
import { IBGELocalidades } from 'ibge-localidades-sdk';

const ibge = new IBGELocalidades();

async function buscarInformacoesCompletasMunicipio() {
  try {
    const municipio = await ibge.municipios.getById(3550308); // São Paulo
    
    console.log('=== Informações do Município ===');
    console.log(`Nome: ${municipio.nome}`);
    console.log(`ID: ${municipio.id}`);
    console.log(`Estado: ${municipio.microrregiao.mesorregiao.UF.nome}`);
    console.log(`UF: ${municipio.microrregiao.mesorregiao.UF.sigla}`);
    console.log(`Região: ${municipio.microrregiao.mesorregiao.UF.regiao.nome}`);
    console.log(`Microrregião: ${municipio.microrregiao.nome}`);
    console.log(`Mesorregião: ${municipio.microrregiao.mesorregiao.nome}`);
    console.log(`Região Imediata: ${municipio['regiao-imediata'].nome}`);
    console.log(`Região Intermediária: ${municipio['regiao-intermediaria'].nome}`);
  } catch (error) {
    console.error('Erro ao buscar município:', error);
  }
}

buscarInformacoesCompletasMunicipio();
```

### 5. Agrupar municípios por região

```typescript
import { IBGELocalidades } from 'ibge-localidades-sdk';

const ibge = new IBGELocalidades();

async function agruparMunicipiosPorRegiao() {
  try {
    const municipios = await ibge.municipios.getAll();
    
    // Agrupar por região
    const municipiosPorRegiao = municipios.reduce((acc, municipio) => {
      const regiao = municipio.microrregiao.mesorregiao.UF.regiao.nome;
      if (!acc[regiao]) acc[regiao] = [];
      acc[regiao].push(municipio.nome);
      return acc;
    }, {} as Record<string, string[]>);
    
    console.log('=== Municípios por Região ===');
    Object.entries(municipiosPorRegiao).forEach(([regiao, nomes]) => {
      console.log(`${regiao}: ${nomes.length} municípios`);
    });
  } catch (error) {
    console.error('Erro ao agrupar municípios:', error);
  }
}

agruparMunicipiosPorRegiao();
```

### 6. Buscar distritos de um município

```typescript
import { IBGELocalidades } from 'ibge-localidades-sdk';

const ibge = new IBGELocalidades();

async function buscarDistritosMunicipio() {
  try {
    const distritos = await ibge.distritos.getByMunicipio(3550308); // São Paulo
    
    console.log(`Distritos de São Paulo: ${distritos.length}`);
    
    distritos.forEach(distrito => {
      console.log(`- ${distrito.nome} (ID: ${distrito.id})`);
    });
  } catch (error) {
    console.error('Erro ao buscar distritos:', error);
  }
}

buscarDistritosMunicipio();
```

### 7. Listar mesorregiões de um estado

```typescript
import { IBGELocalidades } from 'ibge-localidades-sdk';

const ibge = new IBGELocalidades();

async function listarMesorregioesEstado() {
  try {
    const mesorregioes = await ibge.mesorregioes.getByEstado('SP');
    
    console.log(`Mesorregiões de São Paulo: ${mesorregioes.length}`);
    
    mesorregioes.forEach(mesorregiao => {
      console.log(`- ${mesorregiao.nome} (ID: ${mesorregiao.id})`);
    });
  } catch (error) {
    console.error('Erro ao buscar mesorregiões:', error);
  }
}

listarMesorregioesEstado();
```

## Exemplos Avançados

### 8. Criar um mapa hierárquico de localidades

```typescript
import { IBGELocalidades } from 'ibge-localidades-sdk';

const ibge = new IBGELocalidades();

interface LocalidadeHierarquica {
  regiao: string;
  estados: {
    sigla: string;
    nome: string;
    mesorregioes: {
      nome: string;
      microrregioes: {
        nome: string;
        municipios: string[];
      }[];
    }[];
  }[];
}

async function criarMapaHierarquico(): Promise<LocalidadeHierarquica[]> {
  try {
    const regioes = await ibge.regioes.getAll();
    const mapa: LocalidadeHierarquica[] = [];
    
    for (const regiao of regioes) {
      const estados = await ibge.estados.getByRegiao(regiao.sigla);
      const estadosComDetalhes = [];
      
      for (const estado of estados) {
        const mesorregioes = await ibge.mesorregioes.getByEstado(estado.sigla);
        const mesorregioesComDetalhes = [];
        
        for (const mesorregiao of mesorregioes) {
          const microrregioes = await ibge.microrregioes.getByMesorregiao(mesorregiao.id);
          const microrregioesComDetalhes = [];
          
          for (const microrregiao of microrregioes) {
            const municipios = await ibge.municipios.getByMicrorregiao(microrregiao.id);
            microrregioesComDetalhes.push({
              nome: microrregiao.nome,
              municipios: municipios.map(m => m.nome)
            });
          }
          
          mesorregioesComDetalhes.push({
            nome: mesorregiao.nome,
            microrregioes: microrregioesComDetalhes
          });
        }
        
        estadosComDetalhes.push({
          sigla: estado.sigla,
          nome: estado.nome,
          mesorregioes: mesorregioesComDetalhes
        });
      }
      
      mapa.push({
        regiao: regiao.nome,
        estados: estadosComDetalhes
      });
    }
    
    return mapa;
  } catch (error) {
    console.error('Erro ao criar mapa hierárquico:', error);
    return [];
  }
}

// Uso do mapa hierárquico
async function usarMapaHierarquico() {
  const mapa = await criarMapaHierarquico();
  
  console.log('=== Mapa Hierárquico do Brasil ===');
  mapa.forEach(regiao => {
    console.log(`\n${regiao.regiao}:`);
    regiao.estados.forEach(estado => {
      console.log(`  ${estado.sigla} - ${estado.nome}:`);
      estado.mesorregioes.forEach(mesorregiao => {
        console.log(`    ${mesorregiao.nome}:`);
        mesorregiao.microrregioes.forEach(microrregiao => {
          console.log(`      ${microrregiao.nome} (${microrregiao.municipios.length} municípios)`);
        });
      });
    });
  });
}

usarMapaHierarquico();
```

### 9. Buscar aglomerações urbanas e seus municípios

```typescript
import { IBGELocalidades } from 'ibge-localidades-sdk';

const ibge = new IBGELocalidades();

async function buscarAglomeracoesUrbanas() {
  try {
    const aglomeracoes = await ibge.aglomeracoesUrbanas.getAll();
    
    console.log(`Total de aglomerações urbanas: ${aglomeracoes.length}`);
    
    aglomeracoes.forEach(aglomeracao => {
      console.log(`\n${aglomeracao.nome} (ID: ${aglomeracao.id}):`);
      console.log(`  Municípios: ${aglomeracao.municipios.length}`);
      
      aglomeracao.municipios.forEach(municipio => {
        console.log(`    - ${municipio.nome} (${municipio.microrregiao.mesorregiao.UF.sigla})`);
      });
    });
  } catch (error) {
    console.error('Erro ao buscar aglomerações urbanas:', error);
  }
}

buscarAglomeracoesUrbanas();
```

### 10. Análise estatística de municípios por estado

```typescript
import { IBGELocalidades } from 'ibge-localidades-sdk';

const ibge = new IBGELocalidades();

interface EstatisticasEstado {
  sigla: string;
  nome: string;
  totalMunicipios: number;
  totalMesorregioes: number;
  totalMicrorregioes: number;
  regiao: string;
}

async function analisarEstatisticasEstados(): Promise<EstatisticasEstado[]> {
  try {
    const estados = await ibge.estados.getAll();
    const estatisticas: EstatisticasEstado[] = [];
    
    for (const estado of estados) {
      const [municipios, mesorregioes, microrregioes] = await Promise.all([
        ibge.municipios.getByEstado(estado.sigla),
        ibge.mesorregioes.getByEstado(estado.sigla),
        ibge.microrregioes.getByEstado(estado.sigla)
      ]);
      
      estatisticas.push({
        sigla: estado.sigla,
        nome: estado.nome,
        totalMunicipios: municipios.length,
        totalMesorregioes: mesorregioes.length,
        totalMicrorregioes: microrregioes.length,
        regiao: estado.regiao.nome
      });
    }
    
    return estatisticas.sort((a, b) => b.totalMunicipios - a.totalMunicipios);
  } catch (error) {
    console.error('Erro ao analisar estatísticas:', error);
    return [];
  }
}

// Uso da análise estatística
async function usarAnaliseEstatistica() {
  const estatisticas = await analisarEstatisticasEstados();
  
  console.log('=== Estatísticas dos Estados ===');
  console.log('Ranking por número de municípios:');
  
  estatisticas.forEach((estado, index) => {
    console.log(`${index + 1}. ${estado.sigla} - ${estado.nome}`);
    console.log(`   Região: ${estado.regiao}`);
    console.log(`   Municípios: ${estado.totalMunicipios}`);
    console.log(`   Mesorregiões: ${estado.totalMesorregioes}`);
    console.log(`   Microrregiões: ${estado.totalMicrorregioes}`);
    console.log('');
  });
}

usarAnaliseEstatistica();
```

## Casos de Uso Reais

### 11. Sistema de busca de CEP por localidade

```typescript
import { IBGELocalidades } from 'ibge-localidades-sdk';

const ibge = new IBGELocalidades();

class BuscadorCEP {
  private ibge: IBGELocalidades;
  
  constructor() {
    this.ibge = new IBGELocalidades();
  }
  
  async buscarPorMunicipio(nomeMunicipio: string, uf?: string) {
    try {
      let municipios;
      
      if (uf) {
        municipios = await this.ibge.municipios.getByEstado(uf);
      } else {
        municipios = await this.ibge.municipios.getAll();
      }
      
      const municipioEncontrado = municipios.find(m => 
        m.nome.toLowerCase().includes(nomeMunicipio.toLowerCase())
      );
      
      if (municipioEncontrado) {
        return {
          municipio: municipioEncontrado.nome,
          estado: municipioEncontrado.microrregiao.mesorregiao.UF.nome,
          uf: municipioEncontrado.microrregiao.mesorregiao.UF.sigla,
          regiao: municipioEncontrado.microrregiao.mesorregiao.UF.regiao.nome,
          microrregiao: municipioEncontrado.microrregiao.nome,
          mesorregiao: municipioEncontrado.microrregiao.mesorregiao.nome
        };
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao buscar município:', error);
      return null;
    }
  }
  
  async buscarPorEstado(uf: string) {
    try {
      const estado = await this.ibge.estados.getByUF(uf);
      
      if (estado.length > 0) {
        const municipios = await this.ibge.municipios.getByEstado(uf);
        
        return {
          estado: estado[0].nome,
          uf: estado[0].sigla,
          regiao: estado[0].regiao.nome,
          totalMunicipios: municipios.length
        };
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao buscar estado:', error);
      return null;
    }
  }
}

// Uso do buscador de CEP
async function usarBuscadorCEP() {
  const buscador = new BuscadorCEP();
  
  // Buscar município específico
  const resultado = await buscador.buscarPorMunicipio('São Paulo', 'SP');
  if (resultado) {
    console.log('Município encontrado:', resultado);
  }
  
  // Buscar informações do estado
  const estado = await buscador.buscarPorEstado('SP');
  if (estado) {
    console.log('Estado encontrado:', estado);
  }
}

usarBuscadorCEP();
```

### 12. Gerador de relatórios geográficos

```typescript
import { IBGELocalidades } from 'ibge-localidades-sdk';

const ibge = new IBGELocalidades();

class GeradorRelatorios {
  private ibge: IBGELocalidades;
  
  constructor() {
    this.ibge = new IBGELocalidades();
  }
  
  async gerarRelatorioRegiao(siglaRegiao: string) {
    try {
      const [regiao, estados, municipios] = await Promise.all([
        this.ibge.regioes.getBySigla(siglaRegiao),
        this.ibge.estados.getByRegiao(siglaRegiao),
        this.ibge.municipios.getByRegiaoSigla(siglaRegiao)
      ]);
      
      const relatorio = {
        regiao: regiao[0].nome,
        sigla: regiao[0].sigla,
        totalEstados: estados.length,
        totalMunicipios: municipios.length,
        estados: estados.map(estado => ({
          sigla: estado.sigla,
          nome: estado.nome,
          municipios: municipios.filter(m => 
            m.microrregiao.mesorregiao.UF.sigla === estado.sigla
          ).length
        }))
      };
      
      return relatorio;
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      return null;
    }
  }
  
  async gerarRelatorioEstado(uf: string) {
    try {
      const [estado, municipios, mesorregioes, microrregioes] = await Promise.all([
        this.ibge.estados.getByUF(uf),
        this.ibge.municipios.getByEstado(uf),
        this.ibge.mesorregioes.getByEstado(uf),
        this.ibge.microrregioes.getByEstado(uf)
      ]);
      
      const relatorio = {
        estado: estado[0].nome,
        uf: estado[0].sigla,
        regiao: estado[0].regiao.nome,
        totalMunicipios: municipios.length,
        totalMesorregioes: mesorregioes.length,
        totalMicrorregioes: microrregioes.length,
        mesorregioes: mesorregioes.map(mesorregiao => ({
          nome: mesorregiao.nome,
          municipios: municipios.filter(m => 
            m.microrregiao.mesorregiao.id === mesorregiao.id
          ).length
        }))
      };
      
      return relatorio;
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      return null;
    }
  }
}

// Uso do gerador de relatórios
async function usarGeradorRelatorios() {
  const gerador = new GeradorRelatorios();
  
  // Relatório da região Sudeste
  const relatorioRegiao = await gerador.gerarRelatorioRegiao('SE');
  if (relatorioRegiao) {
    console.log('=== Relatório da Região Sudeste ===');
    console.log(`Região: ${relatorioRegiao.regiao}`);
    console.log(`Estados: ${relatorioRegiao.totalEstados}`);
    console.log(`Municípios: ${relatorioRegiao.totalMunicipios}`);
    console.log('\nEstados:');
    relatorioRegiao.estados.forEach(estado => {
      console.log(`  ${estado.sigla} - ${estado.nome}: ${estado.municipios} municípios`);
    });
  }
  
  // Relatório do estado de São Paulo
  const relatorioEstado = await gerador.gerarRelatorioEstado('SP');
  if (relatorioEstado) {
    console.log('\n=== Relatório do Estado de São Paulo ===');
    console.log(`Estado: ${relatorioEstado.estado}`);
    console.log(`Região: ${relatorioEstado.regiao}`);
    console.log(`Municípios: ${relatorioEstado.totalMunicipios}`);
    console.log(`Mesorregiões: ${relatorioEstado.totalMesorregioes}`);
    console.log(`Microrregiões: ${relatorioEstado.totalMicrorregioes}`);
  }
}

usarGeradorRelatorios();
```

### 13. Validador de localidades

```typescript
import { IBGELocalidades } from 'ibge-localidades-sdk';

const ibge = new IBGELocalidades();

class ValidadorLocalidades {
  private ibge: IBGELocalidades;
  
  constructor() {
    this.ibge = new IBGELocalidades();
  }
  
  async validarMunicipio(nomeMunicipio: string, uf: string): Promise<boolean> {
    try {
      const municipios = await this.ibge.municipios.getByEstado(uf);
      return municipios.some(m => m.nome === nomeMunicipio);
    } catch (error) {
      console.error('Erro ao validar município:', error);
      return false;
    }
  }
  
  async validarEstado(uf: string): Promise<boolean> {
    try {
      const estados = await this.ibge.estados.getByUF(uf);
      return estados.length > 0;
    } catch (error) {
      console.error('Erro ao validar estado:', error);
      return false;
    }
  }
  
  async validarRegiao(siglaRegiao: string): Promise<boolean> {
    try {
      const regioes = await this.ibge.regioes.getBySigla(siglaRegiao as any);
      return regioes.length > 0;
    } catch (error) {
      console.error('Erro ao validar região:', error);
      return false;
    }
  }
  
  async obterInformacoesCompletas(nomeMunicipio: string, uf: string) {
    try {
      const municipios = await this.ibge.municipios.getByEstado(uf);
      const municipio = municipios.find(m => m.nome === nomeMunicipio);
      
      if (municipio) {
        return {
          valido: true,
          municipio: {
            id: municipio.id,
            nome: municipio.nome,
            estado: municipio.microrregiao.mesorregiao.UF.nome,
            uf: municipio.microrregiao.mesorregiao.UF.sigla,
            regiao: municipio.microrregiao.mesorregiao.UF.regiao.nome,
            microrregiao: municipio.microrregiao.nome,
            mesorregiao: municipio.microrregiao.mesorregiao.nome
          }
        };
      }
      
      return { valido: false, municipio: null };
    } catch (error) {
      console.error('Erro ao obter informações:', error);
      return { valido: false, municipio: null };
    }
  }
}

// Uso do validador
async function usarValidador() {
  const validador = new ValidadorLocalidades();
  
  // Validar município
  const municipioValido = await validador.validarMunicipio('São Paulo', 'SP');
  console.log('São Paulo/SP é válido:', municipioValido);
  
  // Validar estado
  const estadoValido = await validador.validarEstado('SP');
  console.log('SP é válido:', estadoValido);
  
  // Validar região
  const regiaoValida = await validador.validarRegiao('SE');
  console.log('SE é válida:', regiaoValida);
  
  // Obter informações completas
  const info = await validador.obterInformacoesCompletas('São Paulo', 'SP');
  if (info.valido) {
    console.log('Informações do município:', info.municipio);
  }
}

usarValidador();
```

## Dicas e Boas Práticas

### 1. Tratamento de Erros

```typescript
async function exemploTratamentoErros() {
  try {
    const municipios = await ibge.municipios.getByEstado('SP');
    // Processar dados
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro específico:', error.message);
    } else {
      console.error('Erro desconhecido:', error);
    }
  }
}
```

### 2. Cache de Dados

```typescript
class CacheLocalidades {
  private cache = new Map<string, any>();
  
  async buscarComCache<T>(chave: string, funcao: () => Promise<T>): Promise<T> {
    if (this.cache.has(chave)) {
      return this.cache.get(chave);
    }
    
    const resultado = await funcao();
    this.cache.set(chave, resultado);
    return resultado;
  }
}

const cache = new CacheLocalidades();

async function exemploComCache() {
  const municipios = await cache.buscarComCache(
    'municipios-sp',
    () => ibge.municipios.getByEstado('SP')
  );
}
```

### 3. Paginação de Resultados

```typescript
async function exemploPaginacao() {
  const municipios = await ibge.municipios.getAll();
  const itensPorPagina = 50;
  const pagina = 1;
  
  const inicio = (pagina - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const municipiosPagina = municipios.slice(inicio, fim);
  
  console.log(`Página ${pagina} de ${Math.ceil(municipios.length / itensPorPagina)}`);
  console.log(`Mostrando ${municipiosPagina.length} de ${municipios.length} municípios`);
}
```

### 4. Filtros Personalizados

```typescript
function filtrarMunicipios(municipios: any[], filtro: string) {
  return municipios.filter(municipio => 
    municipio.nome.toLowerCase().includes(filtro.toLowerCase())
  );
}

async function exemploFiltros() {
  const municipios = await ibge.municipios.getByEstado('SP');
  const municipiosFiltrados = filtrarMunicipios(municipios, 'são');
  
  console.log(`Municípios com "são" no nome: ${municipiosFiltrados.length}`);
}
```

Estes exemplos demonstram como usar o SDK em diferentes cenários práticos, desde operações básicas até casos de uso complexos e aplicações reais.
