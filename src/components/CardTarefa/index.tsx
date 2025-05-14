import './CardTarefa.css';

const CardTarefa = ({ titulo, descricao }: { titulo: string; descricao: string }) => (
    <div className="card-tarefa">
        <h3>{titulo}</h3>
        <p>{descricao}</p>
    </div>
);

export default CardTarefa;
