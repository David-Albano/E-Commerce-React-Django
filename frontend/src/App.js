import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import { Container } from 'react-bootstrap'

function App() {
  return (
    <header>
      <Header/>
        <main className="py-3">
          <Container>
            <h1>Welcome</h1>
            <HomeScreen />
          </Container>
        </main>
      <Footer/>
    </header>
  );
}

export default App;
