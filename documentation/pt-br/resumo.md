# `WideSmile`

“Abstraia a complexidade, apenas faça.”

A `wide-smile` é uma biblioteca de animação construída em `TypeScript / JavaScript`, seu principal objetivo é entregar um mecanismo moderno de animação que atenda verdadeiramente as necessidades do desenvolvedor. **Sendo uma nova forma de estruturar animações, deixando mais simples, direta e elegante**.

## Molho secreto

O molho secreto pode ser encontrado no momento em que declaramos nossas primeiras animações, em que praticamente nenhuma complexidade é exposta, mas por de baixo dos panos estamos utilizados técnicas muito interessantes. Há também novos recursos e conceitos simples e poderosos, como por exemplo: **Creators**, **Performers**, **Special properties** , **Observed properties** e outros, além de atalhos que agilizam o processo de criação de animações.

## Compatibilidade

A `wide-smile` funciona muito bem em todos os principais navegadores desde o IE9(Internet Explorer, versão 9).

## Instalando

Instale a `wide-smile` a partir do npm:

```bash
npm install wide-smile
```

Instale a `wide-smile` a partir do yarn:

```bash
yarn add wide-smile
```

## Adicionando

### ES6 modules

Importando via módulo:

```javascript
import wS from './wide-smile/';
```

### CommonJS

Exigi-lo como você faria com qualquer outro módulo:

```javascript
const wS = require('wS');
```

### `<script>`

Inclua-o através de uma tag script.

```html
<script src="wide-smile/wide-smile.min.js"></script>
```

## Primeiros passos

Ao adicionar a biblioteca em sua aplicação você terá acesso a uma função chamada `wS`(abreviação de `wide-smile`), a partir dela podemos dar início a construção de nossas animações.

### Hello world - Apresentando a estrutura

Por fim, nada melhor que um bloco de código para entendermos na pratica. A linha de código abaixo realizaria a nossa primeira animação:

```javascript
wS('div', 2)('height', 200);
```

Como assim só isso?. Calma têm mais!. E se quiséssemos que após a conclusão dessa animação outra se iniciasse?:

```javascript
wS('div', 2)('height', 200)._('width', 200);
```

Simples e direto não é?. E se quiséssemos que essa nova animação tivesse uma “irmã” que iniciaria sua execução ao mesmo tempo que ela, mas que a sua duração fosse diferente?:

```javascript
wS('div', 2)('height', 200)._('width', 200)(
  'opacity',
  0,
  1
);
```

E se quiséssemos... Brincadeira! vamos explicar o que está acontecendo como Jack o estripador( Por partes! ) .

Na linha de código abaixo estamos utilizando a função principal da biblioteca ela é um **Creator** responsável por criar **Performers** (Logo mais veremos suas definições), ao chama-la podemos passar um objeto de opções ou como neste caso passar argumentos que chamamos de atalhos. Os dois argumentos que estamos passando são referentes as propriedades _`targets`_ e _`dur`_, que definem os alvos da animação e sua duração. O retorno dessa chamada é uma outra função que chamamos de **Performer** nela vão estar definidas propriedades que iremos utilizar em nossas animações, em destaque lá vai estar as propriedades _`targets`_ e _`dur`_ com os valores definidos anteriormente, ou seja, ao criar um **Performer** já definimos algumas propriedades nele com valores padrão.

```javascript
const performer = wS('div', 2);
```

Observe na segunda linha no código abaixo a chamada da função **Performer**, este tipo de função é responsável por realiza a animações de utilizando as propriedades que foram definidas no momento de sua criação. A chamada da função **Performer** faria com que todos os elementos _`HTML Div`_ tivessem sua propriedade _`CSS height`_ animada por **2 segundos** alcançando o valor de `200px`.

```javascript
const performer = wS('div', 2);
performer('height', 200);
```

Note na terceira linha no código abaixo o uso de um método utilizando o caractere _underscore_. As funções **Creators** e **Performers** usufrui de uma característica muito poderosa do JavaScript na qual funções são objetos de primeira classe, pois elas podem ter propriedades e métodos. Ao usarmos o método em questão informamos a biblioteca que esta nova animação deve ser executada após o termino da animação anterior a ela que foi criada através da mesma função **Performer**.

```javascript
const performer = wS('div', 2);
performer('height', 200)._('width', 200);
```

