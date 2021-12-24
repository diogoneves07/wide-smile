import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Remove property animation action.', async () => {
  const element = useElement('div');

  const performer = wS(element, 1)('top', [0, 300]);

  setTimeout(() => {
    performer.remove('top');
  }, 500);

  await new Promise((resolve) => {
    return setTimeout(resolve, 1500);
  });

  expect(
    parseFloat(getComputedStyle(element).getPropertyValue('top'))
  ).toBeLessThanOrEqual(200);
});
