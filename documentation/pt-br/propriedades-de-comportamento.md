## Propriedades de comportamento

Abaixo esta todas as propriedades disponíveis para definir o comportamento da animação.

### Propriedade targets

Define os alvos da animação.

#### Type

_`Array`_ |<br>

_`CSS selector`_ | _`DOM Node`_ | _`object`_<br>

_`(CSS selector | DOM Node | object)[]`_<br>

| _`DOM Node`_ | _`NodeList`_ | . Leitura e gravação.

#### Descrição

Podemos utilizar qualquer seletor CSS elemento do DOM, ou objeto JavaScript, e até mescla estes em um _`array`_.

#### Exemplo de código - Usando a propriedade

```javascript
const performer = wS(
  'span' /* = targets */,
  3,
  'easeOutInSine'
);

performer('width', 300);

performer('height', 300, {
  targets: ['span', 'div'],
});
```

### Propriedade progress

Obtém o valor atual em relação ao andamento da animação.

#### Type

_`function`_. Leitura e gravação

#### Descrição

A função _`callback`_ definida como o valor desta propriedade será chamada a cada mudança no progresso da animação, ela também recebe um argumento:

<dl>
<dt><code>progress</code></dt>
<dd>
<p>O andamento da animação(um valor de <code>0%</code> a <code>100%</code>.</p>
<dl>
<dt>Type</dt>
<dd><em><code>number</code></em></dd>
</dl>
</dd>
</dl>

#### Exemplo de código - Usando a propriedade

```javascript
const performer = wS('span', 3, 'easeOutInSine');

performer('height', 300, {
  progress: (p) => {
    console.log(p);
  },
});
```

### Propriedade dir

Define como a animação deve ser reproduzida.

#### Type

_`string`_. Leitura e gravação.

#### Descrição

A lista abaixo informa os valores possíveis.

<dl>
<dt><code>normal</code></dt>
<dd>Todas as iterações da animação são reproduzidas na direção da forma como foram especificadas.</dd>
<dt><code>reverse</code></dt>
<dd>Todas as iterações da animação são reproduzidas na direção inversa da forma como foram especificadas.</dd>
<dt><code>alternate</code></dt>
<dd>As iterações ímpares são reproduzidas na direção <code>normal</code> e as pares são reproduzidas em uma direção <code>reverse</code>.</dd>
<dt><code>alternate-reverse</code></dt>
<dd>As iterações ímpares são reproduzidas na direção <code>reverse</code> e as pares são reproduzidas em uma direção <code>normal</code>.</dd>
</dl>

#### Nota

No momento da declaração da animação, ao usar esta propriedade com um dos valores: `alternate` ou `alternate-reverse` e não definir um valor para a propriedade `loop`, a propriedade `loop` será definida automaticamente: `2`, ou seja, fará a animação ter duas interações.

#### Valor padrão

O valor padrão é: `normal`

#### Exemplo de código - Usando a propriedade

```javascript
const performer = wS(
  'span' /* = targets */,
  3,
  'easeOutInSine'
);
performer('width', 300);

performer('height', 300, {
  dir: 'alternate',
});
```

### Propriedade loop

Define a quantidade de vezes que os ciclo da animação devem ser executados.

#### Type

_`number`_ | _`true`_ | _`string`_ . Leitura e gravação.

#### Descrição

Podemos utilizar o valor _`true`_ para que o ciclo da animação seja executado infinitamente.

#### Valor padrão

O valor padrão é: `1`.

#### Exemplo de código - Usando a propriedade

```javascript
const performer = wS('span', 3, 'easeOutInSine');

performer('width', 300);

performer('height', 300, {
  loop: true,
});
```

### Propriedade dur

Define o tempo que uma animação leva para completar um ciclo.

#### Type

_`number`_ | _`string`_. Leitura e gravação.

#### Descrição

O valor numérico é entendido como segundos, ou seja `2` é `2s`.

#### Valor padrão

O valor padrão é: `1`.

#### Exemplo de código - Usando a propriedade

```javascript
const performer = wS(
  'span',
  3 /* =  dur */,
  'easeOutInSine'
);
performer('width', 300);

performer('height', 300, {
  dur: 5,
});
```

### Propriedade delay

Define um intervalo no início de cada ciclo da animação e somente após esse intervalo a animação começa a executar o ciclo.

#### Type

_`number`_ | _`string`_. Leitura e gravação.

#### Descrição

O valor numérico é entendido como segundos, ou seja `2` é `2s`.

#### Valor padrão

O valor padrão é: `0`.

#### Exemplo de código - Usando a propriedade

```javascript
const performer = wS('span', 3, 'easeOutInSine');

performer('height', 300, {
  delay: 2,
});
```

### Propriedade endDelay

Define um intervalo no final de cada ciclo da animação e somente após esse intervalo a animação começa a executar o próximo ciclo.

#### Type

_`number`_ | _`string`_. Leitura e gravação.

#### Descrição

O valor numérico é entendido como segundos, ou seja `1` é `1s`.

#### Valor padrão

O valor padrão é: `0`.

#### Exemplo de código - Usando a propriedade

```javascript
const performer = wS('span', 3, 'easeOutInSine');

performer('height', 300, {
  endDelay: 2,
});
```

### Propriedade autoDestroy

Define se animação deve ser destruída após sua conclusão.

#### Type

_`boolean`_. Leitura e gravação.

#### Valor padrão

O valor padrão é: `false`.

#### Exemplo de código - Usando a propriedade

```javascript
const performer = wS('span', 3, 'easeOutInSine');

performer('height', 300, {
  autoDestroy: true,
});
```

### Propriedade autoPlay

Define se a animação deve iniciar automaticamente.

#### Type

_`boolean`_. Leitura e gravação.

#### Valor padrão

O valor padrão é: `true`.

#### Exemplo de código - Usando a propriedade

```javascript
const performer = wS('span', 3, 'easeOutInSine');

performer('height', 300, {
  autoDestroy: false,
});
```

### Propriedade pauseDocHidden

Define se a animação deve ser pausada quando o documento não estiver visível.

#### Type

_`boolean`_. Leitura e gravação.

#### Valor padrão

O valor padrão é: `true`.

#### Exemplo de código - Usando a propriedade

```javascript
const performer = wS('span', 3, 'easeOutInSine');

performer('height', 300, {
  pauseDocHidden: false,
});
```

### Propriedade drive

Define o deslocamento da animação.

#### Type

_`Array`_ | _`string`_ | _`function`_ . Leitura e gravação.

#### Descrição

Com esta propriedade podemos controlar nossas animações com maestria e facilidade.

Na lista abaixo esta os valores disponíveis ao utilizar a propriedade com um valor do tipo _`string`_, todos estes valores são redefinidos a cada novo ciclo da animação.

<dl>
<dt><em><code>string</code></em></dt>
<dd>
<p><code>normal</code></p>
</dd>
<dd>
<p>Faz com a propriedade respeite o deslocamento definido na propriedade <code>dir</code>.</p>
</dd>
<dd>
<p>Partindo sempre da chave inicial, é sorteado uma chave que foi definida nos quadros-chave da animação, a chave sorteada será o progresso máximo a ser alcançado pelo atual ciclo da animação.</p>
</dd>
<dd>
<p><code>random-offset</code></p>
</dd>
<dd>
<p>Partindo sempre da chave inicial, é sorteado um deslocamento de <code>0</code> a <code>100</code>, o valor sorteado será o progresso máximo a ser alcançado pelo atual ciclo da animação.</p>
</dd>
<dd>
<p><code>fluid-random-keys</code></p>
</dd>
<dd>
<p>Partindo sempre do progresso alcançado no ciclo anterior, é sorteado uma chave que foi definida nos quadros-chave da animação, a chave sorteada será o progresso máximo a ser alcançado pelo atual ciclo da animação.</p>
</dd>
<dd>
<p><code>fluid-random-offset</code></p>
</dd>
<dd>
<p>Partindo sempre do progresso alcançado no ciclo anterior, é sorteado um deslocamento de <code>0</code> a <code>100</code> , o valor sorteado será o progresso máximo a ser alcançado pelo atual ciclo da animação.</p>
</dd>
</dl>

#### Exemplo de código 1

```javascript
const performer = wS('span', 3, 'easeOutInSine');

performer('height', 300, {
  drive: 'fluid-random-offset',
});
```

Outro tipo que podemos passar é um _`Array`_, especificando claramente como queremos que a animação se desloque.

#### Exemplo de código 2

```javascript
const performer = wS('span', 3, 'easeOutInSine');

performer('height', 300, {
  drive: [100, 15, 75, 0],
});
```

No exemplo acima, estaríamos definindo que nossa animação teria quatro interações, a na primeira se deslocaria entre `0` e `100`, ou seja, animando por um ciclo completo. Já na segunda interação ela partiria do valor alcançado na interação anterior: `100`, para o próximo valor no _`Array`_: `15` , realizando então uma animação de reversão. Esta lógica permanece durante o ciclos da animação.

#### Exemplo de código 3

```javascript
const performer = wS('span', 3, 'easeOutInSine');
performer('height', 300, {
  drive: [
    [/* Inicio: */ 50, /* Fim: */ 100],
    15,
    [/* Inicio: */ 20, /* Fim: */ 100],
    0,
  ],
});
```

No exemplo acima, vemos que Também podemos definir o ponto de inicio e fim das interações.

Caso definirmos a quantidade de interações maior que a quantidade de valores no _`Array`_, ao chegar ao último valor a contagem recomeçar, ou seja, parti do primeiro valor do _`Array`_.

Podemos passar no último valor do _`Array`_, o valor do tipo _`string`_ (que já vimos acima), com isso passamos o controle de deslocamento da animação de volta para biblioteca.

#### Exemplo de código 4

```javascript
const performer = wS('span', 3, 'easeOutInSine');

performer('height', 300, {
  drive: [100, 15, 75, 0, 'fluid-random-offset'],
});
```

Pode ser útil fazer com que cada alvo da animação tenha o valor a ser alcançado pelo ciclo atual, determinado individualmente, para isso podemos passar uma função simples:

#### Parâmetros recebidos

<dl>
<dt><code>target</code></dt>
<dd>
<p>O alvo da animação.</p>
<dl>
<dt>Type</dt>
<dd><em><code>object</code></em></dd>
</dl>
</dd>
<dt><code>index</code></dt>
<dd>
<p>A posição do alvo na lista.</p>
<dl>
<dt>Type</dt>
<dd><em><code>number</code></em></dd>
</dl>
</dd>
<dt><code>length</code></dt>
<dd>
<p>O comprimento da lista.</p>
<dl>
<dt>Type</dt>
<dd><em><code>number</code></em></dd>
</dl>
</dd>
</dl>

#### Exemplo de código 5

```javascript
const performer = wS('span', 3, 'easeOutInSine');

performer('height', 300, {
  drive: () => 'fluid-random-offset',
});
```

#### Nota

No momento da declaração da animação, ao usar esta propriedade com um valor diferente de `normal` e não definir um valor para a propriedade `loop`, a propriedade `loop` será definida automaticamente da seguinte forma:

_`Array`_:

Com o comprimento do _`Array`_ passado.

_`string`_:

Será definida com o valor `Infinity`.

Caso passe um _`Array`_ e seu último valor seja uma _`string`_ o valor da propriedade _`loop`_ será definido como `Infinity`.

> No caso de definir o valor desta propriedade com um função a regra acima vale para o valor retornado da função.

#### Valor padrão

O valor padrão é: `normal`.

### Propriedade easing

Define como a animação irá progredir em um ciclo de sua duração.

#### Type

_`string`_ | _`function`_. Leitura e gravação.

#### Descrição

Esta propriedade recebe o nome dado a uma função de easing ou uma função easing que recebe os seguintes parâmetros:

<dl>
<dt><code>time</code></dt>
<dd><em><code>number</code></em> . O tempo relacionado a animação(um valor de <code>0</code> a <code>1</code>).</dd>
<dt><code>target</code></dt>
<dd><em><code>object</code></em> . O alvo a ser atingindo.</dd>
<dt><code>index</code></dt>
<dd><em><code>number</code></em> . A posição do alvo no <em><code>array</code></em> de alvos.</dd>
<dt><code>length</code></dt>
<dd><em><code>number</code></em> . O comprimento do <em><code>array</code></em> de alvos.</dd>
</dl>
#### Exemplo de código 1

```javascript
const performer = wS(
  'span',
  3,
  'easeOutInSine' /* = easing */
);
performer('width', 300);

performer('height', 300, {
  easing: 'linear',
});
```

#### Exemplo de código 2

```javascript
wS('span', 2)('height', 250, {
  easing: (t, _el, i, total) => {
    return Math.sin(t * (i + 1)) ** total;
  },
});
```

#### Valor padrão

O valor padrão é: `linear`.

### Propriedade round

Arredonda os valores das propriedades.

#### Type

_`number`_ . Leitura e gravação.

#### Descrição

Ao valores das propriedades são arredondados de acordo com o valor definido para esta propriedade.

#### Exemplo de código

```javascript
const performer = wS('span', 3, 'easeOutInSine');
performer('height', 300, {
  round: 1,
});
```

O código acima faria com que a animação da propriedade `CSS height` só permitisse valores inteiros.
