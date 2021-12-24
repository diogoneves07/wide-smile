import flattenKeyframes from '../../src/animation-mount/flatten-keyframes';

test('Flattens keyframes object.', () => {
  const flatten = flattenKeyframes({
    height: 120,
    width: [50, 20],
  });
  expect(flatten.keyframes).toEqual({
    height: {
      0: '?',
      100: 120,
    },
    width: {
      0: 50,
      100: 20,
    },
  });
});

test('Flattens keyframes array.', () => {
  const flatten = flattenKeyframes([
    {
      height: 120,
      width: 50,
    },
    {
      0: 420,
      1: 200,
      opacity: 0.5,
      offset: 0.3,
    },
    {
      0: 150,
      1: 120,
    },
    {
      0: 320,
      1: 900,
    },
  ]);
  expect(flatten.keyframes).toEqual({
    height: {
      0: 120,
      30: 420,
      65: 150,
      100: 320,
    },
    width: {
      0: 50,
      30: 200,
      65: 120,
      100: 900,
    },
    opacity: {
      0: '?',
      30: 0.5,
      100: '?',
    },
  });

  expect(flatten.orderOfThePropertiesUsed).toEqual([
    'height',
    'width',
    'opacity',
  ]);
});
