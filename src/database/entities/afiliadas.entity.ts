import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("afiliadas")
export class Afiliadas {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  nome: string;

  @Column({ type: 'text', nullable: true })
  foto?: string;

  @Column({ length: 20 })
  whatsapp: string;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;
}
