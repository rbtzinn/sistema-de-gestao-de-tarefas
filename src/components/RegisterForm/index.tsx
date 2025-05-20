import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase';
import './styles.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'administrador' | 'membro'>('membro');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: selectedRole,
      });

      navigate('/');
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  const renderRoleDescription = () => {
    if (selectedRole === 'membro') {
      return (
        <div className="text-muted small mt-2">
          Membro é um usuário que participa de uma equipe, executa tarefas atribuídas a ele mesmo,
          mas não pode atribuir tarefas a outros.
        </div>
      );
    }
    if (selectedRole === 'administrador') {
      return (
        <div className="text-muted small mt-2">
          Administrador é o usuário responsável por criar equipes e atribuir tarefas aos membros.
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container register-container mb-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm p-4 rounded-4">
            <h2 className="mb-4 text-center text-primary fw-bold">Criar uma Conta no TaskFlow</h2>
            <form onSubmit={handleRegister}>
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

              <div className="mb-4">
                <label className="form-label">Tipo de Usuário</label>
                <select
                  className="form-select clean-select"
                  value={selectedRole}
                  onChange={e => setSelectedRole(e.target.value as 'administrador' | 'membro')}
                >
                  <option value="membro">Membro</option>
                  <option value="administrador">Administrador</option>
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

export default Register;
