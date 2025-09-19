# API Reference - IBGE Localidades SDK

Esta documentação fornece uma referência completa de todos os métodos disponíveis no SDK.

## Índice

- [IBGELocalidades](#ibgelocalidades)
- [EstadosService](#estadosservice)
- [MunicipiosService](#municipiosservice)
- [RegioesService](#regioesservice)
- [MesorregioesService](#mesorregioesservice)
- [MicrorregioesService](#microrregioesservice)
- [RegioesIntermediariasService](#regioesintermediariasservice)
- [RegioesImediatasService](#regioesimediatasservice)
- [DistritosService](#distritosservice)
- [SubdistritosService](#subdistritosservice)
- [AglomeracoesUrbanasService](#aglomeracoesurbanasservice)
- [PaisesService](#paisesservice)

## IBGELocalidades

Classe principal que agrupa todos os serviços.

```typescript
import { IBGELocalidades } from 'ibge-localidades-sdk';

const ibge = new IBGELocalidades();
```

### Propriedades

- `estados`: EstadosService
- `municipios`: MunicipiosService
- `regioes`: RegioesService
- `mesorregioes`: MesorregioesService
- `microrregioes`: MicrorregioesService
- `regioesIntermediarias`: RegioesIntermediariasService
- `regioesImediatas`: RegioesImediatasService
- `distritos`: DistritosService
- `subdistritos`: SubdistritosService
- `aglomeracoesUrbanas`: AglomeracoesUrbanasService
- `paises`: PaisesService

## EstadosService

Serviço para operações relacionadas aos Estados.

### Métodos

#### `getAll(params?: QueryParams): Promise<Estado[]>`

Busca todos os estados do Brasil.

**Parâmetros:**
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Estado[]>

**Exemplo:**
```typescript
const estados = await ibge.estados.getAll();
```

#### `getById(id: number, params?: QueryParams): Promise<Estado>`

Busca um estado específico por ID.

**Parâmetros:**
- `id`: ID do estado
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Estado>

**Exemplo:**
```typescript
const estado = await ibge.estados.getById(35); // São Paulo
```

#### `getByUF(uf: string, params?: QueryParams): Promise<Estado[]>`

Busca um estado por sua sigla (UF).

**Parâmetros:**
- `uf`: Sigla do estado (ex: 'SP', 'RJ')
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Estado[]>

**Exemplo:**
```typescript
const estado = await ibge.estados.getByUF('SP');
```

#### `getByRegiao(regiaoId: string | number, params?: QueryParams): Promise<Estado[]>`

Busca estados por região.

**Parâmetros:**
- `regiaoId`: ID ou sigla da região
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Estado[]>

**Exemplo:**
```typescript
const estadosSul = await ibge.estados.getByRegiao('S');
const estadosSudeste = await ibge.estados.getByRegiao(3);
```

## MunicipiosService

Serviço para operações relacionadas aos Municípios.

### Métodos

#### `getAll(params?: QueryParams): Promise<Municipio[]>`

Busca todos os municípios do Brasil.

**Parâmetros:**
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Municipio[]>

**Exemplo:**
```typescript
const municipios = await ibge.municipios.getAll();
```

#### `getById(id: number, params?: QueryParams): Promise<Municipio>`

Busca um município específico por ID.

**Parâmetros:**
- `id`: ID do município
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Municipio>

**Exemplo:**
```typescript
const municipio = await ibge.municipios.getById(3550308); // São Paulo
```

#### `getByEstado(uf: string, params?: QueryParams): Promise<Municipio[]>`

Busca municípios por estado (UF).

**Parâmetros:**
- `uf`: Sigla do estado
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Municipio[]>

**Exemplo:**
```typescript
const municipiosSP = await ibge.municipios.getByEstado('SP');
```

#### `getByRegiaoSigla(sigla: 'N' | 'NE' | 'SE' | 'S' | 'CO', params?: QueryParams): Promise<Municipio[]>`

Busca municípios por região usando sigla.

**Parâmetros:**
- `sigla`: Sigla da região
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Municipio[]>

**Exemplo:**
```typescript
const municipiosSul = await ibge.municipios.getByRegiaoSigla('S');
```

#### `getByMesorregiao(mesorregiaoId: number, params?: QueryParams): Promise<Municipio[]>`

Busca municípios por mesorregião.

**Parâmetros:**
- `mesorregiaoId`: ID da mesorregião
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Municipio[]>

**Exemplo:**
```typescript
const municipios = await ibge.municipios.getByMesorregiao(3501);
```

#### `getByMicrorregiao(microrregiaoId: number, params?: QueryParams): Promise<Municipio[]>`

Busca municípios por microrregião.

**Parâmetros:**
- `microrregiaoId`: ID da microrregião
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Municipio[]>

**Exemplo:**
```typescript
const municipios = await ibge.municipios.getByMicrorregiao(35001);
```

#### `getByRegiaoIntermediaria(regiaoIntermediariaId: number, params?: QueryParams): Promise<Municipio[]>`

Busca municípios por região intermediária.

**Parâmetros:**
- `regiaoIntermediariaId`: ID da região intermediária
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Municipio[]>

**Exemplo:**
```typescript
const municipios = await ibge.municipios.getByRegiaoIntermediaria(3501);
```

#### `getByRegiaoImediata(regiaoImediataId: number, params?: QueryParams): Promise<Municipio[]>`

Busca municípios por região imediata.

**Parâmetros:**
- `regiaoImediataId`: ID da região imediata
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Municipio[]>

**Exemplo:**
```typescript
const municipios = await ibge.municipios.getByRegiaoImediata(350001);
```

## RegioesService

Serviço para operações relacionadas às Regiões.

### Métodos

#### `getAll(params?: QueryParams): Promise<Regiao[]>`

Busca todas as regiões do Brasil.

**Parâmetros:**
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Regiao[]>

**Exemplo:**
```typescript
const regioes = await ibge.regioes.getAll();
```

#### `getById(id: number, params?: QueryParams): Promise<Regiao>`

Busca uma região específica por ID.

**Parâmetros:**
- `id`: ID da região
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Regiao>

**Exemplo:**
```typescript
const regiao = await ibge.regioes.getById(3); // Sudeste
```

#### `getBySigla(sigla: 'N' | 'NE' | 'SE' | 'S' | 'CO', params?: QueryParams): Promise<Regiao[]>`

Busca uma região por sua sigla.

**Parâmetros:**
- `sigla`: Sigla da região
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Regiao[]>

**Exemplo:**
```typescript
const regiao = await ibge.regioes.getBySigla('SE');
```

## MesorregioesService

Serviço para operações relacionadas às Mesorregiões.

### Métodos

#### `getAll(params?: QueryParams): Promise<Mesorregiao[]>`

Busca todas as mesorregiões do Brasil.

**Parâmetros:**
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Mesorregiao[]>

**Exemplo:**
```typescript
const mesorregioes = await ibge.mesorregioes.getAll();
```

#### `getById(id: number, params?: QueryParams): Promise<Mesorregiao>`

Busca uma mesorregião específica por ID.

**Parâmetros:**
- `id`: ID da mesorregião
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Mesorregiao>

**Exemplo:**
```typescript
const mesorregiao = await ibge.mesorregioes.getById(3501);
```

#### `getByEstado(uf: string, params?: QueryParams): Promise<Mesorregiao[]>`

Busca mesorregiões por estado.

**Parâmetros:**
- `uf`: Sigla do estado
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Mesorregiao[]>

**Exemplo:**
```typescript
const mesorregioes = await ibge.mesorregioes.getByEstado('SP');
```

#### `getByRegiao(regiaoId: string | number, params?: QueryParams): Promise<Mesorregiao[]>`

Busca mesorregiões por região.

**Parâmetros:**
- `regiaoId`: ID ou sigla da região
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Mesorregiao[]>

**Exemplo:**
```typescript
const mesorregioes = await ibge.mesorregioes.getByRegiao('SE');
```

#### `getByRegiaoSigla(sigla: 'N' | 'NE' | 'SE' | 'S' | 'CO', params?: QueryParams): Promise<Mesorregiao[]>`

Busca mesorregiões por região usando sigla.

**Parâmetros:**
- `sigla`: Sigla da região
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Mesorregiao[]>

**Exemplo:**
```typescript
const mesorregioes = await ibge.mesorregioes.getByRegiaoSigla('SE');
```

## MicrorregioesService

Serviço para operações relacionadas às Microrregiões.

### Métodos

#### `getAll(params?: QueryParams): Promise<Microrregiao[]>`

Busca todas as microrregiões do Brasil.

**Parâmetros:**
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Microrregiao[]>

**Exemplo:**
```typescript
const microrregioes = await ibge.microrregioes.getAll();
```

#### `getById(id: number, params?: QueryParams): Promise<Microrregiao>`

Busca uma microrregião específica por ID.

**Parâmetros:**
- `id`: ID da microrregião
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Microrregiao>

**Exemplo:**
```typescript
const microrregiao = await ibge.microrregioes.getById(35001);
```

#### `getByEstado(uf: string, params?: QueryParams): Promise<Microrregiao[]>`

Busca microrregiões por estado.

**Parâmetros:**
- `uf`: Sigla do estado
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Microrregiao[]>

**Exemplo:**
```typescript
const microrregioes = await ibge.microrregioes.getByEstado('SP');
```

#### `getByRegiao(regiaoId: string | number, params?: QueryParams): Promise<Microrregiao[]>`

Busca microrregiões por região.

**Parâmetros:**
- `regiaoId`: ID ou sigla da região
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Microrregiao[]>

**Exemplo:**
```typescript
const microrregioes = await ibge.microrregioes.getByRegiao('SE');
```

#### `getByRegiaoSigla(sigla: 'N' | 'NE' | 'SE' | 'S' | 'CO', params?: QueryParams): Promise<Microrregiao[]>`

Busca microrregiões por região usando sigla.

**Parâmetros:**
- `sigla`: Sigla da região
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Microrregiao[]>

**Exemplo:**
```typescript
const microrregioes = await ibge.microrregioes.getByRegiaoSigla('SE');
```

## RegioesIntermediariasService

Serviço para operações relacionadas às Regiões Intermediárias.

### Métodos

#### `getAll(params?: QueryParams): Promise<RegiaoIntermediaria[]>`

Busca todas as regiões intermediárias do Brasil.

**Parâmetros:**
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<RegiaoIntermediaria[]>

**Exemplo:**
```typescript
const regioesIntermediarias = await ibge.regioesIntermediarias.getAll();
```

#### `getById(id: number, params?: QueryParams): Promise<RegiaoIntermediaria>`

Busca uma região intermediária específica por ID.

**Parâmetros:**
- `id`: ID da região intermediária
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<RegiaoIntermediaria>

**Exemplo:**
```typescript
const regiaoIntermediaria = await ibge.regioesIntermediarias.getById(3501);
```

#### `getByEstado(uf: string, params?: QueryParams): Promise<RegiaoIntermediaria[]>`

Busca regiões intermediárias por estado.

**Parâmetros:**
- `uf`: Sigla do estado
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<RegiaoIntermediaria[]>

**Exemplo:**
```typescript
const regioesIntermediarias = await ibge.regioesIntermediarias.getByEstado('SP');
```

#### `getByRegiao(regiaoId: string | number, params?: QueryParams): Promise<RegiaoIntermediaria[]>`

Busca regiões intermediárias por região.

**Parâmetros:**
- `regiaoId`: ID ou sigla da região
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<RegiaoIntermediaria[]>

**Exemplo:**
```typescript
const regioesIntermediarias = await ibge.regioesIntermediarias.getByRegiao('SE');
```

#### `getByRegiaoSigla(sigla: 'N' | 'NE' | 'SE' | 'S' | 'CO', params?: QueryParams): Promise<RegiaoIntermediaria[]>`

Busca regiões intermediárias por região usando sigla.

**Parâmetros:**
- `sigla`: Sigla da região
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<RegiaoIntermediaria[]>

**Exemplo:**
```typescript
const regioesIntermediarias = await ibge.regioesIntermediarias.getByRegiaoSigla('SE');
```

## RegioesImediatasService

Serviço para operações relacionadas às Regiões Imediatas.

### Métodos

#### `getAll(params?: QueryParams): Promise<RegiaoImediata[]>`

Busca todas as regiões imediatas do Brasil.

**Parâmetros:**
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<RegiaoImediata[]>

**Exemplo:**
```typescript
const regioesImediatas = await ibge.regioesImediatas.getAll();
```

#### `getById(id: number, params?: QueryParams): Promise<RegiaoImediata>`

Busca uma região imediata específica por ID.

**Parâmetros:**
- `id`: ID da região imediata
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<RegiaoImediata>

**Exemplo:**
```typescript
const regiaoImediata = await ibge.regioesImediatas.getById(350001);
```

#### `getByEstado(uf: string, params?: QueryParams): Promise<RegiaoImediata[]>`

Busca regiões imediatas por estado.

**Parâmetros:**
- `uf`: Sigla do estado
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<RegiaoImediata[]>

**Exemplo:**
```typescript
const regioesImediatas = await ibge.regioesImediatas.getByEstado('SP');
```

#### `getByRegiao(regiaoId: string | number, params?: QueryParams): Promise<RegiaoImediata[]>`

Busca regiões imediatas por região.

**Parâmetros:**
- `regiaoId`: ID ou sigla da região
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<RegiaoImediata[]>

**Exemplo:**
```typescript
const regioesImediatas = await ibge.regioesImediatas.getByRegiao('SE');
```

#### `getByRegiaoSigla(sigla: 'N' | 'NE' | 'SE' | 'S' | 'CO', params?: QueryParams): Promise<RegiaoImediata[]>`

Busca regiões imediatas por região usando sigla.

**Parâmetros:**
- `sigla`: Sigla da região
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<RegiaoImediata[]>

**Exemplo:**
```typescript
const regioesImediatas = await ibge.regioesImediatas.getByRegiaoSigla('SE');
```

#### `getByRegiaoIntermediaria(regiaoIntermediariaId: number, params?: QueryParams): Promise<RegiaoImediata[]>`

Busca regiões imediatas por região intermediária.

**Parâmetros:**
- `regiaoIntermediariaId`: ID da região intermediária
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<RegiaoImediata[]>

**Exemplo:**
```typescript
const regioesImediatas = await ibge.regioesImediatas.getByRegiaoIntermediaria(3501);
```

## DistritosService

Serviço para operações relacionadas aos Distritos.

### Métodos

#### `getAll(params?: QueryParams): Promise<Distrito[]>`

Busca todos os distritos do Brasil.

**Parâmetros:**
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Distrito[]>

**Exemplo:**
```typescript
const distritos = await ibge.distritos.getAll();
```

#### `getById(id: number, params?: QueryParams): Promise<Distrito[]>`

Busca distritos por ID.

**Parâmetros:**
- `id`: ID do distrito
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Distrito[]>

**Exemplo:**
```typescript
const distritos = await ibge.distritos.getById(520005005);
```

#### `getByEstado(uf: string, params?: QueryParams): Promise<Distrito[]>`

Busca distritos por estado.

**Parâmetros:**
- `uf`: Sigla do estado
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Distrito[]>

**Exemplo:**
```typescript
const distritos = await ibge.distritos.getByEstado('SP');
```

#### `getByMunicipio(municipioId: number, params?: QueryParams): Promise<Distrito[]>`

Busca distritos por município.

**Parâmetros:**
- `municipioId`: ID do município
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Distrito[]>

**Exemplo:**
```typescript
const distritos = await ibge.distritos.getByMunicipio(3550308);
```

#### `getByMesorregiao(mesorregiaoId: number, params?: QueryParams): Promise<Distrito[]>`

Busca distritos por mesorregião.

**Parâmetros:**
- `mesorregiaoId`: ID da mesorregião
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Distrito[]>

**Exemplo:**
```typescript
const distritos = await ibge.distritos.getByMesorregiao(3501);
```

#### `getByMicrorregiao(microrregiaoId: number, params?: QueryParams): Promise<Distrito[]>`

Busca distritos por microrregião.

**Parâmetros:**
- `microrregiaoId`: ID da microrregião
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Distrito[]>

**Exemplo:**
```typescript
const distritos = await ibge.distritos.getByMicrorregiao(35001);
```

#### `getByRegiaoImediata(regiaoImediataId: number, params?: QueryParams): Promise<Distrito[]>`

Busca distritos por região imediata.

**Parâmetros:**
- `regiaoImediataId`: ID da região imediata
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Distrito[]>

**Exemplo:**
```typescript
const distritos = await ibge.distritos.getByRegiaoImediata(350001);
```

#### `getByRegiaoIntermediaria(regiaoIntermediariaId: number, params?: QueryParams): Promise<Distrito[]>`

Busca distritos por região intermediária.

**Parâmetros:**
- `regiaoIntermediariaId`: ID da região intermediária
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Distrito[]>

**Exemplo:**
```typescript
const distritos = await ibge.distritos.getByRegiaoIntermediaria(3501);
```

#### `getByRegiao(regiaoId: string | number, params?: QueryParams): Promise<Distrito[]>`

Busca distritos por região.

**Parâmetros:**
- `regiaoId`: ID ou sigla da região
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Distrito[]>

**Exemplo:**
```typescript
const distritos = await ibge.distritos.getByRegiao('SE');
```

#### `getByRegiaoSigla(sigla: 'N' | 'NE' | 'SE' | 'S' | 'CO', params?: QueryParams): Promise<Distrito[]>`

Busca distritos por região usando sigla.

**Parâmetros:**
- `sigla`: Sigla da região
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Distrito[]>

**Exemplo:**
```typescript
const distritos = await ibge.distritos.getByRegiaoSigla('SE');
```

## SubdistritosService

Serviço para operações relacionadas aos Subdistritos.

### Métodos

#### `getAll(params?: QueryParams): Promise<Subdistrito[]>`

Busca todos os subdistritos do Brasil.

**Parâmetros:**
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Subdistrito[]>

**Exemplo:**
```typescript
const subdistritos = await ibge.subdistritos.getAll();
```

#### `getById(id: number, params?: QueryParams): Promise<Subdistrito[]>`

Busca subdistritos por ID.

**Parâmetros:**
- `id`: ID do subdistrito
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Subdistrito[]>

**Exemplo:**
```typescript
const subdistritos = await ibge.subdistritos.getById(43004060506);
```

#### `getByEstado(uf: string, params?: QueryParams): Promise<Subdistrito[]>`

Busca subdistritos por estado.

**Parâmetros:**
- `uf`: Sigla do estado
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Subdistrito[]>

**Exemplo:**
```typescript
const subdistritos = await ibge.subdistritos.getByEstado('SP');
```

#### `getByMunicipio(municipioId: number, params?: QueryParams): Promise<Subdistrito[]>`

Busca subdistritos por município.

**Parâmetros:**
- `municipioId`: ID do município
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Subdistrito[]>

**Exemplo:**
```typescript
const subdistritos = await ibge.subdistritos.getByMunicipio(3550308);
```

#### `getByDistrito(distritoId: number, params?: QueryParams): Promise<Subdistrito[]>`

Busca subdistritos por distrito.

**Parâmetros:**
- `distritoId`: ID do distrito
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Subdistrito[]>

**Exemplo:**
```typescript
const subdistritos = await ibge.subdistritos.getByDistrito(520005005);
```

#### `getByMesorregiao(mesorregiaoId: number, params?: QueryParams): Promise<Subdistrito[]>`

Busca subdistritos por mesorregião.

**Parâmetros:**
- `mesorregiaoId`: ID da mesorregião
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Subdistrito[]>

**Exemplo:**
```typescript
const subdistritos = await ibge.subdistritos.getByMesorregiao(3501);
```

#### `getByMicrorregiao(microrregiaoId: number, params?: QueryParams): Promise<Subdistrito[]>`

Busca subdistritos por microrregião.

**Parâmetros:**
- `microrregiaoId`: ID da microrregião
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Subdistrito[]>

**Exemplo:**
```typescript
const subdistritos = await ibge.subdistritos.getByMicrorregiao(35001);
```

#### `getByRegiaoImediata(regiaoImediataId: number, params?: QueryParams): Promise<Subdistrito[]>`

Busca subdistritos por região imediata.

**Parâmetros:**
- `regiaoImediataId`: ID da região imediata
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Subdistrito[]>

**Exemplo:**
```typescript
const subdistritos = await ibge.subdistritos.getByRegiaoImediata(350001);
```

#### `getByRegiaoIntermediaria(regiaoIntermediariaId: number, params?: QueryParams): Promise<Subdistrito[]>`

Busca subdistritos por região intermediária.

**Parâmetros:**
- `regiaoIntermediariaId`: ID da região intermediária
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Subdistrito[]>

**Exemplo:**
```typescript
const subdistritos = await ibge.subdistritos.getByRegiaoIntermediaria(3501);
```

#### `getByRegiao(regiaoId: string | number, params?: QueryParams): Promise<Subdistrito[]>`

Busca subdistritos por região.

**Parâmetros:**
- `regiaoId`: ID ou sigla da região
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Subdistrito[]>

**Exemplo:**
```typescript
const subdistritos = await ibge.subdistritos.getByRegiao('SE');
```

#### `getByRegiaoSigla(sigla: 'N' | 'NE' | 'SE' | 'S' | 'CO', params?: QueryParams): Promise<Subdistrito[]>`

Busca subdistritos por região usando sigla.

**Parâmetros:**
- `sigla`: Sigla da região
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Subdistrito[]>

**Exemplo:**
```typescript
const subdistritos = await ibge.subdistritos.getByRegiaoSigla('SE');
```

## AglomeracoesUrbanasService

Serviço para operações relacionadas às Aglomerações Urbanas.

### Métodos

#### `getAll(params?: QueryParams): Promise<AglomeracaoUrbana[]>`

Busca todas as aglomerações urbanas do Brasil.

**Parâmetros:**
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<AglomeracaoUrbana[]>

**Exemplo:**
```typescript
const aglomeracoes = await ibge.aglomeracoesUrbanas.getAll();
```

#### `getById(id: number, params?: QueryParams): Promise<AglomeracaoUrbana[]>`

Busca aglomerações urbanas por ID.

**Parâmetros:**
- `id`: ID da aglomeração urbana
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<AglomeracaoUrbana[]>

**Exemplo:**
```typescript
const aglomeracoes = await ibge.aglomeracoesUrbanas.getById(301);
```

## PaisesService

Serviço para operações relacionadas aos Países.

### Métodos

#### `getAll(params?: QueryParams): Promise<Pais[]>`

Busca todos os países.

**Parâmetros:**
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Pais[]>

**Exemplo:**
```typescript
const paises = await ibge.paises.getAll();
```

#### `getById(id: number, params?: QueryParams): Promise<Pais[]>`

Busca países por ID.

**Parâmetros:**
- `id`: ID do país
- `params` (opcional): Parâmetros de query

**Retorno:** Promise<Pais[]>

**Exemplo:**
```typescript
const paises = await ibge.paises.getById(76); // Brasil
```

## Tipos de Dados

### QueryParams

```typescript
interface QueryParams {
  orderBy?: string;    // Ordenação dos resultados
  view?: string;       // Visualização dos dados
  municipio?: number;  // Filtro por município (quando aplicável)
}
```

### Estados

```typescript
interface Estado {
  id: number;
  nome: string;
  sigla: string;
  regiao: Regiao;
}
```

### Municípios

```typescript
interface Municipio {
  id: number;
  nome: string;
  microrregiao: Microrregiao;
  'regiao-imediata': RegiaoImediata;
  'regiao-intermediaria': RegiaoIntermediaria;
}
```

### Regiões

```typescript
interface Regiao {
  id: number;
  nome: string;
  sigla: string;
}
```

### Mesorregiões

```typescript
interface Mesorregiao {
  id: number;
  nome: string;
  UF: Estado;
}
```

### Microrregiões

```typescript
interface Microrregiao {
  id: number;
  nome: string;
  mesorregiao: Mesorregiao;
}
```

### Regiões Intermediárias

```typescript
interface RegiaoIntermediaria {
  id: number;
  nome: string;
  UF: Estado;
}
```

### Regiões Imediatas

```typescript
interface RegiaoImediata {
  id: number;
  nome: string;
  'regiao-intermediaria': RegiaoIntermediaria;
}
```

### Distritos

```typescript
interface Distrito {
  id: number;
  nome: string;
  municipio: Municipio;
  'regiao-imediata': RegiaoImediata;
  'regiao-intermediaria': RegiaoIntermediaria;
}
```

### Subdistritos

```typescript
interface Subdistrito {
  id: number;
  nome: string;
  distrito: Distrito;
}
```

### Aglomerações Urbanas

```typescript
interface AglomeracaoUrbana {
  id: string;
  nome: string;
  municipios: Municipio[];
}
```

### Países

```typescript
interface Pais {
  id: {
    'ISO-ALPHA-2': string;
    'ISO-ALPHA-3': string;
    'M49': number;
  };
  nome: string;
  'regiao-intermediaria': {
    id: {
      'M49': number;
    };
    nome: string;
    regiao: {
      id: {
        'M49': number;
      };
      nome: string;
    };
  } | null;
  'sub-regiao': {
    id: {
      'M49': number;
    };
    nome: string;
    regiao: {
      id: {
        'M49': number;
      };
      nome: string;
    };
  };
}
```
