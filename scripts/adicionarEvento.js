function adicionarEvento() {
     let diaSelecionado = document.getElementById('diaselecionado').value;
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
         return e.titulo === eventoLocal.titulo;
     })
     
     //Editando um evento (se foi clicado o botão de editar)
     let dadosEvento = document.getElementById('formulario').getAttribute('editando-dados');
     if (dadosEvento) {
         let {diaSelecionado,eventoIndex} = JSON.parse(dadosEvento)
         evento[eventoIndex] = eventoLocal;
         document.getElementById('formulario').removeAttribute('editando-dados');
     } else if (eventoExiste) {
         alert('Não podem ter dois títulos iguais');     
         return;
     } else {
         evento.push(eventoLocal);
     }
     
     //Salva os eventos atualizados no LocalStorage
     localStorage.setItem(diaSelecionado, JSON.stringify(evento));

     return diaSelecionado
 }

 export default adicionarEvento;