import './App.css';
import FooterComponent from './components/FooterComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <HeaderComponent />

      {/* Main content */}
      <main className="flex-fill">
        <ListEmployeeComponent />
      </main>

      <FooterComponent />
    </div>
  );
}

export default App;
