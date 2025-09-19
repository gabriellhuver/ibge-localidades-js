# IBGE Localidades SDK

[![npm version](https://badge.fury.io/js/ibge-localidades-sdk.svg)](https://badge.fury.io/js/ibge-localidades-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/gabriellhuver/ibge-localidades-js/workflows/CI/badge.svg)](https://github.com/gabriellhuver/ibge-localidades-js/actions)

SDK não-oficial em TypeScript/JavaScript para a API de Localidades do IBGE (Instituto Brasileiro de Geografia e Estatística). Este SDK fornece acesso fácil e tipado a todos os dados geográficos e administrativos do Brasil.

## 📋 Índice

- [Instalação](#instalação)
- [Uso Básico](#uso-básico)
- [API Reference](#api-reference)
- [Exemplos](#exemplos)
- [Tipos TypeScript](#tipos-typescript)
- [Deploy e CI/CD](#deploy-e-cicd)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🚀 Instalação

```bash
npm install ibge-localidades-sdk
```

ou

```bash
yarn add ibge-localidades-sdk
```

## 📖 Uso Básico

```typescript
import { IBGELocalidades } from 'ibge-localidades-sdk';

const ibge = new IBGELocalidades();

// Buscar todos os estados
const estados = await ibge.estados.getAll();

// Buscar municípios de São Paulo
const municipiosSP = await ibge.municipios.getByEstado('SP');

// Buscar informações de um município específico
const saoPaulo = await ibge.municipios.getById(3550308);
```

## 🔧 API Reference

### Estados

```typescript
// Buscar todos os estados
const estados = await ibge.estados.getAll();

// Buscar estado por ID
const estado = await ibge.estados.getById(35); // São Paulo

// Buscar estado por UF
const estado = await ibge.estados.getByUF('SP');

// Buscar estados por região
const estadosSul = await ibge.estados.getByRegiao('S');
```

### Municípios

```typescript
// Buscar todos os municípios
const municipios = await ibge.municipios.getAll();

// Buscar município por ID
const municipio = await ibge.municipios.getById(3550308); // São Paulo

// Buscar municípios por estado
const municipiosSP = await ibge.municipios.getByEstado('SP');

// Buscar municípios por região
const municipiosSul = await ibge.municipios.getByRegiaoSigla('S');

// Buscar municípios por mesorregião
const municipios = await ibge.municipios.getByMesorregiao(3501);

// Buscar municípios por microrregião
const municipios = await ibge.municipios.getByMicrorregiao(35001);

// Buscar municípios por região intermediária
const municipios = await ibge.municipios.getByRegiaoIntermediaria(3501);

// Buscar municípios por região imediata
const municipios = await ibge.municipios.getByRegiaoImediata(350001);
```

### Regiões

```typescript
// Buscar todas as regiões
const regioes = await ibge.regioes.getAll();

// Buscar região por ID
const regiao = await ibge.regioes.getById(3); // Sudeste

// Buscar região por sigla
const regiao = await ibge.regioes.getBySigla('SE');
```

### Mesorregiões

```typescript
// Buscar todas as mesorregiões
const mesorregioes = await ibge.mesorregioes.getAll();

// Buscar mesorregião por ID
const mesorregiao = await ibge.mesorregioes.getById(3501);

// Buscar mesorregiões por estado
const mesorregioes = await ibge.mesorregioes.getByEstado('SP');

// Buscar mesorregiões por região
const mesorregioes = await ibge.mesorregioes.getByRegiao('SE');
```

### Microrregiões

```typescript
// Buscar todas as microrregiões
const microrregioes = await ibge.microrregioes.getAll();

// Buscar microrregião por ID
const microrregiao = await ibge.microrregioes.getById(35001);

// Buscar microrregiões por estado
const microrregioes = await ibge.microrregioes.getByEstado('SP');

// Buscar microrregiões por região
const microrregioes = await ibge.microrregioes.getByRegiao('SE');
```

### Regiões Intermediárias

```typescript
// Buscar todas as regiões intermediárias
const regioesIntermediarias = await ibge.regioesIntermediarias.getAll();

// Buscar região intermediária por ID
const regiaoIntermediaria = await ibge.regioesIntermediarias.getById(3501);

// Buscar regiões intermediárias por estado
const regioesIntermediarias = await ibge.regioesIntermediarias.getByEstado('SP');

// Buscar regiões intermediárias por região
const regioesIntermediarias = await ibge.regioesIntermediarias.getByRegiao('SE');
```

### Regiões Imediatas

```typescript
// Buscar todas as regiões imediatas
const regioesImediatas = await ibge.regioesImediatas.getAll();

// Buscar região imediata por ID
const regiaoImediata = await ibge.regioesImediatas.getById(350001);

// Buscar regiões imediatas por estado
const regioesImediatas = await ibge.regioesImediatas.getByEstado('SP');

// Buscar regiões imediatas por região
const regioesImediatas = await ibge.regioesImediatas.getByRegiao('SE');

// Buscar regiões imediatas por região intermediária
const regioesImediatas = await ibge.regioesImediatas.getByRegiaoIntermediaria(3501);
```

### Distritos

```typescript
// Buscar todos os distritos
const distritos = await ibge.distritos.getAll();

// Buscar distrito por ID
const distritos = await ibge.distritos.getById(520005005);

// Buscar distritos por estado
const distritos = await ibge.distritos.getByEstado('SP');

// Buscar distritos por município
const distritos = await ibge.distritos.getByMunicipio(3550308);

// Buscar distritos por mesorregião
const distritos = await ibge.distritos.getByMesorregiao(3501);

// Buscar distritos por microrregião
const distritos = await ibge.distritos.getByMicrorregiao(35001);

// Buscar distritos por região imediata
const distritos = await ibge.distritos.getByRegiaoImediata(350001);

// Buscar distritos por região intermediária
const distritos = await ibge.distritos.getByRegiaoIntermediaria(3501);

// Buscar distritos por região
const distritos = await ibge.distritos.getByRegiao('SE');
```

### Subdistritos

```typescript
// Buscar todos os subdistritos
const subdistritos = await ibge.subdistritos.getAll();

// Buscar subdistrito por ID
const subdistritos = await ibge.subdistritos.getById(43004060506);

// Buscar subdistritos por estado
const subdistritos = await ibge.subdistritos.getByEstado('SP');

// Buscar subdistritos por município
const subdistritos = await ibge.subdistritos.getByMunicipio(3550308);

// Buscar subdistritos por distrito
const subdistritos = await ibge.subdistritos.getByDistrito(520005005);

// Buscar subdistritos por mesorregião
const subdistritos = await ibge.subdistritos.getByMesorregiao(3501);

// Buscar subdistritos por microrregião
const subdistritos = await ibge.subdistritos.getByMicrorregiao(35001);

// Buscar subdistritos por região imediata
const subdistritos = await ibge.subdistritos.getByRegiaoImediata(350001);

// Buscar subdistritos por região intermediária
const subdistritos = await ibge.subdistritos.getByRegiaoIntermediaria(3501);

// Buscar subdistritos por região
const subdistritos = await ibge.subdistritos.getByRegiao('SE');
```

### Aglomerações Urbanas

```typescript
// Buscar todas as aglomerações urbanas
const aglomeracoes = await ibge.aglomeracoesUrbanas.getAll();

// Buscar aglomeração urbana por ID
const aglomeracoes = await ibge.aglomeracoesUrbanas.getById(301);
```

### Países

```typescript
// Buscar todos os países
const paises = await ibge.paises.getAll();

// Buscar país por ID
const paises = await ibge.paises.getById(76); // Brasil
```

## 📝 Exemplos

### Exemplo 1: Buscar informações completas de um município

```typescript
import { IBGELocalidades } from 'ibge-localidades-sdk';

const ibge = new IBGELocalidades();

async function buscarInformacoesMunicipio() {
  try {
    // Buscar município de São Paulo
    const municipio = await ibge.municipios.getById(3550308);
    
    console.log('Nome:', municipio.nome);
    console.log('ID:', municipio.id);
    console.log('Estado:', municipio.microrregiao.mesorregiao.UF.nome);
    console.log('UF:', municipio.microrregiao.mesorregiao.UF.sigla);
    console.log('Região:', municipio.microrregiao.mesorregiao.UF.regiao.nome);
    console.log('Microrregião:', municipio.microrregiao.nome);
    console.log('Mesorregião:', municipio.microrregiao.mesorregiao.nome);
    console.log('Região Imediata:', municipio['regiao-imediata'].nome);
    console.log('Região Intermediária:', municipio['regiao-intermediaria'].nome);
  } catch (error) {
    console.error('Erro ao buscar município:', error);
  }
}
```

### Exemplo 2: Listar todos os municípios de uma região

```typescript
import { IBGELocalidades } from 'ibge-localidades-sdk';

const ibge = new IBGELocalidades();

async function listarMunicipiosRegiao() {
  try {
    // Buscar todos os municípios da região Sul
    const municipios = await ibge.municipios.getByRegiaoSigla('S');
    
    console.log(`Total de municípios na região Sul: ${municipios.length}`);
    
    // Agrupar por estado
    const municipiosPorEstado = municipios.reduce((acc, municipio) => {
      const uf = municipio.microrregiao.mesorregiao.UF.sigla;
      if (!acc[uf]) acc[uf] = [];
      acc[uf].push(municipio.nome);
      return acc;
    }, {} as Record<string, string[]>);
    
    Object.entries(municipiosPorEstado).forEach(([uf, nomes]) => {
      console.log(`${uf}: ${nomes.length} municípios`);
    });
  } catch (error) {
    console.error('Erro ao buscar municípios:', error);
  }
}
```

### Exemplo 3: Buscar distritos de um município

```typescript
import { IBGELocalidades } from 'ibge-localidades-sdk';

const ibge = new IBGELocalidades();

async function buscarDistritosMunicipio() {
  try {
    // Buscar distritos de São Paulo
    const distritos = await ibge.distritos.getByMunicipio(3550308);
    
    console.log(`Distritos de São Paulo: ${distritos.length}`);
    
    distritos.forEach(distrito => {
      console.log(`- ${distrito.nome} (ID: ${distrito.id})`);
    });
  } catch (error) {
    console.error('Erro ao buscar distritos:', error);
  }
}
```

## 🎯 Tipos TypeScript

O SDK é totalmente tipado e inclui todas as interfaces necessárias:

```typescript
// Principais interfaces
interface Estado {
  id: number;
  nome: string;
  sigla: string;
  regiao: Regiao;
}

interface Municipio {
  id: number;
  nome: string;
  microrregiao: Microrregiao;
  'regiao-imediata': RegiaoImediata;
  'regiao-intermediaria': RegiaoIntermediaria;
}

interface Regiao {
  id: number;
  nome: string;
  sigla: string;
}

// ... e muitas outras interfaces completas
```

## 🔧 Parâmetros de Query

Todos os métodos que fazem requisições para a API suportam parâmetros opcionais:

```typescript
interface QueryParams {
  orderBy?: string;    // Ordenação dos resultados
  view?: string;       // Visualização dos dados
  municipio?: number;  // Filtro por município (quando aplicável)
}

// Exemplo de uso
const municipios = await ibge.municipios.getAll({
  orderBy: 'nome',
  view: 'nivelado'
});
```

## 🚨 Tratamento de Erros

O SDK trata automaticamente erros de rede e retorna arrays vazios para IDs inválidos:

```typescript
try {
  const municipio = await ibge.municipios.getById(999999999);
  // Retorna array vazio para ID inválido
  console.log(municipio.length); // 0
} catch (error) {
  // Erros de rede são capturados aqui
  console.error('Erro de conexão:', error);
}
```

## 🧪 Testes

O SDK inclui uma suíte completa de testes:

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

## 📊 Cobertura de Testes

- **12 suites de teste** ✅
- **113 testes** ✅
- **100% de cobertura** ✅

## 🚀 Deploy e CI/CD

Este projeto utiliza GitHub Actions para CI/CD automatizado:

### Workflows Disponíveis

- **CI**: Executa testes, linting e build em cada PR
- **NPM Publish**: Deploy automático no NPM quando uma tag é criada

### Deploy Automático

```bash
# Criar nova versão
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0

# Enviar para o GitHub
git push origin main --tags
```

### Status dos Workflows

[![CI](https://github.com/gabriellhuver/ibge-localidades-js/workflows/CI/badge.svg)](https://github.com/gabriellhuver/ibge-localidades-js/actions)
[![NPM Publish](https://github.com/gabriellhuver/ibge-localidades-js/workflows/NPM%20Publish/badge.svg)](https://github.com/gabriellhuver/ibge-localidades-js/actions)

Para mais detalhes sobre deploy, consulte o [Guia de Deploy](./docs/DEPLOY.md).

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um [Pull Request](https://github.com/gabriellhuver/ibge-localidades-js/pulls)

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🔗 Links Úteis

- [API Oficial do IBGE](https://servicodados.ibge.gov.br/api/docs/localidades)
- [Documentação da API](https://servicodados.ibge.gov.br/api/docs/localidades#api-Municipios-estadosUFMunicipiosGet)
- [Repositório no GitHub](https://github.com/gabriellhuver/ibge-localidades-js)

## ⚠️ Aviso Importante

Este é um SDK **não-oficial** desenvolvido pela comunidade. Não é mantido ou endossado pelo IBGE. Para informações oficiais, consulte sempre a [documentação oficial do IBGE](https://servicodados.ibge.gov.br/api/docs/localidades).

## 📊 Fonte dos Dados

Este SDK consome dados diretamente da **API oficial do IBGE**:

- **URL Base**: `https://servicodados.ibge.gov.br/api/v1/localidades`
- **Documentação Oficial**: [servicodados.ibge.gov.br/api/docs/localidades](https://servicodados.ibge.gov.br/api/docs/localidades)
- **Fonte dos Dados**: Instituto Brasileiro de Geografia e Estatística (IBGE)
- **Atualização**: Os dados são atualizados conforme a API oficial do IBGE

### Estrutura da API

```
https://servicodados.ibge.gov.br/api/v1/localidades/
├── /estados
├── /municipios
├── /regioes
├── /mesorregioes
├── /microrregioes
├── /regioes-intermediarias
├── /regioes-imediatas
├── /distritos
├── /subdistritos
├── /aglomeracoes-urbanas
└── /paises
```

### Política de Dados

- ✅ **Dados Públicos**: Todos os dados são de domínio público
- ✅ **Sem Autenticação**: Não requer chaves de API
- ✅ **Rate Limiting**: Respeitamos os limites da API oficial
- ✅ **Caching**: Recomendamos implementar cache em produção

### Como Funciona

O SDK faz requisições HTTP diretas para a API oficial do IBGE:

```typescript
// Exemplo de requisição interna
const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
```

### Estrutura de Resposta

Os dados retornados seguem exatamente a estrutura da API oficial do IBGE:

```json
{
  "id": 35,
  "sigla": "SP",
  "nome": "São Paulo",
  "regiao": {
    "id": 3,
    "sigla": "SE",
    "nome": "Sudeste"
  }
}
```

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique a [documentação da API oficial](https://servicodados.ibge.gov.br/api/docs/localidades)
2. Abra uma [issue no GitHub](https://github.com/gabriellhuver/ibge-localidades-js/issues)
3. Consulte os [exemplos](./examples/) incluídos no projeto

---

**Desenvolvido com ❤️ para a comunidade brasileira de desenvolvedores**