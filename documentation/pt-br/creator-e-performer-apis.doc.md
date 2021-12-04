## Creator e Performer APIs.

Os métodos que serão apresentados são semelhantes em sua nomenclatura e uso nas duas APIs, entretanto com pequenas diferenças em seus efeitos colaterais:

- Ao usar o método por uma função **Performer** estamos aplicando este método a todas as animações criadas por esta função.

- Ao usar o método por uma função **Creator**, estamos aplicando este método a todas as funções **Performer** que esta função **Creator** criou, e cada função **Performer** aplicará o método em todas as animações criadas por ela.

### Métodos de controle de interação

Estes métodos são excelentes para aplicar uma determinada mudança de direção ou comportamento em uma animação, sem comprometer as interações seguintes.

#### Método go()

Faz a animação retornar seu progresso atual para um determinado ponto e finaliza a iteração.

##### Parâmetros

`part`

: O ponto da animação. Este deve ser um valor entre `0` e `1`, onde `0` significa o inicio da interação e `1` o final.

    Type
    : *`number`*

    Uso
    : Obrigatório

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

`part`

: O ponto da animação. Este deve ser um valor entre `0` e `1`, onde `0` significa o inicio da interação e `1` o final.

    Type
    : *`number`*

    Uso
    : Obrigatório

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

`part`

: O ponto da animação. Este deve ser um valor entre `0` e `1`, onde `0` significa o inicio da interação e `1` o final.

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

`multiplyDur`

: A velocidade em que o processo deve ser realizado. A velocidade é calculada multiplicando o valor deste parâmetro pelo o valor da propriedade `dur`.

    Type
    : *`number`*

    Uso
    : Obrigatório

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

`endIteration`

: Define se a interação atual deve ser encerrada quando alcançar o ponto máximo da reversão.

    Type
    : *`boolean`*

    Uso
    : Opcional

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

`dir`

: A novo direção da animação.
Uso
: Obrigatório

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

`removeChanges`

: Define se as alterações feitas nos alvos da animação devem ser removidas.

    Type
    : *`boolean`*

    Uso
    : Opcional

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

`eventName`

: O nome do evento de interesse. Veja a lista abaixo.

`play`
: Ocorre apenas uma vez quando a animação é enviada.

`load`
: Ocorre apenas uma vez quando a animação é carregada.

`start`
: Ocorre apenas uma vez na primeira intercalação da animação.

`change`
: Ocorre cada intercalação da animação.

`loopStart`
: Ocorre a cada inicio de interação.

`loopEnd`
: Ocorre a cada interação concluída.

    `end`
    : Ocorre apenas uma vez quando a animação é concluída.

    `cancel`
    : Ocorre quando a animação é cancelada.

    `destroy`
    : Ocorre quando a animação é destruída.

`callback`

: A função a ser chamada quando o evento especificado ocorrer. Recebe dois argumentos:

    `eventName`
    : O nome do evento ocorrido.

    `performer`
    : A função **Performer**.

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

`eventName`

: O nome do evento.

`callback`

: A função utilizada na inserção do ouvinte ou um valor número(`index`) a partir do `0` de acordo com a ordem de inserção de ouvintes.

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
