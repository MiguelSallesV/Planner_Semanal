function editarEvento (diaSelecionado, tituloParaEditar, descricaoParaEditar) {
    let eventoSelecionado = JSON.parse(localStorage.getItem(diaSelecionado)) || [];
    let eventoIndex = eventoSelecionado.findIndex((evento) => evento.titulo === tituloParaEditar && evento.descricao === descricaoParaEditar);
    //Abre o Formulário de Novo
    document.getElementById('formulario').style.display = 'block';
    document.getElementById('fundo').style.display = 'block';
    
    //Preenche os campos com os dados atuais
    document.getElementById('diaselecionado').value = diaSelecionado
    document.getElementsByName('titulo')[0].value = eventoSelecionado[eventoIndex].titulo
    document.getElementsByName('descricao')[0].value = eventoSelecionado[eventoIndex].descricao
    document.getElementsByName('horario')[0].value = eventoSelecionado[eventoIndex].horario

    //Adiciona um indentificador para saber que estamos editando
    document.getElementById('formulario').setAttribute('editando-dados', JSON.stringify({diaSelecionado, eventoIndex}));
}

export default editarEvento