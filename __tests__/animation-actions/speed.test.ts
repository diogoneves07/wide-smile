import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Speed animation action(Increasing).', async () => {
  const element = useElement('div');
  const callback = jest.fn();

  const performer = wS(element, 0.5)('top', [0, 300]).on('end', callback);

  setTimeout(() => {
    performer.speed(5);
  }, 200);

  await new Promise((resolve) => {
    return setTimeout(resolve, 1000);
  });
  expect(callback).toBeCalledTimes(0);
});

test('Speed animation action(Decreasing).', async () => {
  const element = useElement('div');
  const callback = jest.fn();

  const performer = wS(element, 0.5)('top', [0, 300]).on('end', callback);

  setTimeout(() => {
    performer.speed(-1);
  }, 200);

  await new Promise((resolve) => {
    return setTimeout(resolve, 1000);
  });
  expect(callback).toBeCalledTimes(1);
});
