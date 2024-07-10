import { Outlet } from 'react-router-dom';
function App() {
  return (
    <div>
      <div className="text-3xl font-bold underline">Welcome to Deep Valley</div>
      <Outlet />
    </div>
  );
}

export default App;
