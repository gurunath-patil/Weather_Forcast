import React from 'react'
import ReactDOM from 'react-dom/client'
import AppUI from './app'
import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import WeatherForecast from '@/components/WeatherForecast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AppUI />}>
        <Route index element={<WeatherForecast day={'today'} />} />
        <Route path='tomorrow' element={<WeatherForecast day={'tomorrow'} />} />
        <Route path='dayAfterTomorrow' element={<WeatherForecast day={'dayAfterTomorrow'} />} />
      </Route>
    </Routes>
  </BrowserRouter>
)



