import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('dirTo animation action.', async () => {
  const element = useElement('div');

  const performer = wS(element, 0.5)('left', [0, 300]);

  setTimeout(() => {
    performer.dirTo('reverse');
  }, 200);

  await new Promise((resolve) => {
    return setTimeout(resolve, 1000);
  });
  expect(parseFloat(getComputedStyle(element).getPropertyValue('left'))).toBe(
    0
  );
});
