import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('End animation action.', async () => {
  const element = useElement('div');

  let topValueBeforeEnd = '';

  const performer = wS(element, 5)('top', [0, 300]);

  setTimeout(() => {
    topValueBeforeEnd = getComputedStyle(element).getPropertyValue('top');
    performer.end();
  }, 500);

  await new Promise((resolve) => {
    return setTimeout(resolve, 1000);
  });

  expect(parseFloat(getComputedStyle(element).getPropertyValue('top'))).toBe(
    300
  );
});
