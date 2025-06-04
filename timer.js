import mudarTema from "./scripts/mudarTema.js";
import dataAtual from "./scripts/dataAtual.js";

mudarTema()
dataAtual()

const tempoAtual = document.querySelector('.tempo__atual');
const btnRapido = document.querySelector('.tempo__rapido');
const btnMedio = document.querySelector('.tempo__medio');
const btnLongo = document.querySelector('.tempo__longo');
const btnIniciarPausarContinuar = document.querySelector('.tempo__estado');
const btnControleMusica = document.querySelector('.controle__musica');

const musicaTema = new Audio('./sons/luna-rise-part-one.mp3');
const alarmeTempo = new Audio('./sons/beep.mp3');
const playTempo = new Audio('./sons/play.wav');
const pauseTempo = new Audio('./sons/pause.mp3');

let intervaloID = null;
//tempo padrão
let tempoEmSegundos = 5 * 60;
let musicaTocando = true;
musicaTema.play();
musicaTema.loop = true

btnControleMusica.addEventListener('click', () => {
    if (musicaTocando) {
        musicaTema.pause();
        btnControleMusica.classList.add('musica__tocando');
        btnControleMusica.textContent = 'Voltar Música'
        musicaTocando = false
        return
    } else {
        musicaTema.play();
        btnControleMusica.classList.remove('musica__tocando');
        btnControleMusica.textContent = 'Parar Música'
        musicaTocando = true;
    }
})

function mostrarTempo () {
    const tempoFormatado = new Date(tempoEmSegundos * 1000).toLocaleTimeString('pt-br', {'minute': '2-digit', 'second': '2-digit'});
    tempoAtual.innerHTML = tempoFormatado;
}

function contagemRegressiva() {
    if (tempoEmSegundos <= 0) {
        alarmeTempo.play();
        alert('Tempo Acabou!');
        zerarTempo();
        return;
    }
    tempoEmSegundos -= 1;
    mostrarTempo()
}

function zerarTempo() {
    clearInterval(intervaloID);
    intervaloID = null;
};

btnRapido.addEventListener('click', () => {
    btnIniciarPausarContinuar.textContent = 'Iniciar'
    zerarTempo();
    tempoEmSegundos = 5 * 60;
    mostrarTempo();
});

btnMedio.addEventListener('click', () => {
    btnIniciarPausarContinuar.textContent = 'Iniciar'
    zerarTempo();
    tempoEmSegundos = 15 * 60;
    mostrarTempo();
});

btnLongo.addEventListener('click', () => {
    btnIniciarPausarContinuar.textContent = 'Iniciar'
    zerarTempo();
    tempoEmSegundos = 30 * 60;
    mostrarTempo();
})

function iniciarOuPausar() {
    if (intervaloID) {
        zerarTempo()
        pauseTempo.play();
        btnIniciarPausarContinuar.textContent = 'Continuar';
        return
    } else {
        intervaloID = setInterval(contagemRegressiva,1000);
        playTempo.play();
        btnIniciarPausarContinuar.textContent = 'Pausar';
    }
}

btnIniciarPausarContinuar.addEventListener('click',iniciarOuPausar)
