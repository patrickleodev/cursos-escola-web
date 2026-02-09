import "reflect-metadata";
import { initializeDataSource } from "./src/lib/data-source";
import { Cursos } from "./src/database/entities/cursos.entity";

const cursosVendas = [
  {
    nome: "Administração de vendas",
    duracao: 40,
    categoria: "VENDAS",
    conteudo: JSON.stringify([
      "Fundamentos da administração de vendas",
      "Gestão de equipes comerciais",
      "Planejamento estratégico de vendas",
      "Métricas e indicadores de performance",
      "Controle e análise de resultados",
      "Gestão de território e carteira de clientes"
    ])
  },
  {
    nome: "Atendimento ao Cliente e vendas",
    duracao: 30,
    categoria: "VENDAS",
    conteudo: JSON.stringify([
      "Excelência no atendimento ao cliente",
      "Técnicas de comunicação eficaz",
      "Identificação de necessidades do cliente",
      "Fidelização e pós-venda",
      "Resolução de conflitos e objeções",
      "Customer experience e vendas"
    ])
  },
  {
    nome: "Capacitação em vendas",
    duracao: 35,
    categoria: "VENDAS",
    conteudo: JSON.stringify([
      "Fundamentos de vendas",
      "Perfil do vendedor de sucesso",
      "Processo de vendas consultivo",
      "Técnicas de persuasão",
      "Negociação e fechamento",
      "Desenvolvimento contínuo em vendas"
    ])
  },
  {
    nome: "Compra e vendas de carros usados",
    duracao: 25,
    categoria: "VENDAS",
    conteudo: JSON.stringify([
      "Mercado de carros usados",
      "Avaliação de veículos",
      "Documentação e aspectos legais",
      "Técnicas de negociação automotiva",
      "Precificação de veículos",
      "Estratégias de venda e marketing"
    ])
  },
  {
    nome: "Consultor de Televendas",
    duracao: 30,
    categoria: "VENDAS",
    conteudo: JSON.stringify([
      "Fundamentos de televendas",
      "Técnicas de abordagem por telefone",
      "Script de vendas eficaz",
      "Superação de objeções telefônicas",
      "Voz e comunicação assertiva",
      "Gestão de tempo em vendas remotas"
    ])
  },
  {
    nome: "Consultor de vendas",
    duracao: 40,
    categoria: "VENDAS",
    conteudo: JSON.stringify([
      "Consultoria em vendas",
      "Diagnóstico de necessidades",
      "Solução de problemas do cliente",
      "Apresentação de propostas",
      "Relacionamento de longo prazo",
      "Up selling e cross selling"
    ])
  },
  {
    nome: "Formação de preço e venda",
    duracao: 25,
    categoria: "VENDAS",
    conteudo: JSON.stringify([
      "Precificação estratégica",
      "Cálculo de custos e margem",
      "Análise de mercado e concorrência",
      "Estratégias de pricing",
      "Descontos e condições comerciais",
      "Valor percebido pelo cliente"
    ])
  },
  {
    nome: "Gerente de vendas",
    duracao: 50,
    categoria: "VENDAS",
    conteudo: JSON.stringify([
      "Liderança de equipes comerciais",
      "Planejamento e estratégia de vendas",
      "Gestão de performance",
      "Recrutamento e treinamento",
      "Motivação e coaching",
      "Análise e otimização de processos"
    ])
  },
  {
    nome: "Inteligência de vendas",
    duracao: 35,
    categoria: "VENDAS",
    conteudo: JSON.stringify([
      "Business Intelligence aplicado a vendas",
      "Análise de dados comerciais",
      "Previsão e forecasting",
      "CRM e automação de vendas",
      "Métricas e KPIs estratégicos",
      "Tomada de decisão baseada em dados"
    ])
  },
  {
    nome: "Neurovendas",
    duracao: 30,
    categoria: "VENDAS",
    conteudo: JSON.stringify([
      "Neurociência aplicada a vendas",
      "Gatilhos mentais e persuasão",
      "Comportamento do consumidor",
      "Storytelling e conexão emocional",
      "Linguagem corporal e rapport",
      "Técnicas de influência"
    ])
  },
  {
    nome: "Plano de Vendas",
    duracao: 30,
    categoria: "VENDAS",
    conteudo: JSON.stringify([
      "Elaboração de plano comercial",
      "Definição de metas e objetivos",
      "Estratégias de mercado",
      "Orçamento e recursos",
      "Cronograma e ações táticas",
      "Monitoramento e ajustes"
    ])
  },
  {
    nome: "Promotor de vendas",
    duracao: 25,
    categoria: "VENDAS",
    conteudo: JSON.stringify([
      "Atuação do promotor de vendas",
      "Merchandising e exposição de produtos",
      "Técnicas de promoção no PDV",
      "Relacionamento com varejos",
      "Gestão de estoque e reposição",
      "Relatórios e feedback de mercado"
    ])
  },
  {
    nome: "Psicologia das vendas",
    duracao: 30,
    categoria: "VENDAS",
    conteudo: JSON.stringify([
      "Psicologia do comportamento de compra",
      "Perfis de clientes",
      "Motivações e objeções",
      "Técnicas de persuasão psicológica",
      "Empatia e conexão emocional",
      "Ética em vendas"
    ])
  },
  {
    nome: "Supervisor de vendas",
    duracao: 40,
    categoria: "VENDAS",
    conteudo: JSON.stringify([
      "Supervisão de equipes de vendas",
      "Acompanhamento de performance",
      "Feedback e desenvolvimento",
      "Resolução de problemas operacionais",
      "Comunicação eficaz com equipe",
      "Liderança e motivação"
    ])
  },
  {
    nome: "Técnica de Vendas",
    duracao: 35,
    categoria: "VENDAS",
    conteudo: JSON.stringify([
      "Ciclo de vendas completo",
      "Prospecção e qualificação",
      "Apresentação de produtos/serviços",
      "Técnicas de fechamento",
      "Tratamento de objeções",
      "Follow-up e pós-venda"
    ])
  },
  {
    nome: "Vendas B2B",
    duracao: 40,
    categoria: "VENDAS",
    conteudo: JSON.stringify([
      "Fundamentos de vendas corporativas",
      "Processo de decisão B2B",
      "Identificação de stakeholders",
      "Negociação complexa",
      "Relacionamento de longo prazo",
      "Gestão de contas estratégicas"
    ])
  },
  {
    nome: "Vendas diretas",
    duracao: 30,
    categoria: "VENDAS",
    conteudo: JSON.stringify([
      "Modelo de vendas diretas",
      "Construção de rede de vendedores",
      "Marketing de relacionamento",
      "Demonstração de produtos",
      "Gestão de equipe autônoma",
      "Remuneração e incentivos"
    ])
  }
];

async function seedCursosVendas() {
  try {
    const ds = await initializeDataSource();
    console.log("✅ Conectado ao banco de dados");

    const cursosRepo = ds.getRepository(Cursos);

    // Criar os 17 cursos da categoria VENDAS
    for (const cursoData of cursosVendas) {
      // Verificar se o curso já existe
      const cursoExistente = await cursosRepo.findOne({
        where: { nome: cursoData.nome }
      });

      if (cursoExistente) {
        console.log(`⚠️  Curso já existe: ${cursoData.nome}`);
        continue;
      }

      const curso = cursosRepo.create(cursoData);
      await cursosRepo.save(curso);
      console.log(`✅ Criado curso: ${cursoData.nome} (${cursoData.duracao}h)`);
    }

    console.log("\n🎉 Categoria VENDAS criada com sucesso!");
    console.log(`📚 ${cursosVendas.length} cursos adicionados!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao criar cursos:", error);
    process.exit(1);
  }
}

seedCursosVendas();
