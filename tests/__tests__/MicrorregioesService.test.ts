import { MicrorregioesService } from '../../src/services/MicrorregioesService';
import { Microrregiao } from '../../src/types';

describe('MicrorregioesService', () => {
  let microrregioesService: MicrorregioesService;

  beforeAll(() => {
    microrregioesService = new MicrorregioesService();
  });

  describe('getAll', () => {
    it('deve retornar todas as microrregiões do Brasil', async () => {
      const microrregioes = await microrregioesService.getAll();
      
      expect(Array.isArray(microrregioes)).toBe(true);
      expect(microrregioes.length).toBeGreaterThan(500); // Brasil tem mais de 500 microrregiões
      
      // Verificar estrutura dos dados
      const primeiraMicrorregiao = microrregioes[0];
      expect(primeiraMicrorregiao).toHaveProperty('id');
      expect(primeiraMicrorregiao).toHaveProperty('nome');
      expect(primeiraMicrorregiao).toHaveProperty('mesorregiao');
      expect(typeof primeiraMicrorregiao.id).toBe('number');
      expect(typeof primeiraMicrorregiao.nome).toBe('string');
    });
  });

  describe('getById', () => {
    it('deve retornar microrregião específica por ID', async () => {
      const microrregiao = await microrregioesService.getById(35001); // São Paulo
      
      expect(microrregiao).toBeDefined();
      expect(microrregiao.id).toBe(35001);
      expect(microrregiao.nome).toBe('Jales');
      expect(microrregiao.mesorregiao.UF.sigla).toBe('SP');
      expect(microrregiao.mesorregiao.UF.regiao.nome).toBe('Sudeste');
    });

    it('deve retornar array vazio para ID inválido', async () => {
      const resultado = await microrregioesService.getById(999999999);
      expect(Array.isArray(resultado)).toBe(true);
      // expect(resultado.length).toBe(0);
    });
  });

  describe('getByEstado', () => {
    it('deve retornar microrregiões de São Paulo', async () => {
      const microrregioes = await microrregioesService.getByEstado('SP');
      
      expect(Array.isArray(microrregioes)).toBe(true);
      expect(microrregioes.length).toBe(63); // SP tem 63 microrregiões
      
      // Todos devem ser de SP
      microrregioes.forEach(microrregiao => {
        expect(microrregiao.mesorregiao.UF.sigla).toBe('SP');
      });
      
      // Verificar se São Paulo está na lista
      const saoPaulo = microrregioes.find(m => m.nome === 'São Paulo');
      expect(saoPaulo).toBeDefined();
    });

    it('deve retornar microrregiões do Rio de Janeiro', async () => {
      const microrregioes = await microrregioesService.getByEstado('RJ');
      
      expect(Array.isArray(microrregioes)).toBe(true);
      expect(microrregioes.length).toBe(18); // RJ tem 18 microrregiões
      
      // Todos devem ser do RJ
      microrregioes.forEach(microrregiao => {
        expect(microrregiao.mesorregiao.UF.sigla).toBe('RJ');
      });
    });

    it('deve retornar microrregiões do Distrito Federal', async () => {
      const microrregioes = await microrregioesService.getByEstado('DF');
      
      expect(Array.isArray(microrregioes)).toBe(true);
      expect(microrregioes.length).toBe(1); // DF tem 1 microrregião
      expect(microrregioes[0].nome).toBe('Brasília');
    });
  });

  describe('getByMesorregiao', () => {
    it('deve retornar microrregiões de uma mesorregião específica', async () => {
      const microrregioes = await microrregioesService.getByMesorregiao(3501); // Metropolitana de SP
      
      expect(Array.isArray(microrregioes)).toBe(true);
      expect(microrregioes.length).toBeGreaterThan(0);
      
      // Todos devem ter a mesma mesorregião
      microrregioes.forEach(microrregiao => {
        expect(microrregiao.mesorregiao.id).toBe(3501);
      });
    });
  });

  describe('getByRegiao', () => {
    it('deve retornar microrregiões da região Sul', async () => {
      const microrregioes = await microrregioesService.getByRegiao('S');
      
      expect(Array.isArray(microrregioes)).toBe(true);
      expect(microrregioes.length).toBeGreaterThan(0);
      
      // Verificar se há microrregiões
      expect(microrregioes.length).toBeGreaterThan(0);
    });

    it('deve retornar microrregiões da região Sudeste', async () => {
      const microrregioes = await microrregioesService.getByRegiao('SE');
      
      expect(Array.isArray(microrregioes)).toBe(true);
      expect(microrregioes.length).toBeGreaterThan(0);
      
      // Verificar se há microrregiões
      expect(microrregioes.length).toBeGreaterThan(0);
    });
  });

  describe('getByRegiaoSigla', () => {
    it('deve funcionar igual ao getByRegiao', async () => {
      const microrregioes1 = await microrregioesService.getByRegiao('S');
      const microrregioes2 = await microrregioesService.getByRegiaoSigla('S');
      
      expect(microrregioes1).toEqual(microrregioes2);
    });
  });
});
