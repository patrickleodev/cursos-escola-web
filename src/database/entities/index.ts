import "reflect-metadata";
import { Alunos } from "./alunos.entity";
import { Cursos } from "./cursos.entity";
import { Matriculas } from "./matriculas.entity";

// Array de entidades preservadas com seus metadados
// Isso garante que os metadados sejam carregados mesmo com minificação
export const ENTITIES = [Alunos, Cursos, Matriculas];

// Re-exporte individual para compatibilidade
export { Alunos, Cursos, Matriculas };
