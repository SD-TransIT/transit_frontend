import './styles/global.css';
import { Header } from './components/header/Header';
import { RoutesConfig } from './routes/RoutesConfig';

function App() {
  return (
    <div className="bg-transit-grey w-screen h-screen">
      <Header />
      <RoutesConfig />
    </div>
  );
}

export default App;
