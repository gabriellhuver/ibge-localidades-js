import { BaseService } from './BaseService';
import { Microrregiao, QueryParams } from '../types';

/**
 * Serviço para operações relacionadas às Microrregiões
 */
export class MicrorregioesService extends BaseService {
  private readonly endpoint = '/microrregioes';

  /**
   * Busca todas as microrregiões do Brasil
   */
  async getAll(params?: QueryParams): Promise<Microrregiao[]> {
    return this.get<Microrregiao[]>(this.endpoint, params);
  }

  /**
   * Busca uma microrregião específica por ID
   */
  async getById(id: number, params?: QueryParams): Promise<Microrregiao> {
    return this.getByIdInternal<Microrregiao>(this.endpoint, id, params);
  }

  /**
   * Busca microrregiões por estado (UF)
   */
  async getByEstado(uf: string, params?: QueryParams): Promise<Microrregiao[]> {
    return this.getByParent<Microrregiao[]>('/estados', uf, 'microrregioes', params);
  }

  /**
   * Busca microrregiões por mesorregião
   */
  async getByMesorregiao(mesorregiaoId: number, params?: QueryParams): Promise<Microrregiao[]> {
    return this.getByParent<Microrregiao[]>('/mesorregioes', mesorregiaoId, 'microrregioes', params);
  }

  /**
   * Busca microrregiões por região
   */
  async getByRegiao(regiaoId: string | number, params?: QueryParams): Promise<Microrregiao[]> {
    return this.getByParent<Microrregiao[]>('/regioes', regiaoId, 'microrregioes', params);
  }

  /**
   * Busca microrregiões por região usando sigla (N, NE, SE, S, CO)
   */
  async getByRegiaoSigla(sigla: 'N' | 'NE' | 'SE' | 'S' | 'CO', params?: QueryParams): Promise<Microrregiao[]> {
    return this.getByRegiao(sigla, params);
  }
}
