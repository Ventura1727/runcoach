'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Quiz from '@/components/custom/Quiz';
import PlanoTreinoComponent from '@/components/custom/PlanoTreino';
import DicasAquecimento from '@/components/custom/DicasAquecimento';
import RegistroTreinosComponent from '@/components/custom/RegistroTreinos';
import ProgressaoInteligente from '@/components/custom/ProgressaoInteligente';
import { obterPlanoPersonalizado } from '@/lib/running-data';
import { Usuario, PlanoTreino } from '@/lib/types';
import { Play, RotateCcw, Trophy, Flame, Target, BookOpen, Activity, TrendingUp, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [plano, setPlano] = useState<PlanoTreino | null>(null);
  const [etapaAtual, setEtapaAtual] = useState<'inicio' | 'quiz' | 'dashboard'>('inicio');

  // Carregar estado persistido do localStorage ao montar o componente
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');
    const planoSalvo = localStorage.getItem('plano');
    const etapaSalva = localStorage.getItem('etapaAtual');

    if (usuarioSalvo && planoSalvo && etapaSalva === 'dashboard') {
      setUsuario(JSON.parse(usuarioSalvo));
      setPlano(JSON.parse(planoSalvo));
      setEtapaAtual('dashboard');
    }
  }, []);

  const handleQuizComplete = (dadosUsuario: Usuario) => {
    setUsuario(dadosUsuario);
    const planoPersonalizado = obterPlanoPersonalizado(dadosUsuario);
    setPlano(planoPersonalizado);
    setEtapaAtual('dashboard');
    
    // Persistir no localStorage
    localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
    localStorage.setItem('plano', JSON.stringify(planoPersonalizado));
    localStorage.setItem('etapaAtual', 'dashboard');
  };

  const reiniciarQuiz = () => {
    setUsuario(null);
    setPlano(null);
    setEtapaAtual('quiz');
    
    // Limpar localStorage (exceto treinos)
    localStorage.removeItem('usuario');
    localStorage.removeItem('plano');
    localStorage.setItem('etapaAtual', 'quiz');
  };

  const voltarInicio = () => {
    setUsuario(null);
    setPlano(null);
    setEtapaAtual('inicio');
    
    // Limpar localStorage completamente (exceto treinos)
    localStorage.removeItem('usuario');
    localStorage.removeItem('plano');
    localStorage.removeItem('etapaAtual');
  };

  if (etapaAtual === 'quiz') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
        <Quiz onComplete={handleQuizComplete} onVoltar={voltarInicio} />
      </div>
    );
  }

  if (etapaAtual === 'dashboard' && usuario && plano) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-lg border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  RunCoach
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Seu treinador pessoal de corrida
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Link href="/tipos-treino">
                  <Button variant="outline" className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Tipos de Treino
                  </Button>
                </Link>
                <Button onClick={reiniciarQuiz} variant="outline" className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Refazer Quiz
                </Button>
                <Button onClick={voltarInicio} variant="outline" className="flex items-center gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  Voltar ao Início
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Progressão Inteligente - LOGO APÓS O CABEÇALHO */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <ProgressaoInteligente usuario={usuario} plano={plano} />
        </div>

        {/* Dashboard Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Tabs defaultValue="plano" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg">
              <TabsTrigger value="plano" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white">
                <Target className="w-4 h-4" />
                Seu Plano
              </TabsTrigger>
              <TabsTrigger value="registro" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
                <Activity className="w-4 h-4" />
                Treinos
              </TabsTrigger>
              <TabsTrigger value="aquecimento" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white">
                <Flame className="w-4 h-4" />
                Aquecimento
              </TabsTrigger>
            </TabsList>

            <TabsContent value="plano" className="space-y-6">
              <PlanoTreinoComponent plano={plano} nomeUsuario={usuario.nome} />
            </TabsContent>

            <TabsContent value="registro" className="space-y-6">
              <RegistroTreinosComponent />
            </TabsContent>

            <TabsContent value="aquecimento" className="space-y-6">
              <DicasAquecimento />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  // Tela Inicial
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="mx-auto w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-8 shadow-2xl">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            RunCoach
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Seu treinador pessoal de corrida de rua. Planos personalizados para iniciantes, 
            intermediários e avançados.
          </p>
        </div>

        {/* Features Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-3">
                <Target className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl text-gray-800 dark:text-gray-200">Planos Personalizados</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Treinos adaptados ao seu nível e objetivos específicos
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-3">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl text-gray-800 dark:text-gray-200">Dicas de Aquecimento</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Prepare-se adequadamente e evite lesões
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mb-3">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl text-gray-800 dark:text-gray-200">Progressão Inteligente</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Evolua gradualmente e alcance seus objetivos
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="space-y-6">
          <Button
            onClick={() => setEtapaAtual('quiz')}
            size="lg"
            className="text-xl px-12 py-6 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            <Play className="mr-3 w-6 h-6" />
            Começar Agora
          </Button>
          
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Quiz rápido • Plano personalizado • 100% gratuito
          </p>
        </div>
      </div>
    </div>
  );
}
