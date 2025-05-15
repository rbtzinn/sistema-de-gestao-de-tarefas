import React, { useState } from 'react';
import { useQuadros } from '../../contexts/QuadrosContext';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ModalCriarQuadro from '../ModalCriarQuadro';
import './PainelPrincipal.css';

const PainelPrincipal: React.FC = () => {
    const { quadros } = useQuadros();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    return (
        <main className="flex-grow-1 p-4 painel-principal">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-semibold m-0">Seus Quadros</h5>
                <Button
                    variant="primary"
                    onClick={() => setShowModal(true)}
                    className="d-flex align-items-center gap-2"
                >
                    <span>+</span> Criar Quadro
                </Button>
            </div>

            <ModalCriarQuadro
                show={showModal}
                onHide={() => setShowModal(false)}
                onCriar={() => {}}
            />


            <div className="d-flex gap-3 flex-wrap mb-4">
                {quadros.map((quadro) => (
                    <div
                        key={quadro.id}
                        className="card template-card shadow-sm"
                        onClick={() => navigate(`/quadro/${quadro.id}`, { state: quadro })}
                        style={{ cursor: 'pointer' }}
                    >
                        <div
                            className="card-img-top"
                            style={{
                                height: '100px',
                                backgroundColor: quadro.fundo.startsWith('#') ? quadro.fundo : undefined,
                                backgroundImage: quadro.fundo.startsWith('#') ? undefined : `url(${quadro.fundo})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />
                        <div className="card-body">
                            <h6 className="card-title fw-bold">{quadro.titulo}</h6>
                            <span className="badge bg-success">{quadro.visibilidade}</span>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default PainelPrincipal;