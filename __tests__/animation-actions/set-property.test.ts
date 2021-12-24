import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

test('Set property animation action.', () => {
  const element = useElement('div');
  wS(element, 1).set('top', [0, 300]);
  expect(parseFloat(getComputedStyle(element).getPropertyValue('top'))).toBe(
    300
  );
});
