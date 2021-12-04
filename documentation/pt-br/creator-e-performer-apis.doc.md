## Creator e Performer APIs.

Os métodos que serão apresentados são semelhantes em sua nomenclatura e uso nas duas APIs, entretanto com pequenas diferenças em seus efeitos colaterais:

- Ao usar o método por uma função **Performer** estamos aplicando este método a todas as animações criadas por esta função.
- Ao usar o método por uma função **Creator**, estamos aplicando este método a todas as funções **Performer** que esta função **Creator** criou, e cada função **Performer** aplicará o método em todas as animações criadas por ela.

### Métodos de controle de interação

Estes métodos são excelentes para aplicar uma determinada mudança de direção ou comportamento em uma animação, sem comprometer as interações seguintes.

#### Método go()

Faz a animação retornar seu progresso atual para um determinado ponto e finaliza a iteração.

##### Parâmetros

<dl>
<dt><code>part</code></dt>
<dd>
<p>O ponto da animação. Este deve ser um valor entre <code>0</code> e <code>1</code>, onde <code>0</code> significa o inicio da interação e <code>1</code> o final.</p>
<dl>
<dt>Type</dt>
<dd><em><code>number</code></em></dd>
<dt>Uso</dt>
<dd>Obrigatório</dd>
</dl>
</dd>
</dl>

##### Exemplo de código

```javascript
const performer = wS(
  'span',
  2,
  'easeOutInSine'
)('height', 200);

setTimeout(() => {
  performer.go(0);
  // Ou
  // wS.go(0);
}, 1000);
```

#### Método back()

Faz a animação retornar seu progresso atual para um determinado ponto e continuar a iteração a partir dele.

##### Parâmetros

<dl>
<dt><code>part</code></dt>
<dd>
<p>O ponto da animação. Este deve ser um valor entre <code>0</code> e <code>1</code>, onde <code>0</code> significa o inicio da interação e <code>1</code> o final.</p>
<dl>
<dt>Type</dt>
<dd><em><code>number</code></em></dd>
<dt>Uso</dt>
<dd>Obrigatório</dd>
</dl>
</dd>
</dl>

##### Exemplo de código

```javascript
const performer = wS(
  'span',
  2,
  'easeOutInSine'
)('height', 200);

setTimeout(() => {
  performer.back(0, 2 /* 4s */);
  // Ou
  // wS.back(0, 2 /* 4s */);
}, 1000);
```

#### Método jump()

Faz a animação saltar o seu progresso para um determinado ponto e continuar a iteração a partir dele.

##### Parâmetros

<dl>
<dt><code>part</code></dt>
<dd>O ponto da animação. Este deve ser um valor entre <code>0</code> e <code>1</code>, onde <code>0</code> significa o inicio da interação e <code>1</code> o final.</dd>
</dl>

##### Exemplo de código

```javascript
const performer = wS(
  'span',
  2,
  'easeOutInSine'
)('height', 200);

setTimeout(() => {
  performer.jump(0);
  // Ou
  // wS.jump(0);
}, 1000);
```

#### Método speed()

Controla a velocidade da execução da interação atual.

##### Parâmetros

<dl>
<dt><code>multiplyDur</code></dt>
<dd>
<p>A velocidade em que o processo deve ser realizado. A velocidade é calculada multiplicando o valor deste parâmetro pelo o valor da propriedade <code>dur</code>.</p>
<dl>
<dt>Type</dt>
<dd><em><code>number</code></em></dd>
<dt>Uso</dt>
<dd>Obrigatório</dd>
</dl>
</dd>
</dl>

> Caso o valor passado seja negativo então a velocidade será o valor da propriedade `dur` menos o resultado da multiplicação.

##### Exemplo de código

```javascript
const performer = wS(
  'span',
  2,
  'easeOutInSine'
)('height', 200);

setTimeout(() => {
  performer.speed(2 /* 4s */);
  // Ou
  // wS.speed(2 /* 4s */);
}, 1000);
```

#### Método revert()

Reverte o progresso alcançado pela interação atual.

