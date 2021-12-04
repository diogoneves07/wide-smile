## Propriedades e valores animáveis

Nossa biblioteca é capaz de animar diversas propriedades, lidar com múltiplos valores, além de dispor atalhos através de sintaxe especial.

### CSS Properties

Todas as propriedades CSS podem ser animadas.

#### Prefixos

Não prefixe as propriedades você mesmo, a biblioteca já faz isso automaticamente(por exemplo, `transform` caso necessário se torna `webkit-transform` em navegadores Webkit.

#### Unidades

Caso a unida de medida não seja especificada ela será adicionada automaticamente(Normalmente `px` ou `deg`).

#### CSS Transform

Esta propriedade deve ser animada através de suas funções individualmente.

> **Atenção:** Atualmente as funções de transformação só trabalham com as unidades `px` e `deg`.

| Propriedades válidas | Unidade padrão |
| -------------------- | -------------- |
| `translateX`         | `px`           |
| `translateY`         | `px`           |
| `translateZ`         | `px`           |
| `rotate`             | `deg`          |
| `rotateX`            | `deg`          |
| `rotateY`            | `deg`          |
| `rotateZ`            | `deg`          |
| `scale`              | —              |
| `scaleX`             | —              |
| `scaleY`             | —              |
| `scaleZ`             | —              |
| `skew`               | `deg`          |
| `skewX`              | `deg`          |
| `skewY`              | `deg`          |
| `perspective`        | `px`           |

#### Cores

Algumas propriedades lidam com valores relacionados a cores veja abaixo os suportados:

| Accepts     | Example                     |
| ----------- | --------------------------- |
| Hexadecimal | `'#FFF'` or `'#FFFFFF'`     |
| RGB         | `'rgb(255, 255, 255)'`      |
| RGBA        | `'rgba(255, 255, 255, .2)'` |
| HSL         | `'hsl(0, 100%, 100%)'`      |
| HSLA        | `'hsla(0, 100%, 100%, .2)'` |

### Attributes / Atributos

Qualquer Atributos DOM contendo um valor numérico pode ser animado.

### Propriedades diretas

Qualquer propriedade acessível através da notação de ponto contendo um valor numérico pode ser animada.

```
target.property
```

#### scrollTop e scrollLeft

Ao usar estas propriedades tendo como alvo elemento `HTML` podemos também definir seus valores através de porcentagem:

```javascript
const performer = wS('div', 2);
performer('scrollTop', '50%');
```

### Valores relativos

Podemos utilizar matemática simples(_subtrair, soma ou multiplicar_), para determinar o valor da propriedade:

```javascript
const performer = wS('div', 2);
performer('top', '+=50'); // -=50 or *=50
```

### Função como valor

Podemos passar uma função para retornar um valor para cada alvo da animação de forma individual.

#### Parâmetros recebidos

`target`

: O alvo da animação.

    Type
    : *`object`*

`index`

: A posição do alvo na lista.

    Type
    : *`number`*

`length`

: O comprimento da lista.

    Type
    : *`number`*

#### Exemplo de código

```javascript
const performer = wS('span', 3, 'easeOutInSine');

performer('height', (_t, index) => index * 50);
```

### Atalhos e facilidades

Estes atalhos podem agilizar o processo de construção da animação.

#### Usando índices

Após um primeiro uso de uma determinada propriedade podemos fazer referencia a ela através do seu índice:

##### Exemplo de código

```javascript
const performer = wS(
  'span',
  1,
  'easeOutInSine'
)('backgroundColor', 'red')
  ._(0 /* = backgroundColor */, 'green')
  ._(0 /* = backgroundColor */, 'blue');
```

Isso acontece porque a função **Performer** guarda em índices os nomes de propriedades que já foram utilizadas por animações criadas por ela, assim facilita pois não precisamos digitar o nome da propriedade toda vez que formos fazer uso dela.

#### Valores compartilhados

Podemos compartilhar um valor entre duas propriedades que serão animadas através do caractere `_`:

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

#### Usar valor atual

Caso precisarmos usar o valor atual da propriedade no momento em que estamos declarando a animação, basta usar o caractere: `?`, como valor da propriedade.

##### Exemplo de código

```javascript
const performer = wS('span', 1, 'easeOutInSine')
  ._('height', 200)
  ._(0, '?') // Valor atual da propriedade.
  ._(0, 400);
```