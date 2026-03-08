import axios from 'axios';
import { useBearStore } from '../store/store';
import { useQuery } from '@tanstack/react-query';

type User = {
  name: string;
  email: string;
  username: string;
  company: { [key: string]: string };
};

function getUserata() {
  // return axios.get('https://jsonplaceholder.typicode.com/users/1').then((res) => res.data as User);
  return new Promise<User>((resolve) => {
    setTimeout(() => {
      axios.get('https://jsonplaceholder.typicode.com/users/1').then((res) => resolve(res.data as User));
    }, 1000);
  });
}

export default function SecondPage() {
  const bears = useBearStore((state) => state.bears);
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  const removeAllBears = useBearStore((state) => state.removeAllBears);

  const { data, error, refetch, isFetching } = useQuery<User>({
    queryKey: ['userData'],
    queryFn: getUserata,
    // staleTime: 60 * 1000,
  });

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="relative flex flex-col gap-4 p-4">
      <h1>SecondPage</h1>
      <h2>{bears} around here ...</h2>
      <div className="flex gap-2">
        <button className="btn btn-lg btn-accent" onClick={increasePopulation}>
          one up
        </button>
        <button className="btn btn-lg btn-error " onClick={removeAllBears}>
          clear
        </button>
      </div>

      <div className="card bg-base-100 w-96 shadow-sm">
        {isFetching ? (
          <span className="p-5 loading loading-spinner text-accent"></span>
        ) : (
          <div className="card-body">
            <h2 className="card-title">{data?.username}</h2>
            <p>{data?.email}</p>
            <p>{data?.name}</p>
            <p>{data?.company?.name}</p>
            <button className="flex btn btn-lg btn-accent" onClick={() => refetch()}>
              update data
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
