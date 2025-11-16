'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Zap, Clock, TrendingUp, Heart, Target, Flame } from 'lucide-react';
import Link from 'next/link';

export default function TiposTreinoPage() {
  const tiposTreino = [
    {
      nome: 'Treino Intervalado',
      icon: Zap,
      cor: 'from-yellow-500 to-orange-600',
      descricao: 'Alternância entre períodos de alta intensidade e recuperação ativa.',
      exemplos: [
        '6x2min forte + 1min recuperação',
        '8x400m rápido + 200m caminhando',
        '5x3min intenso + 2min trote leve'
      ],
      beneficios: [
        'Melhora velocidade e potência',
        'Aumenta VO2 máximo',
        'Queima mais calorias',
        'Desenvolve resistência anaeróbica'
      ],
      quando: 'Ideal para 1-2x por semana, com pelo menos 48h de descanso entre sessões'
    },
    {
      nome: 'Treino de Tiros',
      icon: Flame,
      cor: 'from-red-500 to-pink-600',
      descricao: 'Corridas curtas em velocidade máxima ou próxima do máximo.',
      exemplos: [
        '10x100m sprint + 2min recuperação completa',
        '6x200m máximo + 3min caminhando',
        '8x30s sprint + 90s parado'
      ],
      beneficios: [
        'Desenvolve velocidade pura',
        'Melhora técnica de corrida',
        'Fortalece fibras musculares rápidas',
        'Aumenta potência muscular'
      ],
      quando: 'Recomendado 1x por semana após bom aquecimento, ideal para corredores intermediários/avançados'
    },
    {
      nome: 'Corrida Regenerativa',
      icon: Heart,
      cor: 'from-green-500 to-emerald-600',
      descricao: 'Corrida muito leve e confortável para recuperação ativa.',
      exemplos: [
        '20-30min em ritmo muito confortável',
        'Corrida onde você consegue conversar facilmente',
        'Ritmo 1-2min/km mais lento que seu ritmo normal'
      ],
      beneficios: [
        'Acelera recuperação muscular',
        'Mantém volume de treino sem fadiga',
        'Melhora circulação sanguínea',
        'Reduz rigidez muscular'
      ],
      quando: 'Ideal no dia seguinte a treinos intensos ou longos, 1-2x por semana'
    },
    {
      nome: 'Treino de Tempo (Tempo Run)',
      icon: Clock,
      cor: 'from-blue-500 to-indigo-600',
      descricao: 'Corrida contínua em ritmo moderadamente forte e sustentável.',
      exemplos: [
        '20-30min em ritmo de prova de 10km',
        '2x15min forte + 3min recuperação',
        '40min em ritmo confortavelmente difícil'
      ],
      beneficios: [
        'Melhora limiar de lactato',
        'Aumenta resistência aeróbica',
        'Treina ritmo de prova',
        'Desenvolve resistência mental'
      ],
      quando: 'Fundamental 1x por semana para corredores intermediários/avançados'
    },
    {
      nome: 'Corrida Longa',
      icon: TrendingUp,
      cor: 'from-purple-500 to-violet-600',
      descricao: 'Corrida contínua de maior duração em ritmo confortável.',
      exemplos: [
        '60-90min em ritmo conversacional',
        '15-25km em ritmo fácil',
        'Progressão gradual: +10min a cada 2 semanas'
      ],
      beneficios: [
        'Desenvolve resistência aeróbica',
        'Melhora eficiência energética',
        'Fortalece músculos e tendões',
        'Prepara mental para provas longas'
      ],
      quando: 'Essencial 1x por semana, geralmente no fim de semana quando há mais tempo'
    },
    {
      nome: 'Fartlek',
      icon: Target,
      cor: 'from-cyan-500 to-teal-600',
      descricao: 'Treino livre com variações de ritmo não estruturadas.',
      exemplos: [
        '40min alternando ritmos conforme sentir',
        'Acelerar em subidas, recuperar em descidas',
        '5min fácil + 3min forte + 2min fácil (repetir)'
      ],
      beneficios: [
        'Desenvolve adaptação a mudanças de ritmo',
        'Treino mental e físico',
        'Menos monótono que intervalos fixos',
        'Simula variações de provas'
      ],
      quando: 'Ótimo para 1x por semana, substitui treino intervalado ocasionalmente'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Tipos de Treino
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Entenda cada modalidade e como aplicar no seu treino
              </p>
            </div>
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tiposTreino.map((treino, index) => {
            const Icon = treino.icon;
            return (
              <Card key={index} className="bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${treino.cor} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl text-gray-800 dark:text-gray-200">
                        {treino.nome}
                      </CardTitle>
                      <CardDescription className="mt-2 text-gray-600 dark:text-gray-400">
                        {treino.descricao}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Exemplos */}
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Exemplos Práticos:
                    </h4>
                    <ul className="space-y-1">
                      {treino.exemplos.map((exemplo, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 pl-4 border-l-2 border-gray-300 dark:border-gray-600">
                          {exemplo}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefícios */}
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Benefícios:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {treino.beneficios.map((beneficio, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span>{beneficio}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quando usar */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-700 p-3 rounded-lg">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1 flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4" />
                      Quando Usar:
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {treino.quando}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Dicas Gerais */}
        <Card className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Zap className="w-6 h-6" />
              Dicas Importantes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎯</span>
              <p className="text-white/90">
                <strong>Variedade é essencial:</strong> Combine diferentes tipos de treino para desenvolvimento completo e evitar monotonia.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚡</span>
              <p className="text-white/90">
                <strong>Respeite a recuperação:</strong> Alterne treinos intensos com regenerativos. Descanso é parte do treino.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📈</span>
              <p className="text-white/90">
                <strong>Progressão gradual:</strong> Aumente intensidade e volume aos poucos. Regra 10%: não aumente mais que 10% por semana.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎧</span>
              <p className="text-white/90">
                <strong>Escute seu corpo:</strong> Dor persistente é sinal de alerta. Adapte o treino conforme necessário.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
