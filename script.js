
function criarEvento(event) {
    let botaoClicado = event.target;
    let dia = botaoClicado.value;
    document.getElementById('formulario').style.display = 'block';
    document.getElementById('fundo').style.display = 'block';
    document.getElementById('diaselecionado').value = dia;
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
    eventos.forEach((evento) => {
        var elemento = document.createElement('li');
        elemento.style.borderTop = '5px #6F826A solid';
        elemento.innerHTML = evento.descricao
        ? `<div class="titulo"> ${evento.titulo} <button class="botao__excluir dia" onclick="excluirEvento('${dia}','${evento.titulo}','${evento.descricao}')">X</button></div> ${evento.descricao} <br> <span class="horario">${evento.horario}</span>`
        : `<div class="titulo"> ${evento.titulo} <button class="botao__excluir dia" onclick="excluirEvento('${dia}','${evento.titulo}','${evento.descricao}')">X</button></div> <span class="horario">${evento.horario}</span>`;
        listaDia.appendChild(elemento);
    })
}

function adicionarEvento(event) {
    event.preventDefault() //Evita o carregamento da página ao enviar o formulário

    let diaSelecionado = document.getElementById('diaselecionado').value;
    document.querySelector('ul.lista__dia').style.display = 'block';
    let formulario = document.querySelector('form.formulario__campos');
    let titulo = document.getElementsByName('titulo')[0].value;
    let descricao = document.getElementsByName('descricao')[0].value;
    let horario = document.getElementsByName('horario')[0].value;
    let id = 0;

    const eventoLocal = {
        titulo: titulo,
        descricao: descricao,
        horario: horario,
        id: id
    };

    //Recupera os eventos que já estão armazenados no Storage
    let evento = JSON.parse(localStorage.getItem(diaSelecionado)) || [];
    evento.push(eventoLocal)

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
function editarEvento (diaSelecionado, evento) {
    
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