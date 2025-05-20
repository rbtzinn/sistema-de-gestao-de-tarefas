import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaHistory } from 'react-icons/fa';

export interface HistoricoItem {
    texto: string;
    timestamp?: string;
}

interface HistoricoAlteracoesProps {
    historico: (string | HistoricoItem)[];
}

const HistoricoAlteracoes: React.FC<HistoricoAlteracoesProps> = ({ historico }) => {
    const [items, setItems] = useState<(string | HistoricoItem)[]>([]);

    useEffect(() => {
        const sorted = [...historico].sort((a, b) => {
            const getTime = (item: string | HistoricoItem): number => {
                if (typeof item === 'object' && item.timestamp) {
                    return new Date(item.timestamp).getTime();
                }
                return 0;
            };

            return getTime(b) - getTime(a);
        });
        setItems(sorted);
    }, [historico]);

    useEffect(() => {
        const handleNovoHistorico = (e: any) => {
            const novoItem = e.detail as HistoricoItem;
            setItems(prev => [
                { texto: novoItem.texto, timestamp: novoItem.timestamp },
                ...prev,
            ]);
        };

        window.addEventListener('registrarHistorico', handleNovoHistorico);
        return () => {
            window.removeEventListener('registrarHistorico', handleNovoHistorico);
        };
    }, []);


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
                                {typeof item === 'object' ? item.texto : item}
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