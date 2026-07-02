# Lista de Tarefas Interativa

Uma aplicação web de lista de tarefas interativa, desenvolvida com **HTML, CSS e JavaScript puro**. O projeto permite organizar atividades por prioridade, acompanhar tarefas pendentes e manter um histórico das tarefas concluídas diretamente no navegador.

## Funcionalidades

- Adição de tarefas pelo botão da interface ou pela tecla `Enter`;
- classificação por prioridade alta, média ou baixa;
- identificação visual das prioridades por cores;
- validação para impedir o cadastro de tarefas sem nome;
- separação entre tarefas pendentes e concluídas;
- registro da data e da hora de conclusão;
- exclusão de tarefas pendentes ou concluídas;
- mensagens de estado quando uma lista não possui tarefas.

> As tarefas são mantidas apenas durante a sessão atual. Ao recarregar a página, as listas retornam ao estado inicial.

## Tecnologias utilizadas

- **HTML5:** estrutura e elementos da interface;
- **CSS3:** layout, cores, estados visuais e estilização responsiva;
- **JavaScript:** interatividade, validação e manipulação dinâmica do DOM.

O projeto não utiliza frameworks ou dependências externas.

## Como executar localmente

Por ser um projeto estático, não é necessário instalar dependências.

1. Clone este repositório:

   ```bash
   git clone https://github.com/rodrygords/Lista-de-Tarefas-AS-Front.git
   ```

2. Acesse a pasta do projeto:

   ```bash
   cd Lista-de-Tarefas-AS-Front
   ```

3. Abra o arquivo `index.html` em um navegador.

Se preferir executar com um servidor local e tiver Python instalado, use:

```bash
python3 -m http.server 8000
```

Depois, acesse `http://localhost:8000` no navegador.

## Estrutura do projeto

```text
.
├── index.html
├── style.css
├── script.js
├── documentação final asfront.pdf
└── README.md
```

- `index.html`: estrutura da aplicação;
- `style.css`: apresentação visual e layout;
- `script.js`: comportamento da lista e manipulação do DOM;
- `documentação final asfront.pdf`: documentação acadêmica complementar.

## Como a aplicação funciona

1. O usuário informa o nome da tarefa e seleciona uma prioridade.
2. Ao adicionar, o JavaScript valida o campo e cria os elementos da tarefa dinamicamente.
3. A tarefa é exibida na lista de pendentes com a identificação visual da prioridade.
4. Ao concluir, ela é removida das pendentes e recriada no histórico com data e hora.
5. As tarefas podem ser excluídas de qualquer uma das listas.

## Conceitos praticados

O desenvolvimento deste projeto exercita fundamentos de front-end, entre eles:

- separação de responsabilidades entre HTML, CSS e JavaScript;
- seleção, criação e remoção de elementos do DOM;
- tratamento de eventos de clique e teclado;
- validação de entrada de dados;
- aplicação dinâmica de classes CSS;
- organização do código em funções;
- uso de closures em funções associadas a eventos;
- formatação de data e hora para o padrão brasileiro;
- controle dos estados vazios das listas.

### Seleção de elementos

#### `document.getElementById()`

Seleciona um elemento HTML por seu atributo `id`. No projeto, é utilizado para acessar os principais elementos da interface:

```javascript
const nomeTarefaInput = document.getElementById('nomeTarefa');
const btnAdicionar = document.getElementById('btnAdicionar');
const listaPendentes = document.getElementById('listaPendentes');
const listaConcluidas = document.getElementById('listaConcluidas');
```

Esse método é adequado para elementos únicos que possuem um identificador específico.

#### `document.querySelector()`

Seleciona o primeiro elemento correspondente a um seletor CSS. Ele identifica qual opção de prioridade está marcada:

```javascript
const prioridadeSelecionada = document.querySelector(
    'input[name="prioridade"]:checked'
);
```

Também é usado para localizar mensagens de lista vazia dentro de cada seção.

#### `document.querySelectorAll()`

Seleciona todos os elementos que correspondem a um seletor CSS e retorna uma `NodeList`. Não foi necessário na implementação atual, mas foi estudado como alternativa para trabalhar com vários elementos:

```javascript
const todasTarefas = document.querySelectorAll('.tarefa');
```

### Criação e montagem de elementos

#### `document.createElement()`

Cria novos elementos HTML por JavaScript. As tarefas e seus controles são construídos dinamicamente:

```javascript
const tarefaDiv = document.createElement('div');
const tarefaInfo = document.createElement('div');
const tarefaNome = document.createElement('div');
const tarefaPrioridade = document.createElement('span');
const btnConcluir = document.createElement('button');
const btnExcluir = document.createElement('button');
```

#### `element.appendChild()`

Adiciona um elemento filho ao final de um elemento pai. O método monta a hierarquia de cada tarefa e a insere na lista correspondente:

