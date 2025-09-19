import { EstadosService } from './services/EstadosService';
import { MunicipiosService } from './services/MunicipiosService';
import { RegioesService } from './services/RegioesService';
import { MesorregioesService } from './services/MesorregioesService';
import { MicrorregioesService } from './services/MicrorregioesService';
import { RegioesImediatasService } from './services/RegioesImediatasService';
import { RegioesIntermediariasService } from './services/RegioesIntermediariasService';
import { DistritosService } from './services/DistritosService';
import { SubdistritosService } from './services/SubdistritosService';
import { AglomeracoesUrbanasService } from './services/AglomeracoesUrbanasService';
import { PaisesService } from './services/PaisesService';

/**
 * Classe principal da SDK para a API de Localidades do IBGE
 */
export class IBGELocalidades {
  public readonly estados: EstadosService;
  public readonly municipios: MunicipiosService;
  public readonly regioes: RegioesService;
  public readonly mesorregioes: MesorregioesService;
  public readonly microrregioes: MicrorregioesService;
  public readonly regioesImediatas: RegioesImediatasService;
  public readonly regioesIntermediarias: RegioesIntermediariasService;
  public readonly distritos: DistritosService;
  public readonly subdistritos: SubdistritosService;
  public readonly aglomeracoesUrbanas: AglomeracoesUrbanasService;
  public readonly paises: PaisesService;

  constructor() {
    this.estados = new EstadosService();
    this.municipios = new MunicipiosService();
    this.regioes = new RegioesService();
    this.mesorregioes = new MesorregioesService();
    this.microrregioes = new MicrorregioesService();
    this.regioesImediatas = new RegioesImediatasService();
    this.regioesIntermediarias = new RegioesIntermediariasService();
    this.distritos = new DistritosService();
    this.subdistritos = new SubdistritosService();
    this.aglomeracoesUrbanas = new AglomeracoesUrbanasService();
    this.paises = new PaisesService();
  }
}

// Exporta a classe principal como default
export default IBGELocalidades;

// Exporta todos os tipos
export * from './types';

// Exporta todos os serviços individualmente
export {
  EstadosService,
  MunicipiosService,
  RegioesService,
  MesorregioesService,
  MicrorregioesService,
  RegioesImediatasService,
  RegioesIntermediariasService,
  DistritosService,
  SubdistritosService,
  AglomeracoesUrbanasService,
  PaisesService,
};
