import PerformerFn from '../contracts/performer-fn';

export default function removeReferenceInCreatorToPerformer(
  performerFn: PerformerFn
): void {
  const performer = performerFn;

  if (performer.$hidden.animationInstances.length === 0) {
    const index = performer.creator.performers.indexOf(performer);
    if (index > -1) {
      performer.creator.performers.splice(index, 1);
      performer.$hidden.removedFromTheCreator = true;
    }
  }
}
