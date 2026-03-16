import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

const categoriaAutoajuda = "AUTOAJUDA";

const conteudoPadrao = JSON.stringify([
  "Fundamentos de desenvolvimento pessoal",
  "Autoconhecimento e gestão emocional",
  "Técnicas práticas de mudança de hábitos",
  "Comunicação e relacionamento interpessoal",
  "Resiliência, foco e propósito",
  "Aplicações no dia a dia"
]);

const nomesAutoajuda = [
  "12 PASSOS PARA RECUPERAÇÃO DO VÍCIO",
  "A ARTE DA PACIÊNCIA",
  "ATITUDE POSITIVA E REALISTA",
  "AUTOAVALIAÇÃO PESSOAL",
  "AUTOCOACHING",
  "AUTOCONHECIMENTO E ESPIRITUALIDADE",
  "AUTOMOTIVAÇÃO",
  "COMO FALAR EM PÚBLICO",
  "COMO LIDAR COM CRÍTICAS",
  "COMO SER UM BOM PREGADOR",
  "CUIDANDO DA SAÚDE EMOCIONAL",
  "DESLIGUE-SE DO PASSADO E SIGA EM FRENTE",
  "DETOX MENTAL",
  "EQUILÍBRIO EMOCIONAL",
  "INTELIGÊNCIA EMOCIONAL",
  "INTELIGÊNCIA SOCIOEMOCIONAL",
  "JORNADA DO PERDÃO INTERIOR",
  "MINDFULNESS",
  "NÃO SEJA SEU PIOR INIMIGO",
  "NOMOFOBIA: O MEDO DE FICAR SEM CELULAR"
];

const cursosAutoajuda = nomesAutoajuda.map((nome) => ({
  nome,
  categoria: categoriaAutoajuda,
  conteudo: conteudoPadrao
}));

async function seedCursosAutoajuda() {
  try {
    const dataSource = await initializeDataSource();
    const cursoRepository = dataSource.getRepository(Cursos);

    for (const cursoData of cursosAutoajuda) {
      const existente = await cursoRepository.findOne({
        where: { nome: cursoData.nome }
      });

      if (existente) {
        console.log(`Curso já existe: ${cursoData.nome}`);
        continue;
      }

      const curso = cursoRepository.create(cursoData);
      await cursoRepository.save(curso);
      console.log(`Criado curso: ${cursoData.nome}`);
    }

    console.log(`Categoria ${categoriaAutoajuda} criada com sucesso.`);
    console.log(`${cursosAutoajuda.length} cursos processados.`);
    process.exit(0);
  } catch (error) {
    console.error("Erro ao criar cursos:", error);
    process.exit(1);
  }
}

seedCursosAutoajuda();
