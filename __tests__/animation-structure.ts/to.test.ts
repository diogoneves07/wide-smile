import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('To animation structure.', async () => {
  const element = useElement('div');

  wS(element, 0.1)('top', 50).to(100);

  await new Promise((resolve) => {
    return setTimeout(resolve, 200);
  });

  expect(parseFloat(getComputedStyle(element).getPropertyValue('top'))).toBe(
    100
  );
});
