/**
 * Tipos base para a API de Localidades do IBGE
 */

export interface BaseLocalidade {
  id: number;
  nome: string;
}

export interface Estado extends BaseLocalidade {
  sigla: string;
  regiao: Regiao;
}

export interface Regiao extends BaseLocalidade {
  sigla: string;
}

export interface Municipio extends BaseLocalidade {
  microrregiao: Microrregiao;
  'regiao-imediata': RegiaoImediata;
  'regiao-intermediaria': RegiaoIntermediaria;
}

export interface Mesorregiao extends BaseLocalidade {
  UF: Estado;
}

export interface Microrregiao extends BaseLocalidade {
  mesorregiao: Mesorregiao;
}

export interface RegiaoImediata extends BaseLocalidade {
  'regiao-intermediaria': RegiaoIntermediaria;
}

export interface RegiaoIntermediaria extends BaseLocalidade {
  UF: Estado;
}

export interface Distrito extends BaseLocalidade {
  municipio: Municipio;
  'regiao-imediata': RegiaoImediata;
  'regiao-intermediaria': RegiaoIntermediaria;
}

export interface Subdistrito extends BaseLocalidade {
  distrito: Distrito;
}

export interface AglomeracaoUrbana {
  id: string;
  nome: string;
  municipios: Municipio[];
}

export interface Pais {
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

export interface QueryParams {
  orderBy?: string;
  view?: string;
  municipio?: number;
}

export interface IBGEApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}