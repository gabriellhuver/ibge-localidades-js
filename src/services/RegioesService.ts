import { BaseService } from './BaseService';
import { Regiao, QueryParams } from '../types';

/**
 * Serviço para operações relacionadas às Regiões
 */
export class RegioesService extends BaseService {
  private readonly endpoint = '/regioes';

  /**
   * Busca todas as regiões do Brasil
   */
  async getAll(params?: QueryParams): Promise<Regiao[]> {
    return this.get<Regiao[]>(this.endpoint, params);
  }

  /**
   * Busca uma região específica por ID
   */
  async getById(id: string | number, params?: QueryParams): Promise<Regiao> {
    return this.getByIdInternal<Regiao>(this.endpoint, id, params);
  }

  /**
   * Busca região por sigla (N, NE, SE, S, CO)
   */
  async getBySigla(sigla: 'N' | 'NE' | 'SE' | 'S' | 'CO', params?: QueryParams): Promise<Regiao> {
    return this.getByIdInternal<Regiao>(this.endpoint, sigla, params);
  }
}
