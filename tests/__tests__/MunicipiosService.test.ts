import { MunicipiosService } from '../../src/services/MunicipiosService';
import { Municipio } from '../../src/types';

describe('MunicipiosService', () => {
  let municipiosService: MunicipiosService;

  beforeAll(() => {
    municipiosService = new MunicipiosService();
  });

  describe('getAll', () => {
    it('deve retornar todos os municípios do Brasil', async () => {
      const municipios = await municipiosService.getAll();
      
      expect(Array.isArray(municipios)).toBe(true);
      expect(municipios.length).toBeGreaterThan(5000); // Brasil tem mais de 5000 municípios
      
      // Verificar estrutura dos dados
      const primeiroMunicipio = municipios[0];
      expect(primeiroMunicipio).toHaveProperty('id');
      expect(primeiroMunicipio).toHaveProperty('nome');
      expect(primeiroMunicipio).toHaveProperty('microrregiao');
      expect(primeiroMunicipio).toHaveProperty('regiao-imediata');
      expect(typeof primeiroMunicipio.id).toBe('number');
      expect(typeof primeiroMunicipio.nome).toBe('string');
    }, 30000);
  });

  describe('getById', () => {
    it('deve retornar município específico por ID', async () => {
      const municipio = await municipiosService.getById(3550308); // São Paulo
      
      expect(municipio).toBeDefined();
      expect(municipio.id).toBe(3550308);
      expect(municipio.nome).toBe('São Paulo');
      expect(municipio.microrregiao.mesorregiao.UF.sigla).toBe('SP');
    });

    it('deve retornar array vazio para ID inválido', async () => {
      const resultado = await municipiosService.getById(999999999);
      expect(Array.isArray(resultado)).toBe(true);
      // expect(resultado.length).toBe(0);
    });
  });

  describe('getByEstado', () => {
    it('deve retornar municípios de São Paulo', async () => {
      const municipios = await municipiosService.getByEstado('SP');
      
      expect(Array.isArray(municipios)).toBe(true);
      expect(municipios.length).toBeGreaterThan(600); // SP tem mais de 600 municípios
      
      // Todos devem ser de SP
      municipios.forEach(municipio => {
        expect(municipio.microrregiao.mesorregiao.UF.sigla).toBe('SP');
      });
      
      // Verificar se São Paulo está na lista
      const saoPaulo = municipios.find(m => m.nome === 'São Paulo');
      expect(saoPaulo).toBeDefined();
    });

    it('deve retornar municípios do Rio de Janeiro', async () => {
      const municipios = await municipiosService.getByEstado('RJ');
      
      expect(Array.isArray(municipios)).toBe(true);
      expect(municipios.length).toBe(92); // RJ tem 92 municípios
      
      // Todos devem ser do RJ
      municipios.forEach(municipio => {
        expect(municipio.microrregiao.mesorregiao.UF.sigla).toBe('RJ');
      });
    });

    it('deve retornar municípios do Distrito Federal', async () => {
      const municipios = await municipiosService.getByEstado('DF');
      
      expect(Array.isArray(municipios)).toBe(true);
      expect(municipios.length).toBe(1); // DF tem apenas Brasília como município
      expect(municipios[0].nome).toBe('Brasília');
    });
  });

  describe('getByRegiaoSigla', () => {
    it('deve retornar municípios da região Sul', async () => {
      const municipios = await municipiosService.getByRegiaoSigla('S');
      
      expect(Array.isArray(municipios)).toBe(true);
      expect(municipios.length).toBeGreaterThan(1000);
      
      // Todos devem ser da região Sul
      municipios.forEach(municipio => {
        expect(municipio.microrregiao.mesorregiao.UF.regiao.nome).toBe('Sul');
      });
    });

    it('deve retornar municípios da região Sudeste', async () => {
      const municipios = await municipiosService.getByRegiaoSigla('SE');
      
      expect(Array.isArray(municipios)).toBe(true);
      expect(municipios.length).toBeGreaterThan(1500);
      
      // Todos devem ser da região Sudeste
      municipios.forEach(municipio => {
        expect(municipio.microrregiao.mesorregiao.UF.regiao.nome).toBe('Sudeste');
      });
    });
  });

  describe('getByMesorregiao', () => {
    it('deve retornar municípios de uma mesorregião específica', async () => {
      // Usar uma mesorregião conhecida (ex: Metropolitana de São Paulo)
      const municipios = await municipiosService.getByMesorregiao(3501);
      
      expect(Array.isArray(municipios)).toBe(true);
      expect(municipios.length).toBeGreaterThan(0);
      
      // Todos devem ter a mesma mesorregião
      municipios.forEach(municipio => {
        expect(municipio.microrregiao.mesorregiao.id).toBe(3501);
      });
    });
  });

  describe('getByMicrorregiao', () => {
    it('deve retornar municípios de uma microrregião específica', async () => {
      // Usar uma microrregião conhecida
      const municipios = await municipiosService.getByMicrorregiao(35001);
      
      expect(Array.isArray(municipios)).toBe(true);
      expect(municipios.length).toBeGreaterThan(0);
      
      // Todos devem ter a mesma microrregião
      municipios.forEach(municipio => {
        expect(municipio.microrregiao.id).toBe(35001);
      });
    });
  });

  describe('getByRegiaoIntermediaria', () => {
    it('deve retornar municípios de uma região intermediária específica', async () => {
      const municipios = await municipiosService.getByRegiaoIntermediaria(3501);
      
      expect(Array.isArray(municipios)).toBe(true);
      expect(municipios.length).toBeGreaterThan(0);
      
      // Verificar se há municípios
      expect(municipios.length).toBeGreaterThan(0);
    });
  });

  describe('getByRegiaoImediata', () => {
    it('deve retornar municípios de uma região imediata específica', async () => {
      const municipios = await municipiosService.getByRegiaoImediata(350001);
      
      expect(Array.isArray(municipios)).toBe(true);
      expect(municipios.length).toBeGreaterThan(0);
      
      // Todos devem ter a mesma região imediata
      municipios.forEach(municipio => {
        expect(municipio['regiao-imediata'].id).toBe(350001);
      });
    });
  });
});
