import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <div className="text-3xl font-bold underline">Welcome to Deep Valley</div>
      김치찌개를 좋아해
      <Outlet />
    </div>
  );
}

export default App;
