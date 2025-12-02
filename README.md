# Documentação - Lista de Tarefas Interativa

**Aluno:** [Rodrygo de Souza]
**Disciplina:** Desenvolvimento Web  
**Data:** 30/11/2025

---

## 1. Estrutura do Projeto

### 1.1 Arquivos e Pastas

O projeto é composto por três arquivos principais:

- **index.html** - Estrutura HTML da aplicação
- **style.css** - Estilos e layout visual
- **script.js** - Lógica JavaScript e manipulação do DOM

### 1.2 Descrição das Seções da Página

A aplicação está organizada nas seguintes seções:

1. **Cabeçalho** - Título da aplicação "📝 Lista de Tarefas"

2. **Legenda de Prioridades** - Exibe visualmente as três categorias de prioridade:
   - Alta (vermelho)
   - Média (amarelo)
   - Baixa (verde)

3. **Formulário de Adição** - Permite ao usuário:
   - Digitar o nome da tarefa
   - Selecionar a prioridade (radio buttons)
   - Adicionar a tarefa através do botão "Adicionar Tarefa"

4. **Tarefas Pendentes** - Lista todas as tarefas que ainda não foram concluídas, com opções para:
   - Concluir tarefa
   - Excluir tarefa

5. **Tarefas Concluídas** - Histórico de tarefas finalizadas, mostrando:
   - Nome da tarefa
   - Prioridade
   - Data e hora da conclusão
   - Opção de excluir do histórico

---

## 2. Explicação dos Métodos e Conceitos de DOM Utilizados

### 2.1 Métodos para Seleção de Elementos

#### `document.getElementById()`

**O que é:** Método que seleciona um único elemento HTML através do seu atributo `id`.

**Como utilizei:** Usei para selecionar os elementos principais da aplicação:

```javascript
const nomeTarefaInput = document.getElementById('nomeTarefa');
const btnAdicionar = document.getElementById('btnAdicionar');
const listaPendentes = document.getElementById('listaPendentes');
const listaConcluidas = document.getElementById('listaConcluidas');
```

**Por que usei:** É o método mais eficiente para selecionar elementos únicos que possuem um ID específico.

---

#### `document.querySelector()`

**O que é:** Método que seleciona o **primeiro** elemento que corresponde a um seletor CSS.

**Como utilizei:** Usei para encontrar qual botão de rádio (prioridade) está selecionado:

```javascript
const prioridadeSelecionada = document.querySelector('input[name="prioridade"]:checked');
```

**Por que usei:** Permite usar seletores CSS complexos, como `[name="prioridade"]:checked`, que seleciona apenas o input de rádio que está marcado.

---

#### `document.querySelectorAll()`

**O que é:** Método que seleciona **todos** os elementos que correspondem a um seletor CSS, retornando uma NodeList.

**Como utilizei:** Embora não tenha usado diretamente neste projeto, este método seria útil se precisássemos selecionar múltiplos elementos, como todas as tarefas de uma vez.

**Exemplo de uso possível:**
```javascript
const todasTarefas = document.querySelectorAll('.tarefa');
```

---

### 2.2 Métodos de Criação e Manipulação

#### `document.createElement()`

**O que é:** Cria um novo elemento HTML dinamicamente.

**Como utilizei:** Usei extensivamente para criar todos os elementos das tarefas:

```javascript
const tarefaDiv = document.createElement('div');
const tarefaInfo = document.createElement('div');
const tarefaNome = document.createElement('div');
const tarefaPrioridade = document.createElement('span');
const btnConcluir = document.createElement('button');
const btnExcluir = document.createElement('button');
```

**Por que usei:** É fundamental para criar elementos dinamicamente sem precisar escrever HTML diretamente no JavaScript.

---

#### `element.appendChild()`

**O que é:** Adiciona um elemento filho ao final de um elemento pai.

**Como utilizei:** Usei para montar a estrutura hierárquica das tarefas:

```javascript
tarefaInfo.appendChild(tarefaNome);
tarefaInfo.appendChild(tarefaPrioridade);
tarefaAcoes.appendChild(btnConcluir);
tarefaAcoes.appendChild(btnExcluir);
tarefaDiv.appendChild(tarefaInfo);
tarefaDiv.appendChild(tarefaAcoes);
listaPendentes.appendChild(tarefaElement);
```

**Por que usei:** Permite construir elementos complexos adicionando elementos filhos de forma organizada.

---

#### `element.classList.add()`, `remove()`, `toggle()`

