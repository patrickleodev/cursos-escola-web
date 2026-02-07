export type Curso = {
  id: string;
  nome: string;
  duracao: number;
  dataInicio?: string;
  dataFim?: string;
  duracaoCustomizada?: number;
};

export type Matricula = {
  id: string;
  dataInicio: string;
  dataFim: string;
  duracaoCustomizada?: number;
  curso: Curso;
};

export type Aluno = {
  id: string;
  nome: string;
  email: string;
  cpf?: string;
  rg?: string;
  telefone?: string;
  criadoEm?: string;
  atualizadoEm?: string;
  cursos?: Curso[];
  matriculas?: Matricula[];
};
