import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
      <div className="container-fluid">
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

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-lg-center gap-lg-3">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Painel</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tarefas">Minhas Tarefas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/equipe">Equipe</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Entrar/Cadastrar</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
