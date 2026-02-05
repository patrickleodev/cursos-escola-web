import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";

@Entity()
export class Cursos {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255, unique: true })
  nome: string;

  @Column({ type: "int" })
  duracao: number; // em horas

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;

  @ManyToMany(() => require("./alunos.entity").Alunos, (aluno) => aluno.cursos)
  alunos: any[];
}
