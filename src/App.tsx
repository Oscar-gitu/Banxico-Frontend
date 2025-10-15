import './App.css'
import Dashboard from './views/Dashboard';
import AppThemeProvider from './theme/AppTheme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
    <AppThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </AppThemeProvider>
    </> 
  )
}

export default App
