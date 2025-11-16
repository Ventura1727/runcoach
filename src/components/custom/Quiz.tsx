'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { quizPerguntas, determinarNivel, obterPlanoPersonalizado } from '@/lib/running-data';
import { Usuario } from '@/lib/types';
import { ChevronRight, ChevronLeft, User, Target } from 'lucide-react';

interface QuizProps {
  onComplete: (usuario: Usuario) => void;
  onVoltar?: () => void;
}

export default function Quiz({ onComplete, onVoltar }: QuizProps) {
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [respostas, setRespostas] = useState<Record<string, string>>({});

  const handleResposta = (perguntaId: string, valor: string) => {
    setRespostas(prev => ({ ...prev, [perguntaId]: valor }));
  };

  const proximaEtapa = () => {
    if (etapaAtual < quizPerguntas.length) {
      setEtapaAtual(etapaAtual + 1);
    } else {
      finalizarQuiz();
    }
  };

  const voltarEtapa = () => {
    if (etapaAtual > 0) {
      setEtapaAtual(etapaAtual - 1);
    } else if (onVoltar) {
      onVoltar();
    }
  };

  const finalizarQuiz = () => {
    const nivel = determinarNivel(respostas);
    const usuario: Usuario = {
      nome,
      email,
      idade: parseInt(idade),
      nivel,
      objetivo: respostas.objetivo as any,
      experiencia: respostas.experiencia as any,
      frequencia_atual: respostas.frequencia_atual as any,
      tempo_disponivel: respostas.tempo_disponivel as any,
    };
    onComplete(usuario);
  };

  const podeProxima = () => {
    if (etapaAtual === 0) return nome && email && idade;
    if (etapaAtual <= quizPerguntas.length) {
      const perguntaAtual = quizPerguntas[etapaAtual - 1];
      return respostas[perguntaAtual.id];
    }
    return false;
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mb-4">
            {etapaAtual === 0 ? (
              <User className="w-8 h-8 text-white" />
            ) : (
              <Target className="w-8 h-8 text-white" />
            )}
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {etapaAtual === 0 ? 'Bem-vindo ao RunCoach!' : 'Vamos conhecer você melhor'}
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
            {etapaAtual === 0 
              ? 'Primeiro, nos conte um pouco sobre você' 
              : `Pergunta ${etapaAtual} de ${quizPerguntas.length}`
            }
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {etapaAtual === 0 ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-lg font-medium">Como você se chama?</Label>
                <Input
                  id="nome"
                  placeholder="Digite seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="text-lg p-4 border-2 focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-lg font-medium">Qual seu e-mail?</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-lg p-4 border-2 focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="idade" className="text-lg font-medium">Qual sua idade?</Label>
                <Input
                  id="idade"
                  type="number"
                  placeholder="Digite sua idade"
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                  className="text-lg p-4 border-2 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          ) : etapaAtual <= quizPerguntas.length ? (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {quizPerguntas[etapaAtual - 1].pergunta}
              </h3>
              <RadioGroup
                value={respostas[quizPerguntas[etapaAtual - 1].id] || ''}
                onValueChange={(valor) => handleResposta(quizPerguntas[etapaAtual - 1].id, valor)}
                className="space-y-4"
              >
                {quizPerguntas[etapaAtual - 1].opcoes.map((opcao) => (
                  <div key={opcao.valor} className="flex items-center space-x-3 p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 dark:border-gray-700 dark:hover:border-blue-500 dark:hover:bg-blue-900/20 transition-all cursor-pointer">
                    <RadioGroupItem value={opcao.valor} id={opcao.valor} />
                    <Label htmlFor={opcao.valor} className="flex-1 text-lg cursor-pointer">
                      {opcao.texto}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : null}

          <div className="pt-6 flex gap-3">
            <Button
              onClick={voltarEtapa}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Voltar
            </Button>
            <Button
              onClick={proximaEtapa}
              disabled={!podeProxima()}
              className="flex-1 py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {etapaAtual === quizPerguntas.length ? 'Finalizar' : 'Próxima'}
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Progresso</span>
              <span>{Math.round(((etapaAtual + 1) / (quizPerguntas.length + 1)) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((etapaAtual + 1) / (quizPerguntas.length + 1)) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
