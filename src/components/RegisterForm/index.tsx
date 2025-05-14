import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const RegisterForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('membro');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    const userData = { fullName, birthDate, email, role };
    localStorage.setItem('user', JSON.stringify(userData));

    if (role === 'adm') {
      navigate('/painel-adm');
    } else {
      navigate('/painel');
    }
  };

  const renderRoleDescription = () => {
    if (role === 'membro') {
      return (
        <div className="text-muted small mt-2">
          Membro é um usuário que participa de uma equipe, executa tarefas atribuídas a ele mesmo,
          mas não pode atribuir tarefas a outros.
        </div>
      );
    }
    if (role === 'adm') {
      return (
        <div className="text-muted small mt-2">
          Administrador é o usuário responsável por criar equipes e atribuir tarefas aos membros.
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container register-container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm p-4 rounded-4">
            <h2 className="mb-4 text-center text-primary fw-bold">Criar uma Conta no TaskFlow</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label">Nome completo</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Digite seu nome"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Data de nascimento</label>
                <input
                  type="date"
                  className="form-control"
                  required
                  value={birthDate}
                  onChange={e => setBirthDate(e.target.value)}
                />
              </div>

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
                  placeholder="Crie uma senha"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Repetir senha</label>
                <input
                  type="password"
                  className="form-control"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Repita a senha"
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Tipo de Usuário</label>
                <select
                  className="form-select clean-select"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                >
                  <option value="membro">Membro</option>
                  <option value="adm">Administrador</option>
                </select>
                {renderRoleDescription()}
              </div>

              {error && (
                <div className="alert alert-danger py-2 small text-center" role="alert">
                  {error}
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100 fw-semibold">
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
