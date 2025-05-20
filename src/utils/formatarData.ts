export function formatarDataCompleta(data: string): string {
    if (!data) return '';
    const [ano, mes, dia] = data.split('-');
    if (!ano || !mes || !dia) return data;

    const anoNum = parseInt(ano, 10);
    if (anoNum < 1900 || anoNum > 2100) return 'Data inválida';

    const meses = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
    ];
    const diaNum = parseInt(dia, 10);
    const mesIndex = parseInt(mes, 10) - 1;
    const mesNome = meses[mesIndex] || mes;

    return `${diaNum} de ${mesNome} de ${anoNum}`;
}
