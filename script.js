// Seleção de elementos do DOM
const nomeTarefaInput = document.getElementById('nomeTarefa');
const btnAdicionar = document.getElementById('btnAdicionar');
const listaPendentes = document.getElementById('listaPendentes');
const listaConcluidas = document.getElementById('listaConcluidas');

// Função para obter prioridade selecionada
function obterPrioridade() {
    const prioridadeSelecionada = document.querySelector('input[name="prioridade"]:checked');
    return prioridadeSelecionada.value;
}

// Função para criar elemento de tarefa
function criarTarefa(nome, prioridade) {
    // Criar elemento div para a tarefa
    const tarefaDiv = document.createElement('div');
    tarefaDiv.classList.add('tarefa', `tarefa-${prioridade}`);

    // Criar área de informações da tarefa
    const tarefaInfo = document.createElement('div');
    tarefaInfo.classList.add('tarefa-info');

    // Nome da tarefa
    const tarefaNome = document.createElement('div');
    tarefaNome.classList.add('tarefa-nome');
    tarefaNome.textContent = nome;

    // Prioridade da tarefa
    const tarefaPrioridade = document.createElement('span');
    tarefaPrioridade.classList.add('tarefa-prioridade', `prioridade-${prioridade}`);
    tarefaPrioridade.textContent = `Prioridade: ${prioridade.charAt(0).toUpperCase() + prioridade.slice(1)}`;

    // Adicionar nome e prioridade à área de info
    tarefaInfo.appendChild(tarefaNome);
    tarefaInfo.appendChild(tarefaPrioridade);

    // Criar área de ações
    const tarefaAcoes = document.createElement('div');
    tarefaAcoes.classList.add('tarefa-acoes');

    // Botão Concluir
    const btnConcluir = document.createElement('button');
    btnConcluir.classList.add('btn', 'btn-concluir');
    btnConcluir.textContent = 'Concluir';
    btnConcluir.addEventListener('click', function () {
        concluirTarefa(tarefaDiv, nome, prioridade);
    });

    // Botão Excluir
    const btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btn', 'btn-excluir');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.addEventListener('click', function () {
        excluirTarefa(tarefaDiv);
    });

    // Adicionar botões à área de ações
    tarefaAcoes.appendChild(btnConcluir);
    tarefaAcoes.appendChild(btnExcluir);

    // Montar a tarefa completa
    tarefaDiv.appendChild(tarefaInfo);
    tarefaDiv.appendChild(tarefaAcoes);

    return tarefaDiv;
}

// Função para adicionar tarefa
function adicionarTarefa() {
    const nome = nomeTarefaInput.value.trim();

    if (nome === '') {
        alert('Por favor, digite o nome da tarefa!');
        return;
    }

    const prioridade = obterPrioridade();

    // Remover mensagem de vazio se existir
    const msgVazio = listaPendentes.querySelector('.vazio');
    if (msgVazio) {
        msgVazio.remove();
    }

    // Criar e adicionar tarefa
    const tarefaElement = criarTarefa(nome, prioridade);
    listaPendentes.appendChild(tarefaElement);

    // Limpar campo de entrada
    nomeTarefaInput.value = '';
    nomeTarefaInput.focus();
}

// Função para excluir tarefa
function excluirTarefa(tarefaElement) {
    tarefaElement.remove();

    // Verificar se lista ficou vazia
    if (listaPendentes.children.length === 0) {
        const msgVazio = document.createElement('div');
        msgVazio.classList.add('vazio');
        msgVazio.textContent = 'Nenhuma tarefa pendente';
        listaPendentes.appendChild(msgVazio);
    }
}

// Função para concluir tarefa
function concluirTarefa(tarefaElement, nome, prioridade) {
    // Remover tarefa da lista de pendentes
    tarefaElement.remove();

    // Verificar se lista de pendentes ficou vazia
    if (listaPendentes.children.length === 0) {
        const msgVazio = document.createElement('div');
        msgVazio.classList.add('vazio');
        msgVazio.textContent = 'Nenhuma tarefa pendente';
        listaPendentes.appendChild(msgVazio);
    }

    // Remover mensagem de vazio da lista de concluídas
    const msgVazioConcluidas = listaConcluidas.querySelector('.vazio');
    if (msgVazioConcluidas) {
        msgVazioConcluidas.remove();
    }

    // Criar elemento para tarefa concluída
    const tarefaConcluida = document.createElement('div');
    tarefaConcluida.classList.add('tarefa', 'tarefa-concluida', `tarefa-${prioridade}`);

    // Informações da tarefa
    const tarefaInfo = document.createElement('div');
    tarefaInfo.classList.add('tarefa-info');

    const tarefaNome = document.createElement('div');
    tarefaNome.classList.add('tarefa-nome');
    tarefaNome.textContent = nome;

    const tarefaPrioridade = document.createElement('span');
    tarefaPrioridade.classList.add('tarefa-prioridade', `prioridade-${prioridade}`);
    tarefaPrioridade.textContent = `Prioridade: ${prioridade.charAt(0).toUpperCase() + prioridade.slice(1)}`;

    // Data e hora de conclusão
    const dataHora = new Date();
    const dataFormatada = dataHora.toLocaleString('pt-BR');

    const tarefaData = document.createElement('div');
    tarefaData.classList.add('tarefa-data');
    tarefaData.textContent = `Concluída em: ${dataFormatada}`;

    tarefaInfo.appendChild(tarefaNome);
    tarefaInfo.appendChild(tarefaPrioridade);
    tarefaInfo.appendChild(tarefaData);

    // Botão de excluir
    const tarefaAcoes = document.createElement('div');
    tarefaAcoes.classList.add('tarefa-acoes');

    const btnExcluir = document.createElement('button');
    btnExcluir.classList.add('btn', 'btn-excluir');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.addEventListener('click', function () {
        tarefaConcluida.remove();

        if (listaConcluidas.children.length === 0) {
            const msgVazio = document.createElement('div');
            msgVazio.classList.add('vazio');
            msgVazio.textContent = 'Nenhuma tarefa concluída';
            listaConcluidas.appendChild(msgVazio);
        }
    });

    tarefaAcoes.appendChild(btnExcluir);

    tarefaConcluida.appendChild(tarefaInfo);
    tarefaConcluida.appendChild(tarefaAcoes);

    // Adicionar à lista de concluídas
    listaConcluidas.appendChild(tarefaConcluida);
}

// Event Listeners
btnAdicionar.addEventListener('click', adicionarTarefa);

// Permitir adicionar com Enter
nomeTarefaInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});