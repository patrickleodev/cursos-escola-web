// Este arquivo garante que reflect-metadata e as entidades sejam carregadas uma única vez
import "reflect-metadata";
import { Alunos } from "../database/entities/alunos.entity";
import { Cursos } from "../database/entities/cursos.entity";
import { Matriculas } from "../database/entities/matriculas.entity";

// Exportar as entidades para garantir que elas estejam disponíveis
export { Alunos, Cursos, Matriculas };

// Trigger de inicialização que garante que os metadados sejam registrados
export const ensureMetadata = () => {
  // Esta função exists apenas para forçar a importação das entidades
  return [Alunos, Cursos, Matriculas];
};
