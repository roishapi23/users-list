import { RouterProvider } from 'react-router-dom';
import './App.css';
import { AppRouter } from './routing/app-router';

function App() {
  return (
    <div className="App">
      <RouterProvider router={AppRouter()} />
    </div>
  );
}

export default App;
