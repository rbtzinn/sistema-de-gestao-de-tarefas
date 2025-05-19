import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaHistory } from 'react-icons/fa';

interface HistoricoAlteracoesProps {
    historico: string[];
}

const HistoricoAlteracoes: React.FC<HistoricoAlteracoesProps> = ({ historico }) => {
    const [items, setItems] = useState<string[]>([]);

    useEffect(() => {
        setItems(historico);
    }, [historico]);

    return (
        <div className="mb-3">
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-historico">
                    <FaHistory className="me-2" />
                    Histórico de alterações ({items.length})
                </Dropdown.Toggle>

                <Dropdown.Menu
                    style={{
                        maxHeight: '200px',
                        overflowY: 'auto',
                        minWidth: '300px'
                    }}
                >
                    {items.length > 0 ? (
                        items.map((item, index) => (
                            <Dropdown.Item
                                key={index}
                                className="text-wrap text-break"
                            >
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
