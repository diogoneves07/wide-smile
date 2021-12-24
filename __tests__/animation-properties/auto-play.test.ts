import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Auto play animation property(true).', async () => {
  const element = useElement('div');
  const widthValue = getComputedStyle(element).getPropertyValue('width');

  wS(element, 0.1)('width', [0, 50]);

  await new Promise((resolve) => {
    return setTimeout(resolve, 200);
  });

  expect(widthValue).not.toBe(
    getComputedStyle(element).getPropertyValue('width')
  );
});

test('Auto play animation property(false).', async () => {
  const element = useElement('div');
  const widthValue = getComputedStyle(element).getPropertyValue('width');

  wS(element, 0.1, false)('width', [0, 50]);

  await new Promise((resolve) => {
    return setTimeout(resolve, 200);
  });

  expect(widthValue).toBe(getComputedStyle(element).getPropertyValue('width'));
});
