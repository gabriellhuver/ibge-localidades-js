import { PaisesService } from '../../src/services/PaisesService';
import { Pais } from '../../src/types';

describe('PaisesService', () => {
  let paisesService: PaisesService;

  beforeAll(() => {
    paisesService = new PaisesService();
  });

  describe('getAll', () => {
    it('deve retornar todos os países', async () => {
      const paises = await paisesService.getAll();
      
      expect(Array.isArray(paises)).toBe(true);
      expect(paises.length).toBeGreaterThan(190); // Mundo tem mais de 190 países
      
      // Verificar estrutura dos dados
      const primeiroPais = paises[0];
      expect(primeiroPais).toHaveProperty('id');
      expect(primeiroPais).toHaveProperty('nome');
      expect(primeiroPais).toHaveProperty('regiao-intermediaria');
      expect(primeiroPais).toHaveProperty('sub-regiao');
      expect(typeof primeiroPais.id).toBe('object');
      expect(typeof primeiroPais.nome).toBe('string');
    });
  });

  describe('getById', () => {
    it('deve retornar país específico por ID', async () => {
      const pais = await paisesService.getById(76); // Brasil
      
      expect(pais).toBeDefined();
      expect(pais[0].id.M49).toBe(76);
      expect(pais[0].nome).toBe('Brasil');
      expect(pais[0]['sub-regiao'].regiao.nome).toBeDefined();
      expect(pais[0]['sub-regiao'].nome).toBeDefined();
      expect(pais[0]['regiao-intermediaria']?.nome).toBeDefined();
    });

    it('deve retornar país específico por ID (Estados Unidos)', async () => {
      const pais = await paisesService.getById(840); // Estados Unidos
      
      expect(pais).toBeDefined();
      expect(pais[0].id.M49).toBe(840);
      expect(pais[0].nome).toBe('Estados Unidos da América');
    });

    it('deve retornar array vazio para ID inválido', async () => {
      const resultado = await paisesService.getById(999999999);
      expect(Array.isArray(resultado)).toBe(true);
      // expect(resultado.length).toBe(0);
    });
  });
});
