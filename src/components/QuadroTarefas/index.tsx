import React, { useState, useEffect } from 'react';
import ColunaTarefas from '../ColunaTarefas';
import TarefaModal from '../TarefaModal';
import { Container, Row } from 'react-bootstrap';
import type { Tarefa, TarefaModalType } from '../../types/tarefa';

interface QuadroTarefasProps {
    idDoQuadro: string;
}

const QuadroTarefas: React.FC<QuadroTarefasProps> = ({ idDoQuadro }) => {
    const STORAGE_KEY = `tarefasPersistidas-${idDoQuadro}`;

    const [tarefas, setTarefas] = useState<{
        atribuido: Tarefa[];
        fazendo: Tarefa[];
        feito: Tarefa[];
    }>({
        atribuido: [],
        fazendo: [],
        feito: [],
    });

    const [modalAberto, setModalAberto] = useState(false);
    const [colunaAtual, setColunaAtual] = useState<keyof typeof tarefas | null>(null);
    const [tarefaEditando, setTarefaEditando] = useState<Tarefa | undefined>(undefined);
    useEffect(() => {
        const tarefasSalvas = localStorage.getItem(STORAGE_KEY);
        if (tarefasSalvas) {
            setTarefas(JSON.parse(tarefasSalvas));
        }
    }, [STORAGE_KEY]);
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
    }, [tarefas, STORAGE_KEY]);

    const abrirModalAdicionar = (coluna: keyof typeof tarefas) => {
        setColunaAtual(coluna);
        setTarefaEditando(undefined);
        setModalAberto(true);
    };

    const abrirModalEditar = (coluna: keyof typeof tarefas, tarefa: Tarefa) => {
        setColunaAtual(coluna);
        setTarefaEditando(tarefa);
        setModalAberto(true);
    };

    const salvarTarefa = (tarefaInput: TarefaModalType) => {
        if (!colunaAtual) return;

        setTarefas(prev => {
            const coluna = prev[colunaAtual];
            if (tarefaInput.id) {
                return {
                    ...prev,
                    [colunaAtual]: coluna.map(t =>
                        t.id === tarefaInput.id ? { ...tarefaInput, id: tarefaInput.id } as Tarefa : t
                    ),
                };
            } else {
                const novaTarefa: Tarefa = {
                    id: Date.now(),
                    ...tarefaInput,
                };
                return {
                    ...prev,
                    [colunaAtual]: [...coluna, novaTarefa],
                };
            }
        });
    };

    const removerTarefa = (coluna: keyof typeof tarefas, id: number) => {
        setTarefas(prev => ({
            ...prev,
            [coluna]: prev[coluna].filter(t => t.id !== id),
        }));
    };

    return (
        <>
            <Container fluid>
                <Row className="gy-4">
                    <ColunaTarefas
                        titulo="Atribuído"
                        tarefas={tarefas.atribuido}
                        onAdicionar={() => abrirModalAdicionar('atribuido')}
                        onEditar={(id) => {
                            const tarefa = tarefas.atribuido.find(t => t.id === id);
                            if (tarefa) abrirModalEditar('atribuido', tarefa);
                        }}
                        onRemover={(id) => removerTarefa('atribuido', id)}
                    />
                    <ColunaTarefas
                        titulo="Fazendo"
                        tarefas={tarefas.fazendo}
                        onAdicionar={() => abrirModalAdicionar('fazendo')}
                        onEditar={(id) => {
                            const tarefa = tarefas.fazendo.find(t => t.id === id);
                            if (tarefa) abrirModalEditar('fazendo', tarefa);
                        }}
                        onRemover={(id) => removerTarefa('fazendo', id)}
                    />
                    <ColunaTarefas
                        titulo="Feito"
                        tarefas={tarefas.feito}
                        onAdicionar={() => abrirModalAdicionar('feito')}
                        onEditar={(id) => {
                            const tarefa = tarefas.feito.find(t => t.id === id);
                            if (tarefa) abrirModalEditar('feito', tarefa);
                        }}
                        onRemover={(id) => removerTarefa('feito', id)}
                    />
                </Row>
            </Container>

            <TarefaModal
                show={modalAberto}
                onHide={() => setModalAberto(false)}
                onSave={salvarTarefa}
                tarefaParaEditar={tarefaEditando}
            />
        </>
    );
};

export default QuadroTarefas;
