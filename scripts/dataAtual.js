function dataAtual() {
    let data = new Date();
    let dataAtual = data.toLocaleDateString('pt-BR');
    let horaAtual = data.getHours();
    let mensagemBomDia = document.querySelector('h2.diaatual__header');

    if (horaAtual <= 12 && horaAtual > 5) {
        mensagemBomDia.innerHTML = `Bom dia! Hoje é ${dataAtual}`;    
    } else if (horaAtual > 12 && horaAtual <= 17) {
        mensagemBomDia.innerHTML = `Boa Tarde! Hoje é ${dataAtual}`; 
    } else if (horaAtual >= 0 && horaAtual <= 5) {
        mensagemBomDia.innerHTML = `Boa Madrugada! Hoje é ${dataAtual}`;
    } else {
        mensagemBomDia.innerHTML = `Boa Noite! Hoje é ${dataAtual}`;
    }
}

export default dataAtual;