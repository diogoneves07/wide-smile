## Estruturando animações

Estruturar animações com nossa biblioteca é simples, elegante e fácil de aprender.

### Performer Functions

São funções que contêm propriedades e métodos e tem como principal objetivo realizar as animações e controla-las.

#### Parâmetros formais

##### Parâmetros 1

<dl>
<dt><code>properties</code></dt>
<dd>
<p>Um objeto com as propriedades a serem animadas.</p>
<dl>
<dt>Type</dt>
<dd><em><code>object</code></em></dd>
<dt>Uso</dt>
<dd>Obrigatório</dd>
</dl>
</dd>
<dt><code>options</code></dt>
<dd>
<p>Um objeto de propriedades relacionadas a animação como por exemplo: duração, alvos, direção e outras.</p>
<dl>
<dt>Type</dt>
<dd><em><code>object</code></em></dd>
<dt>Uso</dt>
<dd>Opcional</dd>
</dl>
</dd>
</dl>

```javascript
const performer = wS('span', 3, 'easeOutInSine');
performer(
  {
    width: 150,
    height: 150,
    borderRadius: '100%',
  },
  { dur: 2, loop: 4, dir: 'alternate' }
);
```

##### Parâmetros 2

<dl>
<dt><code>property</code></dt>
<dd>
<p>A propriedade a ser animada.</p>
<dl>
<dt>Type</dt>
<dd><em><code>string</code></em></dd>
<dt>Uso</dt>
<dd>Obrigatório</dd>
</dl>
</dd>
<dt><code>propertyValue</code></dt>
<dd>
<p>O valor a ser alcançado pela animação.</p>
<dl>
<dt>Type</dt>
<dd><em><code>string</code></em> | <em><code>Array</code></em> | <em><code>function</code></em></dd>
<dt>Uso</dt>
<dd>Obrigatório</dd>
</dl>
</dd>
<dt><code>options</code></dt>
<dd>
<p>Um objeto de propriedades relacionadas a animação como por exemplo: duração, alvos, direção e outras.</p>
<dl>
<dt>Type</dt>
<dd><em><code>object</code></em></dd>
<dt>Uso</dt>
<dd>Opcional</dd>
</dl>
</dd>
</dl>

```javascript
const performer = wS('span', 3, 'easeOutInSine');
      performer(
        'width',
         200
        { dur: 2, loop: 4, dir: 'alternate' }
      );
```

#### Parâmetros atalhos

Podemos passar múltiplos argumentos em que cada um será aplicado as determinadas propriedades de acordo com as regras abaixo:

- O argumento do tipo _`string`_ são aplicados da seguinte forma: O valor seja compatível para a propriedade `dir` então ele será aplicado a ela, se não, será aplicado a propriedade `easing`.
- O argumento do tipo _`function`_ é aplicado a propriedade `easing`.
- O argumento do tipo _`number`_ será aplicado a propriedade `dur`.
- O argumento do tipo _`boolean`_ será aplicado a propriedade `autoDestroy`.

##### Exemplo 1

```javascript
const performer = wS('span', 3, 'easeOutInSine');
      performer(
        'width',
         200
         3 /* = dur */
      );
```

##### Exemplo 2

```javascript
const performer = wS('span', 3, 'easeOutInSine');
performer(
  {
    width: 150,
    height: 150,
    borderRadius: '100%',
  },
  true /* = autoDestroy */
);
```

#### Realizando animações

Podemos usar três formas para realizar uma animação. Todas as formas que serão descritas abaixo **recebe os mesmos parâmetros** de uma função **Performer**.

##### Chamada imediata

Como dito anteriormente um **Performer** é uma função. Com isso podemos chama-lo imediatamente após sua criação.

###### Exemplo de código

```javascript
const performer = wS('span', 3, 'easeOutInSine');
performer('width', 200);
```

Mas, a chamada imediata tem como principal objetivo ligar a animação que está sendo criada por ela a uma outra que havia sido criada no mesmo momento, fazendo que ambas iniciasse simultaneamente. Entretanto, quando não houver nenhuma outra chamada anterior a chamada imediata ela apenas irá realizar a animação.

##### Método \_()

Ao realizar uma animação através deste método seu principal objetivo e fazer com que esta animação, só se inicie após a conclusão da animação anterior. Entretanto, quando não houver nenhuma outra chamada anterior a chamada através deste método ele apenas irá realizar a animação.

###### Exemplo de código

```javascript
const performer = wS('span', 3, 'easeOutInSine');
performer._('width', 200);
```

##### Método $()

Ao realizar uma animação através deste método ela se torna uma animação independente, ou seja, o inicio de sua execução não depende de outra animação.

###### Exemplo de código

```javascript
const performer = wS('span', 3, 'easeOutInSine');
performer.$('width', 200);
```

##### Método to()

Este método é açúcar sintático que pode ser utilizado para determinar os valores inicias e finais das propriedades da animação:

###### Exemplo de código

```javascript
const performer = wS('span', 3, 'easeOutInSine');
performer({
  width: 50,
  height: 100,
}).to({
  width: 150,
  height: 200,
});
```

O método _`to()`_ faz com que as propriedades e seus valores da declaração de animação anterior a ele seja tratado como os valores inicias e, as propriedades e valores que forem definidos nele seja os valores a serem alcançados durante a animação.

> É remendado o uso deste método imediatamente após a declaração de animação a qual ele será aplicado.

###### Atalhos de uso

Este método permitir o uso de atalhos que podem facilitar a declaração da animação:

