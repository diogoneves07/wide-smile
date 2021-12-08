## Propriedades customizadas / Hooks

Por mais que temos uma quantidade incrível de propriedades que essa biblioteca é capaz de animar, as vezes podemos querer ter uma propriedade só nossa, que resolve um determinado caso. Com isso em mente, a nossa biblioteca expõe métodos poderosos que, são capazes de criar propriedades que podem ser usadas como qualquer outra, abstraindo toda complexidade por trás dela.

### Método newObservedProperty()

Cria ou sobrescreve uma propriedade observada.

Uma propriedade observada não é aplicada aos alvos da animação pela biblioteca e sim pela função que o autor da propriedade disponibiliza, cabe a WideSmile chamar a função no momento correto e passar argumentos que vão deixar extremamente fácil para o autor realizar a aplicação.

#### Parâmetros 1

<dl>
<dt><code>propertyName</code></dt>
<dd>
<p>O nome da nova propriedade a ser criada.</p>
<dl>
<dt>Type</dt>
<dd><em><code>string</code></em></dd>
<dt>Uso</dt>
<dd>Obrigatório</dd>
</dl>
</dd>
<dt><code>callback</code></dt>
<dd>
<p>A função a ser executada sempre que a propriedade for utilizada por uma animação.</p>
<dl>
<dt>Type</dt>
<dd><em><code>function</code></em></dd>
<dt>Uso</dt>
<dd>Obrigatório</dd>
</dl>
</dd>
</dl>

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

#### Parâmetros 2

<dl>
<dt><code>propertiesAndCallbacks</code></dt>
<dd>
<p>Um objeto com propriedades chave-valor onde a chave é o nome da nova propriedade e o valor e o <code>callback</code> a ser usado.</p>
<dl>
<dt>Type</dt>
<dd><em><code>object</code></em></dd>
<dt>Uso</dt>
<dd>Obrigatório</dd>
</dl>
</dd>
</dl>

#### Exemplo de código

```javascript
// Criando a propriedade observada.
wS().newObservedProperty({
  AniText: (
    value,
    percentageCompleted,
    target
  ) => {
    const at =
      (value.length / 100) * percentageCompleted;
    target.textContent = value.substring(0, at);
  },
  // Poderíamos continuar adicionando mais propriedades...
});
```

#### Descrição

A função passada como `callback` da propriedade especial, ela recebe alguns parâmetros:

<dl>
<dt><code>value</code></dt>
<dd><em><code>any</code></em> . O valor definido para propriedade observada.</dd>
<dt><code>percentageCompleted</code></dt>
<dd><em><code>number</code></em>. A porcentagem do valor definido para a propriedade observada que que está em processo de intercalação.</dd>
<dt><code>target</code></dt>
<dd><em><code>object</code></em>. O alvo a ser atingindo.</dd>
<dt><code>index</code></dt>
<dd><em><code>object</code></em>. A posição do alvo na lista de alvos.</dd>
</dl>

#### Exemplo de código

```javascript
// Criando a propriedade observada.

wS().newObservedProperty(
  'AniText',
  (value, percentageCompleted, target) => {
    // A quantidade de caracteres que já podem ser adicionados.
    const at =
      (value.length / 100) * percentageCompleted;

    // Adicionando os caracteres ao alvo.
    target.textContent = value.substring(0, at);
  }
);
```

#### Explicando o código

No exemplo a cima estamos criado uma propriedade observada, note que, a nossa função `callback` esta esperando pelo parâmetro `value` definido como uma _`string`_. Para criar uma animação de texto utilizamos o valor do parâmetro `percentageCompleted` que é a porcentagem do valor que foi atribuído a `value` que de acordo com a biblioteca deve ser aplicado.

O simples código acima, faria com que podemos usar uma nova propriedade como qualquer outra. Esta faria a animação de inserção de textos aos alvos da animação.

#### Exemplo de código - Usando a propriedade

```javascript
wS(
  'span',
  1,
  'easeOutInSine'
)([
  { AniText: '' },
  { 0: 'Hello' },
  { 0: 'Hello Word!!!' },
]);
```

#### Explicando o código

O exemplo de uso da propriedade observada a cima é muito simples, mas há coisas importantes a ser explicadas. Note que neste exemplo separarmos a animação em quadros-chave, vamos explicar o comportamento de dois parâmetros que a função `callback` da propriedade observada recebe, são eles `value` e `percentageCompleted`.

- Na primeira intercalação da animação o valor de `value` seria: `''` e o de `percentageCompleted`: `100`.
- Agora vamos simular seus valores quando a animação estivesse `25%` concluída, o valor de `value` seria: `'Hello'` e o de `percentageCompleted`: `50`.

