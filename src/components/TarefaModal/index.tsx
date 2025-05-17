import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Badge, InputGroup, FormControl } from 'react-bootstrap';
import type { TarefaModalType } from '../../types/tarefa';
import { useEquipe } from '../../contexts/EquipeContext';

interface TarefaModalProps {
    show: boolean;
    onHide: () => void;
    onSave: (tarefa: TarefaModalType) => void;
    tarefaParaEditar?: TarefaModalType;
}


const TarefaModal: React.FC<TarefaModalProps> = ({ show, onHide, onSave, tarefaParaEditar }) => {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [membroInput, setMembroInput] = useState('');
    const [membros, setMembros] = useState<string[]>([]);

    const { adicionarMembro: adicionarAoContexto } = useEquipe();

    useEffect(() => {
        if (tarefaParaEditar) {
            setTitulo(tarefaParaEditar.titulo);
            setDescricao(tarefaParaEditar.descricao);
            setMembros(tarefaParaEditar.membros || []);
        } else {
            setTitulo('');
            setDescricao('');
            setMembros([]);
        }
        setMembroInput('');
    }, [tarefaParaEditar, show]);

    const adicionarMembro = () => {
        const nome = membroInput.trim();
        if (nome && !membros.includes(nome)) {
            setMembros(prev => [...prev, nome]);
            adicionarAoContexto(nome);
            setMembroInput('');
        }
    };

    const removerMembro = (nome: string) => {
        setMembros(prev => prev.filter(m => m !== nome));
    };

    const handleSalvar = () => {
        if (!titulo.trim()) {
            alert('O título é obrigatório.');
            return;
        }

        const tarefaSalva: TarefaModalType = {
            ...(tarefaParaEditar || {}),
            titulo: titulo.trim(),
            descricao: descricao.trim(),
            membros,
        };

        onSave(tarefaSalva);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{tarefaParaEditar ? 'Editar Tarefa' : 'Nova Tarefa'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="tituloTarefa" className="mb-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite o título da tarefa"
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="descricaoTarefa" className="mb-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Descreva a tarefa"
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Label>Membros</Form.Label>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Adicionar membro"
                            value={membroInput}
                            onChange={e => setMembroInput(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    adicionarMembro();
                                }
                            }}
                        />
                        <Button variant="outline-secondary" onClick={adicionarMembro}>
                            Adicionar
                        </Button>
                    </InputGroup>
                    <div>
                        {membros.map(nome => (
                            <Badge
                                key={nome}
                                bg="primary"
                                pill
                                className="me-2 mb-2"
                                style={{ cursor: 'pointer' }}
                                onClick={() => removerMembro(nome)}
                                title="Clique para remover"
                            >
                                {nome} &times;
                            </Badge>
                        ))}
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSalvar}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TarefaModal;
