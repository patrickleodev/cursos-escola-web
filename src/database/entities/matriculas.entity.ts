import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("matriculas")
export class Matriculas {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne("Alunos", (aluno: any) => aluno.matriculas, { eager: true })
  aluno: any;

  @ManyToOne("Cursos", (curso: any) => curso.matriculas, { eager: true })
  curso: any;

  @Column({ type: "date" })
  dataInicio: Date;

  @Column({ type: "date" })
  dataFim: Date;

  @Column({ type: "int", nullable: true })
  duracaoCustomizada?: number;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;
}
