import { registerRootComponent } from 'expo';
import Home from './app/home';
export default function App() {
  return <Home />;
}

registerRootComponent(App);
