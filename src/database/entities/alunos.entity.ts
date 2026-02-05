import { Matches } from "class-validator";
import { IsCPF } from "class-validator-cpf";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Alunos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 255, unique: true })
  email: string;


  @Column({ length: 20 })
  telefone: string;

  @IsCPF()
  cpf: string;

  @Matches(/^\d{1,2}\.?\d{3}\.?\d{3}-?[0-9Xx]$/)
  rg: string;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;
}
