import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Reset animation property(true).', async () => {
  const element = useElement('div');
  const widthValue = getComputedStyle(element).getPropertyValue('width');

  wS(element, 0.1)('width', 50, {
    reset: true,
  });

  await new Promise((resolve) => {
    return setTimeout(resolve, 1000);
  });

  expect(getComputedStyle(element).getPropertyValue('width')).toBe(widthValue);
});

test('Reset animation property(false).', async () => {
  const element = useElement('div');

  wS(element, 0.1)('width', [0, 50], {
    reset: false,
  });

  await new Promise((resolve) => {
    return setTimeout(resolve, 1000);
  });
  expect(parseFloat(getComputedStyle(element).getPropertyValue('width'))).toBe(
    50
  );
});
