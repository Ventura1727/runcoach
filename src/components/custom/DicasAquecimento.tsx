'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { dicasAquecimento } from '@/lib/running-data';
import { Flame, Clock, Heart, Shield, Play, Image as ImageIcon, ExternalLink } from 'lucide-react';

export default function DicasAquecimento() {
  // Vídeos e imagens de aquecimento
  const recursosAquecimento = [
    {
      tipo: 'video',
      titulo: 'Aquecimento Completo para Corrida',
      url: 'https://www.youtube.com/watch?v=kVX1jIozHa0',
      descricao: 'Sequência completa de aquecimento em 10 minutos',
      duracao: '10 min'
    },
    {
      tipo: 'video',
      titulo: 'Mobilidade Dinâmica para Corredores',
      url: 'https://www.youtube.com/watch?v=3p8EBPVZ2Iw',
      descricao: 'Exercícios de mobilidade específicos para corrida',
      duracao: '8 min'
    },
    {
      tipo: 'imagem',
      titulo: 'Exercícios de Aquecimento Ilustrados',
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      descricao: 'Guia visual dos principais exercícios de aquecimento'
    },
    {
      tipo: 'video',
      titulo: 'Aquecimento Rápido - 5 Minutos',
      url: 'https://www.youtube.com/watch?v=Go5f8dMCvj8',
      descricao: 'Aquecimento eficiente para quando você tem pouco tempo',
      duracao: '5 min'
    },
    {
      tipo: 'imagem',
      titulo: 'Alongamento Dinâmico',
      url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
      descricao: 'Técnicas de alongamento dinâmico pré-corrida'
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mb-4">
            <Flame className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Dicas de Aquecimento
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
            Prepare seu corpo adequadamente antes de cada corrida
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Importância do Aquecimento */}
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-l-4 border-orange-500">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Por que aquecer é fundamental?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    O aquecimento prepara seu corpo para o exercício, reduzindo significativamente o risco de lesões 
                    e melhorando sua performance. Músculos aquecidos são mais flexíveis e eficientes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recursos de Vídeos e Imagens */}
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
            <CardHeader>
              <CardTitle className="text-xl text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                <Play className="w-5 h-5" />
                Vídeos e Guias Visuais de Aquecimento
              </CardTitle>
              <CardDescription>
                Aprenda com demonstrações práticas e guias visuais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recursosAquecimento.map((recurso, index) => (
                  <Card key={index} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          {recurso.tipo === 'video' ? (
                            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                              <Play className="w-5 h-5 text-white" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                            {recurso.titulo}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {recurso.descricao}
                          </p>
                          {recurso.duracao && (
                            <Badge variant="outline" className="text-xs mb-2">
                              <Clock className="w-3 h-3 mr-1" />
                              {recurso.duracao}
                            </Badge>
                          )}
                          <a 
                            href={recurso.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
                          >
                            Ver {recurso.tipo === 'video' ? 'vídeo' : 'imagem'}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Dicas de Aquecimento */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {dicasAquecimento.map((dica, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-800 dark:text-gray-200">
                      {dica.nome}
                    </CardTitle>
                    <Badge variant="outline" className="flex items-center gap-1 text-orange-600 border-orange-600">
                      <Clock className="w-3 h-3" />
                      {dica.duracao}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {dica.descricao}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      Benefícios:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {dica.beneficios.map((beneficio, beneficioIndex) => (
                        <div key={beneficioIndex} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                          {beneficio}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sequência Recomendada */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardHeader>
              <CardTitle className="text-xl text-blue-700 dark:text-blue-400">
                Sequência Recomendada de Aquecimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">Caminhada leve (3-5 min)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Comece devagar para ativar a circulação</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">Exercícios de mobilidade (5-8 min)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Círculos com braços, elevação de joelhos, alongamento dinâmico</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">Trote leve (2-3 min)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Transição gradual para o ritmo de corrida</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}