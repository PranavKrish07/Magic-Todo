import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;