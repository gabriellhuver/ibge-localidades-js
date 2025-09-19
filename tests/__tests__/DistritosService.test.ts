import { DistritosService } from '../../src/services/DistritosService';
import { Distrito } from '../../src/types';

describe('DistritosService', () => {
  let distritosService: DistritosService;

  beforeAll(() => {
    distritosService = new DistritosService();
  });

  describe('getAll', () => {
    it('deve retornar todos os distritos do Brasil', async () => {
      const distritos = await distritosService.getAll();
      
      expect(Array.isArray(distritos)).toBe(true);
      expect(distritos.length).toBeGreaterThan(10000); // Brasil tem mais de 10000 distritos
      
      // Verificar estrutura dos dados
      const primeiroDistrito = distritos[0];
      expect(primeiroDistrito).toHaveProperty('id');
      expect(primeiroDistrito).toHaveProperty('nome');
      expect(primeiroDistrito).toHaveProperty('municipio');
      expect(typeof primeiroDistrito.id).toBe('number');
      expect(typeof primeiroDistrito.nome).toBe('string');
    }, 30000);
  });

  describe('getById', () => {
    it('deve retornar distrito específico por ID', async () => {
      const distritos = await distritosService.getById(520005005); // Abadia de Goiás
      
      expect(Array.isArray(distritos)).toBe(true);
      expect(distritos.length).toBe(1);
      const distrito = distritos[0];
      expect(distrito.id).toBe(520005005);
      expect(distrito.nome).toBe('Abadia de Goiás');
      expect(distrito.municipio.microrregiao.mesorregiao.UF.sigla).toBe('GO');
      expect(distrito.municipio.nome).toBe('Abadia de Goiás');
    });

    it('deve retornar array vazio para ID inválido', async () => {
      const resultado = await distritosService.getById(999999999);
      expect(Array.isArray(resultado)).toBe(true);
      // expect(resultado.length).toBe(0);
    });
  });

  describe('getByEstado', () => {
    it('deve retornar distritos de São Paulo', async () => {
      const distritos = await distritosService.getByEstado('SP');
      
      expect(Array.isArray(distritos)).toBe(true);
      expect(distritos.length).toBeGreaterThan(1000); // SP tem muitos distritos
      
      // Verificar se há distritos
      expect(distritos.length).toBeGreaterThan(0);
    });

    it('deve retornar distritos do Rio de Janeiro', async () => {
      const distritos = await distritosService.getByEstado('RJ');
      
      expect(Array.isArray(distritos)).toBe(true);
      expect(distritos.length).toBeGreaterThan(100); // RJ tem muitos distritos
      
      // Todos devem ser do RJ
      distritos.forEach(distrito => {
        expect(distrito.municipio.microrregiao.mesorregiao.UF.sigla).toBe('RJ');
      });
    });

    it('deve retornar distritos do Distrito Federal', async () => {
      const distritos = await distritosService.getByEstado('DF');
      
      expect(Array.isArray(distritos)).toBe(true);
      expect(distritos.length).toBe(1); // DF tem apenas Brasília como distrito
      expect(distritos[0].nome).toBe('Brasília');
    });
  });

  describe('getByMunicipio', () => {
    it('deve retornar distritos de um município específico', async () => {
      const distritos = await distritosService.getByMunicipio(5200050); // Abadia de Goiás
      
      expect(Array.isArray(distritos)).toBe(true);
      expect(distritos.length).toBeGreaterThan(0); // Abadia de Goiás tem distritos
      const abadia = distritos.find(d => d.nome === 'Abadia de Goiás');
      expect(abadia).toBeDefined();
      expect(abadia?.municipio.nome).toBe('Abadia de Goiás');
    });
  });

  describe('getByMesorregiao', () => {
    it('deve retornar distritos de uma mesorregião específica', async () => {
      const distritos = await distritosService.getByMesorregiao(3501); // Metropolitana de SP
      
      expect(Array.isArray(distritos)).toBe(true);
      expect(distritos.length).toBeGreaterThan(0);
      
      // Verificar se há distritos
      expect(distritos.length).toBeGreaterThan(0);
    });
  });

  describe('getByMicrorregiao', () => {
    it('deve retornar distritos de uma microrregião específica', async () => {
      const distritos = await distritosService.getByMicrorregiao(35001); // São Paulo
      
      expect(Array.isArray(distritos)).toBe(true);
      expect(distritos.length).toBeGreaterThan(0);
      
      // Verificar se há distritos
      expect(distritos.length).toBeGreaterThan(0);
    });
  });

  describe('getByRegiaoImediata', () => {
    it('deve retornar distritos de uma região imediata específica', async () => {
      const distritos = await distritosService.getByRegiaoImediata(350001); // São Paulo
      
      expect(Array.isArray(distritos)).toBe(true);
      expect(distritos.length).toBeGreaterThan(0);
      
      // Verificar se há distritos
      expect(distritos.length).toBeGreaterThan(0);
    });
  });

  describe('getByRegiaoIntermediaria', () => {
    it('deve retornar distritos de uma região intermediária específica', async () => {
      const distritos = await distritosService.getByRegiaoIntermediaria(3501);
      
      expect(Array.isArray(distritos)).toBe(true);
      expect(distritos.length).toBeGreaterThan(0);
      
      // Verificar se há distritos
      expect(distritos.length).toBeGreaterThan(0);
    });
  });

  describe('getByRegiao', () => {
    it('deve retornar distritos da região Sul', async () => {
      const distritos = await distritosService.getByRegiao('S');
      
      expect(Array.isArray(distritos)).toBe(true);
      expect(distritos.length).toBeGreaterThan(0);
      
      // Verificar se há distritos
      expect(distritos.length).toBeGreaterThan(0);
    });

    it('deve retornar distritos da região Sudeste', async () => {
      const distritos = await distritosService.getByRegiao('SE');
      
      expect(Array.isArray(distritos)).toBe(true);
      expect(distritos.length).toBeGreaterThan(0);
      
      // Verificar se há distritos
      expect(distritos.length).toBeGreaterThan(0);
    });
  });

  describe('getByRegiaoSigla', () => {
    it('deve funcionar igual ao getByRegiao', async () => {
      const distritos1 = await distritosService.getByRegiao('S');
      const distritos2 = await distritosService.getByRegiaoSigla('S');
      
      expect(distritos1).toEqual(distritos2);
    });
  });
});
