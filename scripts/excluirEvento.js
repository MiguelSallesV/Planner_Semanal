function excluirEvento(diaSelecionado, tituloParaExcluir, descricaoParaExcluir) {
    let evento = JSON.parse(localStorage.getItem(diaSelecionado));
    let eventoNovo = evento.filter((evento) => evento.titulo !== tituloParaExcluir || evento.descricao !== descricaoParaExcluir)
    localStorage.setItem(diaSelecionado, JSON.stringify(eventoNovo))
    
    return diaSelecionado
}

export default excluirEvento