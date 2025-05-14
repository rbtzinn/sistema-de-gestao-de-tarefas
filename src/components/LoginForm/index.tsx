import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role] = useState('membro');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { email, role };
    localStorage.setItem('user', JSON.stringify(userData));

    if (role === 'adm') {
      navigate('/painel-adm');
    } else {
      navigate('/painel');
    }
  };

  const handleGuestAccess = () => {
    const guestUser = { email: 'guest@taskflow.com', role: 'convidado' };
    localStorage.setItem('user', JSON.stringify(guestUser));
    navigate('/painel');
  };

  return (
    <div className="container login-container">
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
