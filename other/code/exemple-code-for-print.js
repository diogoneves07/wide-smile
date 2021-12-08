wS().newObservedProperty('Text', (v, p, e) => {
  e.textContent = v.toString().substring(0, (v.length / 100) * p);
});

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

wS(
  'section',
  2.5
)([
  { translateX: 0, offset: [0, 1] },
  { 0: -10, offset: [0.1, 0.3, 0.5, 0.7, 0.9] },
  { 0: 10, offset: [0.2, 0.4, 0.6, 0.8] },
]);
