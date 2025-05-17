import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './styles.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const usuariosValidos = [
      { email: 'membro@gmail.com', senha: '123', role: 'membro' },
      { email: 'admin@gmail.com', senha: '123', role: 'adm' }
    ];

    const usuarioEncontrado = usuariosValidos.find(
      (user) => user.email === email && user.senha === password
    );

    if (usuarioEncontrado) {
      const userData = { email: usuarioEncontrado.email, role: usuarioEncontrado.role };
      login(userData);
      navigate('/');
    } else {
      setError('Email ou senha inválidos.');
    }
  };

  const handleGuestAccess = () => {
    const guestUser = { email: 'guest@taskflow.com', role: 'convidado' };
    login(guestUser);
    navigate('/');
  };

  return (
    <div className="container login-container mb-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm p-4 rounded-4">
            <h2 className="mb-4 text-center text-primary fw-bold">Bem-vindo ao TaskFlow</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Digite seu e-mail"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Senha</label>
                <input
                  type="password"
                  className="form-control"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                />
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <button type="submit" className="btn btn-primary w-100 fw-semibold">
                Entrar
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary w-100 mt-3"
                onClick={handleGuestAccess}
              >
                Continuar como convidado
              </button>
            </form>

            <div className="text-center mt-4">
              <span className="text-muted">Não tem uma conta? </span>
              <Link to="/cadastro" className="text-decoration-none fw-semibold text-primary">
                Cadastre-se
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
