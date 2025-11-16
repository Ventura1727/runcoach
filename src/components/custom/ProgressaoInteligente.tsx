'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Usuario, PlanoTreino, RegistroTreino } from '@/lib/types';
import { TrendingUp, TrendingDown, Minus, AlertCircle, CheckCircle, Target, Calendar, Zap } from 'lucide-react';

interface ProgressaoInteligenteProps {
  usuario: Usuario;
  plano: PlanoTreino;
}

interface AvaliacaoSemanal {
  semana: number;
  metaTreinos: number;
  treinosRealizados: number;
  status: 'acima' | 'na_meta' | 'abaixo';
  recomendacao: string;
  ajuste: string;
}

export default function ProgressaoInteligente({ usuario, plano }: ProgressaoInteligenteProps) {
  const [treinos, setTreinos] = useState<RegistroTreino[]>([]);
  const [avaliacao, setAvaliacao] = useState<AvaliacaoSemanal | null>(null);
  const [semanaAtual, setSemanaAtual] = useState(1);

  useEffect(() => {
    // Carregar treinos do localStorage
    const treinosSalvos = localStorage.getItem('treinos');
    if (treinosSalvos) {
      setTreinos(JSON.parse(treinosSalvos));
    }

    // Calcular semana atual baseado na data de início (armazenada)
    const dataInicio = localStorage.getItem('dataInicioPlano');
    if (dataInicio) {
      const inicio = new Date(dataInicio);
      const hoje = new Date();
      const diffDias = Math.floor((hoje.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
      const semana = Math.floor(diffDias / 7) + 1;
      setSemanaAtual(Math.min(semana, plano.duracao_semanas));
    } else {
      // Primeira vez - definir data de início
      localStorage.setItem('dataInicioPlano', new Date().toISOString());
      setSemanaAtual(1);
    }
  }, [plano.duracao_semanas]);

  useEffect(() => {
    if (treinos.length > 0) {
      avaliarProgressao();
    }
  }, [treinos, semanaAtual]);

  const avaliarProgressao = () => {
    // Calcular meta de treinos baseado na frequência
    const metaTreinos = parseInt(plano.frequencia_semanal.match(/\d+/)?.[0] || '3');
    
    // Pegar treinos da semana atual
    const dataInicio = localStorage.getItem('dataInicioPlano');
    if (!dataInicio) return;

    const inicioSemana = new Date(dataInicio);
    inicioSemana.setDate(inicioSemana.getDate() + (semanaAtual - 1) * 7);
    const fimSemana = new Date(inicioSemana);
    fimSemana.setDate(fimSemana.getDate() + 7);

    const treinosSemana = treinos.filter(t => {
      const dataTreino = new Date(t.data);
      return dataTreino >= inicioSemana && dataTreino < fimSemana;
    });

    const treinosRealizados = treinosSemana.length;
    const percentual = (treinosRealizados / metaTreinos) * 100;

    let status: 'acima' | 'na_meta' | 'abaixo';
    let recomendacao: string;
    let ajuste: string;

    if (percentual >= 100) {
      status = 'acima';
      recomendacao = 'Excelente! Você está cumprindo ou superando suas metas.';
      ajuste = 'Próxima semana: Considere aumentar a intensidade ou duração dos treinos em 5-10%.';
    } else if (percentual >= 70) {
      status = 'na_meta';
      recomendacao = 'Bom trabalho! Você está no caminho certo.';
      ajuste = 'Próxima semana: Mantenha a consistência e tente completar todos os treinos planejados.';
    } else {
      status = 'abaixo';
      recomendacao = 'Atenção! Você está abaixo da meta semanal.';
      ajuste = 'Próxima semana: Foque em treinos mais curtos (20-25min) para manter a consistência. Qualidade > Quantidade.';
    }

    // Ajustes específicos por nível
    if (usuario.nivel === 'avancado' && status === 'acima') {
      ajuste = 'Próxima semana: Adicione 1 treino de qualidade (intervalado ou tempo) e aumente volume em 10%.';
    } else if (usuario.nivel === 'iniciante' && status === 'abaixo') {
      ajuste = 'Próxima semana: Reduza para 2 treinos de 20min. Foco na adaptação, não no volume.';
    }

    setAvaliacao({
      semana: semanaAtual,
      metaTreinos,
      treinosRealizados,
      status,
      recomendacao,
      ajuste
    });
  };

  const obterCorStatus = (status: 'acima' | 'na_meta' | 'abaixo') => {
    switch (status) {
      case 'acima':
        return 'from-green-500 to-emerald-600';
      case 'na_meta':
        return 'from-blue-500 to-indigo-600';
      case 'abaixo':
        return 'from-orange-500 to-red-600';
    }
  };

  const obterIconeStatus = (status: 'acima' | 'na_meta' | 'abaixo') => {
    switch (status) {
      case 'acima':
        return <TrendingUp className="w-6 h-6" />;
      case 'na_meta':
        return <Minus className="w-6 h-6" />;
      case 'abaixo':
        return <TrendingDown className="w-6 h-6" />;
    }
  };

  const progressoGeral = avaliacao 
    ? Math.min((avaliacao.treinosRealizados / avaliacao.metaTreinos) * 100, 100)
    : 0;

  return (
    <Card className="shadow-2xl border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl text-gray-800 dark:text-gray-200">
                Progressão Inteligente
              </CardTitle>
              <CardDescription>
                Acompanhamento automático do seu desempenho
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            Semana {semanaAtual}/{plano.duracao_semanas}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {avaliacao ? (
          <>
            {/* Status Atual */}
            <div className={`p-6 rounded-xl bg-gradient-to-r ${obterCorStatus(avaliacao.status)} text-white`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {obterIconeStatus(avaliacao.status)}
                  <div>
                    <h3 className="text-xl font-bold">
                      {avaliacao.treinosRealizados} de {avaliacao.metaTreinos} treinos
                    </h3>
                    <p className="text-white/90 text-sm">
                      {avaliacao.status === 'acima' && 'Superando expectativas!'}
                      {avaliacao.status === 'na_meta' && 'No caminho certo!'}
                      {avaliacao.status === 'abaixo' && 'Precisa de ajuste'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">{Math.round(progressoGeral)}%</p>
                  <p className="text-white/90 text-sm">da meta</p>
                </div>
              </div>
              <Progress value={progressoGeral} className="h-3 bg-white/30" />
            </div>

            {/* Recomendação */}
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                  <CheckCircle className="w-5 h-5" />
                  Avaliação da Semana
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {avaliacao.recomendacao}
                </p>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Dica:</strong> {avaliacao.ajuste}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Ajuste para Próxima Semana */}
            <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-400">
                  <Zap className="w-5 h-5" />
                  Plano para Semana {semanaAtual + 1}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {avaliacao.status === 'acima' && (
                  <>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Continue com {avaliacao.metaTreinos} treinos semanais
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Aumente intensidade: adicione 5-10min aos treinos longos
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Inclua 1 treino de qualidade (intervalado ou tempo)
                      </p>
                    </div>
                  </>
                )}
                {avaliacao.status === 'na_meta' && (
                  <>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Mantenha {avaliacao.metaTreinos} treinos semanais
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Progressão gradual: +3-5min nos treinos contínuos
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Foque na consistência e qualidade dos treinos
                      </p>
                    </div>
                  </>
                )}
                {avaliacao.status === 'abaixo' && (
                  <>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Reduza para 2-3 treinos mais curtos (20-25min)
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Priorize consistência sobre volume
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Evite treinos intensos - foque em base aeróbica
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="py-12 text-center">
              <Target className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Registre seus treinos para ver a progressão inteligente
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                O sistema irá avaliar automaticamente seu desempenho e ajustar o plano
              </p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
