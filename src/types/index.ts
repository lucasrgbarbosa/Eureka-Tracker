export interface Materia {
  id: string;
  nome: string;
}

export type StatusDuvida = 'pendente' | 'resolvida';
export type Prioridade = 'baixa' | 'media' | 'alta';

export interface Duvida {
  id: string;
  titulo: string;
  materia: string;
  descricao: string;
  status: StatusDuvida;
  prioridade: Prioridade;
  criadoEm: string;
  resolvidoEm: string | null;
}

export type NovaDuvida = Omit<Duvida, 'id' | 'criadoEm' | 'resolvidoEm'>;
export type AtualizarDuvida = Partial<Duvida>;  