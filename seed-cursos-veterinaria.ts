import "reflect-metadata";
import { initializeDataSource } from "./src/lib/data-source";
import { Cursos } from "./src/database/entities/cursos.entity";

const cursosVeterinaria = [
  {
    nome: "ADESTRADOR DE CÃES",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Comportamento canino",
      "Técnicas de adestramento",
      "Psicologia animal",
      "Correção de comportamentos indesejados",
      "Adestramento básico e avançado",
      "Socialização de cães"
    ])
  },
  {
    nome: "ADMINISTRAÇÃO DE CLÍNICA VETERINÁRIA",
    duracao: 50,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Gestão administrativa veterinária",
      "Controle financeiro",
      "Gestão de estoque",
      "Atendimento ao cliente",
      "Marketing para clínicas",
      "Legislação veterinária"
    ])
  },
  {
    nome: "ADMINISTRAÇÃO DE PET SHOP",
    duracao: 45,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Gestão de pet shop",
      "Controle de estoque",
      "Atendimento ao cliente",
      "Marketing e vendas",
      "Gestão financeira",
      "Fornecedores e produtos"
    ])
  },
  {
    nome: "ADMINISTRAÇÃO SAUDÁVEL PARA CÃES E GATOS",
    duracao: 35,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Nutrição canina e felina",
      "Vacinação e prevenção",
      "Higiene e bem-estar",
      "Exercícios e atividades",
      "Saúde preventiva",
      "Primeiros socorros"
    ])
  },
  {
    nome: "APICULTURA",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Criação de abelhas",
      "Manejo de colmeias",
      "Produção de mel",
      "Produtos apícolas",
      "Sanidade apícola",
      "Comercialização"
    ])
  },
  {
    nome: "AQUICULTURA",
    duracao: 45,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Criação de animais aquáticos",
      "Qualidade da água",
      "Nutrição de peixes",
      "Reprodução e larvicultura",
      "Manejo de viveiros",
      "Comercialização"
    ])
  },
  {
    nome: "ATENDIMENTO AO CLIENTE PARA PET SHOP",
    duracao: 30,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Excelência no atendimento",
      "Comunicação eficaz",
      "Conhecimento de produtos pet",
      "Fidelização de clientes",
      "Resolução de conflitos",
      "Vendas consultivas"
    ])
  },
  {
    nome: "AUXILIAR DE PET SHOP",
    duracao: 35,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Organização do pet shop",
      "Controle de estoque",
      "Atendimento ao cliente",
      "Conhecimento de produtos",
      "Higiene e limpeza",
      "Manejo básico de animais"
    ])
  },
  {
    nome: "AUXILIAR DE VETERINÁRIO",
    duracao: 50,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Anatomia e fisiologia animal",
      "Contenção de animais",
      "Instrumentação cirúrgica",
      "Primeiros socorros",
      "Farmacologia básica",
      "Biossegurança"
    ])
  },
  {
    nome: "AUXILIAR DE ZOOTECNIA",
    duracao: 45,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Fundamentos da zootecnia",
      "Manejo de animais de produção",
      "Nutrição animal",
      "Reprodução animal",
      "Sanidade animal",
      "Instalações zootécnicas"
    ])
  },
  {
    nome: "AVICULTURA",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Criação de aves",
      "Manejo de frangos e poedeiras",
      "Nutrição avícola",
      "Sanidade avícola",
      "Instalações avícolas",
      "Comercialização"
    ])
  },
  {
    nome: "BANHISTA E TOSADOR",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Técnicas de banho",
      "Técnicas de tosa",
      "Tipos de tosa por raça",
      "Equipamentos e ferramentas",
      "Segurança e bem-estar animal",
      "Produtos para banho e tosa"
    ])
  },
  {
    nome: "BANHO E TOSA",
    duracao: 35,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Técnicas de banho",
      "Técnicas de tosa",
      "Manejo de cães e gatos",
      "Equipamentos",
      "Produtos adequados",
      "Segurança no trabalho"
    ])
  },
  {
    nome: "BEM ESTAR ANIMAL",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Conceitos de bem-estar animal",
      "Cinco liberdades",
      "Comportamento natural",
      "Enriquecimento ambiental",
      "Legislação de bem-estar",
      "Avaliação de bem-estar"
    ])
  },
  {
    nome: "BIOÉTICA ANIMAL",
    duracao: 35,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Princípios de bioética",
      "Ética na experimentação animal",
      "Direitos dos animais",
      "Legislação brasileira",
      "Comitês de ética",
      "Alternativas ao uso de animais"
    ])
  },
  {
    nome: "BIOLOGIA ANIMAL",
    duracao: 45,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Anatomia animal",
      "Fisiologia animal",
      "Sistemática animal",
      "Ecologia animal",
      "Genética animal",
      "Evolução"
    ])
  },
  {
    nome: "BIOSSEGURANÇA NA MEDICINA VETERINÁRIA",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Princípios de biossegurança",
      "EPI e EPC",
      "Manejo de resíduos",
      "Prevenção de zoonoses",
      "Desinfecção e esterilização",
      "Normas de segurança"
    ])
  },
  {
    nome: "BIOSSEGURANÇA NA PRODUÇÃO ANIMAL",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Biossegurança na fazenda",
      "Controle de entrada e saída",
      "Quarentena",
      "Desinfecção de instalações",
      "Manejo sanitário",
      "Prevenção de doenças"
    ])
  },
  {
    nome: "BOAS PRÁTICAS NA PRODUÇÃO ANIMAL",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Boas práticas de manejo",
      "Bem-estar na produção",
      "Qualidade dos produtos",
      "Rastreabilidade",
      "Legislação sanitária",
      "Certificação"
    ])
  },
  {
    nome: "BOVINOCULTURA",
    duracao: 45,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Criação de bovinos",
      "Manejo de rebanho",
      "Nutrição bovina",
      "Reprodução bovina",
      "Sanidade bovina",
      "Instalações e equipamentos"
    ])
  },
  {
    nome: "BOVINOCULTURA DO CORTE",
    duracao: 45,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Raças de corte",
      "Manejo de gado de corte",
      "Nutrição para engorda",
      "Reprodução",
      "Sanidade",
      "Abate e comercialização"
    ])
  },
  {
    nome: "BOVINOCULTURA DE LEITE",
    duracao: 45,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Raças leiteiras",
      "Manejo de ordenha",
      "Nutrição de vacas leiteiras",
      "Reprodução",
      "Qualidade do leite",
      "Sanidade do úbere"
    ])
  },
  {
    nome: "CÃO TERAPIA EM HOSPITAIS",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Terapia assistida por animais",
      "Seleção de cães terapeutas",
      "Treinamento específico",
      "Protocolos hospitalares",
      "Benefícios terapêuticos",
      "Biossegurança hospitalar"
    ])
  },
  {
    nome: "CAPRINOCULTURA",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Criação de caprinos",
      "Raças caprinas",
      "Manejo de rebanho",
      "Nutrição caprina",
      "Reprodução",
      "Comercialização de produtos"
    ])
  },
  {
    nome: "CASTRAÇÃO DE CÃES E GATOS",
    duracao: 30,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Indicações para castração",
      "Técnicas cirúrgicas",
      "Anestesia",
      "Cuidados pré e pós-operatórios",
      "Benefícios da castração",
      "Complicações e manejo"
    ])
  },
  {
    nome: "CINOFILIA",
    duracao: 35,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "História dos cães",
      "Raças caninas",
      "Padrões de raça",
      "Exposições caninas",
      "Criação responsável",
      "Genética canina"
    ])
  },
  {
    nome: "CINOTECNIA",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Criação profissional de cães",
      "Seleção genética",
      "Reprodução canina",
      "Manejo de canil",
      "Registro de pedigree",
      "Aspectos comerciais"
    ])
  },
  {
    nome: "COMBATE AO TRÁFICO DE ANIMAIS",
    duracao: 35,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Legislação ambiental",
      "Tráfico de animais silvestres",
      "Fiscalização",
      "Denúncia e combate",
      "Reabilitação de animais",
      "Educação ambiental"
    ])
  },
  {
    nome: "COMPORTAMENTO ANIMAL",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Etologia animal",
      "Comportamento natural",
      "Aprendizagem",
      "Comportamento social",
      "Comportamentos anormais",
      "Enriquecimento ambiental"
    ])
  },
  {
    nome: "CONFINAMENTO DE BOVINOS DE CORTE",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Sistemas de confinamento",
      "Instalações",
      "Nutrição para confinamento",
      "Manejo diário",
      "Sanidade",
      "Viabilidade econômica"
    ])
  },
  {
    nome: "CONTROLE DE ROEDORES",
    duracao: 30,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Biologia de roedores",
      "Métodos de controle",
      "Uso de rodenticidas",
      "Prevenção de infestações",
      "Biossegurança",
      "Legislação"
    ])
  },
  {
    nome: "CORRETOR DE GADO",
    duracao: 35,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Mercado pecuário",
      "Avaliação de animais",
      "Negociação",
      "Documentação e transporte",
      "Aspectos legais",
      "Marketing pecuário"
    ])
  },
  {
    nome: "CRIMES CONTRA ANIMAIS",
    duracao: 30,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Lei de crimes ambientais",
      "Maus-tratos",
      "Denúncia e procedimentos",
      "Perícia veterinária",
      "Legislação de proteção",
      "Responsabilidade civil e criminal"
    ])
  },
  {
    nome: "CUIDADOR DE ANIMAIS",
    duracao: 35,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Manejo diário",
      "Alimentação",
      "Higiene e limpeza",
      "Observação de saúde",
      "Bem-estar animal",
      "Primeiros socorros"
    ])
  },
  {
    nome: "CUIDADOR DE CACHORRO",
    duracao: 30,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Cuidados básicos",
      "Alimentação canina",
      "Higiene",
      "Exercícios e brincadeiras",
      "Saúde canina",
      "Comportamento"
    ])
  },
  {
    nome: "CUIDADOS CLÍNICOS EM ANIMAIS DE PEQUENO PORTE",
    duracao: 45,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Exame clínico",
      "Doenças comuns",
      "Tratamentos básicos",
      "Medicação",
      "Cuidados domiciliares",
      "Prevenção de doenças"
    ])
  },
  {
    nome: "DIREITO DOS ANIMAIS AVIÁRIAS",
    duracao: 30,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Legislação de proteção",
      "Direitos das aves",
      "Regulamentação de criadouros",
      "Tráfico de aves",
      "Bem-estar avícola",
      "Aspectos legais"
    ])
  },
  {
    nome: "DOMA RACIONAL DE BOVINOS",
    duracao: 35,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Princípios da doma racional",
      "Comportamento bovino",
      "Técnicas de manejo",
      "Redução de estresse",
      "Segurança no trabalho",
      "Bem-estar animal"
    ])
  },
  {
    nome: "DOMA RACIONAL DE CAVALOS",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Comportamento equino",
      "Etologia do cavalo",
      "Técnicas de doma",
      "Comunicação humano-cavalo",
      "Segurança",
      "Treinamento progressivo"
    ])
  },
  {
    nome: "DOMADOR DE CAVALOS",
    duracao: 45,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Doma tradicional e racional",
      "Equipamentos de doma",
      "Psicologia equina",
      "Treinamento básico",
      "Segurança do domador",
      "Manejo de cavalos"
    ])
  },
  {
    nome: "ENGORDA DE BOVINOS",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Sistemas de engorda",
      "Nutrição para ganho de peso",
      "Manejo alimentar",
      "Confinamento",
      "Semi-confinamento",
      "Viabilidade econômica"
    ])
  },
  {
    nome: "EQUINOCULTURA",
    duracao: 45,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Criação de cavalos",
      "Raças equinas",
      "Manejo de haras",
      "Nutrição equina",
      "Reprodução",
      "Sanidade equina"
    ])
  },
  {
    nome: "FARMACOLOGIA VETERINÁRIA",
    duracao: 50,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Princípios de farmacologia",
      "Medicamentos veterinários",
      "Vias de administração",
      "Dosagens",
      "Interações medicamentosas",
      "Legislação farmacêutica"
    ])
  },
  {
    nome: "GADO LEITEIRO",
    duracao: 45,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Manejo de gado leiteiro",
      "Ordenha",
      "Nutrição",
      "Reprodução",
      "Qualidade do leite",
      "Comercialização"
    ])
  },
  {
    nome: "GERIATRIA VETERINÁRIA",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Envelhecimento animal",
      "Doenças geriátricas",
      "Cuidados com idosos",
      "Nutrição geriátrica",
      "Qualidade de vida",
      "Manejo de dor"
    ])
  },
  {
    nome: "GESTÃO VETERINÁRIA",
    duracao: 45,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Administração de negócios veterinários",
      "Gestão financeira",
      "Marketing veterinário",
      "Gestão de pessoas",
      "Qualidade no atendimento",
      "Tecnologia e inovação"
    ])
  },
  {
    nome: "GESTÃO DE CLÍNICA VETERINÁRIA",
    duracao: 50,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Gestão administrativa",
      "Controle financeiro",
      "Gestão de equipe",
      "Marketing e vendas",
      "Qualidade no atendimento",
      "Tecnologias de gestão"
    ])
  },
  {
    nome: "GESTÃO DE HOSPITAL VETERINÁRIO",
    duracao: 50,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Administração hospitalar",
      "Protocolos clínicos",
      "Gestão de internação",
      "Controle de infecção",
      "Gestão de emergências",
      "Qualidade hospitalar"
    ])
  },
  {
    nome: "HIGIENE E ESTÉTICA ANIMAL",
    duracao: 35,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Banho e higienização",
      "Tosa estética",
      "Cuidados com pele e pelagem",
      "Produtos cosméticos",
      "Técnicas de embelezamento",
      "Bem-estar no grooming"
    ])
  },
  {
    nome: "HOTEL PARA CÃES E GATOS",
    duracao: 35,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Estrutura de hotel pet",
      "Manejo de hospedagem",
      "Alimentação e cuidados",
      "Bem-estar dos hóspedes",
      "Aspectos legais",
      "Gestão de hotel pet"
    ])
  },
  {
    nome: "IBAMA",
    duracao: 30,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Atribuições do IBAMA",
      "Legislação ambiental",
      "Licenciamento",
      "Fiscalização",
      "Fauna silvestre",
      "Procedimentos legais"
    ])
  },
  {
    nome: "INSEMINAÇÃO ARTIFICIAL EM BOVINOS",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Reprodução bovina",
      "Técnica de IA",
      "Manejo reprodutivo",
      "Seleção de touros",
      "Diagnóstico de gestação",
      "Melhoramento genético"
    ])
  },
  {
    nome: "INTRODUÇÃO À MEDICINA VETERINÁRIA",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "História da medicina veterinária",
      "Áreas de atuação",
      "Anatomia básica",
      "Fisiologia básica",
      "Doenças comuns",
      "Ética profissional"
    ])
  },
  {
    nome: "INTRODUÇÃO À ZOOTECNIA",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Fundamentos da zootecnia",
      "Sistemas de produção",
      "Espécies de produção",
      "Nutrição animal",
      "Reprodução",
      "Melhoramento animal"
    ])
  },
  {
    nome: "LONGEVIDADE ANIMAL",
    duracao: 35,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Envelhecimento saudável",
      "Prevenção de doenças",
      "Nutrição para longevidade",
      "Exercícios e estimulação",
      "Cuidados geriátricos",
      "Qualidade de vida"
    ])
  },
  {
    nome: "MARKETING PARA PET SHOP",
    duracao: 35,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Marketing digital",
      "Redes sociais",
      "Fidelização de clientes",
      "Promoções e eventos",
      "Branding",
      "Vendas consultivas"
    ])
  },
  {
    nome: "MEDICINA VETERINÁRIA PREVENTIVA",
    duracao: 45,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Prevenção de doenças",
      "Vacinação",
      "Vermifugação",
      "Controle de ectoparasitas",
      "Exames preventivos",
      "Programas de saúde"
    ])
  },
  {
    nome: "MELHORAMENTO GENÉTICO ANIMAL",
    duracao: 45,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Genética quantitativa",
      "Seleção animal",
      "Cruzamentos",
      "Avaliação genética",
      "Biotecnologias reprodutivas",
      "Programas de melhoramento"
    ])
  },
  {
    nome: "MELIPONICULTURA",
    duracao: 35,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Abelhas sem ferrão",
      "Criação de meliponíneos",
      "Manejo de colônias",
      "Produtos meliponícolas",
      "Conservação de espécies",
      "Comercialização"
    ])
  },
  {
    nome: "MICROCHIPAGEM ANIMAL",
    duracao: 25,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Identificação eletrônica",
      "Técnica de implantação",
      "Legislação",
      "Registro de animais",
      "Benefícios do microchip",
      "Localização de animais"
    ])
  },
  {
    nome: "NEONATOLOGIA VETERINÁRIA",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Cuidados neonatais",
      "Fisiologia do neonato",
      "Aleitamento",
      "Termorregulação",
      "Doenças neonatais",
      "Emergências neonatais"
    ])
  },
  {
    nome: "NUTRIÇÃO DE AVES",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Necessidades nutricionais",
      "Formulação de rações",
      "Alimentos e ingredientes",
      "Manejo alimentar",
      "Aditivos nutricionais",
      "Nutrição por fase"
    ])
  },
  {
    nome: "NUTRIÇÃO DE CÃES E GATOS",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Necessidades nutricionais",
      "Tipos de alimentos",
      "Nutrição por fase de vida",
      "Dietas especiais",
      "Obesidade",
      "Suplementação"
    ])
  },
  {
    nome: "NUTRIÇÃO DE RUMINANTES",
    duracao: 45,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Fisiologia digestiva",
      "Alimentos volumosos",
      "Concentrados",
      "Formulação de dietas",
      "Aditivos",
      "Manejo alimentar"
    ])
  },
  {
    nome: "NUTRIÇÃO VETERINÁRIA",
    duracao: 50,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Nutrientes essenciais",
      "Digestão e metabolismo",
      "Necessidades nutricionais",
      "Avaliação nutricional",
      "Dietas terapêuticas",
      "Nutrição clínica"
    ])
  },
  {
    nome: "ODONTOLOGIA VETERINÁRIA",
    duracao: 45,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Anatomia dental",
      "Doenças dentárias",
      "Profilaxia dental",
      "Extrações",
      "Radiologia dental",
      "Prevenção odontológica"
    ])
  },
  {
    nome: "OFTALMOLOGIA VETERINÁRIA BÁSICA",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Anatomia ocular",
      "Exame oftalmológico",
      "Doenças oculares comuns",
      "Tratamentos básicos",
      "Emergências oftalmológicas",
      "Farmacologia ocular"
    ])
  },
  {
    nome: "ONCOLOGIA VETERINÁRIA",
    duracao: 50,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Tipos de câncer",
      "Diagnóstico oncológico",
      "Tratamentos",
      "Quimioterapia",
      "Radioterapia",
      "Cuidados paliativos"
    ])
  },
  {
    nome: "ORTOPEDIA VETERINÁRIA",
    duracao: 50,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Anatomia óssea",
      "Fraturas",
      "Luxações",
      "Doenças articulares",
      "Tratamentos ortopédicos",
      "Reabilitação"
    ])
  },
  {
    nome: "OVINOCULTURA",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Criação de ovinos",
      "Raças ovinas",
      "Manejo de rebanho",
      "Nutrição ovina",
      "Reprodução",
      "Lã e carne"
    ])
  },
  {
    nome: "PATOLOGIA VETERINÁRIA",
    duracao: 50,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Patologia geral",
      "Processos patológicos",
      "Necropsia",
      "Histopatologia",
      "Diagnóstico",
      "Interpretação de lesões"
    ])
  },
  {
    nome: "PECUÁRIA DO CORTE",
    duracao: 45,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Sistemas de criação",
      "Manejo de gado de corte",
      "Nutrição",
      "Reprodução",
      "Sanidade",
      "Comercialização"
    ])
  },
  {
    nome: "PECUÁRIA LEITEIRA",
    duracao: 45,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Sistemas de produção",
      "Manejo de ordenha",
      "Qualidade do leite",
      "Nutrição",
      "Reprodução",
      "Sanidade"
    ])
  },
  {
    nome: "PET SHOP DE SUCESSO",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Planejamento do negócio",
      "Gestão financeira",
      "Marketing e vendas",
      "Produtos e serviços",
      "Atendimento ao cliente",
      "Crescimento do negócio"
    ])
  },
  {
    nome: "PISCICULTURA",
    duracao: 45,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Criação de peixes",
      "Espécies comerciais",
      "Manejo de viveiros",
      "Nutrição de peixes",
      "Reprodução",
      "Comercialização"
    ])
  },
  {
    nome: "PRIMEIROS SOCORROS PARA CÃES E GATOS",
    duracao: 30,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Avaliação inicial",
      "Emergências comuns",
      "Técnicas de primeiros socorros",
      "Transporte de emergência",
      "Kit de primeiros socorros",
      "Quando procurar veterinário"
    ])
  },
  {
    nome: "PRIMEIROS SOCORROS PET",
    duracao: 30,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Situações de emergência",
      "Avaliação do animal",
      "Procedimentos básicos",
      "Hemorragias",
      "Fraturas",
      "Intoxicações"
    ])
  },
  {
    nome: "PSICOLOGIA ANIMAL",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Cognição animal",
      "Emoções em animais",
      "Aprendizagem",
      "Comportamento social",
      "Problemas comportamentais",
      "Enriquecimento ambiental"
    ])
  },
  {
    nome: "RADIOGRAFIA VETERINÁRIA BÁSICA",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Física radiológica",
      "Equipamentos",
      "Técnicas radiográficas",
      "Posicionamento",
      "Radioproteção",
      "Interpretação básica"
    ])
  },
  {
    nome: "RECREACIONISTA DE ANIMAIS",
    duracao: 30,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Atividades recreativas",
      "Enriquecimento ambiental",
      "Brincadeiras e jogos",
      "Socialização",
      "Bem-estar animal",
      "Segurança nas atividades"
    ])
  },
  {
    nome: "REPRODUÇÃO ANIMAL",
    duracao: 45,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Anatomia reprodutiva",
      "Fisiologia da reprodução",
      "Ciclo reprodutivo",
      "Gestação e parto",
      "Biotecnologias reprodutivas",
      "Manejo reprodutivo"
    ])
  },
  {
    nome: "SUINOCULTURA",
    duracao: 45,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Criação de suínos",
      "Manejo de granja",
      "Nutrição suína",
      "Reprodução",
      "Sanidade suína",
      "Comercialização"
    ])
  },
  {
    nome: "TAXIDERMIA",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "História da taxidermia",
      "Técnicas de preservação",
      "Ferramentas e materiais",
      "Processo de empalhamento",
      "Aspectos legais",
      "Conservação de peças"
    ])
  },
  {
    nome: "TELEMEDICINA VETERINÁRIA",
    duracao: 35,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Telemedicina veterinária",
      "Plataformas digitais",
      "Consultas online",
      "Teleconsultoria",
      "Aspectos legais",
      "Ética na telemedicina"
    ])
  },
  {
    nome: "TERAPIA ASSISTIDA PARA ANIMAIS",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Conceitos de TAA",
      "Benefícios terapêuticos",
      "Seleção de animais",
      "Treinamento",
      "Protocolos de atendimento",
      "Avaliação de resultados"
    ])
  },
  {
    nome: "TERAPIA COM CAVALOS",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Equoterapia",
      "Benefícios terapêuticos",
      "Seleção de cavalos",
      "Técnicas terapêuticas",
      "Público-alvo",
      "Equipe multiprofissional"
    ])
  },
  {
    nome: "TOSQUIA DE ANIMAIS",
    duracao: 30,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Técnicas de tosquia",
      "Equipamentos",
      "Manejo de animais",
      "Tosquia de ovinos",
      "Bem-estar",
      "Comercialização da lã"
    ])
  },
  {
    nome: "TRATADOR DE ANIMAIS",
    duracao: 35,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Manejo diário",
      "Alimentação",
      "Higiene",
      "Observação de saúde",
      "Bem-estar animal",
      "Enriquecimento ambiental"
    ])
  },
  {
    nome: "TRAUMATOLOGIA VETERINÁRIA BÁSICA",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Avaliação do trauma",
      "Estabilização inicial",
      "Tratamento de feridas",
      "Fraturas e luxações",
      "Trauma craniano",
      "Emergências traumáticas"
    ])
  },
  {
    nome: "URGÊNCIA E EMERGÊNCIA VETERINÁRIA",
    duracao: 50,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Triagem de emergências",
      "Suporte básico de vida",
      "Emergências respiratórias",
      "Emergências cardiovasculares",
      "Intoxicações",
      "Traumatologia"
    ])
  },
  {
    nome: "VACINAÇÃO CANINA E FELINA",
    duracao: 30,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Imunologia básica",
      "Vacinas disponíveis",
      "Calendário vacinal",
      "Técnicas de vacinação",
      "Reações adversas",
      "Legislação"
    ])
  },
  {
    nome: "VETERINÁRIA DE ANIMAIS SILVESTRES E EXÓTICOS",
    duracao: 50,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Legislação de fauna",
      "Manejo de silvestres",
      "Anatomia e fisiologia",
      "Doenças comuns",
      "Contenção e anestesia",
      "Conservação"
    ])
  },
  {
    nome: "ZOONOSES BACTERIANAS",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Principais zoonoses bacterianas",
      "Transmissão",
      "Sintomas em animais e humanos",
      "Prevenção",
      "Tratamento",
      "Vigilância epidemiológica"
    ])
  },
  {
    nome: "ZOONOSES PARASITÁRIAS E FÚNGICAS",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Zoonoses parasitárias",
      "Zoonoses fúngicas",
      "Ciclos de vida",
      "Prevenção e controle",
      "Diagnóstico",
      "Tratamento"
    ])
  },
  {
    nome: "ZOONOSES VIRAIS",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Principais zoonoses virais",
      "Raiva",
      "Influenza",
      "Transmissão",
      "Prevenção",
      "Controle e vigilância"
    ])
  },
  {
    nome: "ZOOTECNIA BÁSICA",
    duracao: 40,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Introdução à zootecnia",
      "Espécies domésticas",
      "Sistemas de produção",
      "Nutrição básica",
      "Reprodução",
      "Sanidade"
    ])
  },
  {
    nome: "TERAPIA HOLÍSTICA PARA ANIMAIS COM VIDEO AULA",
    duracao: 45,
    categoria: "VETERINÁRIA, ZOOTECNIA, PET SHOP",
    conteudo: JSON.stringify([
      "Terapias holísticas",
      "Acupuntura veterinária",
      "Fitoterapia",
      "Homeopatia",
      "Reiki para animais",
      "Aromaterapia veterinária"
    ])
  }
];

async function seedCursosVeterinaria() {
  console.log("🌱 Iniciando seed da categoria VETERINÁRIA, ZOOTECNIA, PET SHOP...");

  try {
    const dataSource = await initializeDataSource();
    const cursoRepository = dataSource.getRepository(Cursos);

    console.log("📦 Verificando cursos existentes...");
    
    for (const cursoData of cursosVeterinaria) {
      const existente = await cursoRepository.findOne({
        where: { nome: cursoData.nome },
      });

      if (existente) {
        console.log(`⏭️  Curso já existe: ${cursoData.nome}`);
        continue;
      }

      const curso = cursoRepository.create(cursoData);
      await cursoRepository.save(curso);
      console.log(`✅ Criado curso: ${cursoData.nome} (${cursoData.duracao}h)`);
    }

    console.log("\n🎉 Categoria VETERINÁRIA, ZOOTECNIA, PET SHOP criada com sucesso!");
    console.log(`📚 ${cursosVeterinaria.length} cursos adicionados!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao criar cursos:", error);
    process.exit(1);
  }
}

seedCursosVeterinaria();
