import React from 'react';
import CardTarefa from '../CardTarefa';
import { Button } from 'react-bootstrap';
import { SortableContext } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import type { Tarefa } from '../../types/tarefa';
import DraggableTarefa from '../DraggableTarefa';

interface ColunaTarefasProps {
  titulo: string;
  tarefas: Tarefa[];
  onAdicionar: () => void;
  onEditar: (id: number) => void;
  onRemover: (id: number) => void;
  onMover: (id: number, direcao: 'esquerda' | 'direita') => void;
  colunaId: 'atribuido' | 'fazendo' | 'feito';
}

const ColunaTarefas: React.FC<ColunaTarefasProps> = ({
  titulo,
  tarefas,
  onAdicionar,
  onEditar,
  onRemover,
  onMover,
  colunaId,
}) => {
  const { setNodeRef } = useDroppable({ id: colunaId });

  const isMobile = window.innerWidth < 768;

  const podeMoverEsquerda = (colunaId: string) => colunaId === 'fazendo' || colunaId === 'feito';
  const podeMoverDireita = (colunaId: string) => colunaId === 'atribuido' || colunaId === 'fazendo';

  return (
    <div className="col-md-4 mb-4">
      <div ref={setNodeRef} className="bg-light rounded p-3 shadow-sm h-100">
        <h4 className="text-center mb-4">{titulo}</h4>

        <SortableContext items={tarefas.map((t) => t.id.toString())}>
          {tarefas.map((tarefa) =>
            isMobile ? (
              <div key={tarefa.id}>
                <CardTarefa
                  id={tarefa.id.toString()}
                  titulo={tarefa.titulo}
                  descricao={tarefa.descricao}
                  membros={tarefa.membros || []}
                  colunaId={colunaId}
                  onEditar={() => onEditar(tarefa.id)}
                  onRemover={() => onRemover(tarefa.id)}
                />
                <div className="d-flex justify-content-between mb-3 px-2">
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    disabled={!podeMoverEsquerda(colunaId)}
                    onClick={() => onMover(tarefa.id, 'esquerda')}
                  >
                    ←
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    disabled={!podeMoverDireita(colunaId)}
                    onClick={() => onMover(tarefa.id, 'direita')}
                  >
                    →
                  </Button>
                </div>
              </div>
            ) : (
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
            )
          )}
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
