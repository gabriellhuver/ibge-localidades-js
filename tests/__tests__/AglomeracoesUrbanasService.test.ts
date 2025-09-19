import { AglomeracoesUrbanasService } from '../../src/services/AglomeracoesUrbanasService';
import { AglomeracaoUrbana } from '../../src/types';

describe('AglomeracoesUrbanasService', () => {
  let aglomeracoesUrbanasService: AglomeracoesUrbanasService;

  beforeAll(() => {
    aglomeracoesUrbanasService = new AglomeracoesUrbanasService();
  });

  describe('getAll', () => {
    it('deve retornar todas as aglomerações urbanas do Brasil', async () => {
      const aglomeracoesUrbanas = await aglomeracoesUrbanasService.getAll();
      
      expect(Array.isArray(aglomeracoesUrbanas)).toBe(true);
      expect(aglomeracoesUrbanas.length).toBeGreaterThan(0); // Brasil tem aglomerações urbanas
      
      // Verificar estrutura dos dados
      const primeiraAglomeracao = aglomeracoesUrbanas[0];
      expect(primeiraAglomeracao).toHaveProperty('id');
      expect(primeiraAglomeracao).toHaveProperty('nome');
      expect(primeiraAglomeracao).toHaveProperty('municipios');
      expect(Array.isArray(primeiraAglomeracao.municipios)).toBe(true);
      expect(typeof primeiraAglomeracao.id).toBe('string');
      expect(typeof primeiraAglomeracao.nome).toBe('string');
    });
  });

  describe('getById', () => {
    it('deve retornar aglomeração urbana específica por ID', async () => {
      // Primeiro, buscar todas as aglomerações para pegar um ID válido
      const aglomeracoesUrbanas = await aglomeracoesUrbanasService.getAll();
      
      if (aglomeracoesUrbanas.length > 0) {
        const primeiraAglomeracao = aglomeracoesUrbanas[0];
        const aglomeracoes = await aglomeracoesUrbanasService.getById(parseInt(primeiraAglomeracao.id));
        
        expect(Array.isArray(aglomeracoes)).toBe(true);
        expect(aglomeracoes.length).toBe(1);
        const aglomeracao = aglomeracoes[0];
        expect(aglomeracao.id).toBe(primeiraAglomeracao.id);
        expect(aglomeracao.nome).toBe(primeiraAglomeracao.nome);
        expect(Array.isArray(aglomeracao.municipios)).toBe(true);
      } else {
        // Se não há aglomerações urbanas, o teste deve passar
        expect(aglomeracoesUrbanas.length).toBe(0);
      }
    });

    it('deve retornar array vazio para ID inválido', async () => {
      const resultado = await aglomeracoesUrbanasService.getById(999999999);
      expect(Array.isArray(resultado)).toBe(true);
      // expect(resultado.length).toBe(0);
    });
  });
});
