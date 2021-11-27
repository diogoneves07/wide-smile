import { debugNormal } from './wide-smile-debug';
import customForIn from '../utilities/custom-for-in';
import hasOwnProperty from '../utilities/has-own-property';
import CreateSpecialPropertyCallbackfn from '../contracts/create-special-property-callbackfn';
import CreateObserverPropertyCallbackfn from '../contracts/create-observer-property-callbackfn';

type CustomProperties = 'special' | 'observed';

export const CUSTOM_SPECIAL_PROPERTIES: Record<
  string,
  CreateSpecialPropertyCallbackfn
> = {};

export const OBSERVER_PROPERTIES: Record<
  string,
  CreateObserverPropertyCallbackfn
> = {};

function getObject(type: CustomProperties) {
  switch (type) {
    case 'observed':
      return OBSERVER_PROPERTIES;

    default:
      return CUSTOM_SPECIAL_PROPERTIES;
  }
}
export function createCustomProperty(
  propertyOrProperties:
    | string
    | Record<
        string,
        CreateSpecialPropertyCallbackfn | CreateObserverPropertyCallbackfn
      >,
  callbackfn:
    | CreateSpecialPropertyCallbackfn
    | CreateObserverPropertyCallbackfn
    | undefined,
  type: CustomProperties
): void {
  const object = getObject(type);

  const debugHelper = (() => {
    if (
      typeof propertyOrProperties === 'string' &&
      hasOwnProperty(object, propertyOrProperties)
    ) {
      return propertyOrProperties;
    }
    let p = '';
    customForIn(propertyOrProperties, (_propertyValue, propertyName) => {
      if (hasOwnProperty(object, propertyName)) {
        p = propertyName;
        return true;
      }
      return false;
    });
    return p;
  })();
  debugNormal(
    'createProperty Method',
    `There's already a property with that name "${debugHelper}" on it.`,
    () => {
      return !!debugHelper;
    }
  );
  if (typeof propertyOrProperties === 'object') {
    Object.assign(object, propertyOrProperties);
  } else {
    object[
      propertyOrProperties
    ] = callbackfn as CreateSpecialPropertyCallbackfn;
  }
}

export function removeCustomProperty(
  names: string[],
  type: CustomProperties
): void {
  const object = getObject(type);
  names.forEach((name) => {
    delete object[name];
  });
}

export function getCustomProperty(
  name: string,
  type: 'special'
): CreateSpecialPropertyCallbackfn;

export function getCustomProperty(
  name: string,
  type: 'observed'
): CreateObserverPropertyCallbackfn;

export function getCustomProperty(
  name: string,
  type: CustomProperties
): unknown {
  const object = getObject(type);
  if (hasOwnProperty(object, name)) {
    return object[name];
  }
  return false;
}
