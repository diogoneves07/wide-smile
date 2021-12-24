import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Drive animation property.', async () => {
  const element = useElement('div');
  const drive = [50, 100, 0, 50, 90];
  const widthMaxVaue = 50;
  let check = true;
  let count = 0;
  const callback = jest.fn();

  wS(element, 0.1, 5)('width', [0, widthMaxVaue], {
    drive,
  }).on('loopEnd', () => {
    const endProgress = drive[count];

    const currentWidthValue = Math.round(
      parseFloat(getComputedStyle(element).getPropertyValue('width'))
    );

    if (currentWidthValue !== (widthMaxVaue / 100) * endProgress) {
      check = false;
    }
    count += 1;
    callback();
  });

  await new Promise((resolve) => {
    return setTimeout(resolve, 1500);
  });
  expect(callback).toBeCalledTimes(5);
  expect(check).toBe(true);
});
