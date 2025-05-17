import React, { useState } from 'react';
import { Link, useLocation} from 'react-router-dom';
import ModalCriarQuadro from '../ModalCriarQuadro';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [modalAberto, setModalAberto] = useState(false);
  const location = useLocation();
  const estaNoQuadro = location.pathname.startsWith('/quadro');

  const { isAuthenticated, user, logout } = useAuth();

  const handleCriarQuadro = (nome: string, descricao: string) => {
    console.log('Quadro criado:', nome, descricao);
  };

  const isAdmin = user?.role === 'adm';
  const isMember = user?.role === 'membro';

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg shadow-sm sticky-top ${estaNoQuadro ? 'bg-transparent' : 'bg-primary navbar-dark'}`}>
        <div className="container px-3 px-lg-5">
          <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
            <i className="bi bi-kanban-fill fs-4"></i>
            TaskFlow
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse mt-3 mt-lg-0" id="navbarContent">
            <form className="d-flex flex-grow-1 me-lg-4 mb-3 mb-lg-0" role="search">
              <div className="input-group w-100">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="search"
                  className="form-control border-start-0"
                  placeholder="Pesquisar"
                  aria-label="Pesquisar"
                />
                <button
                  className="btn btn-secondary"
                  type="button"
                  onClick={() => {
                    if (!isAuthenticated) {
                      alert('Você precisa estar logado para criar um quadro.');
                    } else if (!isAdmin) {
                      alert('Apenas administradores podem criar quadros.');
                    } else {
                      setModalAberto(true);
                    }
                  }}
                >
                  Criar
                </button>
              </div>
            </form>

            <ul className="navbar-nav ms-auto d-flex align-items-lg-center gap-lg-3">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Painel</Link>
              </li>

              {isMember && (
                <li className="nav-item">
                  <Link className="nav-link" to="/painel-membros">Minhas Tarefas</Link>
                </li>
              )}

              {isAdmin && (
                <li className="nav-item">
                  <Link className="nav-link" to="/equipe">Equipe</Link>
                </li>
              )}

              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link text-white fw-semibold">
                      {user?.email.split('@')[0]}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-light"
                      onClick={handleLogout}
                      type="button"
                    >
                      Sair
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Entrar/Cadastrar</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <ModalCriarQuadro
        show={modalAberto}
        onHide={() => setModalAberto(false)}
        onCriar={handleCriarQuadro}
      />
    </>
  );
};

export default Navbar;
