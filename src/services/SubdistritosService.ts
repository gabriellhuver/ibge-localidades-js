import { BaseService } from './BaseService';
import { Subdistrito, QueryParams } from '../types';

/**
 * Serviço para operações relacionadas aos Subdistritos
 */
export class SubdistritosService extends BaseService {
  private readonly endpoint = '/subdistritos';

  /**
   * Busca todos os subdistritos do Brasil
   */
  async getAll(params?: QueryParams): Promise<Subdistrito[]> {
    return this.get<Subdistrito[]>(this.endpoint, params);
  }

  /**
   * Busca um subdistrito específico por ID
   */
  async getById(id: number, params?: QueryParams): Promise<Subdistrito[]> {
    return this.getByIdInternal<Subdistrito[]>(this.endpoint, id, params);
  }

  /**
   * Busca subdistritos por estado (UF)
   */
  async getByEstado(uf: string, params?: QueryParams): Promise<Subdistrito[]> {
    return this.getByParent<Subdistrito[]>('/estados', uf, 'subdistritos', params);
  }

  /**
   * Busca subdistritos por mesorregião
   */
  async getByMesorregiao(mesorregiaoId: number, params?: QueryParams): Promise<Subdistrito[]> {
    return this.getByParent<Subdistrito[]>('/mesorregioes', mesorregiaoId, 'subdistritos', params);
  }

  /**
   * Busca subdistritos por microrregião
   */
  async getByMicrorregiao(microrregiaoId: number, params?: QueryParams): Promise<Subdistrito[]> {
    return this.getByParent<Subdistrito[]>('/microrregioes', microrregiaoId, 'subdistritos', params);
  }

  /**
   * Busca subdistritos por município
   */
  async getByMunicipio(municipioId: number, params?: QueryParams): Promise<Subdistrito[]> {
    return this.getByParent<Subdistrito[]>('/municipios', municipioId, 'subdistritos', params);
  }

  /**
   * Busca subdistritos por distrito
   */
  async getByDistrito(distritoId: number, params?: QueryParams): Promise<Subdistrito[]> {
    return this.getByParent<Subdistrito[]>('/distritos', distritoId, 'subdistritos', params);
  }

  /**
   * Busca subdistritos por região imediata
   */
  async getByRegiaoImediata(regiaoImediataId: number, params?: QueryParams): Promise<Subdistrito[]> {
    return this.getByParent<Subdistrito[]>('/regioes-imediatas', regiaoImediataId, 'subdistritos', params);
  }

  /**
   * Busca subdistritos por região intermediária
   */
  async getByRegiaoIntermediaria(regiaoIntermediariaId: number, params?: QueryParams): Promise<Subdistrito[]> {
    return this.getByParent<Subdistrito[]>('/regioes-intermediarias', regiaoIntermediariaId, 'subdistritos', params);
  }

  /**
   * Busca subdistritos por região
   */
  async getByRegiao(regiaoId: string | number, params?: QueryParams): Promise<Subdistrito[]> {
    return this.getByParent<Subdistrito[]>('/regioes', regiaoId, 'subdistritos', params);
  }

  /**
   * Busca subdistritos por região usando sigla (N, NE, SE, S, CO)
   */
  async getByRegiaoSigla(sigla: 'N' | 'NE' | 'SE' | 'S' | 'CO', params?: QueryParams): Promise<Subdistrito[]> {
    return this.getByRegiao(sigla, params);
  }
}