Em nossa última linha no código abaixo, temos uma chamada imediata de função, onde estamos chamando a própria função **Performer**, isso acontece porque as funções **Performers** usa uma técnica chamada _Method Chain_, ao usar determinados métodos estes sempre retornam a função. A chamada imediata logo após uma outra chamada da função **Performer** informa a biblioteca que a animação criada pela chamada imediata deve começar a ser executada simultaneamente a animação criada anteriormente.

Algo importante a se notar é o terceiro argumento da chamada imediata, ele refere-se a propriedade _`dur`_ (que é a duração da animação) este também poderia ser um objeto de opções, com isso vemos que, ao criar a uma animação também podemos sobrescrever somente para a ela os valores de propriedades que foram definidas como padrão na criação da função **_Performer_**. Neste caso ao fim da animação da propriedade _`CSS height`_ os elementos _`HTML Div`_ teriam as propriedades _`CSS width`_ e _`opacity`_ animadas, entretanto, a propriedade _`width`_ seria animada por **_2 segundos_**, enquanto a propriedade _`opacity`_ seria animada por **_1 segundo_** .

```javascript
const performer = wS('div', 2);
performer('height', 200)._('width', 200)(
  'opacity',
  0,
  1
);
```

## Resumo: Recursos e conceitos

Nunca foi tão divertido criar animações de todos os níveis de forma simples, elegante e estruturada.

Agora vamos apresentar os principais recursos e conceitos para declara animações.

> A nossa intenção aqui não é detalhar tudo, e sim apresentar de forma simples. Imagine-se adentrando em uma universidade e um estudante veterano ficou responsável por li apresentar as principais instalações.

> Caso queria saber mais detalhes de algum método, propriedade ou recurso consulte as APIs.

### Função Creator

A primeira função que temos acesso, ao adicionarmos a biblioteca em nossa aplicação é uma função que chamamos de **Creator**.

```javascript
wS();
```

Podemos passar um objeto de opções ou passar argumentos simples que são atalhos.

Por enquanto vamos utilizar os argumentos simples:

```javascript
const performer = wS('span', 3, 'easeOutInSine');
```

No condigo acima passamos três argumentos. O primeiro faz com que obtemos todos os elementos _`HTML Span`_ no documento e os usemos como alvos da animação, o segundo define que a animação terá uma duração de **3 segundos** e o último é a função de _`easing`_ que iremos utilizar. E com isso temos nossa função **Performer** criada.

### Realizando animações

Podemos usar três formas para realizar uma animação.

#### Chamada imediata

Como dito anteriormente um **Performer** é uma função. Com isso podemos chama-lo imediatamente após sua criação.

```javascript
const performer = wS('span', 3, 'easeOutInSine');
performer('width', 200);
```

Mas, a chamada imediata tem como principal objetivo ligar a animação que está sendo criada por ela a uma outra que havia sido criada anteriormente, fazendo com que ambas iniciasse simultaneamente. Entretanto, quando não houver nenhuma outra chamada anterior a chamada imediata ela apenas irá realizar a animação.

#### Método \_()

Ao realizar uma animação através deste método seu principal objetivo e fazer com que esta animação, só se inicie após a conclusão da animação anterior. Entretanto, quando não houver nenhuma outra chamada anterior a chamada através deste método ele apenas irá realizar a animação.

```javascript
const performer = wS('span', 3, 'easeOutInSine');
performer._('width', 200);
```

#### Método $()

Ao realizar uma animação através deste método ela se torna uma animação independente, ou seja, o inicio de sua execução não depende de outra animação.

```javascript
const performer = wS('span', 3, 'easeOutInSine');
performer.$('width', 200);
```

### Exemplos de uso

O conteúdo a seguir tem como objetivo apresentar de forma rápida alguns recursos, conceitos e facilidades da biblioteca com exemplos de uso.

#### Usando índices

Índices podem agilizar e deixar menos tedioso digitar o nome das propriedades:

```javascript
const performer = wS(
  'span',
  1,
  'easeOutInSine'
)('backgroundColor', 'red')
  ._(0 /* = backgroundColor */, 'green')
  ._(0 /* = backgroundColor */, 'blue');
```

