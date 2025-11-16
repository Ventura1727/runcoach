import { QuizPergunta, PlanoTreino, DicaAquecimento } from './types';

export const quizPerguntas: QuizPergunta[] = [
  {
    id: 'experiencia',
    pergunta: 'Qual sua experiência com corridas?',
    opcoes: [
      { valor: 'nunca_corri', texto: 'Nunca corri regularmente' },
      { valor: 'menos_6_meses', texto: 'Corro há menos de 6 meses' },
      { valor: '6_meses_2_anos', texto: 'Corro entre 6 meses e 2 anos' },
      { valor: 'mais_2_anos', texto: 'Corro há mais de 2 anos' }
    ]
  },
  {
    id: 'objetivo',
    pergunta: 'Qual seu principal objetivo?',
    opcoes: [
      { valor: 'perder_peso', texto: 'Perder peso e melhorar saúde' },
      { valor: 'melhorar_condicionamento', texto: 'Melhorar condicionamento físico' },
      { valor: 'correr_5k', texto: 'Conseguir correr 5km' },
      { valor: 'correr_10k', texto: 'Conseguir correr 10km' },
      { valor: 'meia_maratona', texto: 'Correr uma meia maratona (21km)' },
      { valor: 'maratona', texto: 'Correr uma maratona (42km)' }
    ]
  },
  {
    id: 'frequencia_atual',
    pergunta: 'Com que frequência você se exercita atualmente?',
    opcoes: [
      { valor: 'nenhuma', texto: 'Não me exercito regularmente' },
      { valor: '1_2_vezes', texto: '1-2 vezes por semana' },
      { valor: '3_4_vezes', texto: '3-4 vezes por semana' },
      { valor: '5_mais_vezes', texto: '5 ou mais vezes por semana' }
    ]
  },
  {
    id: 'tempo_disponivel',
    pergunta: 'Quanto tempo você tem disponível para treinar?',
    opcoes: [
      { valor: '20_30min', texto: '20-30 minutos por sessão' },
      { valor: '30_45min', texto: '30-45 minutos por sessão' },
      { valor: '45_60min', texto: '45-60 minutos por sessão' },
      { valor: 'mais_60min', texto: 'Mais de 60 minutos por sessão' }
    ]
  }
];

export const dicasAquecimento: DicaAquecimento[] = [
  {
    nome: 'Aquecimento Dinâmico',
    duracao: '10-15 minutos',
    descricao: 'Movimentos ativos para preparar músculos e articulações',
    beneficios: [
      'Aumenta temperatura corporal',
      'Melhora flexibilidade',
      'Reduz risco de lesões',
      'Prepara sistema cardiovascular'
    ]
  },
  {
    nome: 'Caminhada Progressiva',
    duracao: '5-8 minutos',
    descricao: 'Comece caminhando devagar e aumente gradualmente o ritmo',
    beneficios: [
      'Transição suave para corrida',
      'Ativa circulação sanguínea',
      'Prepara músculos das pernas'
    ]
  },
  {
    nome: 'Exercícios de Mobilidade',
    duracao: '8-10 minutos',
    descricao: 'Círculos com braços, elevação de joelhos, calcanhar ao glúteo',
    beneficios: [
      'Melhora amplitude de movimento',
      'Ativa músculos estabilizadores',
      'Prepara articulações'
    ]
  }
];

export function determinarNivel(respostas: any): 'iniciante' | 'intermediario' | 'avancado' {
  const { experiencia, frequencia_atual } = respostas;
  
  if (experiencia === 'nunca_corri' || frequencia_atual === 'nenhuma') {
    return 'iniciante';
  }
  
  if (experiencia === 'mais_2_anos' && (frequencia_atual === '3_4_vezes' || frequencia_atual === '5_mais_vezes')) {
    return 'avancado';
  }
  
  return 'intermediario';
}

