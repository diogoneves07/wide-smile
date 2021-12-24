import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Get property animation action.', async () => {
  const element = useElement('div');
  const performer = wS(element, 1)('top', [0, 300]);

  let topValue = '';

  setTimeout(() => {
    const values = performer.get('top');
    if (values) {
      topValue = values.value as string;
    }
  }, 500);

  await new Promise((resolve) => {
    return setTimeout(resolve, 1500);
  });

  expect(parseFloat(topValue)).toBeLessThanOrEqual(200);
});
