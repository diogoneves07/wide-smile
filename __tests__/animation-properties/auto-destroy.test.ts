import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Auto destroy animation property(true).', async () => {
  const element = useElement('div');

  wS(element, 0.1)('width', [0, 50], {
    autoDestroy: true,
  });

  await new Promise((resolve) => {
    return setTimeout(resolve, 400);
  });

  expect(wS.performers.length).toBe(0);
});

test('Auto destroy animation property(false).', async () => {
  const element = useElement('div');

  wS(element, 0.1)('width', [0, 50], {
    autoDestroy: false,
  });

  await new Promise((resolve) => {
    return setTimeout(resolve, 400);
  });
  expect(wS.performers.length).toBe(1);
});
