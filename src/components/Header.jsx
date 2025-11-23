import { Navbar, NavbarBrand, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <Navbar style={{ backgroundColor: '#CE2829' }} dark expand="md" className="pt-4 pb-0">
        <Container className="d-flex justify-content-center">
            <NavbarBrand 
              tag={Link} 
              to="/" 
              className="text-white mb-0" 
              style={{ 
                fontFamily: 'Roboto Condensed, sans-serif', 
                fontWeight: '700', 
                fontSize: '2.5rem', 
                letterSpacing: '1px'
              }}
            >
              Teknolojik Yemekler
            </NavbarBrand>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;