A estrutura acima realizaria três animações em sequência. Observe as duas últimas declarações de animações, elas não usam o nome da propriedade a ser animada e sim o índice `0`, isso acontece porque a função **Performer** guarda em índices os nomes de propriedades que já foram utilizadas por animações criadas por ela, assim facilita pois não precisamos digitar o nome da propriedade toda vez que formos fazer uso dela.

#### Valores compartilhados

Podemos compartilhar um valor entre duas propriedades que serão animadas unido seus nomes através do caractere `_`:

##### Exemplo de código 1

```javascript
const performer = wS(
  'span',
  1,
  'easeOutInSine'
)._('height_width', 200);
```

##### Exemplo de código 2

```javascript
const performer = wS(
  'span',
  1,
  'easeOutInSine'
)([
  { height_width: 200 },
  { 0_1: 50 },
  { 0_1: 300 },
]);
```

#### Propriedades de animação

Ao declara uma animação podemos também definir propriedades com valores próprios para cada.

```javascript
const performer = wS(
  'span',
  1,
  'easeOutInSine'
)('backgroundColor', 'red') /* duração: 1s */
  ._(0, 'green') /* duração: 1s */
  ._(0, 'blue', {
    dur: 3 /* duração: 3s */,
  });
```

#### Método after()

Faz com que as animações posterior a chamada deste método, esperem a animação anterior alcançar um determinado número de interações antes de executarem.

##### Exemplo de código

```javascript
const performer = wS('span', 1, 'easeOutInSine')(
  'backgroundColor',
  'red',
  {
    loop: 5,
  }
).after(2)('width', 200);
```

#### Keyframes

Quadros-chave ou keyframes são ótimos para definir o avanço da animação. Podemos fazer uso deles de forma simples como são normalmente usados:

- Forma 1

```javascript
const performer = wS(
  'span',
  1,
  'easeOutInSine'
)([
  { backgroundColor: 'red' },
  { 0: 'green' },
  { 0: 'blue' },
]);
```

- Forma 2

```javascript
const performer = wS(
  'span',
  1,
  'easeOutInSine'
)('backgroundColor', ['red', 'green', 'blue']);
```

#### Valor inicial e final(From e To)

Em algumas situações podemos querer definir o valor inicial da propriedade e o valor a ser alcançado pela animação:

- Forma 1 - `keyframes`

```javascript
const performer = wS(
  'span',
  3,
  'easeOutInSine'
)('height', [50, 250]);
```

- Forma 2 - `to()`

```javascript
const performer = wS('span', 3,'easeOutInSine')
      ({ height: 50, width: 50 }).to(250));
```

O método _`to()`_ faz com que as propriedades e seus valores da declaração de animação anterior a ele seja tratado como os valores inicias e, as propriedades e valores que forem definidos nele seja os valores a serem alcançados durante a animação.

No nosso exemplo também estamos utilizando um atalho, que é a passagem de um único argumento que deve ser tratado como o valor final de todas as propriedades da declaração anterior ao o método _`to()`_, no nosso caso estamos animando as propriedade _`CSS width`_ e `height` de `50px` para `250px`.

#### Cycle x Timeline

Para quem nunca usou uma outra biblioteca de animação, o titulo pode ser estranho, mas é porque normalmente as bibliotecas de animação utilizam `timelines` para organizar as animações em sequência. Entretanto a nossa biblioteca usa `cycles` , pois, podemos simular `timelines` e ainda ter mais poderes. Como mostrado anteriormente podemos de forma simples e direta organiza animações que são executadas em sequência. Abaixo esta um exemplo de animação que usa `cycle` para simular uma `timeline`:

```javascript
const performer = wS('span', 1, 'easeOutInSine')
  .cycle('alternate')
  ._('backgroundColor', 'red')
  ._(0, 'green')
  ._(0, 'blue');
```

O método _`cycle()`_ faz com que as animações possam ser executadas novamente da maneira que foram ou estão sendo estruturadas, o que é muito poderoso, pois, podemos estrutura de forma semelhante a uma `timeline`ou estruturar da forma que necessitarmos.

#### Escalonamento / Stagger

O escalonamento nos permiti animar uma propriedade espaçando um determinado valor entre os alvos da animação, com isso, cada alvo recebe o valor individual para a propriedade.

> Uma boa maneira de pensar sobre escalonamento é imaginar uma escada, imagine que o primeiro degrau é a primeira animação( ou o primeiro alvo a ser animado) e os seguintes são a próximas.

