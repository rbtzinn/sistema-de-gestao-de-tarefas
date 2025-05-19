import React, { useState, useEffect } from 'react';
import { Card, Alert, ListGroup, Form, Button, Collapse, Badge } from 'react-bootstrap';
import {
    FaClock, FaSpinner, FaCheck, FaGripVertical,
    FaPaperclip, FaBell
} from 'react-icons/fa';

import PrazoTarefa from '../PrazoTarefa';
import PrioridadeTarefa from '../PrioridadeTarefa';
import ComentariosTarefa from '../ComentariosTarefa';

import './styles.css';
import HistoricoAlteracoes from '../HistoricoAlteracoes';

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
    const [showDetalhes, setShowDetalhes] = useState(false);

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
                return <FaSpinner className="text-warning spin me-1" />;
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
        <Card
            className="mb-3 shadow-sm tarefa-card"
            onMouseEnter={() => setShowDetalhes(true)}
            onMouseLeave={() => setShowDetalhes(false)}
        >
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        {getStatusIcon()}
                        <Card.Title className="mb-0">{titulo}</Card.Title>
                    </div>
                    <div
                        {...dragHandleProps}
                        style={{ cursor: 'grab' }}
                        className="text-muted"
                    >
                        <FaGripVertical />
                    </div>
                </div>

                <Card.Text className="text-muted">{descricao}</Card.Text>

                {membros.length > 0 && (
                    <div className="mt-2">
                        <strong className="text-muted">Membros:</strong>
                        <div className="d-flex gap-2 mt-1 flex-wrap">
                            {membros.map((membro, index) => (
                                <Badge bg="secondary" key={index}>
                                    {membro}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                <Collapse in={showDetalhes}>
                    <div className="mt-3">
                        <PrazoTarefa
                            onPrazoChange={(prazo) =>
                                setHistorico(prev => [...prev, `Prazo definido para ${prazo}`])
                            }
                        />

                        <PrioridadeTarefa
                            onPrioridadeChange={(prioridade) =>
                                setHistorico(prev => [...prev, `Prioridade alterada para ${prioridade}`])
                            }
                        />

                        <ComentariosTarefa id={id} />

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

                        <HistoricoAlteracoes historico={historico} />

                        <div className="d-flex justify-content-between">
                            <Button variant="outline-secondary" size="sm" onClick={simularNotificacao}>
                                <FaBell className="me-2" />
                                Simular Notificação
                            </Button>
                            <div className="d-flex gap-2">
                                <Button variant="outline-primary" size="sm" onClick={onEditar}>
                                    Editar
                                </Button>
                                <Button variant="outline-danger" size="sm" onClick={onRemover}>
                                    Remover
                                </Button>
                            </div>
                        </div>

                        {notificacao && (
                            <Alert variant="info" className="mt-3 py-1">
                                <FaBell className="me-2" />
                                {notificacao}
                            </Alert>
                        )}
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    );
};

export default CardTarefa;
