import { registerRootComponent } from 'expo';
import Home from './app/index';
export default function App() {
  return <Home />;
}

registerRootComponent(App);
