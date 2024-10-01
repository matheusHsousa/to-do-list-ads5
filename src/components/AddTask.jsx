const AddTask = () => {
    return(
        <div className="form-container">
            <h2>Adicionar tarefa</h2>
            <div className="form-group">
                <label>Nome da tarefa:</label>
                <input placeholder="Digite uma nova tarefa"/>
            </div>
            <div className="form-group">
                <label>Descrição:</label>
                <textarea placeholder="Descreva a tarefa"/>
            </div>
            <div className="form-group">
                <label>Data: </label>
                <input type="date"/>
            </div>
            <div className="form-group">
                <label>Prioridade: </label>
                <select> 
                    <option value="baixo">Baixo</option>
                    <option value="medio">Médio</option>
                    <option value="alto">Alto</option>
                </select>
            </div>
            <button>Adicionar</button>
        </div>
    )
}

export default AddTask;