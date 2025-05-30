export interface Tarefa {
    id: number;
    titulo: string;
    descricao: string;
    membros?: string[];
    prazo?: string;
}

export interface TarefaModalType extends Omit<Tarefa, 'id'> {
    id?: number;
}
