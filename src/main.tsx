import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Phi3 from './Phi3'
import Whisper from './Whisper'
import Home from './Home'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/phi-3" element={<Phi3 />} />
          <Route path="/whisper" element={<Whisper />} />
        </Routes>
      </div>
    </BrowserRouter>
    </React.StrictMode>
)