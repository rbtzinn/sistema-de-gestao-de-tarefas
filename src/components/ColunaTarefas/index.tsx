import React from 'react';
import CardTarefa from '../CardTarefa';
import { Button } from 'react-bootstrap';
import { SortableContext } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core'; // <-- isso estava faltando
import type { Tarefa } from '../../types/tarefa';
import DraggableTarefa from '../DraggableTarefa';

interface ColunaTarefasProps {
  titulo: string;
  tarefas: Tarefa[];
  onAdicionar: () => void;
  onEditar: (id: number) => void;
  onRemover: (id: number) => void;
  colunaId: 'atribuido' | 'fazendo' | 'feito';
}

const ColunaTarefas: React.FC<ColunaTarefasProps> = ({
  titulo,
  tarefas,
  onAdicionar,
  onEditar,
  onRemover,
  colunaId,
}) => {
  const { setNodeRef } = useDroppable({
    id: colunaId,
  });

  return (
    <div className="col-md-4 mb-4">
      <div
        ref={setNodeRef}
        className="bg-light rounded p-3 shadow-sm h-100"
      >
        <h4 className="text-center mb-4">{titulo}</h4>

        <SortableContext items={tarefas.map((t) => t.id.toString())}>
          {tarefas.map((tarefa) => (
            <DraggableTarefa
              key={tarefa.id}
              tarefa={tarefa}
              render={(t, dragHandleProps) => (
                <CardTarefa
                  id={t.id.toString()}
                  titulo={t.titulo}
                  descricao={t.descricao}
                  membros={t.membros || []}
                  colunaId={colunaId}
                  onEditar={() => onEditar(t.id)}
                  onRemover={() => onRemover(t.id)}
                  dragHandleProps={dragHandleProps}
                />
              )}
            />


          ))}
        </SortableContext>

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
