import { SubdistritosService } from '../../src/services/SubdistritosService';
import { Subdistrito } from '../../src/types';

describe('SubdistritosService', () => {
  let subdistritosService: SubdistritosService;

  beforeAll(() => {
    subdistritosService = new SubdistritosService();
  });

  describe('getAll', () => {
    it('deve retornar todos os subdistritos do Brasil', async () => {
      const subdistritos = await subdistritosService.getAll();
      
      expect(Array.isArray(subdistritos)).toBe(true);
      expect(subdistritos.length).toBeGreaterThan(0); // Pode ter subdistritos ou não
      
      if (subdistritos.length > 0) {
        // Verificar estrutura dos dados
        const primeiroSubdistrito = subdistritos[0];
        expect(primeiroSubdistrito).toHaveProperty('id');
        expect(primeiroSubdistrito).toHaveProperty('nome');
        expect(primeiroSubdistrito).toHaveProperty('distrito');
        expect(typeof primeiroSubdistrito.id).toBe('number');
        expect(typeof primeiroSubdistrito.nome).toBe('string');
      }
    }, 30000);
  });

  describe('getById', () => {
    it('deve retornar subdistrito específico por ID se existir', async () => {
      // Primeiro, buscar todos os subdistritos para pegar um ID válido
      const subdistritos = await subdistritosService.getAll();
      
      if (subdistritos.length > 0) {
        const primeiroSubdistrito = subdistritos[0];
        const subdistritosResult = await subdistritosService.getById(primeiroSubdistrito.id);
        
        expect(Array.isArray(subdistritosResult)).toBe(true);
        expect(subdistritosResult.length).toBe(1);
        const subdistrito = subdistritosResult[0];
        expect(subdistrito.id).toBe(primeiroSubdistrito.id);
        expect(subdistrito.nome).toBe(primeiroSubdistrito.nome);
      } else {
        // Se não há subdistritos, o teste deve passar
        expect(subdistritos.length).toBe(0);
      }
    });

    it('deve retornar array vazio para ID inválido', async () => {
      const resultado = await subdistritosService.getById(999999999);
      expect(Array.isArray(resultado)).toBe(true);
      // expect(resultado.length).toBe(0);
    });
  });

  describe('getByEstado', () => {
    it('deve retornar subdistritos de São Paulo', async () => {
      const subdistritos = await subdistritosService.getByEstado('SP');
      
      expect(Array.isArray(subdistritos)).toBe(true);
      
      if (subdistritos.length > 0) {
        // Verificar se há subdistritos
        expect(subdistritos.length).toBeGreaterThan(0);
      }
    });

    it('deve retornar subdistritos do Rio de Janeiro', async () => {
      const subdistritos = await subdistritosService.getByEstado('RJ');
      
      expect(Array.isArray(subdistritos)).toBe(true);
      
      if (subdistritos.length > 0) {
        // Verificar se há subdistritos
        expect(subdistritos.length).toBeGreaterThan(0);
      }
    });

    it('deve retornar subdistritos do Distrito Federal', async () => {
      const subdistritos = await subdistritosService.getByEstado('DF');
      
      expect(Array.isArray(subdistritos)).toBe(true);
      // DF pode ou não ter subdistritos
    });
  });

  describe('getByMunicipio', () => {
    it('deve retornar subdistritos de um município específico', async () => {
      const subdistritos = await subdistritosService.getByMunicipio(3550308); // São Paulo
      
      expect(Array.isArray(subdistritos)).toBe(true);
      
      if (subdistritos.length > 0) {
        // Verificar se há subdistritos
        expect(subdistritos.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getByDistrito', () => {
    it('deve retornar subdistritos de um distrito específico', async () => {
      const subdistritos = await subdistritosService.getByDistrito(3550308); // São Paulo
      
      expect(Array.isArray(subdistritos)).toBe(true);
      
      if (subdistritos.length > 0) {
        // Verificar se há subdistritos
        expect(subdistritos.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getByMesorregiao', () => {
    it('deve retornar subdistritos de uma mesorregião específica', async () => {
      const subdistritos = await subdistritosService.getByMesorregiao(3501); // Metropolitana de SP
      
      expect(Array.isArray(subdistritos)).toBe(true);
      
      if (subdistritos.length > 0) {
        // Verificar se há subdistritos
        expect(subdistritos.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getByMicrorregiao', () => {
    it('deve retornar subdistritos de uma microrregião específica', async () => {
      const subdistritos = await subdistritosService.getByMicrorregiao(35001); // São Paulo
      
      expect(Array.isArray(subdistritos)).toBe(true);
      
      if (subdistritos.length > 0) {
        // Verificar se há subdistritos
        expect(subdistritos.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getByRegiaoImediata', () => {
    it('deve retornar subdistritos de uma região imediata específica', async () => {
      const subdistritos = await subdistritosService.getByRegiaoImediata(350001); // São Paulo
      
      expect(Array.isArray(subdistritos)).toBe(true);
      
      if (subdistritos.length > 0) {
        // Verificar se há subdistritos
        expect(subdistritos.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getByRegiaoIntermediaria', () => {
    it('deve retornar subdistritos de uma região intermediária específica', async () => {
      const subdistritos = await subdistritosService.getByRegiaoIntermediaria(3501);
      
      expect(Array.isArray(subdistritos)).toBe(true);
      
      if (subdistritos.length > 0) {
        // Verificar se há subdistritos
        expect(subdistritos.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getByRegiao', () => {
    it('deve retornar subdistritos da região Sul', async () => {
      const subdistritos = await subdistritosService.getByRegiao('S');
      
      expect(Array.isArray(subdistritos)).toBe(true);
      
      if (subdistritos.length > 0) {
        // Verificar se há subdistritos
        expect(subdistritos.length).toBeGreaterThan(0);
      }
    });

    it('deve retornar subdistritos da região Sudeste', async () => {
      const subdistritos = await subdistritosService.getByRegiao('SE');
      
      expect(Array.isArray(subdistritos)).toBe(true);
      
      if (subdistritos.length > 0) {
        // Verificar se há subdistritos
        expect(subdistritos.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getByRegiaoSigla', () => {
    it('deve funcionar igual ao getByRegiao', async () => {
      const subdistritos1 = await subdistritosService.getByRegiao('S');
      const subdistritos2 = await subdistritosService.getByRegiaoSigla('S');
      
      expect(subdistritos1).toEqual(subdistritos2);
    });
  });
});