export function obterPlanoPersonalizado(respostas: any): PlanoTreino {
  const { experiencia, objetivo, frequencia_atual, tempo_disponivel } = respostas;
  const nivel = determinarNivel(respostas);
  
  // Determinar configurações base
  let frequenciaSemanal = '3x por semana';
  let tempoSessao = '30-45 minutos';
  let duracaoSemanas = 12;
  
  // Ajustar baseado no tempo disponível
  switch (tempo_disponivel) {
    case '20_30min':
      tempoSessao = '20-30 minutos';
      break;
    case '30_45min':
      tempoSessao = '30-45 minutos';
      break;
    case '45_60min':
      tempoSessao = '45-60 minutos';
      break;
    case 'mais_60min':
      tempoSessao = '60-90 minutos';
      break;
  }
  
  // Ajustar frequência baseado na disponibilidade atual
  switch (frequencia_atual) {
    case '1_2_vezes':
      frequenciaSemanal = '2-3x por semana';
      break;
    case '3_4_vezes':
      frequenciaSemanal = '3-4x por semana';
      break;
    case '5_mais_vezes':
      frequenciaSemanal = '4-5x por semana';
      break;
  }
  
  // Criar plano baseado na experiência - LÓGICA ATUALIZADA
  if (experiencia === 'nunca_corri' || nivel === 'iniciante') {
    return criarPlanoIniciante(objetivo, frequenciaSemanal, tempoSessao, duracaoSemanas);
  } else if (experiencia === 'mais_2_anos' || nivel === 'avancado') {
    return criarPlanoAvancadoInteligente(objetivo, frequenciaSemanal, tempoSessao, duracaoSemanas, tempo_disponivel);
  } else {
    return criarPlanoIntermediarioInteligente(objetivo, frequenciaSemanal, tempoSessao, duracaoSemanas, tempo_disponivel);
  }
}

function criarPlanoIniciante(objetivo: string, frequencia: string, tempo: string, duracao: number): PlanoTreino {
  return {
    nivel: 'Iniciante',
    objetivo: obterObjetivoTexto(objetivo),
    duracao_semanas: duracao,
    frequencia_semanal: frequencia,
    tempo_sessao: tempo,
    intensidade: 'Baixa a moderada - foco na adaptação',
    exercicios_complementares: [
      'Caminhada rápida 5-10min (aquecimento)',
      'Agachamentos 2x10-15',
      'Prancha 30-60s',
      'Alongamento 10-15min',
      'Fortalecimento core 2x/semana'
    ],
    progressao: [
      'Semanas 1-2: Alternar 1min corrida + 2min caminhada (15-20min total)',
      'Semanas 3-4: Alternar 2min corrida + 1min caminhada (20-25min total)',
      'Semanas 5-6: Alternar 5min corrida + 1min caminhada (25-30min total)',
      'Semanas 7-8: Correr 15-20min contínuos',
      'Semanas 9+: Aumentar 2-3min por semana até atingir objetivo'
    ]
  };
}

function criarPlanoIntermediarioInteligente(objetivo: string, frequencia: string, tempo: string, duracao: number, tempoDisponivel: string): PlanoTreino {
  const temLongoDisponivel = tempoDisponivel === '45_60min' || tempoDisponivel === 'mais_60min';
  const tempoLimitado = tempoDisponivel === '20_30min';
  
  const exerciciosBase = [
    'Corrida base em ritmo confortável (60% dos treinos)',
    'Treino intervalado curto 1x/semana (ex: 6x2min)',
    'Fortalecimento pernas 2x/semana',
    'Core training 15-20min',
    'Mobilidade e alongamento pós-treino'
  ];
  
  const progressaoBase = [
    'Base aeróbica: 60% dos treinos em ritmo conversacional',
    'Treino intervalado: 1x/semana (progressão: 4x2min → 6x3min → 8x2min)',
    'Treino tempo: 1x/semana (ritmo moderadamente forte por 15-25min)',
    'Recuperação ativa: corrida regenerativa 20-25min'
  ];
  
  if (temLongoDisponivel) {
    exerciciosBase.push('Corrida longa 1x/semana (45-75min)');
    progressaoBase.push('Corrida longa: aumentar 5-10min a cada 2 semanas');
    progressaoBase.push('Fartlek: 1x/semana alternando ritmos por 30-40min');
  } else if (tempoLimitado) {
    exerciciosBase.push('Treino intervalado intenso (HIIT) 1x/semana');
    progressaoBase.push('HIIT: 8x30s forte + 90s recuperação');
  } else {
    exerciciosBase.push('Treino contínuo moderado 1x/semana');
    progressaoBase.push('Progressão: aumentar 3-5min por semana');
  }
  
  return {
    nivel: 'Intermediário',
    objetivo: obterObjetivoTexto(objetivo),
    duracao_semanas: duracao,
    frequencia_semanal: frequencia,
    tempo_sessao: tempo,
    intensidade: 'Moderada com variações estruturadas',
    exercicios_complementares: exerciciosBase,
    progressao: progressaoBase
  };
}

