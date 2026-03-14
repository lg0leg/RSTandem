import reactLogo from '../assets/images/react.svg';
import viteLogo from '/vite.svg';
import { getModels } from '../services/groq-models';
import { useEffect, useState } from 'react';

export default function Home() {
  const [modelsList, setModelslist] = useState<string[]>([]);

  useEffect(() => {
    getModels().then((models) => {
      console.log(models.data);
      const list = models.data.map((item) => item.id);
      // setModelslist(models.data);
      setModelslist(list);
    });
  }, []);

  return (
    <>
      <div className="flex justify-center items-center gap-2">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <h1>RS Tandem</h1>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {/* <p className="read-the-docs">Click on the Vite and React logos to learn more</p> */}

      {/* <div className="mt-10 ml-2 card w-96 bg-base-100 card-md shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Medium Card</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
          <div className="justify-end card-actions">
            <button className="btn btn-primary">Go</button>
          </div>
        </div>
      </div> */}

      <h2 className="pl-4 pt-3">
        <b>available models:</b>
      </h2>
      <ol className="list">
        {modelsList.map((model) => (
          <li className="list-row" key={model}>
            {model}
          </li>
        ))}
      </ol>
    </>
  );
}
