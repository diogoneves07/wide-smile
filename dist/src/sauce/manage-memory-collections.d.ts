/**
 * Is sent to a memory that is maintained to prevent the garbage collector from occupy thread for long periods.
 */
export declare function sendToGarbageCollector(...objectOrArray: object[]): void;
/**
 * Removes the few elements of the array that keeps references to objects that are no longer in use.
 */
export declare function releasesGarbageFromAnimations(): void;
