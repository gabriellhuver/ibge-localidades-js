import { BaseService } from '../../src/services/BaseService';
import { QueryParams } from '../../src/types';

// Classe concreta para testar BaseService
class TestService extends BaseService {
  public async testGet(endpoint: string, params?: QueryParams) {
    return this.get(endpoint, params);
  }

  public async testGetByIdInternal(endpoint: string, id: string | number, params?: QueryParams) {
    return this.getByIdInternal(endpoint, id, params);
  }

  public async testGetByParent(parentEndpoint: string, parentId: string | number, childEndpoint: string, params?: QueryParams) {
    return this.getByParent(parentEndpoint, parentId, childEndpoint, params);
  }

  public testBuildQueryParams(params?: QueryParams) {
    return this.buildQueryParams(params);
  }
}

describe('BaseService', () => {
  let testService: TestService;

  beforeEach(() => {
    testService = new TestService();
  });

  describe('buildQueryParams', () => {
    it('deve retornar objeto vazio quando params é undefined', () => {
      const result = testService.testBuildQueryParams();
      expect(result).toEqual({});
    });

    it('deve retornar objeto vazio quando params é vazio', () => {
      const result = testService.testBuildQueryParams({});
      expect(result).toEqual({});
    });

    it('deve construir parâmetros de query corretamente', () => {
      const params: QueryParams = {
        orderBy: 'nome',
        view: 'nivelado',
        municipio: 3550308
      };

      const result = testService.testBuildQueryParams(params);
      
      expect(result).toEqual({
        orderBy: 'nome',
        view: 'nivelado',
        municipio: 3550308
      });
    });

    it('deve construir parâmetros parciais', () => {
      const params: QueryParams = {
        orderBy: 'nome'
      };

      const result = testService.testBuildQueryParams(params);
      
      expect(result).toEqual({
        orderBy: 'nome'
      });
    });
  });

  describe('getByIdInternal', () => {
    it('deve fazer requisição para endpoint correto', async () => {
      // Mock da requisição
      const mockData = { id: 1, nome: 'Test' };
      const getSpy = jest.spyOn(testService as any, 'get').mockResolvedValue(mockData);

      const result = await testService.testGetByIdInternal('/test', 123);

      expect(getSpy).toHaveBeenCalledWith('/test/123', undefined);
      expect(result).toEqual(mockData);
    });

    it('deve passar parâmetros corretamente', async () => {
      const mockData = { id: 1, nome: 'Test' };
      const params = { orderBy: 'nome' };
      const getSpy = jest.spyOn(testService as any, 'get').mockResolvedValue(mockData);

      await testService.testGetByIdInternal('/test', 123, params);

      expect(getSpy).toHaveBeenCalledWith('/test/123', params);
    });
  });

  describe('getByParent', () => {
    it('deve fazer requisição para endpoint de sub-recurso correto', async () => {
      const mockData = [{ id: 1, nome: 'Test' }];
      const getSpy = jest.spyOn(testService as any, 'get').mockResolvedValue(mockData);

      const result = await testService.testGetByParent('/estados', 'SP', 'municipios');

      expect(getSpy).toHaveBeenCalledWith('/estados/SP/municipios', undefined);
      expect(result).toEqual(mockData);
    });

    it('deve passar parâmetros corretamente', async () => {
      const mockData = [{ id: 1, nome: 'Test' }];
      const params = { orderBy: 'nome' };
      const getSpy = jest.spyOn(testService as any, 'get').mockResolvedValue(mockData);

      await testService.testGetByParent('/estados', 'SP', 'municipios', params);

      expect(getSpy).toHaveBeenCalledWith('/estados/SP/municipios', params);
    });
  });

  describe('get', () => {
    it('deve fazer requisição GET correta', async () => {
      const mockData = [{ id: 1, nome: 'Test' }];
      const mockGet = jest.spyOn(testService['api'], 'get').mockResolvedValue({ data: mockData });

      const result = await testService.testGet('/test');

      expect(mockGet).toHaveBeenCalledWith('/test', { params: undefined });
      expect(result).toEqual(mockData);
    });

    it('deve passar parâmetros corretamente', async () => {
      const mockData = [{ id: 1, nome: 'Test' }];
      const params = { orderBy: 'nome' };
      const mockGet = jest.spyOn(testService['api'], 'get').mockResolvedValue({ data: mockData });

      await testService.testGet('/test', params);

      expect(mockGet).toHaveBeenCalledWith('/test', { params });
    });

    it('deve tratar erros corretamente', async () => {
      const error = new Error('Network error');
      jest.spyOn(testService['api'], 'get').mockRejectedValue(error);

      await expect(testService.testGet('/test')).rejects.toThrow('Erro ao buscar dados: Error: Network error');
    });
  });

});
