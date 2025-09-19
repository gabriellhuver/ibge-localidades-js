import { BaseService } from './BaseService';
import { RegiaoIntermediaria, QueryParams } from '../types';

/**
 * Serviço para operações relacionadas às Regiões Intermediárias
 */
export class RegioesIntermediariasService extends BaseService {
  private readonly endpoint = '/regioes-intermediarias';

  /**
   * Busca todas as regiões intermediárias do Brasil
   */
  async getAll(params?: QueryParams): Promise<RegiaoIntermediaria[]> {
    return this.get<RegiaoIntermediaria[]>(this.endpoint, params);
  }

  /**
   * Busca uma região intermediária específica por ID
   */
  async getById(id: number, params?: QueryParams): Promise<RegiaoIntermediaria> {
    return this.getByIdInternal<RegiaoIntermediaria>(this.endpoint, id, params);
  }

  /**
   * Busca regiões intermediárias por estado (UF)
   */
  async getByEstado(uf: string, params?: QueryParams): Promise<RegiaoIntermediaria[]> {
    return this.getByParent<RegiaoIntermediaria[]>('/estados', uf, 'regioes-intermediarias', params);
  }

  /**
   * Busca regiões intermediárias por região
   */
  async getByRegiao(regiaoId: string | number, params?: QueryParams): Promise<RegiaoIntermediaria[]> {
    return this.getByParent<RegiaoIntermediaria[]>('/regioes', regiaoId, 'regioes-intermediarias', params);
  }

  /**
   * Busca regiões intermediárias por região usando sigla (N, NE, SE, S, CO)
   */
  async getByRegiaoSigla(sigla: 'N' | 'NE' | 'SE' | 'S' | 'CO', params?: QueryParams): Promise<RegiaoIntermediaria[]> {
    return this.getByRegiao(sigla, params);
  }
}