function criarPlanoAvancadoInteligente(objetivo: string, frequencia: string, tempo: string, duracao: number, tempoDisponivel: string): PlanoTreino {
  const temLongoDisponivel = tempoDisponivel === '45_60min' || tempoDisponivel === 'mais_60min';
  const tempoLimitado = tempoDisponivel === '20_30min';
  
  // USUÁRIOS COM +2 ANOS: SEM CAMINHADA, TREINOS ESPECÍFICOS
  const exerciciosAvancados = [
    'Treino intervalado de velocidade 1x/semana',
    'Treino de limiar anaeróbio 1x/semana',
    'Treino de força específica para corrida 2x/semana',
    'Pliometria e exercícios explosivos 1x/semana',
    'Mobilidade e prevenção de lesões diariamente'
  ];
  
  const progressaoAvancada = [
    'Base aeróbica: 70% do volume em zona 1-2 (ritmo conversacional)',
    'Treinos de qualidade: 25% (intervalos, tempo, fartlek estruturado)',
    'Recuperação ativa: 5% em ritmo muito leve'
  ];
  
  if (temLongoDisponivel) {
    // Usuários com tempo para treinos longos
    exerciciosAvancados.push('Corrida longa 1x/semana (75-120min)');
    exerciciosAvancados.push('Treino de ritmo específico conforme objetivo');
    
    progressaoAvancada.push('Corrida longa: progressão semanal de 10-15min');
    progressaoAvancada.push('Intervalos longos: 5x1000m, 4x1500m, 3x2000m');
    progressaoAvancada.push('Treino de tempo: 2x15min, 3x10min, 1x30min');
    progressaoAvancada.push('Fartlek estruturado: variações de 1-5min');
    
  } else if (tempoLimitado) {
    // Usuários com pouco tempo: treinos intensos e eficientes
    exerciciosAvancados.push('HIIT de alta intensidade 2x/semana');
    exerciciosAvancados.push('Treino de velocidade pura 1x/semana');
    
    progressaoAvancada.push('HIIT: 10x30s máximo + 90s recuperação');
    progressaoAvancada.push('Intervalos curtos: 8x200m, 6x300m, 4x400m');
    progressaoAvancada.push('Hill repeats: 6-10x subidas de 60-90s');
    
  } else {
    // Tempo médio: combinação equilibrada
    exerciciosAvancados.push('Treino misto: longo moderado + intervalos');
    exerciciosAvancados.push('Corrida de tempo 1x/semana (35-50min)');
    
    progressaoAvancada.push('Treino misto: 20min base + 6x2min forte');
    progressaoAvancada.push('Tempo run: 25-40min em ritmo de prova');
    progressaoAvancada.push('Progressão semanal: +5-8min no volume total');
  }
  
  // Periodização para usuários avançados
  progressaoAvancada.push('Periodização: 3 semanas build + 1 semana recovery');
  progressaoAvancada.push('Microciclos: variar intensidade e volume semanalmente');
  
  return {
    nivel: 'Avançado',
    objetivo: obterObjetivoTexto(objetivo),
    duracao_semanas: duracao,
    frequencia_semanal: frequencia,
    tempo_sessao: tempo,
    intensidade: 'Alta com periodização e especificidade',
    exercicios_complementares: exerciciosAvancados,
    progressao: progressaoAvancada
  };
}

function obterObjetivoTexto(objetivo: string): string {
  switch (objetivo) {
    case 'perder_peso':
      return 'Perda de peso através da corrida';
    case 'melhorar_condicionamento':
      return 'Melhorar condicionamento cardiovascular';
    case 'correr_5k':
      return 'Completar 5km sem parar';
    case 'correr_10k':
      return 'Completar 10km com bom tempo';
    case 'meia_maratona':
      return 'Completar 21km (meia maratona)';
    case 'maratona':
      return 'Completar 42km (maratona)';
    default:
      return 'Melhorar performance na corrida';
  }
}