**O que são:** Métodos para manipular as classes CSS de um elemento.

- **add()** - Adiciona uma ou mais classes
- **remove()** - Remove uma ou mais classes
- **toggle()** - Alterna uma classe (adiciona se não existir, remove se existir)

**Como utilizei:**

```javascript
tarefaDiv.classList.add('tarefa', `tarefa-${prioridade}`);
tarefaNome.classList.add('tarefa-nome');
tarefaPrioridade.classList.add('tarefa-prioridade', `prioridade-${prioridade}`);
btnConcluir.classList.add('btn', 'btn-concluir');
```

**Por que usei:** Permite aplicar estilos CSS dinamicamente aos elementos criados, mantendo a separação entre estrutura (HTML), apresentação (CSS) e comportamento (JavaScript).

---

### 2.3 Alteração de Conteúdo

#### `element.textContent`

**O que é:** Propriedade que define ou retorna o conteúdo de texto de um elemento.

**Como utilizei:** Usei para definir o texto dos elementos:

```javascript
tarefaNome.textContent = nome;
tarefaPrioridade.textContent = `Prioridade: ${prioridade.charAt(0).toUpperCase() + prioridade.slice(1)}`;
btnConcluir.textContent = 'Concluir';
btnExcluir.textContent = 'Excluir';
msgVazio.textContent = 'Nenhuma tarefa pendente';
tarefaData.textContent = `Concluída em: ${dataFormatada}`;
```

**Por que usei:** É mais seguro que `innerHTML` quando trabalhamos apenas com texto, pois não interpreta HTML, evitando problemas de segurança (XSS).

---

#### `element.innerHTML`

**O que é:** Propriedade que define ou retorna o conteúdo HTML de um elemento.

**Como utilizei:** Não utilizei diretamente neste projeto, pois trabalhei apenas com texto simples.

**Diferença do textContent:** O `innerHTML` interpreta tags HTML, enquanto `textContent` trata tudo como texto puro.

---

### 2.4 Manipulação de Eventos

#### `element.addEventListener()`

**O que é:** Método que registra um "ouvinte" de eventos em um elemento, executando uma função quando o evento ocorre.

**Como utilizei:** Usei para capturar interações do usuário:

```javascript
// Evento de clique no botão adicionar
btnAdicionar.addEventListener('click', adicionarTarefa);

// Evento de pressionar Enter no campo de texto
nomeTarefaInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});

// Evento de clique no botão concluir
btnConcluir.addEventListener('click', function () {
    concluirTarefa(tarefaDiv, nome, prioridade);
});

// Evento de clique no botão excluir
btnExcluir.addEventListener('click', function () {
    excluirTarefa(tarefaDiv);
});
```

**Eventos utilizados:**
- **click** - Detecta cliques do mouse
- **keypress** - Detecta quando uma tecla é pressionada

**Por que usei:** Permite criar interatividade, respondendo às ações do usuário de forma dinâmica.

---

### 2.5 Manipulação de Estilos

#### `element.style`

**O que é:** Propriedade que permite acessar e modificar os estilos CSS inline de um elemento.

**Como utilizei:** Neste projeto, optei por usar classes CSS ao invés de manipular estilos diretamente via JavaScript, pois é uma prática melhor de organização.

**Exemplo de como poderia ser usado:**
```javascript
tarefaDiv.style.backgroundColor = 'red';
tarefaDiv.style.fontSize = '18px';
```

**Por que preferi usar classes:** Usar `classList.add()` mantém os estilos no CSS, facilitando manutenção e reutilização.

---

### 2.6 Remoção e Movimentação

#### `element.remove()`

**O que é:** Método que remove um elemento do DOM.

**Como utilizei:** Usei para excluir tarefas e remover mensagens de "lista vazia":

```javascript
// Remover tarefa
tarefaElement.remove();

// Remover mensagem de vazio
msgVazio.remove();

// Remover tarefa concluída
tarefaConcluida.remove();
```

**Por que usei:** É a forma mais simples e direta de remover elementos do DOM.

---

#### Remoção do DOM

**Como funciona:** Quando chamamos `element.remove()`, o elemento é completamente removido da árvore do DOM e não é mais renderizado na página.

**Cuidados:** Após remover um elemento, é importante verificar se a lista ficou vazia para exibir a mensagem apropriada.

---

#### Movimentação entre listas (pendentes → concluídas)

**Como implementei:** A movimentação não é literal - na verdade, eu:

