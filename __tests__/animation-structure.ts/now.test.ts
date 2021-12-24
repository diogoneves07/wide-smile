import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Now animation structure.', () => {
  const element = useElement('div');

  wS(element, 1)('top', [100, 50]).now();

  expect(parseFloat(getComputedStyle(element).getPropertyValue('top'))).toBe(
    100
  );
});
