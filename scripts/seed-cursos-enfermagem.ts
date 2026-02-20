import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

const cursosEnfermagem = [
  {
    nome: "A IMPORTÂNCIA DO ALEITAMENTO MATERNO",
    duracao: 20,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Benefícios fisiológicos do aleitamento materno",
      "Técnicas corretas de amamentação",
      "Problemas comuns e soluções",
      "Orientação às gestantes e puérperas",
      "Apoio psicoemocional para mães",
      "Legislação e direitos da lactante"
    ])
  },
  {
    nome: "ACOLHIMENTO EM SAÚDE MENTAL",
    duracao: 30,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Conceitos fundamentais em saúde mental",
      "Empatia e escuta ativa",
      "Manejo de crises emocional",
      "Protocolo de acolhimento psicológico",
      "Referência e contrarreferência",
      "Ética e confidencialidade"
    ])
  },
  {
    nome: "ACOLHIMENTO HUMANIZADO",
    duracao: 25,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Humanização em saúde",
      "Comunicação não violenta",
      "Aspectos emocionais do paciente",
      "Acolhimento na recepção",
      "Gestão de conflitos humanizado",
      "Qualidade de vida do paciente"
    ])
  },
  {
    nome: "ACOMPANHAMENTO DO DESENVOLVIMENTO INFANTIL",
    duracao: 35,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Marcos do desenvolvimento infantil",
      "Avaliação do crescimento",
      "Desenvolvimento cognitivo e motor",
      "Identificação de atrasos",
      "Intervenção precoce",
      "Orientação à família"
    ])
  },
  {
    nome: "ADMINISTRAÇÃO EM ENFERMAGEM",
    duracao: 40,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Gestão de recursos humanos em enfermagem",
      "Planejamento e organização de serviços",
      "Controle orçamentário",
      "Qualidade assistencial",
      "Indicadores de desempenho",
      "Liderança em enfermagem"
    ])
  },
  {
    nome: "APERFEIÇOAMENTO EM CUIDADOS PALIATIVOS",
    duracao: 40,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Princípios dos cuidados paliativos",
      "Manejo da dor e sintomas",
      "Apoio emocional ao paciente e família",
      "Comunicação sobre morte e luto",
      "Qualidade de vida em final de vida",
      "Equipe multidisciplinar em paliativos"
    ])
  },
  {
    nome: "APERFEIÇOAMENTO PARA CUIDADORES DE IDOSOS",
    duracao: 30,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Envelhecimento saudável",
      "Higiene e conforto do idoso",
      "Prevenção de quedas e quedas",
      "Alimentação e nutrição",
      "Medicações e sua administração",
      "Aspectos psicossociais do idoso"
    ])
  },
  {
    nome: "ARMAZENAGEM DE MEDICAMENTOS",
    duracao: 20,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Classificação de medicamentos",
      "Condições ideais de armazenamento",
      "Controle de temperatura e umidade",
      "Organização de estoque",
      "Validade e descarte",
      "Segurança no armazenamento"
    ])
  },
  {
    nome: "ASSISTÊNCIA BÁSICA À GESTANTE",
    duracao: 30,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Fisiologia da gestação",
      "Alterações corporais na gravidez",
      "Acompanhamento pré-natal básico",
      "Educação para a gravidez",
      "Autocuidado gestacional",
      "Sinais de alerta na gestação"
    ])
  },
  {
    nome: "ASSISTÊNCIA DE ENFERMAGEM AO PACIENTE ACAMADO",
    duracao: 35,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Mobilização adequada do paciente",
      "Prevenção de úlceras por pressão",
      "Higiene e conforto do acamado",
      "Monitorização contínua",
      "Comunicação com paciente dependente",
      "Orientação à família cuidadora"
    ])
  },
  {
    nome: "ASSISTÊNCIA DE ENFERMAGEM AO PACIENTE ONCOLÓGICO",
    duracao: 40,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Oncologia e tipos de câncer",
      "Tratamentos oncológicos",
      "Efeitos colaterais e manejo",
      "Apoio psicológico em câncer",
      "Prevenção de complicações",
      "Qualidade de vida oncológica"
    ])
  },
  {
    nome: "ASSISTÊNCIA DE ENFERMAGEM AO PACIENTE PSIQUIÁTRICO",
    duracao: 35,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Transtornos psiquiátricos principais",
      "Comunicação com paciente psiquiátrico",
      "Manejo de comportamentos agressivos",
      "Medicações psiquiátricas",
      "Terapias complementares",
      "Direitos do paciente mental"
    ])
  },
  {
    nome: "ATENÇÃO À GESTANTE NO SUS",
    duracao: 30,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Políticas públicas para gestante",
      "Programa de pré-natal no SUS",
      "Acesso a exames e consultas",
      "Direitos da gestante",
      "Planejamento familiar",
      "Referência para parto"
    ])
  },
  {
    nome: "ATENÇÃO À SAÚDE DO RECÉM NASCIDO",
    duracao: 30,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Teste do pezinho e triagem neonatal",
      "Imunizações no recém nascido",
      "Exame físico neonatal",
      "Alimentação do recém nascido",
      "Icterícia neonatal",
      "Orientação pós-alta"
    ])
  },
  {
    nome: "ATENÇÃO AO IDOSO COM DEMÊNCIA",
    duracao: 35,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Tipos de demência",
      "Alterações cognitivas na demência",
      "Comunicação com demenciado",
      "Manejo de comportamentos difíceis",
      "Segurança do ambiente",
      "Apoio ao cuidador familiar"
    ])
  },
  {
    nome: "ATENÇÃO PRÉ-NATAL E PUERPERAL",
    duracao: 40,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Consulta de pré-natal estruturada",
      "Fisiologia da gravidez",
      "Exames e testes gestacionais",
      "Preparação para o parto",
      "Alterações puerperais normais",
      "Complicações pós-parto"
    ])
  },
  {
    nome: "ATENDIMENTO HUMANIZADO NA SAÚDE",
    duracao: 25,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Humanização em saúde",
      "Relação interpessoal efetiva",
      "Acolhimento ao paciente",
      "Respeito à diversidade",
      "Comunicação empática",
      "Satisfação do usuário"
    ])
  },
  {
    nome: "ATENDIMENTO PRÉ-HOSPITALAR",
    duracao: 40,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Conceitos de urgência e emergência",
      "Ativação do sistema de emergência",
      "Avaliação inicial do paciente",
      "Primeiros socorros básico",
      "Transporte seguro do paciente",
      "Comunicação com hospital"
    ])
  },
  {
    nome: "AUTISMO E ENFERMAGEM",
    duracao: 30,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Espectro autista",
      "Características do autismo",
      "Comunicação com autista",
      "Cuidados de enfermagem específicos",
      "Inclusão do autista",
      "Orientação à família"
    ])
  },
  {
    nome: "AUXILIAR DE ANÁLISES CLÍNICAS",
    duracao: 40,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Laboratório clínico",
      "Biossegurança laboratorial",
      "Técnicas de coleta de sangue",
      "Processamento de amostras",
      "Equipamentos de laboratório",
      "Controle de qualidade"
    ])
  },
  {
    nome: "AUXILIAR DE COLETA DE EXAMES LABORATORIAIS",
    duracao: 30,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Tipos de exames laboratoriais",
      "Técnica de punção venosa",
      "Tipos de tubos de coleta",
      "Identificação de amostras",
      "Cuidados com o paciente",
      "Biossegurança na coleta"
    ])
  },
  {
    nome: "AUXILIAR DE LABORATÓRIO",
    duracao: 35,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Ambiente laboratorial",
      "Equipamentos básicos",
      "Limpeza e esterilização",
      "Preparação de reagentes",
      "Descarte de resíduos",
      "Documentação de testes"
    ])
  },
  {
    nome: "AVALIAÇÃO E TRATAMENTO DE FERIDAS",
    duracao: 40,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Anatomia da pele",
      "Processo de cicatrização",
      "Classificação de feridas",
      "Avaliação de feridas",
      "Técnicas de curativo",
      "Controle de infecção"
    ])
  },
  {
    nome: "BIOÉTICA NA ENFERMAGEM",
    duracao: 30,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Conceitos básicos de bioética",
      "Princípios éticos na saúde",
      "Autonomia do paciente",
      "Consentimento informado",
      "Conflitos éticos",
      "Código de ética de enfermagem"
    ])
  },
  {
    nome: "BIOSSEGURANÇA EM SALA DE VACINA",
    duracao: 25,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Imunizações básicas",
      "Conservação de vacinas",
      "Técnica de aplicação",
      "Protocolo de biossegurança",
      "Manejo de resíduos vacinais",
      "Eventos adversos pós-vacinação"
    ])
  },
  {
    nome: "BIOSSEGURANÇA EM ENFERMAGEM",
    duracao: 30,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Precauções padrão",
      "Equipamento de proteção individual",
      "Desinfecção e esterilização",
      "Exposição ocupacional",
      "Protocolo de acidentes",
      "Legislação em biossegurança"
    ])
  },
  {
    nome: "BOAS PRÁTICAS DE ARMAZENAMENTO E DISTRIBUIÇÃO DE MEDICAMENTOS",
    duracao: 35,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Cadeia de medicamentos",
      "Condições de armazenamento",
      "Controle de estoque",
      "Distribuição segura",
      "Rastreabilidade",
      "Legislação farmacêutica"
    ])
  },
  {
    nome: "BOAS PRÁTICAS DISPENSAÇÃO DE MEDICAMENTOS",
    duracao: 30,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Prescrição medicamentosa",
      "Verificação de prescrição",
      "Identificação do paciente",
      "Técnica de dispensação",
      "Orientação ao paciente",
      "Documentação"
    ])
  },
  {
    nome: "BOAS PRÁTICAS FARMACÊUTICAS",
    duracao: 40,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Legislação farmacêutica",
      "Controle de qualidade",
      "Manipulação segura",
      "Armazenamento adequado",
      "Documentação farmacêutica",
      "Orientação ao paciente"
    ])
  },
  {
    nome: "BOAS PRÁTICAS NO LACTÁRIO HOSPITALAR",
    duracao: 25,
    categoria: "ENFERMAGEM",
    conteudo: JSON.stringify([
      "Estrutura do lactário",
      "Higienização de utensílios",
      "Preparo de aleitamento",
      "Armazenamento adequado",
      "Distribuição de alimentos",
      "Controle de temperatura"
    ])
  }
];

async function seedEnfermagem() {
  try {
    const ds = await initializeDataSource();
    console.log("✅ Conectado ao banco de dados");

    const cursosRepo = ds.getRepository(Cursos);

    for (const curso of cursosEnfermagem) {
      const existente = await cursosRepo.findOne({
        where: { nome: curso.nome }
      });

      if (!existente) {
        const novoCurso = cursosRepo.create(curso);
        await cursosRepo.save(novoCurso);
        console.log(`✅ Criado: ${curso.nome}`);
      } else {
        console.log(`⏭️  Já existe: ${curso.nome}`);
      }
    }

    console.log("\n🎉 30 cursos de Enfermagem adicionados com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao criar cursos:", error);
    process.exit(1);
  }
}

seedEnfermagem();
