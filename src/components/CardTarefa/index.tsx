import React from 'react';
import { Button, Card, Badge } from 'react-bootstrap';

interface CardTarefaProps {
    titulo: string;
    descricao: string;
    membros: string[];
    onEditar: () => void;
    onRemover: () => void;
}

const CardTarefa: React.FC<CardTarefaProps> = ({ titulo, descricao, membros, onEditar, onRemover }) => {
    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>{titulo}</Card.Title>
                <Card.Text>{descricao}</Card.Text>

                <div className="mb-2">
                    {membros.length > 0 ? (
                        membros.map(membro => (
                            <Badge key={membro} bg="info" text="dark" className="me-1">
                                {membro}
                            </Badge>
                        ))
                    ) : (
                        <small className="text-muted">Sem membros</small>
                    )}
                </div>

                <div className="d-flex justify-content-end gap-2">
                    <Button variant="outline-primary" size="sm" onClick={onEditar}>
                        Editar
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={onRemover}>
                        Remover
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default CardTarefa;
