# WideSmile

"Abstraia a complexidade, apenas faça."

A WideSmile é uma biblioteca de animação construída em `TypeScript / JavaScript`, seu principal objetivo é entregar um mecanismo moderno de animação que atenda verdadeiramente as necessidades do desenvolvedor. **Sendo uma nova forma de estruturar animações, deixando mais simples, direta e elegante**.

## Molho secreto

O molho secreto pode ser encontrado no momento em que declaramos nossas primeiras animações, em que praticamente nenhuma complexidade é exposta, mas por de baixo dos panos estamos utilizados técnicas muito interessantes. Há também novos recursos e conceitos simples e poderosos, como por exemplo: **Creators**, **Performers**, **Special properties** , **Observed properties** e outros, além de atalhos que agilizam o processo de criação de animações.

## Compatibilidade

A WideSmile funciona muito bem em todos os principais navegadores desde o IE9(Internet Explorer, versão 9).

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

Ao adicionar a biblioteca em sua aplicação você terá acesso a uma função chamada `wS`(abreviação de WideSmile), a partir dela podemos dar início a construção de nossas animações.

### Hello world - Apresentando a estrutura

Por fim, nada melhor que um bloco de código para entendermos na pratica. A linha de código abaixo realizaria a nossa primeira animação:

```javascript
wS('div', 2)('height', 200);
```

Como assim só isso?. Calma têm mais!. E se quiséssemos que após a conclusão dessa animação outra se iniciasse?:

```javascript
wS('div', 2)('height', 200)._('width', 200);
```

Simples e direto não é?. E se quiséssemos que essa nova animação tivesse uma "irmã" que iniciaria sua execução ao mesmo tempo que ela, mas que a sua duração fosse diferente?:

```javascript
wS('div', 2)('height', 200)._('width', 200)('opacity', 0, 1);
```

Estes exemplos são apenas uma **degustação**, mas que tal uma última?:

```javascript
wS().newObservedProperty('Text', (v, p, e) => {
  e.textContent = v.toString().substring(0, (v.length / 100) * p);
});

wS('div', 1, 'easeOutInSine', {
  delay: '0.1 <>',
})
  .cycle('alternate')
  ._('backgroundColor', 'red')
  .after(1)('height_width', 200, 'easeInBounce')
  ._(0, 'blue')
  ._({
    Text: ['...', 'Hello world... Master!!!'],
    fontSize: 50,
  });
```

---

[Documentação](https://github.com/diogoneves07/wide-smile/wiki)

[MIT License](LICENSE). © ([Diogo Neves](http://linkedin.com/in/diogoneves07/)).
