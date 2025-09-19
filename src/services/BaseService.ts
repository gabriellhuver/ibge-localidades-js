import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { QueryParams, IBGEApiResponse } from '../types';

/**
 * Classe base para todos os serviços da API do IBGE
 */
export abstract class BaseService {
  protected api: AxiosInstance;
  protected baseURL: string = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Interceptor para tratamento de erros
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        console.error('Erro na API do IBGE:', error.message);
        throw new Error(`Erro na API do IBGE: ${error.message}`);
      }
    );
  }

  /**
   * Faz uma requisição GET para a API
   */
  protected async get<T>(endpoint: string, params?: QueryParams): Promise<T> {
    try {
      const response = await this.api.get<T>(endpoint, { params });
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao buscar dados: ${error}`);
    }
  }

  /**
   * Faz uma requisição GET para um endpoint específico por ID
   */
  protected async getByIdInternal<T>(endpoint: string, id: string | number, params?: QueryParams): Promise<T> {
    return this.get<T>(`${endpoint}/${id}`, params);
  }

  /**
   * Faz uma requisição GET para um endpoint com sub-recurso
   */
  protected async getByParent<T>(
    parentEndpoint: string, 
    parentId: string | number, 
    childEndpoint: string, 
    params?: QueryParams
  ): Promise<T> {
    return this.get<T>(`${parentEndpoint}/${parentId}/${childEndpoint}`, params);
  }

  /**
   * Constrói parâmetros de query string
   */
  protected buildQueryParams(params?: QueryParams): Record<string, any> {
    if (!params) return {};
    
    const queryParams: Record<string, any> = {};
    
    if (params.orderBy) queryParams.orderBy = params.orderBy;
    if (params.view) queryParams.view = params.view;
    if (params.municipio) queryParams.municipio = params.municipio;
    
    return queryParams;
  }
}
