import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QuadroTarefas from '../../components/QuadroTarefas';
import { useQuadros } from '../../contexts/QuadrosContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaginaQuadro: React.FC = () => {
    const { id } = useParams();
    const { quadros } = useQuadros();

    const quadro = quadros.find(q => q.id === id);

    useEffect(() => {
        if (!quadro) return;

        const previousBg = document.body.style.background;
        if (quadro.fundo?.startsWith('#')) {
            document.body.style.background = quadro.fundo;
        } else if (quadro.fundo) {
            document.body.style.background = `url(${quadro.fundo}) center/cover no-repeat`;
        }

        return () => {
            document.body.style.background = previousBg;
        };
    }, [quadro]);

    if (!quadro) return <p>Quadro não encontrado</p>;

    return (
        <div className="py-4">
            <header className="text-center mb-4">
                <h1>{quadro.titulo}</h1>
            </header>
            <QuadroTarefas idDoQuadro={id!} />

        </div>
    );
};

export default PaginaQuadro;
