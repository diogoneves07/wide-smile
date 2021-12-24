import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('End delay animation property.', async () => {
  const element = useElement('div');
  const callback = jest.fn();
  let timeNow = 0;
  let currentTime: number = 0;

  let count = 0;
  wS(element, 0.1, 2)('left', [0, 100], {
    endDelay: 1,
  }).on('loopStart', function f() {
    if (count === 1) {
      callback();
      currentTime = new Date().getTime() - timeNow;
      this.off('loopStart', f);
    }
    timeNow = new Date().getTime();
    count += 1;
  });

  await new Promise((resolve) => {
    return setTimeout(resolve, 1500);
  });
  expect(currentTime).toBeGreaterThanOrEqual(1000);
});
