import "reflect-metadata";
import { initializeDataSource } from "../src/lib/data-source";
import { Cursos } from "../src/database/entities/cursos.entity";

const expectedCourses = [
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
    'ELETROTERAPIA',
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
    'NEUROFISIOLOGIA',
    'NR 17 - ERGONOMIA',
    'PILATES E SAÚDE MENTAL',
    'PILATES NO PROCESSO DE REABILITAÇÃO',
    'REEDUCAÇÃO POSTURAL GLOBAL (RPG)',
    'TERAPIA OCUPACIONAL'
];

async function checkCourses() {
    try {
        const ds = await initializeDataSource();
        const cursoRepository = ds.getRepository(Cursos);

        console.log('Verificando categoria FISIOTERAPIA E PILATES...\n');

        const existing: string[] = [];
        const missing: string[] = [];

        for (const courseNome of expectedCourses) {
            const course = await cursoRepository.findOne({
                where: { nome: courseNome }
            });

            if (course) {
                existing.push(courseNome);
            } else {
                missing.push(courseNome);
            }
        }

        console.log(`✅ Cursos já existentes: ${existing.length}`);
        if (existing.length > 0) {
            existing.forEach(curso => console.log(`  - ${curso}`));
        }

        console.log(`\n❌ Cursos faltando: ${missing.length}`);
        if (missing.length > 0) {
            missing.forEach(curso => console.log(`  - ${curso}`));
        }

        console.log(`\n📊 Total esperado: ${expectedCourses.length}`);
        console.log(`📊 Total encontrado: ${existing.length}`);
        console.log(`📊 Taxa de cobertura: ${((existing.length / expectedCourses.length) * 100).toFixed(2)}%`);

        process.exit(0);
    } catch (error) {
        console.error('Erro ao verificar cursos:', error);
        process.exit(1);
    }
}

checkCourses();
