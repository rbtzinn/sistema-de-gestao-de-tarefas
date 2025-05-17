// src/pages/Equipe.tsx
import React from 'react';
import { useEquipe } from '../../contexts/EquipeContext';

const Equipe: React.FC = () => {
  const { membros } = useEquipe();

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Minha Equipe</h2>
      {membros.length === 0 ? (
        <p className="text-muted">Nenhum membro adicionado ainda.</p>
      ) : (
        <ul className="list-group">
          {membros.map((membro, index) => (
            <li key={index} className="list-group-item">
              {membro}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Equipe;
