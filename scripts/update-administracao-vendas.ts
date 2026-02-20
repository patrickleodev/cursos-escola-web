import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

const conteudoAdministracaoVendas = JSON.stringify([
  "Definição de Marketing",
  "Modelo dos 4 A's",
  "Organização do departamento de vendas",
  "Importância da gerência de vendas",
  "Diretrizes de um gerente de vendas",
  "Estilos de Liderança: autocrática, democrática e livre",
  "Etapas do planejamento de vendas",
  "Plano de vendas",
  "Potencial de Mercado",
  "Previsão de vendas: tipos e métodos",
  "Passos para elaboração da previsão de vendas",
  "Critérios para determinação de territórios",
  "Orçamento de Vendas",
  "Segmentação de Mercado",
  "Distribuição e Logística",
  "Vantagens do uso de canal de distribuição",
  "Varejo: classificação e variáveis controláveis",
  "Tipos de Atacado",
  "Recrutamento e seleção de vendedores",
  "Atribuições gerais do vendedor",
  "Diretrizes para contratação de vendedores",
  "Etapas e processo de seleção",
  "Treinamento de Vendas: fatores determinantes e passos para elaboração",
  "Métodos de treinamento",
  "Pontos importantes em um treinamento de vendas",
  "Estágios do ciclo de carreira do vendedor",
  "Técnicas de vendas",
  "Controle, Análise e Avaliação de Vendas"
]);

async function updateAdministracaoVendas() {
  console.log("🔄 Atualizando conteúdo do curso Administração de vendas...");

  try {
    const dataSource = await initializeDataSource();
    const cursoRepository = dataSource.getRepository(Cursos);

    const curso = await cursoRepository.findOne({
      where: { nome: "Administração de vendas" }
    });

    if (!curso) {
      console.log("❌ Curso 'Administração de vendas' não encontrado.");
      process.exit(1);
    }

    curso.conteudo = conteudoAdministracaoVendas;
    await cursoRepository.save(curso);

    console.log("✅ Conteúdo do curso atualizado com sucesso!");
    console.log(`📚 28 módulos de aprendizado adicionados`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao atualizar curso:", error);
    process.exit(1);
  }
}

updateAdministracaoVendas();
