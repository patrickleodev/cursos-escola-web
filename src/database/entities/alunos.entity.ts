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

  @Column({ length: 255 })
  endereco: string;

  @Column({ type: "date" })
  dataNascimento: Date;

  @Column({ length: 20 })
  matricula: string;

  @Column({ length: 50, default: "ativo" })
  status: string;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;
}
