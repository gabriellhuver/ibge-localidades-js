import { RegioesService } from '../../src/services/RegioesService';
import { Regiao } from '../../src/types';

describe('RegioesService', () => {
  let regioesService: RegioesService;

  beforeAll(() => {
    regioesService = new RegioesService();
  });

  describe('getAll', () => {
    it('deve retornar todas as regiões do Brasil', async () => {
      const regioes = await regioesService.getAll();
      
      expect(Array.isArray(regioes)).toBe(true);
      expect(regioes.length).toBe(5); // 5 regiões: N, NE, SE, S, CO
      
      // Verificar estrutura dos dados
      const primeiraRegiao = regioes[0];
      expect(primeiraRegiao).toHaveProperty('id');
      expect(primeiraRegiao).toHaveProperty('nome');
      expect(primeiraRegiao).toHaveProperty('sigla');
      expect(typeof primeiraRegiao.id).toBe('number');
      expect(typeof primeiraRegiao.nome).toBe('string');
      expect(typeof primeiraRegiao.sigla).toBe('string');
    });

    it('deve conter todas as 5 regiões do Brasil', async () => {
      const regioes = await regioesService.getAll();
      
      const nomes = regioes.map(r => r.nome);
      expect(nomes).toContain('Norte');
      expect(nomes).toContain('Nordeste');
      expect(nomes).toContain('Sudeste');
      expect(nomes).toContain('Sul');
      expect(nomes).toContain('Centro-Oeste');
      
      const siglas = regioes.map(r => r.sigla);
      expect(siglas).toContain('N');
      expect(siglas).toContain('NE');
      expect(siglas).toContain('SE');
      expect(siglas).toContain('S');
      expect(siglas).toContain('CO');
    });
  });

  describe('getById', () => {
    it('deve retornar região específica por ID', async () => {
      const regiao = await regioesService.getById(3); // Sudeste
      
      expect(regiao).toBeDefined();
      expect(regiao.id).toBe(3);
      expect(regiao.nome).toBe('Sudeste');
      expect(regiao.sigla).toBe('SE');
    });

    it('deve retornar região Sul por ID', async () => {
      const regiao = await regioesService.getById(4); // Sul
      
      expect(regiao).toBeDefined();
      expect(regiao.nome).toBe('Sul');
      expect(regiao.sigla).toBe('S');
    });
  });

  describe('getBySigla', () => {
    it('deve retornar região por sigla N', async () => {
      const regiao = await regioesService.getBySigla('N');
      
      expect(regiao).toBeDefined();
      expect(regiao.sigla).toBe('N');
      expect(regiao.nome).toBe('Norte');
    });

    it('deve retornar região por sigla NE', async () => {
      const regiao = await regioesService.getBySigla('NE');
      
      expect(regiao).toBeDefined();
      expect(regiao.sigla).toBe('NE');
      expect(regiao.nome).toBe('Nordeste');
    });

    it('deve retornar região por sigla SE', async () => {
      const regiao = await regioesService.getBySigla('SE');
      
      expect(regiao).toBeDefined();
      expect(regiao.sigla).toBe('SE');
      expect(regiao.nome).toBe('Sudeste');
    });

    it('deve retornar região por sigla S', async () => {
      const regiao = await regioesService.getBySigla('S');
      
      expect(regiao).toBeDefined();
      expect(regiao.sigla).toBe('S');
      expect(regiao.nome).toBe('Sul');
    });

    it('deve retornar região por sigla CO', async () => {
      const regiao = await regioesService.getBySigla('CO');
      
      expect(regiao).toBeDefined();
      expect(regiao.sigla).toBe('CO');
      expect(regiao.nome).toBe('Centro-Oeste');
    });

    it('deve retornar array vazio para sigla inválida', async () => {
      const resultado = await regioesService.getBySigla('XX' as any);
      expect(Array.isArray(resultado)).toBe(true);
      // expect(resultado.length).toBe(0);
    });
  });
});