1. **Removo** a tarefa da lista de pendentes usando `remove()`
2. **Crio um novo elemento** para a tarefa concluída com informações adicionais (data/hora)
3. **Adiciono** esse novo elemento à lista de concluídas usando `appendChild()`

```javascript
function concluirTarefa(tarefaElement, nome, prioridade) {
    // 1. Remover da lista de pendentes
    tarefaElement.remove();
    
    // 2. Criar novo elemento com data/hora
    const tarefaConcluida = document.createElement('div');
    // ... adicionar informações e data/hora
    
    // 3. Adicionar à lista de concluídas
    listaConcluidas.appendChild(tarefaConcluida);
}
```

**Por que fiz assim:** Permite adicionar informações extras (data/hora de conclusão) e manter estruturas diferentes entre tarefas pendentes e concluídas.

---

## 3. Fluxo de Funcionamento da Aplicação

### 3.1 Como uma tarefa é criada

**Passo 1:** Usuário digita o nome da tarefa no campo de texto (`<input id="nomeTarefa">`)

**Passo 2:** Usuário seleciona a prioridade através dos radio buttons (Alta, Média ou Baixa)

**Passo 3:** Usuário clica no botão "Adicionar Tarefa" ou pressiona Enter

**Passo 4:** O evento `click` ou `keypress` dispara a função `adicionarTarefa()`

**Passo 5:** A função valida se o campo não está vazio:
```javascript
if (nome === '') {
    alert('Por favor, digite o nome da tarefa!');
    return;
}
```

**Passo 6:** A função `obterPrioridade()` identifica qual radio button está marcado

**Passo 7:** A função `criarTarefa(nome, prioridade)` é chamada e cria toda a estrutura HTML da tarefa usando `createElement()` e `appendChild()`

**Passo 8:** Classes CSS são aplicadas dinamicamente usando `classList.add()` para estilizar a tarefa conforme a prioridade

**Passo 9:** Event listeners são adicionados aos botões "Concluir" e "Excluir"

---

### 3.2 Como aparece na lista de pendentes

**Passo 1:** Verifica se existe a mensagem "Nenhuma tarefa pendente" e a remove se existir:
```javascript
const msgVazio = listaPendentes.querySelector('.vazio');
if (msgVazio) {
    msgVazio.remove();
}
```

**Passo 2:** O elemento da tarefa criado é adicionado à lista de pendentes:
```javascript
listaPendentes.appendChild(tarefaElement);
```

**Passo 3:** O campo de entrada é limpo e recebe foco novamente:
```javascript
nomeTarefaInput.value = '';
nomeTarefaInput.focus();
```

**Resultado visual:** A tarefa aparece na seção "⏳ Tarefas Pendentes" com:
- Nome da tarefa
- Badge de prioridade colorido
- Borda lateral colorida conforme prioridade
- Botões "Concluir" e "Excluir"

---

### 3.3 Como é marcada como concluída

**Passo 1:** Usuário clica no botão "Concluir" da tarefa

**Passo 2:** O evento `click` dispara a função `concluirTarefa(tarefaDiv, nome, prioridade)`

**Passo 3:** A tarefa é removida da lista de pendentes:
```javascript
tarefaElement.remove();
```

**Passo 4:** Verifica se a lista de pendentes ficou vazia e adiciona mensagem se necessário

**Passo 5:** Remove a mensagem "Nenhuma tarefa concluída" da lista de concluídas se existir

**Passo 6:** Cria um novo elemento de tarefa concluída com:
- Nome da tarefa
- Prioridade
- **Data e hora da conclusão** (usando `new Date()` e `toLocaleString('pt-BR')`)

```javascript
const dataHora = new Date();
const dataFormatada = dataHora.toLocaleString('pt-BR');
tarefaData.textContent = `Concluída em: ${dataFormatada}`;
```

**Passo 7:** Adiciona classe `tarefa-concluida` para aplicar opacidade reduzida

**Passo 8:** Adiciona apenas o botão "Excluir" (sem botão "Concluir")

**Passo 9:** Adiciona a tarefa concluída à lista de concluídas:
```javascript
listaConcluidas.appendChild(tarefaConcluida);
```

---

### 3.4 Como é excluída

#### Exclusão de tarefa pendente:

**Passo 1:** Usuário clica no botão "Excluir" da tarefa pendente

**Passo 2:** O evento `click` dispara a função `excluirTarefa(tarefaElement)`

**Passo 3:** A tarefa é removida do DOM:
```javascript
tarefaElement.remove();
```

