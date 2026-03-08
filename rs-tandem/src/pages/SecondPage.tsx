import { useBearStore } from '../store/store';

export default function SecondPage() {
  const bears = useBearStore((state) => state.bears);
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  const removeAllBears = useBearStore((state) => state.removeAllBears);

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1>SecondPage</h1>
      <h2>{bears} around here ...</h2>
      <div className="flex gap-2">
        <button onClick={increasePopulation}>one up</button>
        <button onClick={removeAllBears}>clear</button>
      </div>
    </div>
  );
}
