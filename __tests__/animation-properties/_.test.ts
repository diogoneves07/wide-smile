import flattenKeyframes from '../../src/animation-mount/flatten-keyframes';
test('_ animation property.', () => {
  expect({ top: { 0: 100, 30: 200, 60: 200, 100: 100 } }).toEqual(
    flattenKeyframes([
      { top: 100, _: [0, 100] },
      { top: 200, _: [30, 60] },
    ]).keyframes
  );
});
