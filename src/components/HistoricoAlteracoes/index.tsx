import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaHistory } from 'react-icons/fa';

interface HistoricoAlteracoesProps {
    historico: string[];
}

const HistoricoAlteracoes: React.FC<HistoricoAlteracoesProps> = ({ historico }) => {
    return (
        <div className="mb-3">
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-historico">
                    <FaHistory className="me-2" />
                    Histórico de alterações
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ maxHeight: '200px', overflowY: 'auto', minWidth: '300px' }}>
                    {historico.length > 0 ? (
                        historico.map((item, index) => (
                            <Dropdown.Item key={index} className="text-wrap text-break">
                                {item}
                            </Dropdown.Item>
                        ))
                    ) : (
                        <Dropdown.Item disabled className="text-muted">
                            Sem histórico ainda
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default HistoricoAlteracoes;
