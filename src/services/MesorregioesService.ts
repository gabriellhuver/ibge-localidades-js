import { BaseService } from './BaseService';
import { Mesorregiao, QueryParams } from '../types';

/**
 * Serviço para operações relacionadas às Mesorregiões
 */
export class MesorregioesService extends BaseService {
  private readonly endpoint = '/mesorregioes';

  /**
   * Busca todas as mesorregiões do Brasil
   */
  async getAll(params?: QueryParams): Promise<Mesorregiao[]> {
    return this.get<Mesorregiao[]>(this.endpoint, params);
  }

  /**
   * Busca uma mesorregião específica por ID
   */
  async getById(id: number, params?: QueryParams): Promise<Mesorregiao> {
    return this.getByIdInternal<Mesorregiao>(this.endpoint, id, params);
  }

  /**
   * Busca mesorregiões por estado (UF)
   */
  async getByEstado(uf: string, params?: QueryParams): Promise<Mesorregiao[]> {
    return this.getByParent<Mesorregiao[]>('/estados', uf, 'mesorregioes', params);
  }

  /**
   * Busca mesorregiões por região
   */
  async getByRegiao(regiaoId: string | number, params?: QueryParams): Promise<Mesorregiao[]> {
    return this.getByParent<Mesorregiao[]>('/regioes', regiaoId, 'mesorregioes', params);
  }

  /**
   * Busca mesorregiões por região usando sigla (N, NE, SE, S, CO)
   */
  async getByRegiaoSigla(sigla: 'N' | 'NE' | 'SE' | 'S' | 'CO', params?: QueryParams): Promise<Mesorregiao[]> {
    return this.getByRegiao(sigla, params);
  }
}
