'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { PlanoTreino } from '@/lib/types';
import { Clock, Calendar, Zap, Dumbbell, TrendingUp, Target, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface PlanoTreinoComponentProps {
  plano: PlanoTreino;
  nomeUsuario: string;
}

export default function PlanoTreinoComponent({ plano, nomeUsuario }: PlanoTreinoComponentProps) {
  return (
    <div className="space-y-6">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Seu Plano Personalizado
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
            Olá {nomeUsuario}! Aqui está seu plano de treino personalizado
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Informações Principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="text-lg px-4 py-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {plano.nivel}
                </Badge>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {plano.objetivo}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Duração</p>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{plano.duracao_semanas} semanas</p>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <Clock className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-sm text-gray-600 dark:text-gray-400">Frequência</p>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{plano.frequencia_semanal}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Detalhes do Treino */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <Clock className="w-5 h-5" />
                  Tempo por Sessão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{plano.tempo_sessao}</p>
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-gray-800 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <Zap className="w-5 h-5" />
                  Intensidade
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">{plano.intensidade}</p>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Link para Tipos de Treino */}
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-8 h-8 text-indigo-600" />
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      Entenda os Tipos de Treino
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Explicações detalhadas sobre intervalado, tiros, regenerativa e mais
                    </p>
                  </div>
                </div>
                <Link href="/tipos-treino">
                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                    Ver Tipos de Treino
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Exercícios Complementares */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                <Dumbbell className="w-5 h-5" />
                Exercícios Complementares
              </CardTitle>
              <CardDescription>
                Atividades importantes para complementar sua corrida
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plano.exercicios_complementares.map((exercicio, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                    <span className="text-gray-800 dark:text-gray-200">{exercicio}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progressão */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-400">
                <TrendingUp className="w-5 h-5" />
                Progressão do Treino
              </CardTitle>
              <CardDescription>
                Como evoluir ao longo das semanas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {plano.progressao.map((etapa, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 dark:text-gray-200">{etapa}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
