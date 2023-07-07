import { Route, Routes } from 'react-router-dom';
import Room from './pages/room';
import Home from './pages/home';

export default function App() {
  return (
    <div>
      {/* Other components and routes */}
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/room/:roomId" element={<Room/>}></Route>
        {/* Other routes */}
      </Routes>
    </div>
  );
}


