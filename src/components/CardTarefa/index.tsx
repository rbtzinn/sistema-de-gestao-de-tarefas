import React, { useState, useEffect } from 'react';
import { Button, Card, Badge, Alert, ListGroup, Form } from 'react-bootstrap';
import {
    FaClock, FaSpinner, FaCheck, FaGripVertical,
    FaPaperclip, FaHistory, FaBell
} from 'react-icons/fa';
import './styles.css'

interface CardTarefaProps {
    id: string;
    titulo: string;
    descricao: string;
    membros: string[];
    status?: 'atribuido' | 'fazendo' | 'feito';
    colunaId?: 'atribuido' | 'fazendo' | 'feito';
    onEditar: () => void;
    onRemover: () => void;
    dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
}

const CardTarefa: React.FC<CardTarefaProps> = ({
    id,
    titulo,
    descricao,
    membros,
    status,
    colunaId,
    onEditar,
    onRemover,
    dragHandleProps = {},
}) => {
    const currentStatus = status || colunaId;

    const [anexos, setAnexos] = useState<File[]>([]);
    const [historico, setHistorico] = useState<string[]>([]);
    const [notificacao, setNotificacao] = useState<string | null>(null);

    const HISTORICO_KEY = `historico-${id}`;
    useEffect(() => {
        const data = localStorage.getItem(HISTORICO_KEY);
        if (data) {
            setHistorico(JSON.parse(data));
        }
    }, [HISTORICO_KEY]);
    useEffect(() => {
        localStorage.setItem(HISTORICO_KEY, JSON.stringify(historico));
    }, [historico, HISTORICO_KEY]);

    const getStatusIcon = () => {
        switch (currentStatus) {
            case 'atribuido':
                return <FaClock className="text-secondary me-1" />;
            case 'fazendo':
                return (
                    <span className="me-1">
                        <FaSpinner className="text-warning spin" />
                    </span>
                );
            case 'feito':
                return <FaCheck className="text-success me-1" />;
            default:
                return null;
        }
    };


    const handleAnexo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files);
            setAnexos(prev => [...prev, ...newFiles]);
            setHistorico(prev => [...prev, `Anexados ${newFiles.length} arquivo(s)`]);
            setNotificacao('Novo(s) arquivo(s) anexado(s) com sucesso!');
            setTimeout(() => setNotificacao(null), 3000);
        }
    };

    const simularNotificacao = () => {
        setNotificacao('Você tem uma nova notificação relacionada a esta tarefa.');
        setHistorico(prev => [...prev, 'Notificação simulada enviada']);
        setTimeout(() => setNotificacao(null), 3000);
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title className="d-flex align-items-center justify-content-between">
                    <div
                        className="d-flex align-items-center"
                        {...dragHandleProps}
                        style={{ cursor: 'grab' }}
                    >
                        {getStatusIcon()}
                        {titulo}
                    </div>
                    <div {...dragHandleProps} style={{ cursor: 'grab', display: 'inline-flex' }}>
                        <FaGripVertical />
                    </div>
                </Card.Title>

                <Card.Text>{descricao}</Card.Text>

                <div className="mb-2">
                    {membros.length > 0 ? (
                        membros.map((membro, index) => (
                            <Badge key={index} bg="info" text="dark" className="me-1">
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

                <hr />

                {notificacao && (
                    <Alert variant="info" className="mt-3 py-1">
                        <FaBell className="me-2" />
                        {notificacao}
                    </Alert>
                )}

                <div className="mt-3">
                    <Form.Group controlId={`formFile-${id}`} className="mb-3">
                        <Form.Label><FaPaperclip className="me-2" />Anexar arquivos</Form.Label>
                        <Form.Control type="file" multiple onChange={handleAnexo} />
                        {anexos.length > 0 && (
                            <ListGroup className="mt-2">
                                {anexos.map((file, index) => (
                                    <ListGroup.Item key={index}>{file.name}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </Form.Group>

                    <div className="mb-3">
                        <strong><FaHistory className="me-2" />Histórico de alterações</strong>
                        {historico.length > 0 ? (
                            <ListGroup className="mt-1">
                                {historico.map((item, index) => (
                                    <ListGroup.Item key={index}>{item}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <div className="text-muted mt-1">Sem histórico ainda</div>
                        )}
                    </div>

                    <Button variant="outline-secondary" size="sm" onClick={simularNotificacao}>
                        <FaBell className="me-2" />
                        Simular Notificação
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default CardTarefa;
