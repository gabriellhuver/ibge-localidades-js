import { BaseService } from './BaseService';
import { Estado, QueryParams } from '../types';

/**
 * Serviço para operações relacionadas aos Estados (UFs)
 */
export class EstadosService extends BaseService {
  private readonly endpoint = '/estados';

  /**
   * Busca todos os estados do Brasil
   */
  async getAll(params?: QueryParams): Promise<Estado[]> {
    return this.get<Estado[]>(this.endpoint, params);
  }

  /**
   * Busca um estado específico por UF (sigla)
   */
  async getByUF(uf: string, params?: QueryParams): Promise<Estado> {
    return this.getByIdInternal<Estado>(this.endpoint, uf, params);
  }

  /**
   * Busca estados por região
   */
  async getByRegiao(regiaoId: string | number, params?: QueryParams): Promise<Estado[]> {
    return this.getByParent<Estado[]>('/regioes', regiaoId, 'estados', params);
  }

  /**
   * Busca estados por região usando sigla (N, NE, SE, S, CO)
   */
  async getByRegiaoSigla(sigla: 'N' | 'NE' | 'SE' | 'S' | 'CO', params?: QueryParams): Promise<Estado[]> {
    return this.getByRegiao(sigla, params);
  }
}
