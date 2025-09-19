import { BaseService } from './BaseService';
import { AglomeracaoUrbana, QueryParams } from '../types';

/**
 * Serviço para operações relacionadas às Aglomerações Urbanas
 */
export class AglomeracoesUrbanasService extends BaseService {
  private readonly endpoint = '/aglomeracoes-urbanas';

  /**
   * Busca todas as aglomerações urbanas do Brasil
   */
  async getAll(params?: QueryParams): Promise<AglomeracaoUrbana[]> {
    return this.get<AglomeracaoUrbana[]>(this.endpoint, params);
  }

  /**
   * Busca uma aglomeração urbana específica por ID
   */
  async getById(id: number, params?: QueryParams): Promise<AglomeracaoUrbana[]> {
    return this.getByIdInternal<AglomeracaoUrbana[]>(this.endpoint, id, params);
  }
}
