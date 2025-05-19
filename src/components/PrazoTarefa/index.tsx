import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaClock } from 'react-icons/fa';

interface PrazoTarefaProps {
    onPrazoChange?: (prazo: string) => void;
}

const PrazoTarefa: React.FC<PrazoTarefaProps> = ({ onPrazoChange }) => {
    const [prazo, setPrazo] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrazo(e.target.value);
        onPrazoChange?.(e.target.value);
    };

    return (
        <Form.Group className="mb-3">
            <Form.Label><FaClock className="me-2" />Definir prazo</Form.Label>
            <Form.Control type="date" value={prazo} onChange={handleChange} />
        </Form.Group>
    );
};

export default PrazoTarefa;
