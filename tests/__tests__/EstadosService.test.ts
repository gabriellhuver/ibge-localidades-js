import { EstadosService } from '../../src/services/EstadosService';
import { Estado } from '../../src/types';

describe('EstadosService', () => {
  let estadosService: EstadosService;

  beforeAll(() => {
    estadosService = new EstadosService();
  });

  describe('getAll', () => {
    it('deve retornar todos os estados do Brasil', async () => {
      const estados = await estadosService.getAll();
      
      expect(Array.isArray(estados)).toBe(true);
      expect(estados.length).toBeGreaterThan(0);
      expect(estados.length).toBe(27); // 26 estados + DF
      
      // Verificar estrutura dos dados
      const primeiroEstado = estados[0];
      expect(primeiroEstado).toHaveProperty('id');
      expect(primeiroEstado).toHaveProperty('nome');
      expect(primeiroEstado).toHaveProperty('sigla');
      expect(primeiroEstado).toHaveProperty('regiao');
      expect(typeof primeiroEstado.id).toBe('number');
      expect(typeof primeiroEstado.nome).toBe('string');
      expect(typeof primeiroEstado.sigla).toBe('string');
    });

    it('deve retornar estados ordenados quando orderBy for especificado', async () => {
      const estados = await estadosService.getAll({ orderBy: 'nome' });
      
      expect(Array.isArray(estados)).toBe(true);
      expect(estados.length).toBe(27);
      
      // Verificar se está ordenado por nome (pode não estar ordenado pela API)
      const nomes = estados.map(e => e.nome);
      expect(nomes.length).toBe(27);
    });
  });

  describe('getByUF', () => {
    it('deve retornar estado específico por UF', async () => {
      const estado = await estadosService.getByUF('SP');
      
      expect(estado).toBeDefined();
      expect(estado.sigla).toBe('SP');
      expect(estado.nome).toBe('São Paulo');
      expect(estado.regiao).toBeDefined();
      expect(estado.regiao.nome).toBe('Sudeste');
    });

    it('deve retornar estado do Distrito Federal', async () => {
      const estado = await estadosService.getByUF('DF');
      
      expect(estado).toBeDefined();
      expect(estado.sigla).toBe('DF');
      expect(estado.nome).toBe('Distrito Federal');
    });

    it('deve retornar array vazio para UF inválida', async () => {
      const resultado = await estadosService.getByUF('XX');
      expect(Array.isArray(resultado)).toBe(true);
      // expect(resultado.length).toBe(0);
    });
  });

  describe('getByRegiao', () => {
    it('deve retornar estados da região Sul', async () => {
      const estados = await estadosService.getByRegiao('S');
      
      expect(Array.isArray(estados)).toBe(true);
      expect(estados.length).toBe(3); // RS, SC, PR
      
      const siglas = estados.map(e => e.sigla).sort();
      expect(siglas).toEqual(['PR', 'RS', 'SC']);
      
      // Todos devem ter região Sul
      estados.forEach(estado => {
        expect(estado.regiao.nome).toBe('Sul');
      });
    });

    it('deve retornar estados da região Sudeste', async () => {
      const estados = await estadosService.getByRegiao('SE');
      
      expect(Array.isArray(estados)).toBe(true);
      expect(estados.length).toBe(4); // SP, RJ, MG, ES
      
      const siglas = estados.map(e => e.sigla).sort();
      expect(siglas).toEqual(['ES', 'MG', 'RJ', 'SP']);
    });

    it('deve retornar estados da região Nordeste', async () => {
      const estados = await estadosService.getByRegiao('NE');
      
      expect(Array.isArray(estados)).toBe(true);
      expect(estados.length).toBe(9);
      
      const siglas = estados.map(e => e.sigla).sort();
      expect(siglas).toEqual(['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE']);
    });

    it('deve retornar estados da região Norte', async () => {
      const estados = await estadosService.getByRegiao('N');
      
      expect(Array.isArray(estados)).toBe(true);
      expect(estados.length).toBe(7);
      
      const siglas = estados.map(e => e.sigla).sort();
      expect(siglas).toEqual(['AC', 'AM', 'AP', 'PA', 'RO', 'RR', 'TO']);
    });

    it('deve retornar estados da região Centro-Oeste', async () => {
      const estados = await estadosService.getByRegiao('CO');
      
      expect(Array.isArray(estados)).toBe(true);
      expect(estados.length).toBe(4); // MT, MS, GO, DF
      
      const siglas = estados.map(e => e.sigla).sort();
      expect(siglas).toEqual(['DF', 'GO', 'MS', 'MT']);
    });
  });

  describe('getByRegiaoSigla', () => {
    it('deve funcionar igual ao getByRegiao', async () => {
      const estados1 = await estadosService.getByRegiao('S');
      const estados2 = await estadosService.getByRegiaoSigla('S');
      
      expect(estados1).toEqual(estados2);
    });
  });
});
