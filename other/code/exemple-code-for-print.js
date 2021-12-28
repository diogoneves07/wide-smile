wS().newObservedProperty(
  'Text',
  (v, p, e) => (e.textContent = v.substring(0, (v.length / 100) * p))
);

wS('div', 1, 'easeOutInSine', {
  delay: '0.1 <>',
})
  .cycle('alternate')
  ._('backgroundColor', 'red')
  .after(1)('height_width', 200, 'easeInBounce')
  ._(0, 'blue')
  ._({
    Text: ['...', 'Hello world... Master!!!'],
    fontSize: 50,
  });
