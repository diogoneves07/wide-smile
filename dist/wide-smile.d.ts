import wideSmile from './src/creator-fn';
declare global {
    interface Window {
        wS: typeof wideSmile;
    }
}
export default wideSmile;