O valor de `percentageCompleted` está relacionado ao valor atual de `value` que está em processo de intercalação e indica a porcentagem desse valor que deve ser aplicado. Com isso podemos trabalhar a aplicação da propriedade de acordo com os quadros definidos na animação.

#### Returns

A função **Creator** que o invocou.

### Método deleteObservedProperty()

Remove definitivamente uma ou mais propriedades observadas.

#### Parâmetros

<dl>
<dt><code>propertiesNames</code></dt>
<dd>
<p>O nome da propriedade a ser removida.</p>
<dl>
<dt>Type</dt>
<dd><em><code>string</code></em></dd>
<dt>Uso</dt>
<dd>Obrigatório</dd>
</dl>
</dd>
</dl>

#### Exemplo de código

```javascript
wS().deleteObservedProperty('zoom');
// or
wS().deleteObservedProperty(
  'zoom',
  'propertyName' /*...*/
);
```

#### Descrição

Este método pode receber múltiplos argumentos.

#### Returns

A função **Creator** que o invocou.

### Método newSpecialProperty()

Cria ou sobrescreve uma propriedade especial.

Uma propriedade especial pode ser criada a partir da junção de outras propriedades. Podemos fazer uso dela também para executar uma lógica para calcular determinados valores.

#### Parâmetros 1

<dl>
<dt><code>propertyName</code></dt>
<dd>
<p>O nome da nova propriedade a ser criada.</p>
<dl>
<dt>Type</dt>
<dd><em><code>string</code></em></dd>
<dt>Uso</dt>
<dd>Obrigatório</dd>
</dl>
</dd>
<dt><code>callback</code></dt>
<dd>
<p>A função a ser executada sempre que a propriedade for utilizada por uma animação.</p>
<dl>
<dt>Type</dt>
<dd><em><code>function</code></em></dd>
<dt>Uso</dt>
<dd>Obrigatório</dd>
</dl>
</dd>
</dl>

#### Exemplo de código

```javascript
// Criando a propriedade especial.
wS().newSpecialProperty('Size', (value) => {
  return {
    width: value,
    height: value,
  };
});
```

#### Parâmetros 2

<dl>
<dt><code>propertiesAndCallbacks</code></dt>
<dd>
<p>Um objeto com propriedades chave-valor onde a chave é o nome da nova propriedade e o valor e o <code>callback</code> a ser usado.</p>
<dl>
<dt>Type</dt>
<dd><em><code>object</code></em></dd>
<dt>Uso</dt>
<dd>Obrigatório</dd>
</dl>
</dd>
</dl>

#### Exemplo de código

```javascript
// Criando a propriedade especial.
wS().newSpecialProperty({
  Size: (value) => {
    return {
      width: value,
      height: value,
    };
  },
  // Poderíamos continuar adicionando mais propriedades...
});
```

#### Descrição

A função passada como `callback` da propriedade especial, ela recebe alguns argumentos e deve retornar um objeto de propriedades. Abaixo esta os parâmetros que a função recebe.

<dl>
<dt><code>value</code></dt>
<dd><em><code>string</code></em>. O valor definido para propriedade especial.</dd>
<dt><code>target</code></dt>
<dd><em><code>object</code></em>. O alvo a ser atingindo.</dd>
<dt><code>index</code></dt>
<dd><em><code>number</code></em>. A posição do alvo na lista de alvos.</dd>
</dl>

#### Exemplo de código

```javascript
// Criando a propriedade especial.
wS().newSpecialProperty('Size', (value) => {
  return {
    width: value,
    height: value,
  };
});
```

O simples código acima, faria com que podemos usar a nova propriedade como qualquer outra. Esta faria a animação das propriedades _`CSS width`_ e _`height`_ ao mesmo tempo.

#### Exemplo de código - Usando a propriedade

```javascript
wS('div', 2)('Size', 200);
```

#### Returns

A função **Creator** que o invocou.

### Método deleteSpecialProperty()

Remove definitivamente uma ou mais propriedades especiais.

#### Parâmetros

<dl>
<dt><code>propertiesNames</code></dt>
<dd>
<p>O nome da propriedade a ser removida.</p>
<dl>
<dt>Type</dt>
<dd><em><code>string</code></em></dd>
<dt>Uso</dt>
<dd>Obrigatório</dd>
</dl>
</dd>
</dl>

#### Exemplo de código

```javascript
wS().deleteSpecialProperty('size');
// or
wS().deleteSpecialProperty(
  'size',
  'propertyName' /*...*/
);
```

#### Descrição

Este método pode receber múltiplos argumentos.

#### Returns

A função **Creator** que o invocou.

### Próximos passos

Compartilhe as propriedades customizadas com a comunidade, será incrível usá-la sem precisar lidar com o código por trás dela.
