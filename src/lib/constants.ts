const CATEGORIA_CORRECOES: Record<string, string> = {
  STATUTO: "ESTATUTO",
};

export function normalizeCategoria(categoria: string): string {
  const categoriaTrim = categoria.trim();
  const categoriaUpper = categoriaTrim.toLocaleUpperCase("pt-BR");
  return CATEGORIA_CORRECOES[categoriaUpper] ?? categoriaTrim;
}

const CATEGORIAS_BASE = [
  'EDUCA\u00c7\u00c3O',
  'EDUCA\u00c7\u00c3O ESPECIAL',
  'EDUCA\u00c7\u00c3O E PEDAGOGIA',
  'EDUCAÇÃO FÍSICA E ESPORTES',
  'EST\u00c9TICA',
  'ESTÉTICA E BELEZA',
  'DIREITO',
  'ADMINISTRA\u00c7\u00c3O',
  'ENFERMAGEM',
  'MASSAGEM',
  'PSICOLOGIA',
  'PSICOLOGIA E PSICOPEDAGOGIA',
  'ENGENHARIA',
  'HIDR\u00c1ULICA',
  'VETERIN\u00c1RIA, ZOOTECNIA E PETSHOP',
  'ODONTOLOGIA',
  'MATEM\u00c1TICA',
  'GEOGRAFIA',
  'ESTATUTO',
  'NUTRI\u00c7\u00c3O',
  'NUTRI\u00c7\u00c3O E ALIMENTA\u00c7\u00c3O',
  'FARM\u00c1CIA',
  'SEGURAN\u00c7A',
  'MANICURE/PEDICURE',
  'COSMETOLOGIA',
  'TERAPIA HOL\u00cdSTICA',
  'SERVI\u00c7OS GERAIS',
  'MOTORISTA',
  'CUIDADOR DE IDOSOS',
  'SETOR IMOBILI\u00c1RIO',
  'INFORM\u00c1TICA',
  'IDIOMAS',
  'VENDAS',
  'AUTOAJUDA',
  'ESPECIALIZA\u00c7\u00c3O T\u00c9CNICA',
  'IND\u00cdGENA',
  'FISIOTERAPIA E PILATES',
];

export const CATEGORIAS = Array.from(
  new Set(CATEGORIAS_BASE.map(normalizeCategoria))
);
