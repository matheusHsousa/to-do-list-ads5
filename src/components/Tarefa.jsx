const Tarefa = (props) => {
    return(
        <div className="card">
            <h3><strong>Nome:</strong> {props.nome}</h3>
            <p><strong>Data:</strong> {props.data}</p>
            <p><strong>Descrição:</strong>{props.descricao}</p>
            <p><strong>Prioridade:</strong>{props.prioridade}</p>
        </div>
    )
}

export default Tarefa;