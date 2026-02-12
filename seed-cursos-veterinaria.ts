import "reflect-metadata";
import { initializeDataSource } from "./src/lib/data-source";
import { Cursos } from "./src/database/entities/cursos.entity";

const categoriaVeterinaria = "VETERINÁRIA E ZOOTECNIA";

const conteudoPadrao = JSON.stringify([
  "Fundamentos e conceitos básicos",
  "Rotinas e boas práticas",
  "Equipamentos e procedimentos",
  "Segurança e bem-estar",
  "Legislação e ética",
  "Aplicações profissionais"
]);

const nomesVeterinaria = [
  "ADESTRADOR DE CÃES",
  "ADMINISTRAÇÃO DE CLÍNICA VETERINÁRIA",
  "ADMINISTRAÇÃO DE PET SHOP",
  "ADMINISTRAÇÃO SAUDÁVEL PARA CÃES E GATOS",
  "APICULTURA",
  "AQUICULTURA",
  "ATENDIMENTO AO CLIENTE PARA PET SHOP",
  "AUXILIAR DE PET SHOP",
  "AUXILIAR DE VETERINÁRIO",
  "AUXILIAR DE ZOOTECNIA",
  "AVICULTURA",
  "BANHISTA E TOSADOR",
  "BANHO E TOSA",
  "BEM ESTAR ANIMAL",
  "BIOÉTICA ANIMAL",
  "BIOLOGIA ANIMAL",
  "BIOSSEGURANÇA NA MEDICINA VETERINÁRIA",
  "BIOSSEGURANÇA NA PRODUÇÃO ANIMAL",
  "BOAS PRÁTICAS NA PRODUÇÃO ANIMAL",
  "BOVINOCULTURA",
  "BOVINOCULTURA DO CORTE",
  "BOVINOCULTURA DE LEITE",
  "CÃO TERAPIA EM HOSPITAIS",
  "CAPRINOCULTURA",
  "CASTRAÇÃO DE CÃES E GATOS",
  "CINOFILIA",
  "CINOTECNIA",
  "COMBATE AO TRÁFICO DE ANIMAIS",
  "COMPORTAMENTO ANIMAL",
  "CONFINAMENTO DE BOVINOS DE CORTE",
  "CONTROLE DE ROEDORES",
  "CORRETOR DE GADO",
  "CRIMES CONTRA ANIMAIS",
  "CUIDADOR DE ANIMAIS",
  "CUIDADOR DE CACHORRO",
  "CUIDADOS CLÍNICOS EM ANIMAIS DE PEQUENO PORTE",
  "DIREITO DOS ANIMAIS AVIÁRIAS",
  "DOMA RACIONAL DE BOVINOS",
  "DOMA RACIONAL DE CAVALOS",
  "DOMADOR DE CAVALOS",
  "ENGORDA DE BOVINOS",
  "EQUINOCULTURA",
  "FARMACOLOGIA VETERINÁRIA",
  "GADO LEITEIRO",
  "GERIATRIA VETERINÁRIA",
  "GESTÃO VETERINÁRIA",
  "GESTÃO DE CLÍNICA VETERINÁRIA",
  "GESTÃO DE HOSPITAL VETERINÁRIO",
  "HIGIENE E ESTÉTICA ANIMAL",
  "HOTEL PARA CÃES E GATOS",
  "IBAMA",
  "INSEMINAÇÃO ARTIFICIAL EM BOVINOS",
  "INTRODUÇÃO À MEDICINA VETERINÁRIA",
  "INTRODUÇÃO À ZOOTECNIA",
  "LONGEVIDADE ANIMAL",
  "MARKETING PARA PET SHOP",
  "MEDICINA VETERINÁRIA PREVENTIVA",
  "MELHORAMENTO GENÉTICO ANIMAL",
  "MELIPONICULTURA",
  "MICROCHIPAGEM ANIMAL",
  "NEONATOLOGIA VETERINÁRIA",
  "NUTRIÇÃO DE AVES",
  "NUTRIÇÃO DE CÃES E GATOS",
  "NUTRIÇÃO DE RUMINANTES",
  "NUTRIÇÃO VETERINÁRIA",
  "ODONTOLOGIA VETERINÁRIA",
  "OFTALMOLOGIA VETERINÁRIA BÁSICA",
  "ONCOLOGIA VETERINÁRIA",
  "ORTOPEDIA VETERINÁRIA",
  "OVINOCULTURA",
  "PATOLOGIA VETERINÁRIA",
  "PECUÁRIA DO CORTE",
  "PECUÁRIA LEITEIRA",
  "PET SHOP DE SUCESSO",
  "PISCICULTURA",
  "PRIMEIROS SOCORROS PARA CÃES E GATOS",
  "PRIMEIROS SOCORROS PET",
  "PSICOLOGIA ANIMAL",
  "RADIOGRAFIA VETERINÁRIA BÁSICA",
  "RECREACIONISTA DE ANIMAIS",
  "REPRODUÇÃO ANIMAL",
  "SUINOCULTURA",
  "TAXIDERMIA",
  "TELEMEDICINA VETERINÁRIA",
  "TERAPIA ASSISTIDA PARA ANIMAIS",
  "TERAPIA COM CAVALOS",
  "TOSQUIA DE ANIMAIS",
  "TRATADOR DE ANIMAIS",
  "TRAUMATOLOGIA VETERINÁRIA BÁSICA",
  "URGÊNCIA E EMERGÊNCIA VETERINÁRIA",
  "VACINAÇÃO CANINA E FELINA",
  "VETERINÁRIA DE ANIMAIS SILVESTRES E EXÓTICOS",
  "ZOONOSES BACTERIANAS",
  "ZOONOSES PARASITÁRIAS E FÚNGICAS",
  "ZOONOSES VIRAIS",
  "ZOOTECNIA BÁSICA",
  "TERAPIA HOLÍSTICA PARA ANIMAIS COM VIDEO AULA"
];

const cursosVeterinaria = nomesVeterinaria.map((nome) => ({
  nome,
  categoria: categoriaVeterinaria,
  conteudo: conteudoPadrao
}));

async function seedCursosVeterinaria() {
  console.log(` Iniciando seed da categoria ${categoriaVeterinaria}...`);

  try {
    const dataSource = await initializeDataSource();
    const cursoRepository = dataSource.getRepository(Cursos);

    console.log(" Verificando cursos existentes...");

    for (const cursoData of cursosVeterinaria) {
      const existente = await cursoRepository.findOne({
        where: { nome: cursoData.nome }
      });

      if (existente) {
        console.log(`  Curso já existe: ${cursoData.nome}`);
        continue;
      }

      const curso = cursoRepository.create(cursoData);
      await cursoRepository.save(curso);
      console.log(` Criado curso: ${cursoData.nome}`);
    }

    console.log(`\n Categoria ${categoriaVeterinaria} criada com sucesso!`);
    console.log(` ${cursosVeterinaria.length} cursos adicionados!`);
    process.exit(0);
  } catch (error) {
    console.error(" Erro ao criar cursos:", error);
    process.exit(1);
  }
}

seedCursosVeterinaria();
