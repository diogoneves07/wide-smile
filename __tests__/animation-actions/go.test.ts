import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Go animation action.', async () => {
  const element = useElement('div');

  const performer = wS(element, 0.5)('top', [0, 300]);

  setTimeout(() => {
    performer.go(0);
  }, 200);

  await new Promise((resolve) => {
    return setTimeout(resolve, 1000);
  });
  expect(getComputedStyle(element).getPropertyValue('top')).toBe('0px');
});
