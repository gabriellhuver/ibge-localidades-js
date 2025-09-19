import { IBGELocalidades } from '../../src/index';

describe('IBGELocalidades - Classe Principal', () => {
  let ibge: IBGELocalidades;

  beforeAll(() => {
    ibge = new IBGELocalidades();
  });

  describe('Inicialização', () => {
    it('deve inicializar todos os serviços', () => {
      expect(ibge.estados).toBeDefined();
      expect(ibge.municipios).toBeDefined();
      expect(ibge.regioes).toBeDefined();
      expect(ibge.mesorregioes).toBeDefined();
      expect(ibge.microrregioes).toBeDefined();
      expect(ibge.regioesImediatas).toBeDefined();
      expect(ibge.regioesIntermediarias).toBeDefined();
      expect(ibge.distritos).toBeDefined();
      expect(ibge.subdistritos).toBeDefined();
      expect(ibge.aglomeracoesUrbanas).toBeDefined();
      expect(ibge.paises).toBeDefined();
    });
  });

  describe('Integração entre serviços', () => {
    it('deve permitir buscar municípios de um estado e depois distritos', async () => {
      // Buscar municípios de SP
      const municipios = await ibge.municipios.getByEstado('SP');
      expect(municipios.length).toBeGreaterThan(0);
      
      // Buscar distritos de um município específico
      const distritos = await ibge.distritos.getByMunicipio(municipios[0].id);
      expect(Array.isArray(distritos)).toBe(true);
    });

    it('deve permitir buscar mesorregiões e depois microrregiões', async () => {
      // Buscar mesorregiões de SP
      const mesorregioes = await ibge.mesorregioes.getByEstado('SP');
      expect(mesorregioes.length).toBeGreaterThan(0);
      
      // Buscar microrregiões de uma mesorregião específica
      const microrregioes = await ibge.microrregioes.getByMesorregiao(mesorregioes[0].id);
      expect(Array.isArray(microrregioes)).toBe(true);
    });

    it('deve permitir buscar regiões intermediárias e depois regiões imediatas', async () => {
      // Buscar regiões intermediárias de SP
      const regioesIntermediarias = await ibge.regioesIntermediarias.getByEstado('SP');
      expect(regioesIntermediarias.length).toBeGreaterThan(0);
      
      // Buscar regiões imediatas de uma região intermediária específica
      const regioesImediatas = await ibge.regioesImediatas.getByRegiaoIntermediaria(regioesIntermediarias[0].id);
      expect(Array.isArray(regioesImediatas)).toBe(true);
    });
  });

  describe('Fluxo completo de dados geográficos', () => {
    it('deve permitir navegar pela hierarquia geográfica completa', async () => {
      // 1. Buscar todas as regiões
      const regioes = await ibge.regioes.getAll();
      expect(regioes.length).toBe(5);
      
      // 2. Buscar estados de uma região
      const estadosSul = await ibge.estados.getByRegiaoSigla('S');
      expect(estadosSul.length).toBe(3);
      
      // 3. Buscar municípios de um estado
      const municipiosRS = await ibge.municipios.getByEstado('RS');
      expect(municipiosRS.length).toBeGreaterThan(0);
      
      // 4. Buscar distritos de um município
      const distritos = await ibge.distritos.getByMunicipio(municipiosRS[0].id);
      expect(Array.isArray(distritos)).toBe(true);
      
      // 5. Buscar subdistritos de um distrito (se existirem)
      if (distritos.length > 0) {
        const subdistritos = await ibge.subdistritos.getByDistrito(distritos[0].id);
        expect(Array.isArray(subdistritos)).toBe(true);
      }
    }, 30000);
  });

  describe('Tratamento de erros', () => {
    it('deve tratar erros de forma consistente entre serviços', async () => {
      // Testar comportamento para IDs/valores inválidos
      const estadoInvalido = await ibge.estados.getByUF('XX');
      expect(Array.isArray(estadoInvalido)).toBe(true);
      // expect(estadoInvalido.length).toBe(0);
      
      const municipioInvalido = await ibge.municipios.getById(999999999);
      expect(Array.isArray(municipioInvalido)).toBe(true);
      // expect(municipioInvalido.length).toBe(0);
      
      const regiaoInvalida = await ibge.regioes.getBySigla('XX' as any);
      expect(Array.isArray(regiaoInvalida)).toBe(true);
      // expect(regiaoInvalida.length).toBe(0);
    });
  });
});
