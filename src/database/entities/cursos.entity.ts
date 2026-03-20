import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from "typeorm";
import { Matriculas } from "./matriculas.entity";

@Index("IDX_CURSOS_NOME_CATEGORIA_UNICO", ["nome", "categoria"], { unique: true })
@Entity("cursos")
export class Cursos {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255 })
  nome: string;

  @Column({ type: "int", nullable: true })
  duracao: number; // em horas

  @Column({ length: 100 })
  categoria: string;

  @Column({ type: "text", nullable: true })
  conteudo: string; // JSON array de tópicos

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;

  @OneToMany(() => Matriculas, (matricula) => matricula.curso)
  matriculas: Matriculas[];
}
