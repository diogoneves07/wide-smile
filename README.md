# WideSmile

A WideSmile é uma biblioteca de animação construída em `TypeScript / JavaScript`, seu principal objetivo é entregar tudo que um mecanismo moderno de animação deve ter. **Sendo uma nova forma de estruturar animações, deixando mais simples, direta e elegante**.

## Molho secreto

O molho secreto pode ser encontrado no momento em que declaramos nossas primeiras animações, onde praticamente nenhuma complexidade é exposta, mas por de baixo dos panos estamos utilizados técnicas muito interessantes. Há também novos recursos e conceitos simples e poderosos, como por exemplo: **Creators**, **Performers**, **Special properties** , **Observed properties** e outros, além de atalhos que agilizam o processo de criação de animações.

## Compatibilidade

A WideSmile funciona muito bem em todos os principais navegadores desde o IE9(Internet Explorer, versão 9).

## Instalando

### NPM: `npm install wide-smile`

## Uso

#### HTML `<script>`

```html
<script src="wide-smile/wide-smile-min.js"></script>
```

#### ES6 import

```javascript
import wS from './wide-smile-es.min.js';
```

### Hello world - Apresentando a estrutura

Ao adicionar a biblioteca em sua aplicação você terá acesso a uma função chamada `wS`(abreviação de WideSmile), a partir dela podemos dar início a construção de nossas animações.

Por fim, nada melhor que um bloco de código para entendermos na pratica. A linha de código abaixo realizaria a nossa primeira animação:

```javascript
wS('div', 4)('height', 200);
```

Como assim só isso?. Calma têm mais!. E se quiséssemos que após a conclusão dessa animação outra se iniciasse?:

```javascript
wS('div', 4)('height', 200)._('width', 200);
```

Simples e direto não é?. E se quiséssemos que essa nova animação tivesse uma “irmã” que iniciaria sua execução ao mesmo tempo que ela, mas que a sua duração fosse diferente?:

```javascript
wS('div', 4)('height', 200)._('width', 200)('opacity', 0, 1);
```

Estes exemplos são apenas uma **degustação**, mas que tal mais uma última?:

```javascript
const performer = wS('span', 1, 'easeOutInSine')
  .cycle('alternate')
  ._('backgroundColor', 'red')
  ._(0, 'green')({ width: 200, top_left: 150 }, 2)
  ._(0, 'blue')('height', 200, 'easeInBounce');
```

## Documentação

Resumo

: Um resumo dos recursos e novidades mais chamativos da biblioteca. Excelente para quem não perder tempo lendo uma API de uma biblioteca que talvez não venha a usar.

Propriedades de comportamento
: Estas são as propriedades que definem como a animação será executada, nossa biblioteca disponibiliza propriedades úteis e comumente utilizadas, mas também propriedades novas e muito poderosas.

Propriedades e valores animáveis

: Veja como utilizar as propriedades e os valores destinadas a elas.

Easings Functions
: A lista de funções e sintaxe que a biblioteca suporta de forma built-in, além de exemplos de uso e como criar suas próprias funções.

Creator Functions
: Entenda o que é uma função Creator e como fazer uso dela e de seus métodos e propriedades.

Estruturando animações
: Aprenda a estrutura suas animações com esta biblioteca, verá que é extremamente simples criar múltiplas e diversas animações com pouquíssimo código.

Escalonamento/stagger
: Um dos recursos mais utilizados em animações é o escalonamento que é capaz de criar animações incríveis com muita facilidade, nossa biblioteca dispõe de uma sintaxe especial que facilita o seu uso.

Métodos de controle
: Por fim veja os métodos que possui duas formas de aceso, e que são muito úteis(Nesta seção verá que nossa biblioteca se destaca das outras).

---

[MIT License](LICENSE). © Diogo Neves (http://linkedin.com/in/diogoneves07/).
