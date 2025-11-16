// Tipos de dados do usuário
export interface DadosUsuario {
  experiencia: 'iniciante' | 'intermediario' | 'avancado';
  anosExperiencia?: number;
  objetivo: 'saude' | '5km' | '10km' | '21km' | '42km';
  disponibilidade: number; // horas por semana
  diasDisponiveis: number; // dias por semana
}

// Tipos de treino
export type TipoTreino = 'intervalado' | 'tiros' | 'regenerativa' | 'tempo' | 'longa' | 'fartlek' | 'base';

// Treino semanal
export interface TreinoSemanal {
  dia: string;
  tipo: TipoTreino;
  descricao: string;
  duracao: string;
  intensidade: 'baixa' | 'media' | 'alta';
  detalhes?: string;
}

// Plano de treino completo
export interface PlanoTreino {
  semana: number;
  treinos: TreinoSemanal[];
  observacoes?: string;
}

// Registro de treino realizado
export interface RegistroTreino {
  id: string;
  data: string;
  tipo: TipoTreino;
  duracao: number; // em minutos
  distancia?: number; // em km
  ritmo?: string; // ex: "5:30/km"
  sensacao: 'excelente' | 'boa' | 'regular' | 'ruim' | 'pessima';
  notas?: string;
  calorias?: number;
  frequenciaCardiacaMedia?: number;
  frequenciaCardiacaMaxima?: number;
  elevacaoGanho?: number; // em metros
  temperatura?: string;
  condicaoClimatica?: string;
  local?: string;
  hidratacao?: string;
}

// Estatísticas de treino
export interface EstatisticasTreino {
  totalTreinos: number;
  totalDistancia: number;
  totalTempo: number;
  mediaSemanal: number;
  tipoMaisFrequente: string;
}

// Dica de aquecimento
export interface DicaAquecimento {
  titulo: string;
  descricao: string;
  duracao: string;
  videoUrl?: string;
  imagemUrl?: string;
}
