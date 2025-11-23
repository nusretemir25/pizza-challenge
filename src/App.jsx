import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OrderForm from './pages/OrderForm';
import OrderConfirmation from './pages/OrderConfirmation';
import './index.css';

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/siparis-formu" element={<OrderForm />} />
          <Route path="/siparis-onayi" element={<OrderConfirmation />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
