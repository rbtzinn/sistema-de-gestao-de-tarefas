import React from 'react';
import BarraLateral from '../../components/BarraLateral';
import PainelPrincipal from '../../components/PainelPrincipal';

const Painel: React.FC = () => {
    return (
        <div className="d-flex painel-inicial container">
                <BarraLateral />
                <PainelPrincipal />
        </div>
    );
};

export default Painel;
