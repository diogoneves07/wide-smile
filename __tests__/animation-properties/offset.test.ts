import flattenKeyframes from '../../src/animation-mount/flatten-keyframes';
test('Offset animation property.', () => {
  expect({ top: { 0: 100, 30: 200, 60: 200, 100: 100 } }).toEqual(
    flattenKeyframes([
      { top: 100, offset: [0, 1] },
      { top: 200, offset: [0.3, 0.6] },
    ]).keyframes
  );
});
