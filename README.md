<p align='center'>
  <img src='https://github.com/diogoneves07/wide-smile/blob/main/other/img/small-wide-smile.png' alt='WideSmile - logo'  width='380px' />
</p>

<p align='center'><strong>“Abstraia a complexidade, apenas faça.”</strong></p>

A WideSmile é uma biblioteca de animação construída em `TypeScript / JavaScript`, seu principal objetivo é entregar um mecanismo moderno de animação que atenda verdadeiramente as necessidades do desenvolvedor. **Sendo uma nova forma de estruturar animações, deixando mais simples, direta e elegante**.

## Molho secreto

O molho secreto pode ser encontrado no momento em que declaramos nossas primeiras animações, em que praticamente nenhuma complexidade é exposta, mas por de baixo dos panos estamos utilizados técnicas muito interessantes. Há também novos recursos e conceitos simples e poderosos, como por exemplo: **Creators**, **Performers**, **Special properties** , **Observed properties** e outros, além de atalhos que agilizam o processo de criação de animações.

## Compatibilidade

A WideSmile funciona muito bem em todos os principais navegadores desde o IE9(Internet Explorer, versão 9).

## Instalando

Instale a `wide-smile` a partir do npm:

```bash
npm i wide-smile
```

Instale a `wide-smile` a partir do yarn:

```bash
yarn add wide-smile
```

## Adicionando

### ES6 modules

Importando via módulo:

```javascript
import wS from 'wide-smile';
```

### CommonJS

Exigi-lo como você faria com qualquer outro módulo:

```javascript
const wS = require('wide-smile');
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
  .cycle(5, 'alternate')
  ._('backgroundColor', 'red')
  .after(1)('height_width', 200, 'easeInBounce')
  ._(0, 'blue')
  ._({
    Text: ['...', 'Hello world... Master!!!'],
    fontSize: 50,
  });
```

---

### Novidades(versão - `0.1.0`):

Esta nova versão conta com novidades importantes:

- Cobertura de testes:
  Agora a `wide-smile` consegue ter mais segurança e garantir que seus principais recursos funcionem da maneira esperada.

- Novos métodos:
  [`now()`](<https://github.com/diogoneves07/wide-smile/wiki/M%C3%A9todo-now()>), [`set()`](<https://github.com/diogoneves07/wide-smile/wiki/M%C3%A9todo-set()>), [`remove()`](<https://github.com/diogoneves07/wide-smile/wiki/M%C3%A9todo-remove()>), [`get()`](<https://github.com/diogoneves07/wide-smile/wiki/M%C3%A9todo-get()>), [`removeTarget()`](<https://github.com/diogoneves07/wide-smile/wiki/M%C3%A9todo-removeTarget()>).

- Nova propriedade:
  [`reset`](https://github.com/diogoneves07/wide-smile/wiki/Propriedade-reset).

- Agora podemos adicionar ouvintes em propriedades de animação (top, height, color...). Com isso, podemos obter o valor que será aplicado à determinada propriedade a cada intercalação da animação (nós também podemos impedi-lo de ser aplicado).
  ```javascript
  wS('div')('height', 50).on('height', (o) => {
    /*...*/
  });
  ```
- Também houve melhoramento do código fonte e da documentação.

---

### IMPORTANTE:

Nossa biblioteca está nas suas versões iniciais, mas verá que ela possui um grande potencial de crescimento([Documentação](https://github.com/diogoneves07/wide-smile/wiki)). Por isso, esse é o melhor momento para você contribuir! E o melhor, você pode escolher como:

- Participe do desenvolvimento do código, criando [propriedades customizados](https://github.com/diogoneves07/wide-smile/wiki/Propriedades-customizadas-%7C-Hooks) e animações e compartilhando com comunidade, sugerindo novas futures ou desenvolvendo diretamente conosco.

- Feedback, sua opinião é importantíssima, afinal estamos desenvolvendo para você.

- Divulgando a wide-smile, faça com que mais pessoas conhecerem nossa biblioteca, compartilhe em suas redes sociais e colegas da área.

- Colaborando na documentação, nossa biblioteca merece uma documentação cada dia melhor, além de uma versão em Inglês, mas para isso precisamos da sua ajuda. Colabore diretamente na documentação atual ou faça artigos próprios da forma que desejar.

- Doando subsídios financeiros, até o momento, os desenvolvedores não recebem retorno financeiro. Se você gostou do projeto e quer propiciar o desenvolvimento dela, pense em apoiar.

Por fim, **não se prenda a essa lista**, como dito, **você pode ajudar da maneira que desejar**. [Entre em contato](mailto:ndiogo778@gmail.com).

---

<br />
<p align='center'> 
  <a href='https://github.com/diogoneves07/wide-smile/wiki'>Documentação</a> &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;<a href='https://github.com/diogoneves07/wide-smile/LICENSE'>MIT License.</a> © <a href='http://linkedin.com/in/diogoneves07/'>Diogo Neves</a>
</p>
