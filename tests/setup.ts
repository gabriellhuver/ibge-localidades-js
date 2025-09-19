// Configuração global para os testes
import axios from 'axios';

// Configurar timeout global para requisições HTTP
jest.setTimeout(30000);

// Mock do console para evitar logs desnecessários durante os testes
const originalConsole = console;
global.console = {
  ...originalConsole,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
};

// Configurar axios para testes
axios.defaults.timeout = 10000;