**Passo 4:** Verifica se a lista de pendentes ficou vazia:
```javascript
if (listaPendentes.children.length === 0) {
    // Cria e adiciona mensagem "Nenhuma tarefa pendente"
}
```

#### Exclusão de tarefa concluída:

**Passo 1:** Usuário clica no botão "Excluir" da tarefa concluída

**Passo 2:** O evento `click` dispara uma função anônima que remove a tarefa:
```javascript
btnExcluir.addEventListener('click', function () {
    tarefaConcluida.remove();
    
    if (listaConcluidas.children.length === 0) {
        // Adiciona mensagem "Nenhuma tarefa concluída"
    }
});
```

**Resultado:** A tarefa desaparece completamente da interface

---

## 4. Considerações Finais

### 4.1 O que aprendi

Durante o desenvolvimento deste projeto, aprendi diversos conceitos importantes:

1. **Manipulação do DOM:** Compreendi como o JavaScript pode criar, modificar e remover elementos HTML dinamicamente, tornando a página interativa sem precisar recarregar.

2. **Separação de responsabilidades:** Entendi a importância de manter HTML (estrutura), CSS (apresentação) e JavaScript (comportamento) separados e organizados.

3. **Event Listeners:** Aprendi como capturar e responder a eventos do usuário, criando uma experiência interativa.

4. **Criação dinâmica de elementos:** Dominei o processo de criar elementos complexos usando `createElement()`, `appendChild()` e `classList`, construindo estruturas HTML através de código.

5. **Gerenciamento de estado:** Aprendi a gerenciar o estado da aplicação, como verificar se listas estão vazias e exibir mensagens apropriadas.

6. **Formatação de datas:** Utilizei o objeto `Date` do JavaScript para registrar data e hora de conclusão das tarefas.

7. **Validação de entrada:** Implementei validação simples para garantir que o usuário não adicione tarefas vazias.

---

### 4.2 Desafios encontrados

1. **Estrutura de elementos aninhados:** No início, foi desafiador entender a ordem correta de criar e adicionar elementos filhos para montar a estrutura completa da tarefa.

   **Solução:** Organizei o código em etapas claras, criando primeiro os elementos internos e depois os adicionando aos containers.

2. **Gerenciamento de mensagens "vazio":** Foi necessário sempre verificar se a lista estava vazia para adicionar/remover a mensagem apropriada.

   **Solução:** Criei verificações consistentes usando `children.length === 0` após cada operação de adicionar/remover.

3. **Passagem de informações entre funções:** Precisei passar o nome e prioridade da tarefa para a função de conclusão.

   **Solução:** Utilizei closures e funções anônimas nos event listeners para capturar as variáveis necessárias.

4. **Aplicação de estilos dinâmicos:** Precisei aplicar classes CSS diferentes baseadas na prioridade selecionada.

   **Solução:** Usei template literals para criar nomes de classes dinâmicos: `` `tarefa-${prioridade}` ``

5. **Formatação de data em português:** Precisei exibir a data no formato brasileiro.

   **Solução:** Utilizei `toLocaleString('pt-BR')` para formatar automaticamente a data e hora.

---

### 4.3 Possíveis melhorias futuras

1. **Persistência de dados:** Implementar `localStorage` para salvar as tarefas mesmo após fechar o navegador

2. **Edição de tarefas:** Adicionar funcionalidade para editar o nome de tarefas existentes

3. **Filtros e ordenação:** Permitir filtrar tarefas por prioridade e ordenar por data

4. **Animações:** Adicionar transições suaves ao adicionar/remover tarefas

5. **Contador de tarefas:** Exibir quantidade de tarefas pendentes e concluídas

6. **Categorias:** Adicionar categorias além de prioridades (trabalho, pessoal, estudos, etc.)

---

## 5. Conclusão

Este projeto demonstrou de forma prática e completa os conceitos fundamentais de manipulação do DOM com JavaScript. A aplicação atende a todos os requisitos propostos:

✅ Adição de tarefas com nome e prioridade  
✅ Legenda visual de prioridades  
✅ Listagem de tarefas pendentes  
✅ Funcionalidade de exclusão  
✅ Funcionalidade de conclusão  
✅ Histórico de concluídas com data e hora  
✅ Estilização responsiva e organizada  
✅ Código bem estruturado e comentado  

A experiência de desenvolver esta aplicação consolidou meu entendimento sobre como JavaScript pode transformar páginas estáticas em aplicações web interativas e dinâmicas.

---

**Fim da Documentação**
