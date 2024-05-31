import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Phi3 from './Phi3'
import Whisper from './Whisper'
import Home from './Home'
import Read from './Read'
import './index.css'

const rootDiv = document.getElementById('root')!;

ReactDOM.createRoot(rootDiv).render(
    <React.StrictMode>
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/phi-3" element={<Phi3 />} />
          <Route path="/read-along/whisper" element={<Whisper />} />
          <Route path="/read-along" element={<Read />} />
        </Routes>
      </div>
    </BrowserRouter>
    </React.StrictMode>
)