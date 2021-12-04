## Easings functions

A seguir esta todos as função easings que a biblioteca dispõe de forma built-in.

### Penner's functions

Built-in [Robert Penner's easing functions](http://robertpenner.com/easing/).

Veja as atenuações em ação [easings.net](https://easings.net).

easings :

| in               | out               | in-out              | out-in              |
| ---------------- | ----------------- | ------------------- | ------------------- |
| `'easeInQuad'`   | `'easeOutQuad'`   | `'easeInOutQuad'`   | `'easeOutInQuad'`   |
| `'easeInCubic'`  | `'easeOutCubic'`  | `'easeInOutCubic'`  | `'easeOutInCubic'`  |
| `'easeInQuart'`  | `'easeOutQuart'`  | `'easeInOutQuart'`  | `'easeOutInQuart'`  |
| `'easeInQuint'`  | `'easeOutQuint'`  | `'easeInOutQuint'`  | `'easeOutInQuint'`  |
| `'easeInSine'`   | `'easeOutSine'`   | `'easeInOutSine'`   | `'easeOutInSine'`   |
| `'easeInExpo'`   | `'easeOutExpo'`   | `'easeInOutExpo'`   | `'easeOutInExpo'`   |
| `'easeInCirc'`   | `'easeOutCirc'`   | `'easeInOutCirc'`   | `'easeOutInCirc'`   |
| `'easeInBack'`   | `'easeOutBack'`   | `'easeInOutBack'`   | `'easeOutInBack'`   |
| `'easeInBounce'` | `'easeOutBounce'` | `'easeInOutBounce'` | `'easeOutInBounce'` |

### Cubic Bézier Curve

`cubicBezier(x1, y1, x2, y2)`

#### Exemplo de código

```javascript
const performer = wS(
  'span',
  3,
  'cubicBezier(0.5, 0.05, 0.1, 0.3)' /* = easing */
);
performer('width', 300);
```

### Spring

Spring physics based easing.

```
easing: 'spring(mass, stiffness, damping, velocity)'
```

| Parameter | Default | Min | Max   |
| --------- | ------- | --- | ----- |
| Mass      | `1`     | `0` | `100` |
| Stiffness | `100`   | `0` | `100` |
| Damping   | `10`    | `0` | `100` |
| Velocity  | `0`     | `0` | `100` |

#### Exemplo de código

```javascript
const performer = wS(
  'span',
  3,
  'spring(1, 80, 10, 0)' /* = easing */
);
performer('width', 300);
```

### Elastic

```
easing: 'easeOutElastic(amplitude, period)'
```

| in                | out                | in-out               | out-in               |
| ----------------- | ------------------ | -------------------- | -------------------- |
| `'easeInElastic'` | `'easeOutElastic'` | `'easeInOutElastic'` | `'easeOutInElastic'` |

| Parameter | Default | Min | Max | Info                                                                                                      |
| --------- | ------- | --- | --- | --------------------------------------------------------------------------------------------------------- |
| Amplitude | 1       | 1   | 10  | Controla o overshoot da curva. Quanto maior for esse número, maior será o overshoot.                      |
| Period    | .5      | 0.1 | 2   | Controla quantas vezes a curva vai e volta. Quanto menor for este número, mais vezes a curva vai e volta. |

#### Exemplo de código

```javascript
const performer = wS(
  'span',
  3,
  'easeOutElastic(1, 0.6)' /* = easing */
);
performer('width', 300);
```

### Steps

Define o número de saltos que uma animação leva para chegar ao seu valor final.

```
easing: 'steps(numberOfSteps)'
```

| Parameter       | Default | Min | Max |
| --------------- | ------- | --- | --- |
| Number of steps | 10      | 1   | ∞   |

#### Exemplo de código

```javascript
const performer = wS(
  'span',
  3,
  'steps(5)' /* = easing */
);
performer('width', 300);
```