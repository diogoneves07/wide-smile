import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Round animation property.', async () => {
  const element = useElement('div');
  let checkLeftValue = true;

  wS(element, 0.3)('left', [0, 100], {
    round: 1,
  }).on('change', () => {
    if (
      parseFloat(getComputedStyle(element).getPropertyValue('left'))
        .toString()
        .indexOf('.') > -1
    ) {
      checkLeftValue = false;
    }
  });

  await new Promise((resolve) => {
    return setTimeout(resolve, 500);
  });
  expect(checkLeftValue).toBe(true);
});
