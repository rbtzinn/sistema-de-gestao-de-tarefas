import React, { useState, useEffect } from 'react';
import ColunaTarefas from '../ColunaTarefas';
import TarefaModal from '../TarefaModal';
import { Container, Row } from 'react-bootstrap';
import {
    DndContext,
    closestCorners,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from '@dnd-kit/core';
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

        setTarefas((prev) => {
            const coluna = prev[colunaAtual];
            if (tarefaInput.id) {
                return {
                    ...prev,
                    [colunaAtual]: coluna.map((t) =>
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
        setTarefas((prev) => ({
            ...prev,
            [coluna]: prev[coluna].filter((t) => t.id !== id),
        }));
    };

    const sensores = useSensors(useSensor(PointerSensor));

    const moverTarefa = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        let origemColuna: keyof typeof tarefas | null = null;
        let tarefaMovida: Tarefa | undefined;

        for (const coluna of Object.keys(tarefas) as (keyof typeof tarefas)[]) {
            const tarefa = tarefas[coluna].find((t) => t.id.toString() === active.id);
            if (tarefa) {
                origemColuna = coluna;
                tarefaMovida = tarefa;
                break;
            }
        }

        const destinoColuna = over.id as keyof typeof tarefas;

        if (origemColuna && destinoColuna && tarefaMovida) {
            setTarefas((prev) => {
                const novas = { ...prev };
                novas[origemColuna!] = novas[origemColuna!].filter((t) => t.id !== tarefaMovida!.id);
                novas[destinoColuna] = [...novas[destinoColuna], tarefaMovida!];
                return novas;
            });
        }
    };

    return (
        <>
            <Container fluid>
                <DndContext sensors={sensores} collisionDetection={closestCorners} onDragEnd={moverTarefa}>
                    <Row className="gy-4">
                        {(['atribuido', 'fazendo', 'feito'] as const).map((colunaKey) => (
                            <ColunaTarefas
                                key={colunaKey}
                                titulo={colunaKey.charAt(0).toUpperCase() + colunaKey.slice(1)}
                                tarefas={tarefas[colunaKey]}
                                onAdicionar={() => abrirModalAdicionar(colunaKey)}
                                onEditar={(id) => {
                                    const tarefa = tarefas[colunaKey].find((t) => t.id === Number(id));
                                    if (tarefa) abrirModalEditar(colunaKey, tarefa);
                                }}
                                onRemover={(id) => removerTarefa(colunaKey, Number(id))}
                                colunaId={colunaKey}
                            />
                        ))}

                    </Row>
                </DndContext>
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
