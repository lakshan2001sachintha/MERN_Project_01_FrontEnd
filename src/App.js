import logo from './logo.svg';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';


function App() {

  const navigate = useNavigate();

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
           <h1>Welcome to User__Management__System</h1>
           <button className='user-button' onClick={ () => navigate('/users')}>_Enter Here_</button>
      </header>
    </div>
  );

}

export default App;
