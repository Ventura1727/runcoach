'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RegistroTreino, EstatisticasTreino } from '@/lib/types';
import { Plus, Calendar, Clock, TrendingUp, Trash2, Edit, Activity, Zap, Heart, Target, Flame, MapPin, Droplet, Thermometer, Wind } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function RegistroTreinosComponent() {
  const [treinos, setTreinos] = useState<RegistroTreino[]>([]);
  const [dialogAberto, setDialogAberto] = useState(false);
  const [treinoEditando, setTreinoEditando] = useState<RegistroTreino | null>(null);
  const [estatisticas, setEstatisticas] = useState<EstatisticasTreino>({
    totalTreinos: 0,
    totalDistancia: 0,
    totalTempo: 0,
    mediaSemanal: 0,
    tipoMaisFrequente: '-'
  });

  // Formulário expandido
  const [formData, setFormData] = useState({
    data: format(new Date(), 'yyyy-MM-dd'),
    tipo: 'base' as RegistroTreino['tipo'],
    duracao: '',
    distancia: '',
    ritmo: '',
    sensacao: 'boa' as RegistroTreino['sensacao'],
    notas: '',
    calorias: '',
    frequenciaCardiacaMedia: '',
    frequenciaCardiacaMaxima: '',
    elevacaoGanho: '',
    temperatura: '',
    condicaoClimatica: '',
    local: '',
    hidratacao: ''
  });

  // Carregar treinos do localStorage
  useEffect(() => {
    const treinosSalvos = localStorage.getItem('treinos');
    if (treinosSalvos) {
      const treinosCarregados = JSON.parse(treinosSalvos);
      setTreinos(treinosCarregados);
      calcularEstatisticas(treinosCarregados);
    }
  }, []);

  // Salvar treinos no localStorage
  const salvarTreinos = (novosTreinos: RegistroTreino[]) => {
    localStorage.setItem('treinos', JSON.stringify(novosTreinos));
    setTreinos(novosTreinos);
    calcularEstatisticas(novosTreinos);
  };

  // Calcular estatísticas
  const calcularEstatisticas = (listaTreinos: RegistroTreino[]) => {
    const total = listaTreinos.length;
    const distanciaTotal = listaTreinos.reduce((acc, t) => acc + (t.distancia || 0), 0);
    const tempoTotal = listaTreinos.reduce((acc, t) => acc + t.duracao, 0);
    
    // Calcular média semanal (últimas 4 semanas)
    const quatroSemanasAtras = new Date();
    quatroSemanasAtras.setDate(quatroSemanasAtras.getDate() - 28);
    const treinosRecentes = listaTreinos.filter(t => new Date(t.data) >= quatroSemanasAtras);
    const mediaSemanal = treinosRecentes.length / 4;

    // Tipo mais frequente
    const contagemTipos: { [key: string]: number } = {};
    listaTreinos.forEach(t => {
      contagemTipos[t.tipo] = (contagemTipos[t.tipo] || 0) + 1;
    });
    const tipoMaisFrequente = Object.keys(contagemTipos).length > 0
      ? Object.keys(contagemTipos).reduce((a, b) => contagemTipos[a] > contagemTipos[b] ? a : b)
      : '-';

    setEstatisticas({
      totalTreinos: total,
      totalDistancia: distanciaTotal,
      totalTempo: tempoTotal,
      mediaSemanal: Math.round(mediaSemanal * 10) / 10,
      tipoMaisFrequente: traduzirTipo(tipoMaisFrequente)
    });
  };

  // Adicionar ou editar treino
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const novoTreino: RegistroTreino = {
      id: treinoEditando?.id || Date.now().toString(),
      data: formData.data,
      tipo: formData.tipo,
      duracao: parseInt(formData.duracao),
      distancia: formData.distancia ? parseFloat(formData.distancia) : undefined,
      ritmo: formData.ritmo || undefined,
      sensacao: formData.sensacao,
      notas: formData.notas || undefined,
      calorias: formData.calorias ? parseInt(formData.calorias) : undefined,
      frequenciaCardiacaMedia: formData.frequenciaCardiacaMedia ? parseInt(formData.frequenciaCardiacaMedia) : undefined,
      frequenciaCardiacaMaxima: formData.frequenciaCardiacaMaxima ? parseInt(formData.frequenciaCardiacaMaxima) : undefined,
      elevacaoGanho: formData.elevacaoGanho ? parseInt(formData.elevacaoGanho) : undefined,
      temperatura: formData.temperatura || undefined,
      condicaoClimatica: formData.condicaoClimatica || undefined,
      local: formData.local || undefined,
      hidratacao: formData.hidratacao || undefined
    };

    let novosTreinos;
    if (treinoEditando) {
      novosTreinos = treinos.map(t => t.id === treinoEditando.id ? novoTreino : t);
    } else {
      novosTreinos = [...treinos, novoTreino];
    }

    // Ordenar por data (mais recente primeiro)
    novosTreinos.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

    salvarTreinos(novosTreinos);
    resetarFormulario();
    setDialogAberto(false);
  };

  // Deletar treino
  const deletarTreino = (id: string) => {
    if (confirm('Tem certeza que deseja deletar este treino?')) {
      const novosTreinos = treinos.filter(t => t.id !== id);
      salvarTreinos(novosTreinos);
    }
  };

  // Editar treino
  const editarTreino = (treino: RegistroTreino) => {
    setTreinoEditando(treino);
    setFormData({
      data: treino.data,
      tipo: treino.tipo,
      duracao: treino.duracao.toString(),
      distancia: treino.distancia?.toString() || '',
      ritmo: treino.ritmo || '',
      sensacao: treino.sensacao,
      notas: treino.notas || '',
      calorias: treino.calorias?.toString() || '',
      frequenciaCardiacaMedia: treino.frequenciaCardiacaMedia?.toString() || '',
      frequenciaCardiacaMaxima: treino.frequenciaCardiacaMaxima?.toString() || '',
      elevacaoGanho: treino.elevacaoGanho?.toString() || '',
      temperatura: treino.temperatura || '',
      condicaoClimatica: treino.condicaoClimatica || '',
      local: treino.local || '',
      hidratacao: treino.hidratacao || ''
    });
    setDialogAberto(true);
  };

  // Resetar formulário
  const resetarFormulario = () => {
    setFormData({
      data: format(new Date(), 'yyyy-MM-dd'),
      tipo: 'base',
      duracao: '',
      distancia: '',
      ritmo: '',
      sensacao: 'boa',
      notas: '',
      calorias: '',
      frequenciaCardiacaMedia: '',
      frequenciaCardiacaMaxima: '',
      elevacaoGanho: '',
      temperatura: '',
      condicaoClimatica: '',
      local: '',
      hidratacao: ''
    });
    setTreinoEditando(null);
  };

  // Traduzir tipo de treino
  const traduzirTipo = (tipo: string) => {
    const tipos: { [key: string]: string } = {
      intervalado: 'Intervalado',
      tiros: 'Tiros',
      regenerativa: 'Regenerativa',
      tempo: 'Tempo',
      longa: 'Longa',
      fartlek: 'Fartlek',
      base: 'Base'
    };
    return tipos[tipo] || tipo;
  };

  // Ícone por tipo
  const obterIconeTipo = (tipo: RegistroTreino['tipo']) => {
    const icones = {
      intervalado: Zap,
      tiros: Flame,
      regenerativa: Heart,
      tempo: Clock,
      longa: TrendingUp,
      fartlek: Target,
      base: Activity
    };
    return icones[tipo] || Activity;
  };

  // Cor por sensação
  const obterCorSensacao = (sensacao: RegistroTreino['sensacao']) => {
    const cores = {
      excelente: 'text-green-600 bg-green-100 dark:bg-green-900/30',
      boa: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
      regular: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30',
      ruim: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
      pessima: 'text-red-600 bg-red-100 dark:bg-red-900/30'
    };
    return cores[sensacao];
  };

  return (
    <div className="space-y-6">
      {/* Estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Total de Treinos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{estatisticas.totalTreinos}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Distância Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{estatisticas.totalDistancia.toFixed(1)} km</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Tempo Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{Math.floor(estatisticas.totalTempo / 60)}h {estatisticas.totalTempo % 60}min</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Média Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{estatisticas.mediaSemanal}</p>
            <p className="text-xs text-white/80 mt-1">treinos/semana</p>
          </CardContent>
        </Card>
      </div>

      {/* Botão Adicionar */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Histórico de Treinos</h2>
        <Dialog open={dialogAberto} onOpenChange={(open) => {
          setDialogAberto(open);
          if (!open) resetarFormulario();
        }}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              Registrar Treino
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{treinoEditando ? 'Editar Treino' : 'Registrar Novo Treino'}</DialogTitle>
              <DialogDescription>
                Preencha os dados do seu treino para acompanhar seu progresso
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informações Básicas */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Informações Básicas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="data">Data *</Label>
                    <Input
                      id="data"
                      type="date"
                      value={formData.data}
                      onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="tipo">Tipo de Treino *</Label>
                    <Select value={formData.tipo} onValueChange={(value: RegistroTreino['tipo']) => setFormData({ ...formData, tipo: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="base">Base / Contínua</SelectItem>
                        <SelectItem value="intervalado">Intervalado</SelectItem>
                        <SelectItem value="tiros">Tiros</SelectItem>
                        <SelectItem value="regenerativa">Regenerativa</SelectItem>
                        <SelectItem value="tempo">Tempo Run</SelectItem>
                        <SelectItem value="longa">Corrida Longa</SelectItem>
                        <SelectItem value="fartlek">Fartlek</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Métricas de Performance */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Métricas de Performance
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="duracao">Duração (min) *</Label>
                    <Input
                      id="duracao"
                      type="number"
                      value={formData.duracao}
                      onChange={(e) => setFormData({ ...formData, duracao: e.target.value })}
                      required
                      min="1"
                      placeholder="45"
                    />
                  </div>
                  <div>
                    <Label htmlFor="distancia">Distância (km)</Label>
                    <Input
                      id="distancia"
                      type="number"
                      step="0.01"
                      value={formData.distancia}
                      onChange={(e) => setFormData({ ...formData, distancia: e.target.value })}
                      placeholder="10.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ritmo">Ritmo (ex: 5:30/km)</Label>
                    <Input
                      id="ritmo"
                      type="text"
                      value={formData.ritmo}
                      onChange={(e) => setFormData({ ...formData, ritmo: e.target.value })}
                      placeholder="5:30/km"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="calorias">Calorias Queimadas</Label>
                    <Input
                      id="calorias"
                      type="number"
                      value={formData.calorias}
                      onChange={(e) => setFormData({ ...formData, calorias: e.target.value })}
                      placeholder="450"
                    />
                  </div>
                  <div>
                    <Label htmlFor="frequenciaCardiacaMedia">FC Média (bpm)</Label>
                    <Input
                      id="frequenciaCardiacaMedia"
                      type="number"
                      value={formData.frequenciaCardiacaMedia}
                      onChange={(e) => setFormData({ ...formData, frequenciaCardiacaMedia: e.target.value })}
                      placeholder="150"
                    />
                  </div>
                  <div>
                    <Label htmlFor="frequenciaCardiacaMaxima">FC Máxima (bpm)</Label>
                    <Input
                      id="frequenciaCardiacaMaxima"
                      type="number"
                      value={formData.frequenciaCardiacaMaxima}
                      onChange={(e) => setFormData({ ...formData, frequenciaCardiacaMaxima: e.target.value })}
                      placeholder="180"
                    />
                  </div>
                </div>
              </div>

              {/* Condições do Treino */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <Wind className="w-5 h-5" />
                  Condições do Treino
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="local">Local</Label>
                    <Input
                      id="local"
                      type="text"
                      value={formData.local}
                      onChange={(e) => setFormData({ ...formData, local: e.target.value })}
                      placeholder="Parque Ibirapuera"
                    />
                  </div>
                  <div>
                    <Label htmlFor="elevacaoGanho">Elevação Ganho (m)</Label>
                    <Input
                      id="elevacaoGanho"
                      type="number"
                      value={formData.elevacaoGanho}
                      onChange={(e) => setFormData({ ...formData, elevacaoGanho: e.target.value })}
                      placeholder="150"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="temperatura">Temperatura</Label>
                    <Input
                      id="temperatura"
                      type="text"
                      value={formData.temperatura}
                      onChange={(e) => setFormData({ ...formData, temperatura: e.target.value })}
                      placeholder="25°C"
                    />
                  </div>
                  <div>
                    <Label htmlFor="condicaoClimatica">Condição Climática</Label>
                    <Select value={formData.condicaoClimatica} onValueChange={(value) => setFormData({ ...formData, condicaoClimatica: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ensolarado">☀️ Ensolarado</SelectItem>
                        <SelectItem value="nublado">☁️ Nublado</SelectItem>
                        <SelectItem value="chuvoso">🌧️ Chuvoso</SelectItem>
                        <SelectItem value="ventoso">💨 Ventoso</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="hidratacao">Hidratação</Label>
                    <Input
                      id="hidratacao"
                      type="text"
                      value={formData.hidratacao}
                      onChange={(e) => setFormData({ ...formData, hidratacao: e.target.value })}
                      placeholder="500ml"
                    />
                  </div>
                </div>
              </div>

              {/* Sensação e Observações */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Avaliação Pessoal
                </h3>
                <div>
                  <Label htmlFor="sensacao">Como se sentiu? *</Label>
                  <Select value={formData.sensacao} onValueChange={(value: RegistroTreino['sensacao']) => setFormData({ ...formData, sensacao: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excelente">😄 Excelente</SelectItem>
                      <SelectItem value="boa">🙂 Boa</SelectItem>
                      <SelectItem value="regular">😐 Regular</SelectItem>
                      <SelectItem value="ruim">😕 Ruim</SelectItem>
                      <SelectItem value="pessima">😞 Péssima</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notas">Observações e Notas</Label>
                  <Textarea
                    id="notas"
                    value={formData.notas}
                    onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                    placeholder="Como foi o treino? Sentiu algum desconforto? Atingiu seus objetivos?"
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setDialogAberto(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-gradient-to-r from-blue-500 to-indigo-600">
                  {treinoEditando ? 'Salvar Alterações' : 'Registrar Treino'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Treinos */}
      {treinos.length === 0 ? (
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="py-12 text-center">
            <Activity className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Nenhum treino registrado ainda
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
              Comece registrando seu primeiro treino para acompanhar seu progresso!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {treinos.map((treino) => {
            const IconeTipo = obterIconeTipo(treino.tipo);
            return (
              <Card key={treino.id} className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                        <IconeTipo className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                            {traduzirTipo(treino.tipo)}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${obterCorSensacao(treino.sensacao)}`}>
                            {treino.sensacao}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {format(new Date(treino.data), "dd 'de' MMMM", { locale: ptBR })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {treino.duracao} min
                          </span>
                          {treino.distancia && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {treino.distancia} km
                            </span>
                          )}
                          {treino.ritmo && (
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              {treino.ritmo}
                            </span>
                          )}
                          {treino.frequenciaCardiacaMedia && (
                            <span className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {treino.frequenciaCardiacaMedia} bpm
                            </span>
                          )}
                        </div>
                        
                        {/* Informações Adicionais */}
                        {(treino.local || treino.temperatura || treino.condicaoClimatica || treino.hidratacao) && (
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-500 flex-wrap">
                            {treino.local && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {treino.local}
                              </span>
                            )}
                            {treino.temperatura && (
                              <span className="flex items-center gap-1">
                                <Thermometer className="w-3 h-3" />
                                {treino.temperatura}
                              </span>
                            )}
                            {treino.condicaoClimatica && (
                              <span className="flex items-center gap-1">
                                <Wind className="w-3 h-3" />
                                {treino.condicaoClimatica}
                              </span>
                            )}
                            {treino.hidratacao && (
                              <span className="flex items-center gap-1">
                                <Droplet className="w-3 h-3" />
                                {treino.hidratacao}
                              </span>
                            )}
                          </div>
                        )}
                        
                        {treino.notas && (
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 italic">
                            "{treino.notas}"
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => editarTreino(treino)}
                        className="flex-1 sm:flex-none"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deletarTreino(treino.id)}
                        className="flex-1 sm:flex-none text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
