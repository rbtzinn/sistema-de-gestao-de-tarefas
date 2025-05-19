import React, { useState } from 'react';
import { Form, Badge } from 'react-bootstrap';

interface PrioridadeTarefaProps {
    onPrioridadeChange?: (prioridade: string) => void;
}

const PrioridadeTarefa: React.FC<PrioridadeTarefaProps> = ({ onPrioridadeChange }) => {
    const [prioridade, setPrioridade] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPrioridade(e.target.value);
        onPrioridadeChange?.(e.target.value);
    };

    const prioridadeBadge = () => {
        switch (prioridade) {
            case 'alta':
                return <Badge bg="danger">Alta</Badge>;
            case 'media':
                return <Badge bg="warning" text="dark">Média</Badge>;
            case 'baixa':
                return <Badge bg="success">Baixa</Badge>;
            default:
                return null;
        }
    };

    return (
        <div className="mb-3">
            <Form.Label>Prioridade</Form.Label>
            <Form.Select value={prioridade} onChange={handleChange}>
                <option value="">Selecionar</option>
                <option value="alta">Alta</option>
                <option value="media">Média</option>
                <option value="baixa">Baixa</option>
            </Form.Select>
            <div className="mt-2">{prioridadeBadge()}</div>
        </div>
    );
};

export default PrioridadeTarefa;
