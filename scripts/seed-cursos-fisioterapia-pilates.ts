import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

const cursosFisioterapia = [
    'ALONGAMENTO MUSCULAR NA FISIOTERAPIA',
    'ALONGAMENTO NA TERCEIRA IDADE',
    'ALONGAMENTO PARA PREVENÇÃO DE LESÕES',
    'AVALIAÇÃO FISIOTERAPÊUTICA NO ESPORTE',
    'BENEFÍCIOS DO PILATES PARA A SAÚDE',
    'BIOFEEDBACK',
    'BIOMECÂNICA',
    'CINESIOLOGIA',
    'CINESIOTERAPIA',
    'CÓDIGO DE ÉTICA DO FISIOTERAPEUTA',
    'CONTROLE POSTURAL',
    'ELETROESTIMULAÇÃO',
    'FISIOTERAPIA BÁSICA',
    'FISIOTERAPIA DERMATOFUNCIONAL BÁSICA',
    'FISIOTERAPIA E SAÚDE PÚBLICA',
    'FISIOTERAPIA ESPORTIVA',
    'FISIOTERAPIA GERIÁTRICA E GERONTOLÓGICA',
    'FISIOTERAPIA HOSPITALAR BÁSICA',
    'FISIOTERAPIA PEDIÁTRICA BÁSICA',
    'FLEXIBILIDADE E ALONGAMENTO',
    'FUNDAMENTOS DA ERGONOMIA',
    'FUNDAMENTOS DO PILATES',
    'INSTRUTOR DE PILATES',
    'NR 17 - ERGONOMIA',
    'PILATES E SAÚDE MENTAL',
    'PILATES NO PROCESSO DE REABILITAÇÃO',
    'REEDUCAÇÃO POSTURAL GLOBAL (RPG)'
];

async function seedFisioterapia() {
    try {
        const ds = await initializeDataSource();
        const cursoRepository = ds.getRepository(Cursos);

        console.log('Iniciando seed de FISIOTERAPIA E PILATES...\n');

        let created = 0;
        let existing = 0;

        for (const nome of cursosFisioterapia) {
            const exists = await cursoRepository.findOne({
                where: { nome }
            });

            if (!exists) {
                const curso = cursoRepository.create({
                    nome,
                    categoria: 'FISIOTERAPIA E PILATES',
                    conteudo: JSON.stringify({
                        descricao: `Curso de ${nome.toLowerCase()}`,
                        duracao: '40 horas',
                        objetivos: [
                            `Entender os fundamentos de ${nome.toLowerCase()}`,
                            'Aplicar conhecimentos práticos',
                            'Desenvolver habilidades profissionais'
                        ],
                        modulos: [
                            { titulo: 'Introdução', duracao: '10 horas' },
                            { titulo: 'Prática', duracao: '20 horas' },
                            { titulo: 'Avaliação', duracao: '10 horas' }
                        ]
                    })
                });

                await cursoRepository.save(curso);
                created++;
                console.log(`✅ Criado: ${nome}`);
            } else {
                existing++;
                console.log(`⏭️  Já existe: ${nome}`);
            }
        }

        console.log(`\n📊 Resultado:`);
        console.log(`   ✅ Novos cursos: ${created}`);
        console.log(`   ⏭️  Já existentes: ${existing}`);
        console.log(`   📚 Total na categoria: ${created + existing}`);

        process.exit(0);
    } catch (error) {
        console.error('Erro ao fazer seed:', error);
        process.exit(1);
    }
}

seedFisioterapia();