##### Parâmetros

<dl>
<dt><code>endIteration</code></dt>
<dd>
<p>Define se a interação atual deve ser encerrada quando alcançar o ponto máximo da reversão.</p>
<dl>
<dt>Type</dt>
<dd><em><code>boolean</code></em></dd>
<dt>Uso</dt>
<dd>Opcional</dd>
</dl>
</dd>
</dl>

##### Exemplo de código

```javascript
const performer = wS(
  'span',
  2,
  'easeOutInSine'
)('height', 200);

setTimeout(() => {
  performer.revert();
  // Ou
  // wS.revert();
}, 1000);
```

### Métodos para alteração de propriedade

Estes método podem ser utilizado para alterar um valor que foi definido para uma determinada propriedade.

#### Método dirTo()

Define um novo valor para a propriedade `dir`.

##### Parâmetros

<dl>
<dt><code>dir</code></dt>
<dd>A novo direção da animação.<br>
Uso</dd>
<dd>Obrigatório</dd>
</dl>

> Este parâmetro recebe o mesmo tipo de valores da propriedade `dir`.

##### Descrição

A alteração de direção é feita de forma fluida, ou seja, do progresso atual da animação para o novo progresso determinado pela nova direção.

##### Exemplo de código

```javascript
const performer = wS(
  'span',
  2,
  'easeOutInSine'
)('height', 200);

setTimeout(() => {
  performer.dirTo('reverse');
  // Ou
  // wS.dirTo('reverse');
}, 1000);
```

### Métodos de controle de animação

Estes métodos podem definir o estado da animação.

#### Método load()

Carrega os principais dados da animação e a deixa pronta para ser executada.

##### Exemplo de código

```javascript
const performer = wS('span', 2, 'easeOutInSine')(
  'height',
  200,
  {
    autoPlay: false,
  }
);
performer.load();
// Ou
// wS.load();
```

> Antes de usar este método certifique-se que propriedade `autoPlay` esta definida como _`false`_.

#### Método play()

Envia a animação para fila de execução e a executa quando ela estiver pronta.

##### Exemplo de código

```javascript
const performer = wS(
  'span',
  2,
  'easeOutInSine',
  false /* = autoPlay */
)('height', 200);

setTimeout(() => {
  performer.play();
  // Ou
  // wS.play();
}, 1000);
```

> Antes de usar este método certifique-se que propriedade `autoPlay` esta definida como _`false`_.

#### Método ready()

Carrega cada animação criada pela função **Performer** e as executa da forma que foram estruturadas.

##### Descrição

As animações só serão executadas quando todas forem carregadas.

##### Exemplo de código

```javascript
const performer = wS(
  'span',
  2,
  'easeOutInSine',
  false /* = autoPlay */
)('height', 200)._('width', 200)(
  'backgroundColor',
  'red'
);

performer.ready();
// Ou
// wS.ready();
```

> Antes de usar este método certifique-se que propriedade `autoPlay` esta definida como _`false`_.

#### Método pause()

Pausa a execução da animação.

##### Exemplo de código

```javascript
const performer = wS(
  'span',
  2,
  'easeOutInSine'
)('height', 200);

setTimeout(() => {
  performer.pause();
  // Ou
  // wS.pause();
}, 1000);
```

#### Método resume()

Retoma a execução da animação que havia sido pausada.

##### Exemplo de código

```javascript
const performer = wS(
  'span',
  2,
  'easeOutInSine'
)('height', 200);

setTimeout(() => {
  performer.pause();
}, 500);

setTimeout(() => {
  performer.resume();
  // Ou
  // wS.resume();
}, 1000);
```

#### Método restart()

Reinicia a execução da animação.

##### Exemplo de código

```javascript
const performer = wS(
  'span',
  2,
  'easeOutInSine'
)('height', 200);

setTimeout(() => {
  performer.restart();
  // Ou
  // wS.restart();
}, 500);
```

#### Método cancel()

Cancela a execução da animação e remove as alterações feitas no alvos.

##### Exemplo de código

