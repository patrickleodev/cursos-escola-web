import { IsEmail, Matches } from "class-validator";
import { IsCPF } from "class-validator-cpf";
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

  @ManyToMany(() => require("./cursos.entity").Cursos, (curso) => curso.alunos)
  @JoinTable()
  cursos: any[];
}
