import { ListenersEventsName } from '../../src/contracts/listeners-events-name';
import wS from '../../src/creator-fn';
import useElement from '../utilities-for-testing/use-element';

function eventMustTriggersOnlyOnce(eventName: ListenersEventsName) {
  const element = useElement('div');

  let callback = jest.fn();

  wS(
    element,
    0.1,
    2
  )('top', [0, 300]).on(eventName, function eventCallback() {
    callback();
    this.off(eventName, eventCallback);
  });

  return callback;
}

function eventShouldNotTrigger(eventName: ListenersEventsName) {
  const element = useElement('div');

  let callback = jest.fn();

  wS(element, 0.1, 1)('top', [0, 300])
    .on(eventName, callback)
    .off(eventName, callback);

  return callback;
}

function callMethodBeforeAndEventShouldNotTrigger(
  eventName: ListenersEventsName
) {
  const element = useElement('div');

  let callback = jest.fn();

  const performer = wS(element, 0.2, 1)('top', [0, 300])
    .on(eventName, callback)
    .off(eventName, callback);

  switch (eventName) {
    case 'cancel':
      performer.cancel();
      break;
    case 'destroy':
      performer.destroy();
      break;

    default:
      break;
  }

  return callback;
}

test('Off animation event loopStart.', async () => {
  const c = eventMustTriggersOnlyOnce('loopStart');
  await new Promise((resolve) => {
    return setTimeout(resolve, 300);
  });
  expect(c).toBeCalledTimes(1);
});

test('Off animation event loopEnd.', async () => {
  const c = eventMustTriggersOnlyOnce('loopEnd');
  await new Promise((resolve) => {
    return setTimeout(resolve, 300);
  });
  expect(c).toBeCalledTimes(1);
});

test('Off animation event change.', async () => {
  const c = eventMustTriggersOnlyOnce('change');
  await new Promise((resolve) => {
    return setTimeout(resolve, 300);
  });
  expect(c).toBeCalledTimes(1);
});

test('Off animation event end.', async () => {
  const c = eventShouldNotTrigger('end');
  await new Promise((resolve) => {
    return setTimeout(resolve, 300);
  });
  expect(c).toBeCalledTimes(0);
});

test('Off animation event start.', async () => {
  const c = eventShouldNotTrigger('start');
  await new Promise((resolve) => {
    return setTimeout(resolve, 300);
  });
  expect(c).toBeCalledTimes(0);
});

test('Off animation event load.', async () => {
  const c = eventShouldNotTrigger('load');
  await new Promise((resolve) => {
    return setTimeout(resolve, 300);
  });
  expect(c).toBeCalledTimes(0);
});

test('Off animation event ready.', async () => {
  const c = eventShouldNotTrigger('ready');
  await new Promise((resolve) => {
    return setTimeout(resolve, 300);
  });
  expect(c).toBeCalledTimes(0);
});

test('Off animation event play.', async () => {
  const c = eventShouldNotTrigger('play');
  await new Promise((resolve) => {
    return setTimeout(resolve, 300);
  });
  expect(c).toBeCalledTimes(0);
});

test('Off animation event cancel.', async () => {
  const c = callMethodBeforeAndEventShouldNotTrigger('cancel');
  await new Promise((resolve) => {
    return setTimeout(resolve, 300);
  });
  expect(c).toBeCalledTimes(0);
});

test('Off animation event destroy.', async () => {
  const c = callMethodBeforeAndEventShouldNotTrigger('destroy');
  await new Promise((resolve) => {
    return setTimeout(resolve, 300);
  });
  expect(c).toBeCalledTimes(0);
});
