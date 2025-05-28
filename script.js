import adicionarEvento from "./scripts/adicionarEvento.js";
import dataAtual from "./scripts/dataAtual.js";
import editarEvento from "./scripts/editarEvento.js";
import excluirEvento from "./scripts/excluirEvento.js";
import mudarTema from "./scripts/mudarTema.js";

//Pegando as datas atuais
//import
dataAtual();

//Abre o Formulário e pega o valor do Dia
const botaoAddEvento = document.querySelectorAll('.botao__addevento')
botaoAddEvento.forEach((botao) => {
    botao.addEventListener('click', (event) => {
    let botaoClicado = event.target;
    let dia = botaoClicado.value;
    document.getElementById('formulario').style.display = 'block';
    document.getElementById('fundo').style.display = 'block';
    document.getElementById('diaselecionado').value = dia;
    })
})

//Adicionar Evento (Formulário)
const botaoSubmit = document.querySelector('.botao__submit');
botaoSubmit.addEventListener('click', (event) => {
    event.preventDefault() //Evita o carregamento da página ao enviar o formulário
     let formulario = document.querySelector('form.formulario__campos');
    //import
    let diaSelecionado = adicionarEvento();
    //
    exibirEventos(diaSelecionado);
    formulario.submit();  
})

//Fechar Formulário
const botaoFechar = document.querySelector('.fechar');
botaoFechar.addEventListener('click', () => {
    document.getElementById('formulario').style.display = 'none';
    document.getElementById('fundo').style.display = 'none';
})

//Ordena os eventos do menor horário para o maior
const botaoOrdenaEvento = document.querySelectorAll('.botao__ordena');
botaoOrdenaEvento.forEach((botao) => {
    botao.addEventListener('click', (event) => {
        let botaoClicado = event.target;
        let dia = botaoClicado.value;
        let eventos = JSON.parse(localStorage.getItem(dia));
        eventos.forEach((evento) => {
        let horario = Number((evento.horario).replace(':','.')).toFixed(2);
        evento.horario = horario;  
        })
        
        eventos.sort((a,b) => a.horario - b.horario);
        
        eventos.forEach((evento) => {
            evento.horario = String(evento.horario).replace('.',':');
        })
        
        localStorage.setItem(dia, JSON.stringify(eventos));
        exibirEventos(dia);
    })
})



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
        var listaEventos = document.createElement('li');
        listaEventos.style.borderTop = '5px var(--cor-secundaria) solid';
        listaEventos.innerHTML = evento.descricao
        ? `<button class="botao__excluir excluir__dia">X</button> <button class="botao__editar">&#x270F;&#xFE0F;</button> <div class="titulo"> ${evento.titulo}</div> ${evento.descricao} <br> <span class="horario">${evento.horario}</span>`
        : `<button class="botao__excluir excluir__dia">X</button> <button class="botao__editar">&#x270F;&#xFE0F;</button> <div class="titulo"> ${evento.titulo}</div> <span class="horario">${evento.horario}</span>`;
        
        fragmento.appendChild(listaEventos);

        //Editar Eventos
        let botaoEditarEv = listaEventos.querySelector('.botao__editar');
        botaoEditarEv.addEventListener('click', () => {
            //import
            editarEvento(dia,evento.titulo,evento.descricao);
        })
                 
        //Excluir um evento específico (baseado na descrição, título)
        let botaoExcluirEv = listaEventos.querySelector('.excluir__dia');
        botaoExcluirEv.addEventListener('click', () => {
            //import
            let diaSelecionadoPExcluir = excluirEvento(dia,evento.titulo,evento.descricao)
            exibirEventos(diaSelecionadoPExcluir)
        })
           
    })
    listaDia.appendChild(fragmento) //Adiciona tudo de uma vez no DOM  
}

//Carregar eventos automaticamente quando atualizar a página
    document.addEventListener('DOMContentLoaded', () => {
        const diasDaSemana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];

        diasDaSemana.forEach(dia => {
            exibirEventos(dia);
        });
    });

//Exclui todos os eventos
const botaoExcluirAllEvents = document.querySelector('.botao__excluir');
botaoExcluirAllEvents.addEventListener('click', () => {

    if (localStorage.length === 0) {
    alert('Não existem eventos para excluir')
    return
    }
    const resposta = confirm('Deseja mesmo excluir todos os eventos?')
    if(resposta) {
        localStorage.clear()
        location.reload()
    }
})

//Mudar Tema do Site
mudarTema()