```javascript
const performer = wS(
  'span',
  2,
  'easeOutInSine'
)('height', 200);

setTimeout(() => {
  performer.cancel();
  // Ou
  // wS.cancel();
}, 500);
```

#### Método end()

Salta todos os valores das propriedades da animação para o seu momento de conclusão.

##### Exemplo de código

```javascript
const performer = wS(
  'span',
  2,
  'easeOutInSine'
)('height', 200);

setTimeout(() => {
  performer.end();
  // Ou
  // wS.end();
}, 500);
```

#### Método destroy()

Parra a animação e destrói todos os dados relacionado a ela.

##### Parâmetros

<dl>
<dt><code>removeChanges</code></dt>
<dd>
<p>Define se as alterações feitas nos alvos da animação devem ser removidas.</p>
<dl>
<dt>Type</dt>
<dd><em><code>boolean</code></em></dd>
<dt>Uso</dt>
<dd>Opcional</dd>
</dl>
</dd>
</dl>

> Apenas use este parâmetro caso queria que as alterações sejam removidas, para isso passe: _`true`_.

##### Exemplo de código

```javascript
const performer = wS(
  'span',
  2,
  'easeOutInSine'
)('height', 200);

setTimeout(() => {
  performer.destroy(true);
  // Ou
  // wS.destroy();
}, 500);
```

### Manipuladores de eventos

Ouvinte de eventos são muito úteis para disparar um determinada função no momento correto.

#### Método on()

Acrescenta ouvinte de evento.

##### Parâmetros

<dl>
<dt><code>eventName</code></dt>
<dd>
<p>O nome do evento de interesse. Veja a lista abaixo.</p>
</dd>
<dt><code>play</code></dt>
<dd>
<p>Ocorre apenas uma vez quando a animação é enviada.</p>
</dd>
<dt><code>load</code></dt>
<dd>
<p>Ocorre apenas uma vez quando a animação é carregada.</p>
</dd>
<dt><code>start</code></dt>
<dd>
<p>Ocorre apenas uma vez na primeira intercalação da animação.</p>
</dd>
<dt><code>change</code></dt>
<dd>
<p>Ocorre cada intercalação da animação.</p>
</dd>
<dt><code>loopStart</code></dt>
<dd>
<p>Ocorre a cada inicio de interação.</p>
</dd>
<dt><code>loopEnd</code></dt>
<dd>
<p>Ocorre a cada interação concluída.</p>
<dl>
<dt><code>end</code></dt>
<dd>Ocorre apenas uma vez quando a animação é concluída.</dd>
<dt><code>cancel</code></dt>
<dd>Ocorre quando a animação é cancelada.</dd>
<dt><code>destroy</code></dt>
<dd>Ocorre quando a animação é destruída.</dd>
</dl>
</dd>
<dt><code>callback</code></dt>
<dd>
<p>A função a ser chamada quando o evento especificado ocorrer. Recebe dois argumentos:</p>
<dl>
<dt><code>eventName</code></dt>
<dd>O nome do evento ocorrido.</dd>
<dt><code>performer</code></dt>
<dd>A função <strong>Performer</strong>.</dd>
</dl>
</dd>
</dl>

##### Exemplo de código

```javascript
const performer = wS(
  'span',
  2,
  'easeOutInSine'
)('height', 200);

performer.on('end', () => {
  alert('The End');
});
// Ou
/*
    wS.on('end', () => {
      alert('The End');
    });
  */
```

#### Método off()

Remove um ouvinte de evento.

##### Parâmetros

<dl>
<dt><code>eventName</code></dt>
<dd>O nome do evento.</dd>
<dt><code>callback</code></dt>
<dd>A função utilizada na inserção do ouvinte ou um valor número(<code>index</code>) a partir do <code>0</code> de acordo com a ordem de inserção de ouvintes.</dd>
</dl>

##### Exemplo de código

```javascript
const performer = wS(
  'span',
  2,
  'easeOutInSine'
)('height', 200).on('end', () => {
  alert('The End');
});

performer.off('end', 0);
// Ou
// wS.off('end', 0);
```
