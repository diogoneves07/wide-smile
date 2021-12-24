import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Targets animation property(Object).', async () => {
  const object = {
    myProperty: 0,
  };

  wS(object, 0.1)('myProperty', 100);

  await new Promise((resolve) => {
    return setTimeout(resolve, 300);
  });

  expect(object.myProperty).toBe('100');
});

test('Targets animation property(HTMLElement).', async () => {
  const element = useElement('div');

  wS(element, 0.1)('width', [0, 50]);

  await new Promise((resolve) => {
    return setTimeout(resolve, 300);
  });

  expect(parseFloat(getComputedStyle(element).getPropertyValue('width'))).toBe(
    50
  );
});

test('targets animation property(string).', async () => {
  const element = useElement('div');
  element.className = 'wide-smile-test';

  wS('.wide-smile-test', 0.1)('width', [0, 50]);

  await new Promise((resolve) => {
    return setTimeout(resolve, 300);
  });

  expect(parseFloat(getComputedStyle(element).getPropertyValue('width'))).toBe(
    50
  );
});
