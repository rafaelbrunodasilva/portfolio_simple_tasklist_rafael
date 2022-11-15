const listaTarefas = document.getElementById("listaTarefas");
const caixaTexto = document.getElementById("caixaDeTexto");
const botaoAdiconar = document.getElementById("botaoAdicionar");
const listaSuspensa = document.getElementById("listaSuspensa");

//LISTENER QUE DISPARA O PROCESSO DE ADICIONAR UMA NOVA TEREFA
// ADICIONA UM <li> COM O NOME DA TASK DENTRO DA <ul>
botaoAdiconar.addEventListener('click', () => {
    const textoDaTarefa = caixaTexto.value;
    if(textoDaTarefa !=="") {
        caixaTexto.value = '';
        listaTarefas.appendChild(adicionaTarefa(textoDaTarefa));
        exibeOcultaListaSuspensa();
        caixaTexto.focus();
    } else {
        alert('Digite a descrição da tarefa antes de clicar em adicionar.\n\n Não é possível adicionar uma tarefa vazia.');
        caixaTexto.focus();
    }
    
});

function adicionaTarefa(textoDaTarefa){
    const elementLi = document.createElement('li');
    const elementSPAN = document.createElement('span');

    elementSPAN.setAttribute('id', 'tarefa');
    elementSPAN.textContent = textoDaTarefa;

    elementLi.className = 'naoRealizada';
    
    elementLi.appendChild(elementSPAN);
    elementLi.appendChild(adicionaBotaoRemover());

    //LISTENER - SEMPRE QUE UM ITEM DA LISTA FOR CLICADO PELO MOUSE
    // ALTERA O MARCADOR, E A COR E ESTILO DA FONTE
    elementSPAN.addEventListener('click', function() {
        if(this.id === 'tarefa') {
            if(this.parentNode.className === 'naoRealizada') {
                this.parentNode.className = 'realizada';
            } else {
                this.parentNode.className = 'naoRealizada';
            }
        }
    });

    return elementLi;
}

function adicionaBotaoRemover() {
    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = '✘';
    botaoRemover.className = 'remover';

    //LISTENER - REMOVE O ITEM DA LISTA QUANDO O BOTÃO REMOVER FOR CLICADO
    botaoRemover.addEventListener('click', function () {
        listaTarefas.removeChild(this.parentNode);
        exibeOcultaListaSuspensa();
    });

    return botaoRemover;
}

function exibeOcultaListaSuspensa() {
    const elementoSPAN = document.querySelector('#tarefa');
    if(elementoSPAN === null){
        listaSuspensa.setAttribute('hidden','hidden');
    } else {
        listaSuspensa.removeAttribute('hidden');
    }
}

listaSuspensa.addEventListener('change', function() {
    if(listaSuspensa.selectedIndex === 1) {
        const vetorTarefas = listaTarefas.querySelectorAll('#tarefa');
        // vetorTarefas.forEach(tarefa => {
        //     tarefa.dispatchEvent(new Event('click'));
        // });
        for(tarefa of vetorTarefas){
            if(tarefa.parentNode.className == 'naoRealizada') {
                tarefa.dispatchEvent(new Event('click'));
                listaSuspensa.selectedIndex = "0";
            }
        }
    } else if(listaSuspensa.selectedIndex === 2) {
        const vetorTarefas = listaTarefas.querySelectorAll('#tarefa');
        // vetorTarefas.forEach(tarefa => {
        //     tarefa.dispatchEvent(new Event('click'));
        // });
        for(tarefa of vetorTarefas){
            if(tarefa.parentNode.className == 'realizada') {
                tarefa.dispatchEvent(new Event('click'));
                listaSuspensa.selectedIndex = "0";
            }
        }
    } else if(listaSuspensa.selectedIndex === 3) {
        const vetorBotoes = listaTarefas.querySelectorAll('.remover');
        // vetorTarefas.forEach(tarefa => {
        //     tarefa.dispatchEvent(new Event('click'));
        // });
        for(botao of vetorBotoes){
                botao.dispatchEvent(new Event('click'));
                listaSuspensa.selectedIndex = "0";
        }
    }
});