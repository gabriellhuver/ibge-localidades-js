import { BaseService } from './BaseService';
import { Distrito, QueryParams } from '../types';

/**
 * Serviço para operações relacionadas aos Distritos
 */
export class DistritosService extends BaseService {
  private readonly endpoint = '/distritos';

  /**
   * Busca todos os distritos do Brasil
   */
  async getAll(params?: QueryParams): Promise<Distrito[]> {
    return this.get<Distrito[]>(this.endpoint, params);
  }

  /**
   * Busca um distrito específico por ID
   */
  async getById(id: number, params?: QueryParams): Promise<Distrito[]> {
    return this.getByIdInternal<Distrito[]>(this.endpoint, id, params);
  }

  /**
   * Busca distritos por estado (UF)
   */
  async getByEstado(uf: string, params?: QueryParams): Promise<Distrito[]> {
    return this.getByParent<Distrito[]>('/estados', uf, 'distritos', params);
  }

  /**
   * Busca distritos por mesorregião
   */
  async getByMesorregiao(mesorregiaoId: number, params?: QueryParams): Promise<Distrito[]> {
    return this.getByParent<Distrito[]>('/mesorregioes', mesorregiaoId, 'distritos', params);
  }

  /**
   * Busca distritos por microrregião
   */
  async getByMicrorregiao(microrregiaoId: number, params?: QueryParams): Promise<Distrito[]> {
    return this.getByParent<Distrito[]>('/microrregioes', microrregiaoId, 'distritos', params);
  }

  /**
   * Busca distritos por município
   */
  async getByMunicipio(municipioId: number, params?: QueryParams): Promise<Distrito[]> {
    return this.getByParent<Distrito[]>('/municipios', municipioId, 'distritos', params);
  }

  /**
   * Busca distritos por região imediata
   */
  async getByRegiaoImediata(regiaoImediataId: number, params?: QueryParams): Promise<Distrito[]> {
    return this.getByParent<Distrito[]>('/regioes-imediatas', regiaoImediataId, 'distritos', params);
  }

  /**
   * Busca distritos por região intermediária
   */
  async getByRegiaoIntermediaria(regiaoIntermediariaId: number, params?: QueryParams): Promise<Distrito[]> {
    return this.getByParent<Distrito[]>('/regioes-intermediarias', regiaoIntermediariaId, 'distritos', params);
  }

  /**
   * Busca distritos por região
   */
  async getByRegiao(regiaoId: string | number, params?: QueryParams): Promise<Distrito[]> {
    return this.getByParent<Distrito[]>('/regioes', regiaoId, 'distritos', params);
  }

  /**
   * Busca distritos por região usando sigla (N, NE, SE, S, CO)
   */
  async getByRegiaoSigla(sigla: 'N' | 'NE' | 'SE' | 'S' | 'CO', params?: QueryParams): Promise<Distrito[]> {
    return this.getByRegiao(sigla, params);
  }
}
