//Abre o Formulário e pega o valor do Dia
function criarEvento(event) {
    let botaoClicado = event.target;
    let dia = botaoClicado.value;
    document.getElementById('formulario').style.display = 'block';
    document.getElementById('fundo').style.display = 'block';
    document.getElementById('diaselecionado').value = dia;
}

//Ordena os eventos do menor horário para o maior
function ordenarEvento(event) {
    let botaoClicado = event.target
    let dia = botaoClicado.value
    let eventos = JSON.parse(localStorage.getItem(dia))
    eventos.forEach((evento) => {
       let horario = Number((evento.horario).replace(':','.')).toFixed(2)
       evento.horario = horario   
    })
    
    eventos.sort((a,b) => a.horario - b.horario)
    
    eventos.forEach((evento) => {
        evento.horario = String(evento.horario).replace('.',':')
    })

    localStorage.setItem(dia, JSON.stringify(eventos))
    exibirEventos(dia)
}

function fecharFormulario() {
    document.getElementById('formulario').style.display = 'none';
    document.getElementById('fundo').style.display = 'none';
}

//Pegando as datas atuais
let data = new Date();
let anoAtual = data.getFullYear();
let mesAtual = data.getMonth();
let diaAtual = data.getDate();
let horaAtual = data.getHours();
let mensagemBomDia = document.querySelector('h2.diaatual__header');

if (horaAtual <= 12 && horaAtual > 5) {
    mensagemBomDia.innerHTML = `Bom dia! Hoje é ${diaAtual}/${mesAtual + 1}/${anoAtual}`;    
} else if (horaAtual > 12 && horaAtual <= 17) {
    mensagemBomDia.innerHTML = `Boa Tarde! Hoje é ${diaAtual}/${mesAtual + 1}/${anoAtual}`; 
} else if (horaAtual >= 0 && horaAtual <= 5) {
    mensagemBomDia.innerHTML = `Boa Madrugada! Hoje é ${diaAtual}/${mesAtual + 1}/${anoAtual}`;
} else {
    mensagemBomDia.innerHTML = `Boa Noite! Hoje é ${diaAtual}/${mesAtual + 1}/${anoAtual}`;
}

//Função que adiciona os eventos a lista do dia específico
function exibirEventos(dia) {
    let listaDia = document.querySelector(`ul.lista__${dia}`);
    listaDia.innerHTML = '';
    let eventos = JSON.parse(localStorage.getItem(dia)) || [];
    if (eventos.length >= 2) {
        document.querySelector(`.botao__ordena.${dia}`).style.display = 'block'
    }
    
    let fragmento = document.createDocumentFragment();
    eventos.forEach((evento) => {
        var elemento = document.createElement('li');
        elemento.style.borderTop = '5px #6F826A solid';
        elemento.innerHTML = evento.descricao
        ? `<button class="botao__excluir excluir__dia" onclick="excluirEvento('${dia}','${evento.titulo}','${evento.descricao}')">X</button> <button class="botao__editar" onclick ="editarEvento('${dia}','${evento.titulo}','${evento.descricao}')">&#x270F;&#xFE0F;</button> <div class="titulo"> ${evento.titulo}</div> ${evento.descricao} <br> <span class="horario">${evento.horario}</span>`
        : `<button class="botao__excluir excluir__dia" onclick="excluirEvento('${dia}','${evento.titulo}','${evento.descricao}')">X</button> <button class="botao__editar" onclick ="editarEvento('${dia}','${evento.titulo}','${evento.descricao}')">&#x270F;&#xFE0F;</button> <div class="titulo"> ${evento.titulo}</div> <span class="horario">${evento.horario}</span>`;
        fragmento.appendChild(elemento);
    })

    listaDia.appendChild(fragmento) //Adiciona tudo de uma vez no DOM
    
}

function adicionarEvento(event) {
    event.preventDefault() //Evita o carregamento da página ao enviar o formulário

    let diaSelecionado = document.getElementById('diaselecionado').value;
    document.querySelector('ul.lista__dia').style.display = 'block';
    let formulario = document.querySelector('form.formulario__campos');
    let titulo = document.getElementsByName('titulo')[0].value;
    let descricao = document.getElementsByName('descricao')[0].value;
    let horario = document.getElementsByName('horario')[0].value;

    const eventoLocal = {
        titulo: titulo,
        descricao: descricao,
        horario: horario,
    };

    //Recupera os eventos que já estão armazenados no Storage
    let evento = JSON.parse(localStorage.getItem(diaSelecionado)) || [];
    //Verifica se já não tem um evento com o título
    let eventoExiste = evento.some((e) => {
        return e.titulo === eventoLocal.titulo 
    })
    if (eventoExiste) {
        alert('Não podem ter dois títulos iguais');
        return;
    }

    //Editando um evento (se foi clicado o botão de editar)
    let dadosEvento = document.getElementById('formulario').getAttribute('editando-dados');
    if (dadosEvento) {
        let {diaSelecionado,eventoIndex} = JSON.parse(dadosEvento)
        evento[eventoIndex] = eventoLocal;
        document.getElementById('formulario').removeAttribute('editando-dados');
    } else {
        evento.push(eventoLocal)
    }
    
    //Salva os eventos atualizados no LocalStorage
    localStorage.setItem(diaSelecionado, JSON.stringify(evento));
    exibirEventos(diaSelecionado);
    
    formulario.submit()
    }

//Carregar eventos automaticamente quando atualizar a página
    document.addEventListener('DOMContentLoaded', () => {
        const diasDaSemana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];

        diasDaSemana.forEach(dia => {
            exibirEventos(dia);
        });
    });

//Editar Eventos
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

//Excluir um evento específico (baseado na descrição, título)
function excluirEvento(diaSelecionado, tituloParaExcluir, descricaoParaExcluir) {
    let evento = JSON.parse(localStorage.getItem(diaSelecionado));
    let eventoNovo = evento.filter((evento) => evento.titulo !== tituloParaExcluir || evento.descricao !== descricaoParaExcluir)
    localStorage.setItem(diaSelecionado, JSON.stringify(eventoNovo))
    exibirEventos(diaSelecionado)
}

//Exclui todos os eventos
function excluirAllEvents() {
    localStorage.clear()
    location.reload()
}