import { BaseService } from './BaseService';
import { Municipio, QueryParams } from '../types';

/**
 * Serviço para operações relacionadas aos Municípios
 */
export class MunicipiosService extends BaseService {
  private readonly endpoint = '/municipios';

  /**
   * Busca todos os municípios do Brasil
   */
  async getAll(params?: QueryParams): Promise<Municipio[]> {
    return this.get<Municipio[]>(this.endpoint, params);
  }

  /**
   * Busca um município específico por ID
   */
  async getById(id: number, params?: QueryParams): Promise<Municipio> {
    return this.getByIdInternal<Municipio>(this.endpoint, id, params);
  }

  /**
   * Busca municípios por estado (UF)
   */
  async getByEstado(uf: string, params?: QueryParams): Promise<Municipio[]> {
    return this.getByParent<Municipio[]>('/estados', uf, 'municipios', params);
  }

  /**
   * Busca municípios por mesorregião
   */
  async getByMesorregiao(mesorregiaoId: number, params?: QueryParams): Promise<Municipio[]> {
    return this.getByParent<Municipio[]>('/mesorregioes', mesorregiaoId, 'municipios', params);
  }

  /**
   * Busca municípios por microrregião
   */
  async getByMicrorregiao(microrregiaoId: number, params?: QueryParams): Promise<Municipio[]> {
    return this.getByParent<Municipio[]>('/microrregioes', microrregiaoId, 'municipios', params);
  }

  /**
   * Busca municípios por região
   */
  async getByRegiao(regiaoId: string | number, params?: QueryParams): Promise<Municipio[]> {
    return this.getByParent<Municipio[]>('/regioes', regiaoId, 'municipios', params);
  }

  /**
   * Busca municípios por região usando sigla (N, NE, SE, S, CO)
   */
  async getByRegiaoSigla(sigla: 'N' | 'NE' | 'SE' | 'S' | 'CO', params?: QueryParams): Promise<Municipio[]> {
    return this.getByRegiao(sigla, params);
  }

  /**
   * Busca municípios por região intermediária
   */
  async getByRegiaoIntermediaria(regiaoIntermediariaId: number, params?: QueryParams): Promise<Municipio[]> {
    return this.getByParent<Municipio[]>('/regioes-intermediarias', regiaoIntermediariaId, 'municipios', params);
  }

  /**
   * Busca municípios por região imediata
   */
  async getByRegiaoImediata(regiaoImediataId: number, params?: QueryParams): Promise<Municipio[]> {
    return this.getByParent<Municipio[]>('/regioes-imediatas', regiaoImediataId, 'municipios', params);
  }
}
