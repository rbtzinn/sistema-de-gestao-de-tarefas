import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { Tarefa } from '../../types/tarefa';
import './styles.css';

interface DraggableTarefaProps {
  tarefa: Tarefa;
  render: (tarefa: Tarefa, dragHandleProps: React.HTMLAttributes<HTMLDivElement>) => React.ReactNode;
}

const DraggableTarefa: React.FC<DraggableTarefaProps> = ({ tarefa, render }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: tarefa.id.toString(),
    });

    const style = {
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    };
    const dragHandleProps = {
        ...listeners,
        ...attributes,
    } as React.HTMLAttributes<HTMLDivElement>;

    return (
        <div ref={setNodeRef} style={style} className="draggable-tarefa">
            {render(tarefa, dragHandleProps)}
        </div>
    );
};

export default DraggableTarefa;