import React, { useState } from 'react';
import { Form, ListGroup, Button } from 'react-bootstrap';

interface ComentariosTarefaProps {
    id: string;
}

const ComentariosTarefa: React.FC<ComentariosTarefaProps> = ({ id }) => {
    const STORAGE_KEY = `comentarios-${id}`;
    const [comentarios, setComentarios] = useState<string[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    const [comentario, setComentario] = useState('');

    const adicionarComentario = () => {
        if (comentario.trim()) {
            const novos = [...comentarios, comentario.trim()];
            setComentarios(novos);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(novos));
            setComentario('');
        }
    };

    return (
        <div className="mb-3">
            <Form.Label>Comentários</Form.Label>
            <Form.Control
                as="textarea"
                rows={2}
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Digite um comentário..."
                className='no-resize'
            />
            <Button size="sm" variant="primary" className="mt-2" onClick={adicionarComentario}>
                Adicionar Comentário
            </Button>

            {comentarios.length > 0 && (
                <ListGroup className="mt-3">
                    {comentarios.map((c, i) => (
                        <ListGroup.Item key={i}>{c}</ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default ComentariosTarefa;
