import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

const categoriaEstetica = "ESTÉTICA E BELEZA";

const conteudoPadrao = JSON.stringify([
  "Fundamentos e conceitos básicos",
  "Rotinas e boas práticas",
  "Equipamentos e procedimentos",
  "Segurança e bem-estar",
  "Legislação e ética",
  "Aplicações profissionais"
]);

const nomesEstetica = [
  "ATENDENTE DE PERFUMARIA",
  "AUTOMAQUIAGEM",
  "AUXILIAR DE CABELEIREIRO",
  "AUXILIAR DE COSTURA",
  "BARBEIRO PROFISSIONAL",
  "BARBOTERAPIA",
  "BIOMEDICINA ESTÉTICA BÁSICA",
  "BIOSSEGURANÇA EM ESTÚDIOS DE TATUAGEM",
  "BIOSSEGURANÇA EM SALÕES DE BELEZA E ESTÉTICA",
  "BIOSSEGURANÇA PARA BODY PIERCING",
  "BIOSSEGURANÇA PARA BRONZEAMENTO ARTIFICIAL",
  "BIOSSEGURANÇA PARA MANICURES",
  "BIOSSEGURANÇA PARA MAQUIADORES",
  "BOAS PRÁTICAS EM SALÕES DE BELEZA",
  "BRONZEAMENTO ARTIFICIAL",
  "BRONZEAMENTO NATURAL",
  "CABELEIREIRO",
  "COACHING EM ESTÉTICA",
  "COLORIMETRIA CAPILAR",
  "CONSULTORIA DE MODA",
  "CORTE DE CABELO MASCULINO",
  "COSMETOLOGIA",
  "DEPILAÇÃO",
  "DEPILADORA PROFISSIONAL",
  "DRENAGEM LINFÁTICA",
  "DRENAGEM LINFÁTICA FACIAL",
  "DRENAGEM MODELADORA",
  "ELETROTERAPIA",
  "ELETROTERAPIA ESTÉTICA BÁSICA",
  "ELETROTERAPIA FACIAL E CORPORAL BÁSICA",
  "ESTÉTICA ÍNTIMA FEMININA",
  "ESTÉTICA ÍNTIMA MASCULINA",
  "ESTÉTICA NATURAL",
  "ESTETICISTA PROFISSIONAL",
  "EXTENSÃO DE CÍLIOS",
  "FARMÁCIA ESTÉTICA",
  "FUNDAMENTOS DA ESTÉTICA PROFISSIONAL",
  "GESTÃO DE BARBEARIA",
  "INSTRUTOR DE CURSOS DE BELEZA E ESTÉTICA",
  "LASH LIFTING",
  "LEGISLAÇÃO ESTÉTICA",
  "MANICURE E PEDICURE",
  "MANICURE PROFISSIONAL",
  "MASSAGEM ESTÉTICA",
  "MASSAGENS ORIENTAIS",
  "MASSOTERAPIA APLICADA",
  "NECROMAQUIAGEM",
  "NEUROESTÉTICA",
  "NOÇÕES BÁSICAS DE FOTOBIOMODULAÇÃO",
  "PERFUMISTA",
  "RUGAS FACIAIS",
  "SPATERAPIA",
  "TERAPIA CAPILAR",
  "TERAPIAS ALTERNATIVAS EM ESTÉTICA",
  "UNHA POSTIÇA REALISTA",
  "UNHAS DE POLYGEL",
  "UNHAS DECORADAS",
  "VOLUME RUSSO"
];

const cursosEstetica = nomesEstetica.map((nome) => ({
  nome,
  categoria: categoriaEstetica,
  conteudo: conteudoPadrao
}));

async function seedCursosEstetica() {
  console.log(` Iniciando seed da categoria ${categoriaEstetica}...`);

  try {
    const dataSource = await initializeDataSource();
    const cursoRepository = dataSource.getRepository(Cursos);

    console.log(" Verificando cursos existentes...");

    let contadorCriados = 0;
    let contadorExistentes = 0;

    for (const cursoData of cursosEstetica) {
      const existente = await cursoRepository.findOne({
        where: { nome: cursoData.nome }
      });

      if (existente) {
        console.log(`  Curso já existe: ${cursoData.nome}`);
        contadorExistentes++;
        continue;
      }

      const curso = cursoRepository.create(cursoData);
      await cursoRepository.save(curso);
      console.log(` Criado curso: ${cursoData.nome}`);
      contadorCriados++;
    }

    console.log(`\n Categoria ${categoriaEstetica} criada com sucesso!`);
    console.log(` ${contadorCriados} cursos adicionados!`);
    console.log(` ${contadorExistentes} cursos já existiam.`);
    console.log(` Total: ${cursosEstetica.length} cursos na categoria`);
    process.exit(0);
  } catch (error) {
    console.error(" Erro ao criar cursos:", error);
    process.exit(1);
  }
}

seedCursosEstetica();
