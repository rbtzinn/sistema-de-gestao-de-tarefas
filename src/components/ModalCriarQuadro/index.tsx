import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './ModalCriarQuadro.css';
import { useNavigate } from 'react-router-dom';
import { useQuadros } from '../../contexts/QuadrosContext/';

interface ModalCriarQuadroProps {
    show: boolean;
    onHide: () => void;
    onCriar: (nome: string, descricao: string) => void;
}


const ModalCriarQuadro: React.FC<ModalCriarQuadroProps> = ({ show, onHide, onCriar }) => {
    const [titulo, setTitulo] = useState('');
    const [visibilidade, setVisibilidade] = useState('Área de trabalho');
    const [fundoSelecionado, setFundoSelecionado] = useState('');
    const [erroTitulo, setErroTitulo] = useState(false);
    const navigate = useNavigate();
    const { adicionarQuadro } = useQuadros();

    const fundos = [
        '/img/bg1.jpg', '/img/bg2.jpg', '/img/bg3.jpg', '/img/bg4.jpg',
        '#6D6DFF', '#3B82F6', '#9333EA', '#E879F9', '#E0E0E0'
    ];

    const handleCriar = () => {
        if (!titulo.trim()) {
            setErroTitulo(true);
            return;
        }

        const quadroId = Date.now().toString();
        const novoQuadro = {
            id: quadroId,
            titulo,
            fundo: fundoSelecionado,
            visibilidade
        };

        adicionarQuadro(novoQuadro);
        onCriar(titulo, visibilidade);

        setTitulo('');
        setVisibilidade('Área de trabalho');
        setFundoSelecionado('');
        setErroTitulo(false);
        onHide();

        console.log("Tentando navegar para /quadro/" + quadroId);
        navigate(`/quadro/${quadroId}`, {
            state: novoQuadro
        });
        console.log("Navegação solicitada");
    };

    const handleFundoClick = (fundo: string) => {
        setFundoSelecionado(fundo);
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg" className="modal-grande">
            <Modal.Header closeButton>
                <Modal.Title>Criar Quadro</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div
                    className="preview-quadro mb-3"
                    style={{
                        backgroundColor: fundoSelecionado.startsWith('#') ? fundoSelecionado : undefined,
                        backgroundImage: fundoSelecionado.startsWith('#') ? undefined : `url(${fundoSelecionado})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        border: '1px solid #ddd',
                    }}
                >
                    <div className="mini-quadro-conteudo">
                        <div className="logo-trello">📋</div>
                        <div className="colunas">
                            <div className="coluna"></div>
                            <div className="coluna pequena"></div>
                            <div className="coluna"></div>
                        </div>
                    </div>
                </div>


                <div className="mb-3">
                    <strong>Tela de Fundo</strong>
                    <div className="fundos-opcoes mt-2">
                        {fundos.map((f, index) => (
                            <div
                                key={index}
                                className="fundo-opcao"
                                style={{ backgroundImage: f.startsWith('#') ? 'none' : `url(${f})`, backgroundColor: f.startsWith('#') ? f : undefined }}
                                onClick={() => handleFundoClick(f)}
                            >
                                {f === fundoSelecionado && <span className="check">✔</span>}
                            </div>
                        ))}
                    </div>
                </div>

                <Form>
                    <Form.Group className="mb-2">
                        <Form.Label>
                            Título do quadro <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ex: Projeto App"
                            value={titulo}
                            onChange={(e) => {
                                setTitulo(e.target.value);
                                setErroTitulo(false);
                            }}
                            isInvalid={erroTitulo}
                        />
                        {erroTitulo && (
                            <Form.Text className="text-danger">👋 O título do quadro é obrigatório</Form.Text>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Visibilidade</Form.Label>
                        <Form.Select value={visibilidade} onChange={(e) => setVisibilidade(e.target.value)}>
                            <option>Área de trabalho</option>
                            <option>Público</option>
                            <option>Privado</option>
                        </Form.Select>
                    </Form.Group>

                    <Button variant="primary" className="w-100 mb-2" disabled={!titulo.trim()} onClick={handleCriar}>
                        Criar
                    </Button>
                    <Button variant="light" className="w-100 border">Começar com um template</Button>

                    <p className="text-muted small mt-3">
                        Ao usar imagens do Unsplash, você concorda com a licença e os Termos de Serviço da respectiva empresa
                    </p>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalCriarQuadro;
