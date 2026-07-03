import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ResumeProvider } from './context/ResumeContext';
import Home from './pages/Home';
import Builder from './pages/Builder';

export default function App() {
  return (
    <ResumeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="dark"
        toastStyle={{ background: '#1e293b', border: '1px solid #334155', color: '#f1f5f9' }}
      />
    </ResumeProvider>
  );
}