import { BaseService } from './BaseService';
import { Pais, QueryParams } from '../types';

/**
 * Serviço para operações relacionadas aos Países
 */
export class PaisesService extends BaseService {
  private readonly endpoint = '/paises';

  /**
   * Busca todos os países
   */
  async getAll(params?: QueryParams): Promise<Pais[]> {
    return this.get<Pais[]>(this.endpoint, params);
  }

  /**
   * Busca um país específico por ID
   */
  async getById(id: number, params?: QueryParams): Promise<Pais[]> {
    return this.getByIdInternal<Pais[]>(this.endpoint, id, params);
  }
}
