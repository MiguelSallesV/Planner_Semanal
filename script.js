function criarEvento(event) {
    let botaoClicado = event.target;
    let dia = botaoClicado.value
    document.getElementById('formulario').style.display = 'block';
    document.getElementById('fundo').style.display = 'block';
    document.getElementById('diaselecionado').value = dia
}

function fecharFormulario() {
    document.getElementById('formulario').style.display = 'none';
    document.getElementById('fundo').style.display = 'none';
}

let data = new Date();
let anoAtual = data.getFullYear();
let mesAtual = data.getMonth();
let diaAtual = data.getDate();
let horaAtual = data.getHours();
let mensagemBomDia = document.querySelector('h2.diaatual__header');

if (horaAtual <= 12 && horaAtual > 5) {
    mensagemBomDia.innerHTML = `Bom dia! Hoje é ${diaAtual}/${mesAtual + 1}/${anoAtual}`    
} else if (horaAtual > 12 && horaAtual <= 17) {
    mensagemBomDia.innerHTML = `Boa Tarde! Hoje é ${diaAtual}/${mesAtual + 1}/${anoAtual}`   
} else if (horaAtual > 0 && horaAtual <= 5) {
    mensagemBomDia.innerHTML = `Boa Madrugada! Hoje é ${diaAtual}/${mesAtual + 1}/${anoAtual}`
} else {
    mensagemBomDia.innerHTML = `Boa Noite! Hoje é ${diaAtual}/${mesAtual + 1}/${anoAtual}`
}

function adicionarEvento(event) {
    event.preventDefault()
    let diaSelecionado = document.getElementById('diaselecionado').value;
    document.querySelector('ul.lista__dia').style.display = 'block'
    let formulario = document.querySelector('form.formulario__campos');
    let titulo = document.getElementsByName('titulo')[0].value
    let descricao = document.getElementsByName('descricao')[0].value
    let horario = document.getElementsByName('horario')[0].value
    var evento = document.createElement('li')
    if (diaSelecionado === 'segunda') {
        evento.innerHTML = `${titulo}, ${descricao}, ${horario}`
        document.querySelector('ul.lista__segunda').appendChild(evento)       
    }
}