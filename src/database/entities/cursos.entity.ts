import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

@Entity("cursos")
export class Cursos {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255, unique: true })
  nome: string;

  @Column({ type: "int" })
  duracao: number; // em horas

  @Column({ length: 100, nullable: true })
  categoria: string;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;

  @OneToMany("Matriculas", (matricula: any) => matricula.curso)
  matriculas: any[];
}
