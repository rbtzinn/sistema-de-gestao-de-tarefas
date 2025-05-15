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
        <main className="flex-grow-1 p-3 p-md-4 painel-principal">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
                <h5 className="fw-semibold m-0">Seus Quadros</h5>
                <Button
                    variant="primary"
                    onClick={() => setShowModal(true)}
                    className="d-flex align-items-center gap-2"
                >
                    <span className="fs-5">+</span> Criar Quadro
                </Button>
            </div>

            <ModalCriarQuadro
                show={showModal}
                onHide={() => setShowModal(false)}
                onCriar={() => { }}
            />
            <div className="row gx-3 gy-4">
                {quadros.map((quadro) => (
                    <div
                        key={quadro.id}
                        className="col-6 col-sm-6 col-md-4 col-lg-3"
                        onClick={() => navigate(`/quadro/${quadro.id}`, { state: quadro })}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="card template-card shadow-sm h-100">
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
                            <div className="card-body d-flex flex-column justify-content-between">
                                <h6 className="card-title fw-bold">{quadro.titulo}</h6>
                                <span className="badge-quadro align-self-start">{quadro.visibilidade}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default PainelPrincipal;
