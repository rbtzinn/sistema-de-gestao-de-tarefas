import React, { createContext, useState, useContext } from 'react';

interface Quadro {
    id: string;
    titulo: string;
    fundo: string;
    visibilidade: string;
}

interface QuadrosContextType {
    quadros: Quadro[];
    adicionarQuadro: (quadro: Quadro) => void;
}

const QuadrosContext = createContext<QuadrosContextType>({
    quadros: [],
    adicionarQuadro: () => { },
});

export const QuadrosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [quadros, setQuadros] = useState<Quadro[]>([]);

    const adicionarQuadro = (quadro: Quadro) => {
        setQuadros([...quadros, quadro]);
    };

    return (
        <QuadrosContext.Provider value={{ quadros, adicionarQuadro }}>
            {children}
        </QuadrosContext.Provider>
    );
};

export const useQuadros = () => useContext(QuadrosContext);