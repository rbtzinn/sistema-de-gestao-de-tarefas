export function adicionarNoHistorico(id: string, novoItem: string | { texto: string, timestamp?: string }) {
    const HISTORICO_KEY = `historico-${id}`;
    const data = localStorage.getItem(HISTORICO_KEY);
    let historico: any[] = [];
    if (data) {
        historico = JSON.parse(data);
    }
    historico.push(novoItem);
    localStorage.setItem(HISTORICO_KEY, JSON.stringify(historico));
    return historico;
}