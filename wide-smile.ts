/*
  # wide-smile (C) 2021, Diogo Neves. 

  # Licensed under the MIT license. See LICENSE file in the project root for details.
  ___________________________________________________________________________________
  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
  *                                                                                 *
  * Thanks to everyone who supported the project directly and indirectly.           *
  *                                                                                 *
  * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/

import wideSmile from './src/creator-fn';

declare global {
  interface Window {
    wS: typeof wideSmile;
  }
}
export default wideSmile;