```javascript
tarefaInfo.appendChild(tarefaNome);
tarefaInfo.appendChild(tarefaPrioridade);
tarefaAcoes.appendChild(btnConcluir);
tarefaAcoes.appendChild(btnExcluir);
tarefaDiv.appendChild(tarefaInfo);
tarefaDiv.appendChild(tarefaAcoes);
listaPendentes.appendChild(tarefaElement);
```

### Classes e conteúdo

#### `element.classList.add()`

Adiciona classes CSS aos elementos criados. Classes formadas a partir da prioridade conectam o comportamento do JavaScript aos estilos definidos no CSS:

```javascript
tarefaDiv.classList.add('tarefa', `tarefa-${prioridade}`);
tarefaNome.classList.add('tarefa-nome');
tarefaPrioridade.classList.add(
    'tarefa-prioridade',
    `prioridade-${prioridade}`
);
btnConcluir.classList.add('btn', 'btn-concluir');
```

Os métodos `classList.remove()` e `classList.toggle()` também permitem remover e alternar classes, embora não sejam necessários na implementação atual.

#### `element.textContent`

Define o texto de um elemento sem interpretar marcação HTML:

```javascript
tarefaNome.textContent = nome;
tarefaPrioridade.textContent =
    `Prioridade: ${prioridade.charAt(0).toUpperCase() + prioridade.slice(1)}`;
btnConcluir.textContent = 'Concluir';
btnExcluir.textContent = 'Excluir';
```

Para este caso, `textContent` é mais apropriado que `innerHTML`, pois o conteúdo inserido é apenas texto. `innerHTML`, que interpreta tags HTML, não é utilizado no projeto.

### Eventos e interatividade

#### `element.addEventListener()`

Registra uma função que deve ser executada quando um evento acontece. A aplicação responde a cliques nos botões e ao pressionamento da tecla `Enter`:

```javascript
btnAdicionar.addEventListener('click', adicionarTarefa);

nomeTarefaInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});

btnConcluir.addEventListener('click', function () {
    concluirTarefa(tarefaDiv, nome, prioridade);
});

btnExcluir.addEventListener('click', function () {
    excluirTarefa(tarefaDiv);
});
```

As funções anônimas associadas aos botões mantêm acesso aos dados da tarefa por meio de closures.

### Remoção e mudança de estado

#### `element.remove()`

Remove um elemento da árvore do DOM. O projeto utiliza esse recurso para excluir tarefas e retirar as mensagens de lista vazia quando necessário:

```javascript
tarefaElement.remove();
msgVazio.remove();
tarefaConcluida.remove();
```

Após uma remoção, a quantidade de filhos da lista é verificada para decidir se a mensagem de estado vazio deve voltar a ser exibida.

#### Passagem de pendente para concluída

A tarefa não é apenas movida entre os contêineres. A implementação:

1. remove o elemento da lista de pendentes;
2. cria um novo elemento com as informações da tarefa;
3. acrescenta a data e a hora da conclusão;
4. adiciona o novo elemento à lista de concluídas.

```javascript
function concluirTarefa(tarefaElement, nome, prioridade) {
    tarefaElement.remove();

    const tarefaConcluida = document.createElement('div');
    // Cria as informações e registra a data e a hora.

    listaConcluidas.appendChild(tarefaConcluida);
}
```

Essa abordagem permite que a versão concluída tenha informações e ações diferentes da versão pendente.

### Validação de entrada

Antes de criar uma tarefa, o valor digitado é limpo com `trim()` e validado:

```javascript
const nome = nomeTarefaInput.value.trim();

if (nome === '') {
    alert('Por favor, digite o nome da tarefa!');
    return;
}
```

Com isso, entradas vazias ou compostas somente por espaços não são adicionadas.

### Datas e localização

Ao concluir uma tarefa, a aplicação cria uma data e a formata para o padrão brasileiro:

```javascript
const dataHora = new Date();
const dataFormatada = dataHora.toLocaleString('pt-BR');
```

### Separação entre comportamento e apresentação

Os estilos não são modificados diretamente com `element.style`. Em vez disso, o JavaScript aplica classes, enquanto as regras visuais permanecem no arquivo CSS. Essa separação facilita a leitura e a manutenção do projeto.

## Aprendizados

O projeto ajudou a consolidar a criação de interfaces dinâmicas sem frameworks. Os principais desafios envolveram montar corretamente elementos aninhados, sincronizar as mensagens de listas vazias, transportar os dados de cada tarefa para os eventos e aplicar estilos conforme a prioridade selecionada.

As soluções adotadas reforçaram o uso de funções com responsabilidades definidas, classes CSS dinâmicas, closures e verificações do estado atual do DOM.

## Autor

Desenvolvido por **Rodrygo de Souza** como projeto de estudo em Desenvolvimento Web.
