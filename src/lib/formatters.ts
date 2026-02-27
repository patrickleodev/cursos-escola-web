/**
 * Formata CPF para exibição (000.000.000-00)
 */
export function formatCPF(cpf: string): string {
    const numbers = cpf.replace(/\D/g, '');
    if (numbers.length === 11) {
        return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
    }
    return cpf;
}

/**
 * Formata telefone para exibição ((00) 00000-0000 ou (00) 0000-0000)
 */
export function formatTelefone(tel: string): string {
    const numbers = tel.replace(/\D/g, '');
    if (numbers.length === 11) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
    if (numbers.length === 10) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
    }
    return tel;
}

/**
 * Formata RG para exibição (00.000.000-0)
 */
export function formatRG(rg: string): string {
    const numbers = rg.replace(/\D/g, '');
    if (numbers.length === 9) {
        return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}-${numbers.slice(8, 9)}`;
    }
    // For RGs with variable length (up to 12), display just the digits without mask
    if (numbers.length > 0) return numbers;
    return rg;
}

/**
 * Formata WhatsApp para exibição (mesmo que telefone)
 */
export function formatWhatsApp(whatsapp: string): string {
    return formatTelefone(whatsapp);
}

/**
 * Remove formatação de um valor
 */
export function removeFormatting(value: string): string {
    return value.replace(/\D/g, '');
}
