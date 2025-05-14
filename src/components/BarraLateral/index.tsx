import React, { useState } from 'react';
import './BarraLateral.css';

const BarraLateral: React.FC = () => {
    const [ativo, setAtivo] = useState<string>('Quadros');

    const handleClick = (item: string) => {
        setAtivo(item);
    };

    return (
        <aside className="menu-lateral p-3">
            <ul className="list-unstyled">
                <li
                    className={`mb-3 fw-bold ${ativo === 'Quadros' ? 'text-primary' : 'text-muted'}`}
                    onClick={() => handleClick('Quadros')}
                >
                    Quadros
                </li>
                <li
                    className={`mb-3 fw-bold ${ativo === 'Templates' ? 'text-primary' : 'text-muted'}`}
                    onClick={() => handleClick('Templates')}
                >
                    Templates
                </li>
                <li
                    className={`mb-3 fw-bold ${ativo === 'Início' ? 'text-primary' : 'text-muted'}`}
                    onClick={() => handleClick('Início')}
                >
                    Início
                </li>
                <hr />
                <li className="text-muted">+ Criar Área de trabalho</li>
            </ul>
        </aside>
    );
};

export default BarraLateral;
