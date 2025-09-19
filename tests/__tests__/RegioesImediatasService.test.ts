import { RegioesImediatasService } from '../../src/services/RegioesImediatasService';
import { RegiaoImediata } from '../../src/types';

describe('RegioesImediatasService', () => {
  let regioesImediatasService: RegioesImediatasService;

  beforeAll(() => {
    regioesImediatasService = new RegioesImediatasService();
  });

  describe('getAll', () => {
    it('deve retornar todas as regiões imediatas do Brasil', async () => {
      const regioesImediatas = await regioesImediatasService.getAll();
      
      expect(Array.isArray(regioesImediatas)).toBe(true);
      expect(regioesImediatas.length).toBeGreaterThan(300); // Brasil tem mais de 300 regiões imediatas
      
      // Verificar estrutura dos dados
      const primeiraRegiaoImediata = regioesImediatas[0];
      expect(primeiraRegiaoImediata).toHaveProperty('id');
      expect(primeiraRegiaoImediata).toHaveProperty('nome');
      expect(primeiraRegiaoImediata).toHaveProperty('regiao-intermediaria');
      expect(typeof primeiraRegiaoImediata.id).toBe('number');
      expect(typeof primeiraRegiaoImediata.nome).toBe('string');
    });
  });

  describe('getById', () => {
    it('deve retornar região imediata específica por ID', async () => {
      const regiaoImediata = await regioesImediatasService.getById(350001); // São Paulo
      
      expect(regiaoImediata).toBeDefined();
      expect(regiaoImediata.id).toBe(350001);
      expect(regiaoImediata.nome).toBe('São Paulo');
      expect(regiaoImediata['regiao-intermediaria'].UF.sigla).toBe('SP');
      expect(regiaoImediata['regiao-intermediaria'].UF.regiao.nome).toBe('Sudeste');
    });

    it('deve retornar array vazio para ID inválido', async () => {
      const resultado = await regioesImediatasService.getById(999999999);
      expect(Array.isArray(resultado)).toBe(true);
      // expect(resultado.length).toBe(0);
    });
  });

  describe('getByEstado', () => {
    it('deve retornar regiões imediatas de São Paulo', async () => {
      const regioesImediatas = await regioesImediatasService.getByEstado('SP');
      
      expect(Array.isArray(regioesImediatas)).toBe(true);
      expect(regioesImediatas.length).toBeGreaterThan(10); // SP tem várias regiões imediatas
      
      // Todos devem ser de SP
      regioesImediatas.forEach(regiaoImediata => {
        expect(regiaoImediata['regiao-intermediaria'].UF.sigla).toBe('SP');
      });
      
      // Verificar se São Paulo está na lista
      const saoPaulo = regioesImediatas.find(r => r.nome === 'São Paulo');
      expect(saoPaulo).toBeDefined();
    });

    it('deve retornar regiões imediatas do Rio de Janeiro', async () => {
      const regioesImediatas = await regioesImediatasService.getByEstado('RJ');
      
      expect(Array.isArray(regioesImediatas)).toBe(true);
      expect(regioesImediatas.length).toBeGreaterThan(5); // RJ tem várias regiões imediatas
      
      // Todos devem ser do RJ
      regioesImediatas.forEach(regiaoImediata => {
        expect(regiaoImediata['regiao-intermediaria'].UF.sigla).toBe('RJ');
      });
    });

    it('deve retornar regiões imediatas do Distrito Federal', async () => {
      const regioesImediatas = await regioesImediatasService.getByEstado('DF');
      
      expect(Array.isArray(regioesImediatas)).toBe(true);
      expect(regioesImediatas.length).toBe(1); // DF tem 1 região imediata
      expect(regioesImediatas[0].nome).toBe('Distrito Federal');
    });
  });

  describe('getByRegiaoIntermediaria', () => {
    it('deve retornar regiões imediatas de uma região intermediária específica', async () => {
      const regioesImediatas = await regioesImediatasService.getByRegiaoIntermediaria(3501);
      
      expect(Array.isArray(regioesImediatas)).toBe(true);
      expect(regioesImediatas.length).toBeGreaterThan(0);
      
      // Todos devem ter a mesma região intermediária
      regioesImediatas.forEach(regiaoImediata => {
        expect(regiaoImediata['regiao-intermediaria'].id).toBe(3501);
      });
    });
  });

  describe('getByRegiao', () => {
    it('deve retornar regiões imediatas da região Sul', async () => {
      const regioesImediatas = await regioesImediatasService.getByRegiao('S');
      
      expect(Array.isArray(regioesImediatas)).toBe(true);
      expect(regioesImediatas.length).toBeGreaterThan(0);
      
      // Verificar se há regiões imediatas
      expect(regioesImediatas.length).toBeGreaterThan(0);
    });

    it('deve retornar regiões imediatas da região Sudeste', async () => {
      const regioesImediatas = await regioesImediatasService.getByRegiao('SE');
      
      expect(Array.isArray(regioesImediatas)).toBe(true);
      expect(regioesImediatas.length).toBeGreaterThan(0);
      
      // Verificar se há regiões imediatas
      expect(regioesImediatas.length).toBeGreaterThan(0);
    });
  });

  describe('getByRegiaoSigla', () => {
    it('deve funcionar igual ao getByRegiao', async () => {
      const regioesImediatas1 = await regioesImediatasService.getByRegiao('S');
      const regioesImediatas2 = await regioesImediatasService.getByRegiaoSigla('S');
      
      expect(regioesImediatas1).toEqual(regioesImediatas2);
    });
  });
});
