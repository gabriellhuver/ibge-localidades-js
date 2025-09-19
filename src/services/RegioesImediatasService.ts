import { BaseService } from './BaseService';
import { RegiaoImediata, QueryParams } from '../types';

/**
 * Serviço para operações relacionadas às Regiões Imediatas
 */
export class RegioesImediatasService extends BaseService {
  private readonly endpoint = '/regioes-imediatas';

  /**
   * Busca todas as regiões imediatas do Brasil
   */
  async getAll(params?: QueryParams): Promise<RegiaoImediata[]> {
    return this.get<RegiaoImediata[]>(this.endpoint, params);
  }

  /**
   * Busca uma região imediata específica por ID
   */
  async getById(id: number, params?: QueryParams): Promise<RegiaoImediata> {
    return this.getByIdInternal<RegiaoImediata>(this.endpoint, id, params);
  }

  /**
   * Busca regiões imediatas por estado (UF)
   */
  async getByEstado(uf: string, params?: QueryParams): Promise<RegiaoImediata[]> {
    return this.getByParent<RegiaoImediata[]>('/estados', uf, 'regioes-imediatas', params);
  }

  /**
   * Busca regiões imediatas por região intermediária
   */
  async getByRegiaoIntermediaria(regiaoIntermediariaId: number, params?: QueryParams): Promise<RegiaoImediata[]> {
    return this.getByParent<RegiaoImediata[]>('/regioes-intermediarias', regiaoIntermediariaId, 'regioes-imediatas', params);
  }

  /**
   * Busca regiões imediatas por região
   */
  async getByRegiao(regiaoId: string | number, params?: QueryParams): Promise<RegiaoImediata[]> {
    return this.getByParent<RegiaoImediata[]>('/regioes', regiaoId, 'regioes-imediatas', params);
  }

  /**
   * Busca regiões imediatas por região usando sigla (N, NE, SE, S, CO)
   */
  async getByRegiaoSigla(sigla: 'N' | 'NE' | 'SE' | 'S' | 'CO', params?: QueryParams): Promise<RegiaoImediata[]> {
    return this.getByRegiao(sigla, params);
  }
}
