import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('After animation structure.', async () => {
  const element = useElement('div');

  const callback = jest.fn();
  const widthValue = getComputedStyle(element).getPropertyValue('width');
  let count = 0;
  wS(
    element,
    0.1,
    3
  )('top', [0, 50])
    .on('loopEnd', function f() {
      if (count < 2) {
        if (
          widthValue !== getComputedStyle(element).getPropertyValue('width')
        ) {
          this.destroy();
        } else {
          count += 1;
          callback();
        }
      } else {
        this.off('loopEnd', f);
      }
    })
    .after(2)('width', [0, 100]);

  await new Promise((resolve) => {
    return setTimeout(resolve, 1000);
  });

  expect(widthValue).not.toBe(
    getComputedStyle(element).getPropertyValue('width')
  );
  expect(callback).toBeCalledTimes(2);
});
