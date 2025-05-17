import React, { createContext, useContext, useState } from 'react';

type EquipeContextType = {
  membros: string[];
  adicionarMembro: (nome: string) => void;
};

const EquipeContext = createContext<EquipeContextType | undefined>(undefined);

export const EquipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [membros, setMembros] = useState<string[]>([]);

  const adicionarMembro = (nome: string) => {
    setMembros(prev => (prev.includes(nome) ? prev : [...prev, nome]));
  };

  return (
    <EquipeContext.Provider value={{ membros, adicionarMembro }}>
      {children}
    </EquipeContext.Provider>
  );
};

export const useEquipe = () => {
  const context = useContext(EquipeContext);
  if (!context) {
    throw new Error('useEquipe deve ser usado dentro de um EquipeProvider');
  }
  return context;
};
