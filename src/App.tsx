import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
// import { Post } from './models';
// import { mapPostsDtoModel, PostDtoApi } from './mappers';
// import { apiMakeRequest } from './api';
// import { useAsyncRequest } from './hooks/useAsyncRequest';

function App() {
  const [count, setCount] = useState(0);
  // const [limit, setLimit] = useState(10);

  // const { data, loading, error, refetch } = useAsyncRequest<Post[]>(
  //   async (signal) => {
  //     const res = await apiMakeRequest<PostDtoApi[]>({
  //       method: 'GET',
  //       url: '/posts',
  //       signal,
  //     });

  //     return mapPostsDtoModel(res);
  //   },
  //   [limit],
  // );
  // const posts = data?.slice(0, limit);
  // console.log('REQ POST: ', !loading ? posts : 'loading');

  return (
    <>
      <div>
        <button type="button" onClick={() => setLimit((prev) => prev + 10)}>
          load more{' '}
        </button>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
