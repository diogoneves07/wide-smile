# Creator Functions

São funções que contêm propriedades e métodos e tem como principal objetivo criar **Performers**, definir padrões e criar outros **Creators**. Também são capazes de aplicar métodos em todos os **Performers** que forem criados por eles e por consequência mudam o comportamento das animações.

### Parâmetro formal

<dl>
<dt><code>options</code></dt>
<dd>
<p>Um objeto de propriedades relacionadas a animação como por exemplo: duração, alvos, direção e outras.</p>
<dl>
<dt>Type</dt>
<dd><em><code>object</code></em></dd>
<dt>Uso</dt>
<dd>Obrigatório</dd>
</dl>
</dd>
</dl>

> As propriedades disponíveis são detalhadas logo abaixo, você pode clicar aqui para ver

#### Exemplo de código

```javascript
wS({
  targets: 'div',
  dur: 2,
});
```

### Parâmetros Atalho

Podemos passar múltiplos argumentos em que cada um será aplicado as determinadas propriedades de acordo com as regras abaixo:

- O primeiro argumento deve ser sempre um valor destinado a propriedade `targets`.

A partir do primeiro argumento podemos passar valores de forma não ordenada pela sua posição, mas sim pelo seu tipo:

- Os argumentos do tipo _`string`_ são aplicados da seguinte forma: caso o valor seja compatível a propriedade `dir` então ele será aplicado a ela, se não, será aplicado a propriedade `easing`.
- O primeiro argumento do tipo _`number`_ é aplicado a propriedade `dur` e o segundo a propriedade `loop`.
- O argumento do tipo _`function`_ é aplicado a propriedade `easing`.

> Caso use o atalho e passe um valor destinado a propriedade `loop`, em que a intenção será fazer com que a animação seja executada infinitamente não use _`true`_, use _`Infinity`_.

- O primeiro argumento do tipo _`boolean`_ é aplicado a propriedade `autoPlay`.
- Podemos também passar um objeto de opções, junto ao outros argumentos.

#### Exemplo de código 1

```javascript
wS(
  'div' /** = targets */,
  2 /** = dur */,
  'easeOutInSine' /** = easing */
);
```

#### Exemplo de código 2

```javascript
wS(
  'div' /** = targets */,
  2 /** = dur */,
  'easeOutInSine' /** = easing */,
  {
    drive: 'fluid-random-offset',
  }
);
```

> Pode ser confuso em um primeiro momento, mas ao começar a construir animações verá que faz sentido.

#### Descrição

Ao chamar uma função **Creator** passando como argumentos as propriedades, teremos como retorno uma função **Performer**, as animações criadas por ela herdara as propriedades e valores definidos na chamada de função **Creator**.

## Creators API

Abaixo esta alguns métodos e propriedades disponíveis nesta API.

### Creators global

As funções **Creators** expõe um objeto que é compartilhado por todas, este objeto contém métodos e propriedades extremamente importantes.

#### Acessando o objeto

Existe duas formas de ter acesso as propriedades e métodos do objeto em questão, através da propriedade _`global`_ ou pela chamada de uma função **Creator** sem a passagem de argumentos.

##### Exemplo de código - Propriedade global

```javascript
const creatorsGlobalObject = wS.global;
```

##### Exemplo de código - Chamada de função sem argumentos.

```javascript
const creatorsGlobalObject = wS();
```

#### Método new()

Cria e retorna uma nova função **Creator**.

##### Descrição

Esta nova função **Creator** pode ser utilizada normalmente, além do benefício de isolar as animações criadas por ela.

##### Exemplo de código

```javascript
const myCreator = wS().new();
```

#### Propriedade version

A versão da biblioteca que está em uso.

##### Type

_`string`_. Apenas leitura.

#### Propriedade asyncLoading

O modo de carregamento das animações.

##### Type

_`boolean`_. Leitura e gravação.

##### Descrição

Define se o carregamento das animações deve ocorrer de forma assíncrona.

<dl>
<dt><code>true</code></dt>
<dd>As animações são carregadas de forma assíncrona, em que normalmente as mais simples são carregadas primeiro.</dd>
<dt><code>false</code></dt>
<dd>As animações são carregadas de forma síncrona, ou seja, o carregamento é feito de acordo com a ordem de chegada.</dd>
</dl>

##### Valor padrão

O valor padrão é: `false`.

#### Propriedade all

Um array que contém todas as funções **Creators**.

##### Type

_`Array`_. Apenas leitura.

##### Descrição

As funções **Creators** estão ordenadas de acordo com a ordem de suas criações.

#### Propriedade specials

Um objeto que contém todas as propriedades especiais.

##### Type

_`object`_. Apenas leitura.

##### Descrição

As propriedades especiais estão organizadas de modo chave e valor, onde a chave é o nome definido para a propriedade e o valor é a função disponibilizada.

#### Propriedade observeds

Um objeto que contém todas as propriedades observadas.

##### Type

_`object`_. Apenas leitura.

##### Descrição

As propriedades observadas estão organizadas de modo chave e valor, onde a chave é o nome definido para a propriedade e o valor é a função disponibilizada.

#### Método newEasing()

Cria ou sobrescreve uma função easing customizada.

##### Parâmetros

<dl>
<dt><code>name</code></dt>
<dd>
<p>Um nome para uso da nova função easing.</p>
<dl>
<dt>Type</dt>
<dd><em><code>string</code></em></dd>
<dt>Uso</dt>
<dd>Obrigatório</dd>
</dl>
</dd>
<dt><code>callback</code></dt>
<dd>
<p>A função a ser executada para calcular os valores.</p>
<dl>
<dt>Type</dt>
<dd><em><code>function</code></em></dd>
<dt>Uso</dt>
<dd>Obrigatório</dd>
</dl>
</dd>
</dl>

##### Descrição

A função passada como `callback` recebe alguns parâmetros:

<dl>
<dt><code>time</code></dt>
<dd><em><code>number</code></em> . O tempo relacionado a animação(um valor de <code>0</code> a <code>1</code>).</dd>
<dt><code>target</code></dt>
<dd><em><code>object</code></em>. O alvo a ser atingindo.</dd>
<dt><code>index</code></dt>
<dd><em><code>number</code></em>. A posição do alvo no <em><code>array</code></em> de alvos.</dd>
<dt><code>length</code></dt>
<dd><em><code>number</code></em>. O comprimento do <em><code>array</code></em> de alvos.</dd>
</dl>

##### Exemplo de código

```javascript
// Criando a propriedade observada.

wS().newEasing('myEasing', (t, _el, i, total) => {
  return Math.sin(t * (i + 1)) ** total;
});

wS('span', 10, 'myEasing')('height', 250);
```

### Creators Individual

Os métodos e propriedades a seguir são únicos para cada **Creator**.

#### Propriedade dfs

Um objeto com todas as propriedades de comportamento e seus valores padrão para as animações.

##### Type

_`object`_. Leitura e gravação.

##### Descrição

Ao criar uma função **Performer** ela herda da função **Creator** que a criou, as propriedades que não forem definidas explicitamente para ela, estas propriedades são herdadas através desta propriedade.

##### Exemplo de código

```javascript
const defaults = wS.dfs;
```

#### Propriedade performers

Um _`Array`_ com todas as funções **Performer** cridas pela função **Creator**.

##### Type

_`Array`_. Leitura e gravação.

##### Descrição

As funções **Performers** estão ordenadas de acordo com a ordem de suas criações.

##### Exemplo de código

```javascript
const performers = wS.performers;
```
