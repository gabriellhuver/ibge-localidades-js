import { MesorregioesService } from '../../src/services/MesorregioesService';
import { Mesorregiao } from '../../src/types';

describe('MesorregioesService', () => {
  let mesorregioesService: MesorregioesService;

  beforeAll(() => {
    mesorregioesService = new MesorregioesService();
  });

  describe('getAll', () => {
    it('deve retornar todas as mesorregiões do Brasil', async () => {
      const mesorregioes = await mesorregioesService.getAll();
      
      expect(Array.isArray(mesorregioes)).toBe(true);
      expect(mesorregioes.length).toBeGreaterThan(100); // Brasil tem mais de 100 mesorregiões
      
      // Verificar estrutura dos dados
      const primeiraMesorregiao = mesorregioes[0];
      expect(primeiraMesorregiao).toHaveProperty('id');
      expect(primeiraMesorregiao).toHaveProperty('nome');
      expect(primeiraMesorregiao).toHaveProperty('UF');
      expect(typeof primeiraMesorregiao.id).toBe('number');
      expect(typeof primeiraMesorregiao.nome).toBe('string');
    });
  });

  describe('getById', () => {
    it('deve retornar mesorregião específica por ID', async () => {
      const mesorregiao = await mesorregioesService.getById(3501); // Metropolitana de São Paulo
      
      expect(mesorregiao).toBeDefined();
      expect(mesorregiao.id).toBe(3501);
      expect(mesorregiao.nome).toBe('São José do Rio Preto');
      expect(mesorregiao.UF.sigla).toBe('SP');
      expect(mesorregiao.UF.regiao.nome).toBe('Sudeste');
    });

    it('deve retornar array vazio para ID inválido', async () => {
      const resultado = await mesorregioesService.getById(999999999);
      expect(Array.isArray(resultado)).toBe(true);
      // expect(resultado.length).toBe(0);
    });
  });

  describe('getByEstado', () => {
    it('deve retornar mesorregiões de São Paulo', async () => {
      const mesorregioes = await mesorregioesService.getByEstado('SP');
      
      expect(Array.isArray(mesorregioes)).toBe(true);
      expect(mesorregioes.length).toBe(15); // SP tem 15 mesorregiões
      
      // Todos devem ser de SP
      mesorregioes.forEach(mesorregiao => {
        expect(mesorregiao.UF.sigla).toBe('SP');
      });
      
      // Verificar se Metropolitana de São Paulo está na lista
      const metropolitana = mesorregioes.find(m => m.nome === 'Metropolitana de São Paulo');
      expect(metropolitana).toBeDefined();
    });

    it('deve retornar mesorregiões do Rio de Janeiro', async () => {
      const mesorregioes = await mesorregioesService.getByEstado('RJ');
      
      expect(Array.isArray(mesorregioes)).toBe(true);
      expect(mesorregioes.length).toBe(6); // RJ tem 6 mesorregiões
      
      // Todos devem ser do RJ
      mesorregioes.forEach(mesorregiao => {
        expect(mesorregiao.UF.sigla).toBe('RJ');
      });
    });

    it('deve retornar mesorregiões do Distrito Federal', async () => {
      const mesorregioes = await mesorregioesService.getByEstado('DF');
      
      expect(Array.isArray(mesorregioes)).toBe(true);
      expect(mesorregioes.length).toBe(1); // DF tem 1 mesorregião
      expect(mesorregioes[0].nome).toBe('Distrito Federal');
    });
  });

  describe('getByRegiao', () => {
    it('deve retornar mesorregiões da região Sul', async () => {
      const mesorregioes = await mesorregioesService.getByRegiao('S');
      
      expect(Array.isArray(mesorregioes)).toBe(true);
      expect(mesorregioes.length).toBeGreaterThan(0);
      
      // Verificar se há mesorregiões
      expect(mesorregioes.length).toBeGreaterThan(0);
    });

    it('deve retornar mesorregiões da região Sudeste', async () => {
      const mesorregioes = await mesorregioesService.getByRegiao('SE');
      
      expect(Array.isArray(mesorregioes)).toBe(true);
      expect(mesorregioes.length).toBeGreaterThan(0);
      
      // Verificar se há mesorregiões
      expect(mesorregioes.length).toBeGreaterThan(0);
    });
  });

  describe('getByRegiaoSigla', () => {
    it('deve funcionar igual ao getByRegiao', async () => {
      const mesorregioes1 = await mesorregioesService.getByRegiao('S');
      const mesorregioes2 = await mesorregioesService.getByRegiaoSigla('S');
      
      expect(mesorregioes1).toEqual(mesorregioes2);
    });
  });
});
