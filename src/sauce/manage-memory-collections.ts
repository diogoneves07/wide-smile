/* eslint-disable prefer-rest-params */

const REFERENCES_TO_USELESS_OBJECTS: object[] = [];

/**
 * Is sent to a memory that is maintained to prevent the garbage collector from occupy thread for long periods.
 */
export function sendToGarbageCollector(...u: unknown[]): void {
  REFERENCES_TO_USELESS_OBJECTS.push(u);
}

let setTimeoutId: undefined | number;

/**
 * Removes the few elements of the array that keeps references to objects that are no longer in use.
 */
export function releasesGarbageFromAnimations(): void {
  if (REFERENCES_TO_USELESS_OBJECTS.length > 0) {
    clearTimeout(setTimeoutId);
    setTimeoutId = (setTimeout(() => {
      releasesGarbageFromAnimations();
    }, 400) as unknown) as number;

    REFERENCES_TO_USELESS_OBJECTS.splice(
      0,
      Math.max(1, Math.floor((REFERENCES_TO_USELESS_OBJECTS.length / 100) * 50))
    );
  }
}
