import wideSmile from './src/index';
declare global {
    interface Window {
        wS: typeof wideSmile;
    }
}
export default wideSmile;