Para usar o escalonamento a biblioteca dispõe de uma sintaxe especial, basta adicionar os caracteres `<>` no valor da propriedade:

```javascript
const performer = wS(
  'span',
  1,
  'easeOutInSine'
)('rotate', '360deg <center> [5,5]');
```

No exemplo acima, ao usar esta sintaxe especial também podemos fazer uso de valores que são destinados a propriedades para o escalonamento, neste caso, estaríamos definindo que o escalonamento começaria a partir do **centro** do _`array`_ de alvos, e que este _`array`_ esta organizado em um **grid** de: **5 linhas e 5 colunas**.

Podemos também escalonar propriedades de comportamento:

```javascript
const performer = wS('span', 1, 'easeOutInSine')(
  'rotate',
  '360',
  {
    delay: '0.5 <center>',
  }
);
```

> Este é exemplo simples, há muitas propriedades que podemos utilizar para determinar como o escalonamento ocorrerá.

#### Propriedade drive

Uma propriedade muito poderosa a qual nos proporciona usufruir de total controle sobre o deslocamento da animação.

```javascript
const performer = wS('span', 3, 'easeOutInSine');
performer('height', 300, {
  drive: [100, 15, 75, 0],
});
```

No exemplo acima, estaríamos definindo que nossa animação teria quatro interações, a primeira se deslocaria entre `0` e `100`, ou seja, animando por um ciclo completo. Já na segunda interação ela partiria do valor alcançado na interação anterior: `100`, para o próximo valor no _`array`_: `15` , realizando então uma animação de reversão. Esta lógica permanece durante os ciclos da animação.

> Este é exemplo simples dessa propriedade, ele não demonstra seu total poder.

#### Propriedades customizadas( observadas e especiais)

Por mais que temos uma quantidade incrível de propriedades que essa biblioteca é capaz de animar, as vezes podemos querer ter uma propriedade só nossa, que resolve um determinado caso. Com isso em mente, a nossa biblioteca expõe dois métodos poderosos que, são capazes de criar propriedades que podem ser usadas como qualquer outra, abstraindo toda complexidade por trás dela.

##### Método newObservedProperty()

Uma propriedade observada não é aplicada aos alvos da animação pela biblioteca e sim pela função que o autor da propriedade disponibiliza, cabe a _WideSmile_ chamar a função no momento correto e passar argumentos que vão deixar extremamente fácil para o autor realizar a aplicação.

```javascript
// Criando uma propriedade observada.
wS().newObservedProperty(
  'AniText',
  (value, percentageCompleted, target) => {
    const at =
      (value.length / 100) * percentageCompleted;

    target.textContent = value.substring(0, at);
  }
);
```

O simples código acima, faria com que pudéssemos usar uma nova propriedade como qualquer outra. Esta faria a animação de inserção de textos aos alvos da animação:

```javascript
const performer = wS(
  'span',
  1,
  'easeOutInSine'
)('AniText', '').to('Hello word!!!');
```

##### Método newSpecialProperty()

Uma propriedade especial pode ser criada a partir da junção de outras propriedades. Podemos fazer uso dela também para executar uma lógica para calcular determinados valores.

```javascript
// Criando uma propriedade especial.
wS().newSpecialProperty('Size', (value) => {
  return {
    width: value,
    height: value,
  };
});
```

O simples código acima, faria com que podemos usar a nova propriedade como qualquer outra. Esta faria a animação das propriedades _`CSS width`_ e _`height`_ ao mesmo tempo.

```javascript
const performer = wS(
  'span',
  1,
  'easeOutInSine'
)('Size', 0).to(200);
```

### Próximos passos

Esperamos que tenha gostado dessa pequena apresentação, agradecemos, por você esta aqui ainda e o convidamos a continuar, pratique e veja nossa API , tenho certeza que algum recurso, conceito ou método lhe chamou a atenção, e que vale a pena ver uma explicação e uso mais detalhado, como por exemplo: o método _`to()`_ , o poderoso e simples _`cycle()`_, a própria estrutura ou os **manipuladores de eventos**, e **métodos de controle de interação** que não foram mencionados!. **Pense também em apoiar o projeto, entre em contato conosco!**. Agradecemos novamente e até mais.
