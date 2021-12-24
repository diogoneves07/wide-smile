import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Progress animation property.', async () => {
  const element = useElement('div');
  let progress = 0;

  wS(element, 0.1)('width', [0, 50], {
    progress: (p: number) => {
      progress = p;
    },
  });

  await new Promise((resolve) => {
    return setTimeout(resolve, 200);
  });

  expect(progress).toBe(100);
});
