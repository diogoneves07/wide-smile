import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Dir animation property("normal").', async () => {
  const element = useElement('div');

  wS(element, 0.1)('left', [0, 100]);

  await new Promise((resolve) => {
    return setTimeout(resolve, 400);
  });

  expect(parseFloat(getComputedStyle(element).getPropertyValue('left'))).toBe(
    100
  );
});

test('Dir animation property("reverse").', async () => {
  const element = useElement('div');

  wS(element, 0.1)('left', [0, 100], 'reverse');

  await new Promise((resolve) => {
    return setTimeout(resolve, 200);
  });

  expect(parseFloat(getComputedStyle(element).getPropertyValue('left'))).toBe(
    0
  );
});

test('Dir animation property("alternate").', async () => {
  const element = useElement('div');

  wS(element, 0.1)('left', [0, 100], 'alternate');

  await new Promise((resolve) => {
    return setTimeout(resolve, 400);
  });

  expect(parseFloat(getComputedStyle(element).getPropertyValue('left'))).toBe(
    0
  );
});

test('Dir animation property("alternate-reverse").', async () => {
  const element = useElement('div');

  wS(element, 0.1)('left', [0, 100], 'alternate-reverse');

  await new Promise((resolve) => {
    return setTimeout(resolve, 400);
  });

  expect(parseFloat(getComputedStyle(element).getPropertyValue('left'))).toBe(
    100
  );
});
