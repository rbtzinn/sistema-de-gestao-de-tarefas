import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './PaginaQuadro.css';
import CardTarefa from '../../components/CardTarefa';

const PaginaQuadro: React.FC = () => {
    const location = useLocation();
    const { titulo, fundo } = location.state || {};

    useEffect(() => {
        const previousBg = document.body.style.background;
        if (fundo?.startsWith('#')) {
            document.body.style.background = fundo;
        } else if (fundo) {
            document.body.style.background = `url(${fundo}) center/cover no-repeat`;
        }

        return () => {
            document.body.style.background = previousBg;
        };
    }, [fundo]);

    return (
        <div className="pagina-quadro">
            <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h1>{titulo}</h1>
            </header>

            <div className="quadro-tarefas">
                <div className="coluna">
                    <h2>Atribuído</h2>
                    <CardTarefa titulo="Tarefa 1" descricao="Detalhes da tarefa 1" />
                    <CardTarefa titulo="Tarefa 2" descricao="Detalhes da tarefa 2" />
                </div>

                <div className="coluna">
                    <h2>Fazendo</h2>
                    <CardTarefa titulo="Tarefa 3" descricao="Em andamento..." />
                </div>

                <div className="coluna">
                    <h2>Feito</h2>
                    <CardTarefa titulo="Tarefa 4" descricao="Concluído!" />
                </div>
            </div>
        </div>
    );
};

export default PaginaQuadro;
