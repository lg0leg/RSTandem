import reactLogo from '../assets/images/react.svg';
import viteLogo from '/vite.svg';

export default function Home() {
  return (
    <>
      <div className="flex gap-2">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>RS Tandem</h1>

      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>

      <div className="mt-10 ml-2 card w-96 bg-base-100 card-md shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Medium Card</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
          <div className="justify-end card-actions">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </>
  );
}
