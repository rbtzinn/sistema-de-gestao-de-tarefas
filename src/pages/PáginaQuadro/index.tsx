import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import QuadroTarefas from '../../components/QuadroTarefas';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className="py-4">
            <header className="text-center mb-4">
                <h1>{titulo}</h1>
            </header>
            <QuadroTarefas />
        </div>
    );
};

export default PaginaQuadro;