- Ao passar um único argumento, este é estendido como o valor a ser aplicado a todas as propriedades:

```javascript
const performer = wS('span', 3, 'easeOutInSine');
performer({
  width: 50,
  height: 100,
}).to(200);
```

- Podemos passar um `array` com valores para cada propriedade de acordo a ordem em que elas foram definidas.

###### Exemplo de código

```javascript
const performer = wS('span', 3, 'easeOutInSine');
performer({
  width: 50,
  height: 100,
}).to([200 /* = width */, 150 /* = height */]);
```

##### Keyframes

Quadros-chave / keyframes são ótimos para definir o avanço da animação. Podemos fazer uso deles de forma simples como são normalmente usados.

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

###### Espaçamento dos quadros

Para espaçar os quadros podemos fazer o uso da propriedade `offset` dentro dos objeto no _`array`_ keyframes, o valor deve ser um número de `0` a `1`.

```javascript
const performer = wS(
  'span',
  2,
  'easeOutInSine'
)([
  { backgroundColor: 'red' },
  { 0: 'green', offset: 0.8 },
  { 0: 'blue' },
]);
```

Os quadros-chave sem a propriedade `offset` serão espaçados uniformemente entre os quadros adjacente.

> Se não houver nenhuma propriedade `offset` , os _keyframes_ serão espaçados de acordo com sua posição.

#### Valor inicial e final(From e To)

Em algumas situações podemos querer definir o valor inicial da propriedade e o valor a ser alcançado pela animação.

- Forma 1 -`keyframes`

```javascript
import wS from './wide-smile/';
const performer = wS(
  'span',
  3,
  'easeOutInSine'
)('height', [50, 250]);
```

- Forma 2 -`to()`

```javascript
const performer = wS(
  'span',
  3,
  'easeOutInSine'
)({ height: 50, width: 50 }.to(250));
```

#### Método after()

Faz com que as animações posterior a este, esperem a animação anterior alcançar um determinado número de interações antes de executarem.

##### Parâmetros

<dl>
<dt><code>iterations</code></dt>
<dd>
<p>A quantidade de interações.</p>
<dl>
<dt>Type</dt>
<dd><em><code>number</code></em></dd>
<dt>Uso</dt>
<dd>Obrigatório</dd>
</dl>
</dd>
</dl>
##### Descrição

Este método informa a biblioteca que as animações criadas de forma imediata após a chamada dele, devem espera que a animação anterior alcance o número de interações especificado no argumento passado.

###### Exemplo de código

```javascript
const performer = wS('span', 1, 'easeOutInSine')(
  'backgroundColor',
  'red',
  {
    loop: 5,
  }
).after(2)('width', 200);
```

#### Método cycle()

Faz com que as animações possam ser executadas novamente da maneira que foram ou estão sendo estruturadas.

##### Parâmetros

<dl>
<dt><code>loopOrDir</code></dt>
<dd>
<p>A quantidade de interações ou a direção em que as animações devem ser executadas.</p>
<dl>
<dt>Type</dt>
<dd><em><code>number</code></em> | <em><code>true</code></em> | <em><code>'normal'</code></em> | <em><code>'alternate'</code></em></dd>
<dt>Uso</dt>
<dd>Opcional</dd>
<dt>Padrão</dt>
<dd><code>1</code></dd>
</dl>
</dd>
</dl>

> Por padrão o ciclo terá duas interações. Caso queira interações infinitas passe: `true`

<dl>
<dt><code>dir</code></dt>
<dd>
<p>A direção em que as animações devem ser executadas.</p>
<dl>
<dt>Type</dt>
<dd><em><code>'normal'</code></em> | <em><code>'alternate'</code></em></dd>
<dt>Uso</dt>
<dd>Opcional</dd>
<dt>Padrão</dt>
<dd><code>'normal'</code></dd>
</dl>
</dd>
</dl>

##### Descrição

Com este método podemos repetir a execução das animações cridas pela função **Performer**, na ordem em que foram estruturadas, o que é muito poderoso, pois, podemos estrutura de forma semelhante a uma `timeline` (em que as animações são executadas em sequência) ou estruturar da forma que necessitarmos:

###### Exemplo de código 1 - Timeline

```javascript
const performer = wS('span', 1, 'easeOutInSine')
  .cycle(4, 'alternate')
  ._('backgroundColor', 'red')
  ._(0, 'green')
  ._(0, 'blue');
```

O exemplo simples acima simularia uma `timeline`. Para adicionar mais um membro a ela bastaria repetir as chamada:

###### Exemplo de código 2 - Timeline

```javascript
const performer = wS('span', 1, 'easeOutInSine')
  .cycle(4, 'alternate')
  ._('backgroundColor', 'red')
  ._(0, 'green')
  ._(0, 'blue');

setTimeout(() => {
  performer._(0, 'yellow');
}, 500);
```

Podemos fazer mais que uma `timeline`:

###### Exemplo de código 2 - Timeline

```javascript
const performer = wS('span', 1, 'easeOutInSine')
  .cycle(4, 'alternate')
  ._('backgroundColor', 'red')('width', 200, {
    dur: 2,
  })
  ._(0, 'green')
  ._(0, 'blue');
```

Como vimos anteriormente podemos criar animações de formas diferentes na qual cada uma tem um efeito, isso também é aplicado ao `cycle`. No exemplo acima a animação que alteraria a propriedade `CSS backgroundColor` para `'green'` só seria executada após a animação que anima a a propriedade `CSS width`.
