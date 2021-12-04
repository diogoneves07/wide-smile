## Escalonamento / Stagger

O escalonamento nos permiti animar uma propriedade ou espaçar um determinado valor entre os alvos da animação, com isso, cada alvo recebe o valor individual para a propriedade.

> Uma boa maneira de pensar sobre escalonamento é imaginar uma escada, imagine que o primeiro degrau é a primeira animação( ou o primeiro alvo a ser animado) e os seguintes são a próximas.

Para usar o escalonamento a biblioteca dispõe de uma sintaxe especial, basta adicionar os caracteres `<>` no valor da propriedade:

```javascript
const performer = wS(
  'span',
  1,
  'easeOutInSine'
)('rotate', '360 <center> [5,5]');
```

No exemplo acima, ao usar esta sintaxe especial também podemos fazer uso de valores que são destinados a propriedades para o escalonamento, neste caso, estaríamos definindo que o escalonamento começaria a partir do **centro** do _`array`_ de alvos, e que este _`array`_ esta organizado em um **grid** de: **5 linhas e 5 colunas**.

Podemos também escalonar algumas propriedades de comportamento(`delay`, `endDelay`, `loop` `dur` e `drive`), veja o exemplo a seguir:

```javascript
const performer = wS('span', 1, 'easeOutInSine')(
  'rotate',
  '360deg',
  {
    delay: '0.5 <center>',
  }
);
```

### Valores e regras

Abaixo esta as regras de como utilizar todos as propriedades para o escalonamento.

#### Value

O valor anterior a sintaxe especial: `<>`, é considerado o valor para a propriedade que deve ser escalonado. Este pode ser um valor normal de propriedade ou intervalo entre dois valores.

```
'0.5 <>'
```

Ou

```
'[20, 50] <>'
```

#### Start

Define um valor específico para iniciar o espaçamento.

O valor numérico após a sintaxe especial: `<>`, é considerado o valor destinado a esta propriedade.

```
'150 <center> 50'
```

#### Valor padrão

O valor padrão é: `null`, ou seja, o valor de inicio é auto determinado.

#### From

Define a posição do ponto de partida do efeito.

O valor dentro da sintaxe especial: `<>`, é considerado o valor destinado a esta propriedade.

#### Valores disponíveis

_`number`_
: Inicia o efeito a partir do índice especificado.

`'first' `
: Inicia o efeito a partir do primeiro alvo.

`'last' `
: Inicia o efeito a partir do último alvo.

`'center' `
: Iniciar o efeito do centro.

`'edges' `
: Inicia o efeito a partir das bordas.

`'random' `
: O efeito é aplicado de forma aleatória.

```
'<center>'
```

#### Valor padrão

O valor padrão é: `first`.

#### Grid

Define como o alvos da animação estão organizados.

A sintaxe de _`array`_ após a sintaxe especial: `<>`, é considerado o valor destinado a esta propriedade. Este deve ser um _`array`_ de dois valores: `[rows: number, columns: number]`.

```
'<center> [5, 6]'
```

#### Valor padrão

O valor padrão é: `null`, ou seja, o _`array`_ de alvos não é tratado como uma grid.

#### Axis

Define o eixo da **grid** em que o efeito deve se concentrar(faz mais sentido quando você vê-lo visualmente).

Após a sintaxe especial: `<>`, podemos usar uma _`string`_ com um dos valores abaixo.

#### Valores disponíveis

`'x' `
: Se concentrar no eixo `x`.

`'y' `
: Se concentrar no eixo `y`.

`'both' `
: Se concentrar nos dois eixos.

```
'150 <center> both'
```

#### Valor padrão

O valor padrão é: `both`.

#### Dir

Após a sintaxe especial: `<>`, podemos usar uma _`string`_ com um dos valores abaixo.

#### Valores disponíveis

`'normal' `
: Inicia o efeito a partir do primeiro alvo.

`reverse' `
: Inicia o efeito a partir do último alvo.

```
'150 <center> reverse'
```

#### Valor padrão

O valor padrão é: `normal`.

#### easing

Após a sintaxe especial: `<>`, podemos usar um nome de uma função _`easing`_, que será utilizada para espaçar os valores.

```
'150 <center> lienar'
```

#### Valor padrão

O valor padrão é: `null`, ou seja, nenhuma função é utilizada.