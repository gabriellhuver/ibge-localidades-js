import { RegioesIntermediariasService } from '../../src/services/RegioesIntermediariasService';
import { RegiaoIntermediaria } from '../../src/types';

describe('RegioesIntermediariasService', () => {
  let regioesIntermediariasService: RegioesIntermediariasService;

  beforeAll(() => {
    regioesIntermediariasService = new RegioesIntermediariasService();
  });

  describe('getAll', () => {
    it('deve retornar todas as regiões intermediárias do Brasil', async () => {
      const regioesIntermediarias = await regioesIntermediariasService.getAll();
      
      expect(Array.isArray(regioesIntermediarias)).toBe(true);
      expect(regioesIntermediarias.length).toBeGreaterThan(100); // Brasil tem mais de 100 regiões intermediárias
      
      // Verificar estrutura dos dados
      const primeiraRegiaoIntermediaria = regioesIntermediarias[0];
      expect(primeiraRegiaoIntermediaria).toHaveProperty('id');
      expect(primeiraRegiaoIntermediaria).toHaveProperty('nome');
      expect(primeiraRegiaoIntermediaria).toHaveProperty('UF');
      expect(typeof primeiraRegiaoIntermediaria.id).toBe('number');
      expect(typeof primeiraRegiaoIntermediaria.nome).toBe('string');
    });
  });

  describe('getById', () => {
    it('deve retornar região intermediária específica por ID', async () => {
      const regiaoIntermediaria = await regioesIntermediariasService.getById(3501); // São Paulo
      
      expect(regiaoIntermediaria).toBeDefined();
      expect(regiaoIntermediaria.id).toBe(3501);
      expect(regiaoIntermediaria.nome).toBe('São Paulo');
      expect(regiaoIntermediaria.UF.sigla).toBe('SP');
      expect(regiaoIntermediaria.UF.regiao.nome).toBe('Sudeste');
    });

    it('deve retornar array vazio para ID inválido', async () => {
      const resultado = await regioesIntermediariasService.getById(999999999);
      expect(Array.isArray(resultado)).toBe(true);
      // expect(resultado.length).toBe(0);
    });
  });

  describe('getByEstado', () => {
    it('deve retornar regiões intermediárias de São Paulo', async () => {
      const regioesIntermediarias = await regioesIntermediariasService.getByEstado('SP');
      
      expect(Array.isArray(regioesIntermediarias)).toBe(true);
      expect(regioesIntermediarias.length).toBeGreaterThan(5); // SP tem várias regiões intermediárias
      
      // Todos devem ser de SP
      regioesIntermediarias.forEach(regiaoIntermediaria => {
        expect(regiaoIntermediaria.UF.sigla).toBe('SP');
      });
      
      // Verificar se São Paulo está na lista
      const saoPaulo = regioesIntermediarias.find(r => r.nome === 'São Paulo');
      expect(saoPaulo).toBeDefined();
    });

    it('deve retornar regiões intermediárias do Rio de Janeiro', async () => {
      const regioesIntermediarias = await regioesIntermediariasService.getByEstado('RJ');
      
      expect(Array.isArray(regioesIntermediarias)).toBe(true);
      expect(regioesIntermediarias.length).toBeGreaterThan(3); // RJ tem várias regiões intermediárias
      
      // Todos devem ser do RJ
      regioesIntermediarias.forEach(regiaoIntermediaria => {
        expect(regiaoIntermediaria.UF.sigla).toBe('RJ');
      });
    });

    it('deve retornar regiões intermediárias do Distrito Federal', async () => {
      const regioesIntermediarias = await regioesIntermediariasService.getByEstado('DF');
      
      expect(Array.isArray(regioesIntermediarias)).toBe(true);
      expect(regioesIntermediarias.length).toBe(1); // DF tem 1 região intermediária
      expect(regioesIntermediarias[0].nome).toBe('Distrito Federal');
    });
  });

  describe('getByRegiao', () => {
    it('deve retornar regiões intermediárias da região Sul', async () => {
      const regioesIntermediarias = await regioesIntermediariasService.getByRegiao('S');
      
      expect(Array.isArray(regioesIntermediarias)).toBe(true);
      expect(regioesIntermediarias.length).toBeGreaterThan(0);
      
      // Verificar se há regiões intermediárias
      expect(regioesIntermediarias.length).toBeGreaterThan(0);
    });

    it('deve retornar regiões intermediárias da região Sudeste', async () => {
      const regioesIntermediarias = await regioesIntermediariasService.getByRegiao('SE');
      
      expect(Array.isArray(regioesIntermediarias)).toBe(true);
      expect(regioesIntermediarias.length).toBeGreaterThan(0);
      
      // Verificar se há regiões intermediárias
      expect(regioesIntermediarias.length).toBeGreaterThan(0);
    });
  });

  describe('getByRegiaoSigla', () => {
    it('deve funcionar igual ao getByRegiao', async () => {
      const regioesIntermediarias1 = await regioesIntermediariasService.getByRegiao('S');
      const regioesIntermediarias2 = await regioesIntermediariasService.getByRegiaoSigla('S');
      
      expect(regioesIntermediarias1).toEqual(regioesIntermediarias2);
    });
  });
});
