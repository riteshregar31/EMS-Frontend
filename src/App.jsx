import './App.css';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import EmployeeComponent from './components/EmployeeComponent';
import LIstDepartmentComponent from './components/LIstDepartmentComponent';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <HeaderComponent />

        {/* Main content handled by routes */}
        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<ListEmployeeComponent />} />
            <Route path="/employees" element={<ListEmployeeComponent />} />
            <Route path='/add-employee' element={<EmployeeComponent/>}></Route>
            <Route path='/edit-employees/:id' element={<EmployeeComponent/>}></Route>
            <Route path='/departments' element={<LIstDepartmentComponent/>}></Route>
          </Routes>
        </main>

        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
