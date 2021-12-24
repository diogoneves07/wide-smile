import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Resume animation action.', async () => {
  const element = useElement('div');

  const performer = wS(element, 2)('top', [0, 300]);

  let topValue: string = '';
  setTimeout(() => {
    topValue = getComputedStyle(element).getPropertyValue('top');
    performer.pause();
  }, 200);

  setTimeout(() => {
    performer.resume();
  }, 300);

  await new Promise((resolve) => {
    return setTimeout(resolve, 600);
  });
  expect(getComputedStyle(element).getPropertyValue('top')).not.toBe(topValue);
});
