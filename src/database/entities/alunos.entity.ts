import "reflect-metadata";
import { IsEmail, Matches } from "class-validator";
import { IsCPF } from "class-validator-cpf";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

@Entity("alunos")
export class Alunos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, unique: true })
  nome: string;

  @IsEmail()
  @Column()
  email: string;

  @Column({ length: 20 })
  telefone: string;

  @IsCPF()
  @Column({ unique: true })
  cpf: string;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;

  @OneToMany("Matriculas", (matricula: any) => matricula.aluno)
  matriculas: any[];
}
