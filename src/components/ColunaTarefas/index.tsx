import React from 'react';
import CardTarefa from '../CardTarefa';
import { Button } from 'react-bootstrap';
import type { Tarefa } from '../../types/tarefa';

interface ColunaTarefasProps {
    titulo: string;
    tarefas: Tarefa[];
    onAdicionar: () => void;
    onEditar: (id: number) => void;
    onRemover: (id: number) => void;
}

const ColunaTarefas: React.FC<ColunaTarefasProps> = ({ titulo, tarefas, onAdicionar, onEditar, onRemover }) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="bg-light rounded p-3 shadow-sm h-100">
                <h4 className="text-center mb-4">{titulo}</h4>
                {tarefas.map(tarefa => (
                    <CardTarefa
                        key={tarefa.id}
                        titulo={tarefa.titulo}
                        descricao={tarefa.descricao}
                        membros={tarefa.membros || []}
                        onEditar={() => onEditar(tarefa.id)}
                        onRemover={() => onRemover(tarefa.id)}
                    />
                ))}
                <div className="d-grid mt-3">
                    <Button variant="success" onClick={onAdicionar}>
                        + Nova Tarefa
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ColunaTarefas;