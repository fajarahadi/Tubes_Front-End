import './App.css';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import CallPahlawan from './components/CallPahlawan';

function App() {
  return (

    <BrowserRouter>
    <div className="App">
      <div style={{
        backgroundSize: 'cover',
        height: '970px',
        backgroundImage: `url(${require('./images/pahlawann.jpg')})`
      }}>

      <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/tubes">Japar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/tubes">Tubes</Nav.Link>
              <Nav.Link href="http://fajaruiux18.000webhostapp.com/">Portfolio</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </>
      <div>
        <Routes>
          <Route path='/tubes' element={<CallPahlawan/>}/>
        </Routes>
      </div>

      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
