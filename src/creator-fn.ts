import './sauce/polyfills';
import './animation-engine/handle-visibility-change';
import NewCreatorFn from './sauce/new-creator-fn';
import CREATORS_FN_GLOBAL_PROPERTY from './sauce/creators-global-property';

/* eslint-disable @typescript-eslint/no-use-before-define */

export default NewCreatorFn(CREATORS_FN_GLOBAL_PROPERTY);
