import { Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section
      className="d-flex flex-column align-items-center text-center"
      style={{
        height: '100vh',
        width: '100vw',
     
        backgroundImage: 'url("https://raw.githubusercontent.com/nusretemir25/pizza-challenge/main/images/iteration-1-images/home-banner.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundColor: '#CE2829',
        paddingTop: '50px', 
        overflowX: 'hidden'
      }}
    >
      <Container className="d-flex flex-column align-items-center">
        
        
        <h1 className="text-white mb-5" style={{
            fontFamily: 'Roboto Condensed, sans-serif',
            fontWeight: '700', 
            fontSize: '40px',
            marginTop: '20px'
        }}>
          Teknolojik Yemekler
        </h1>

        
        <div style={{ marginTop: '10px' }}>
            <p className="text-white mb-0" style={{ 
                fontFamily: 'Roboto Condensed, sans-serif', 
                fontSize: '75px', 
                fontWeight: '300', 
                lineHeight: '0.85',
                letterSpacing: '1px'
            }}>
              KOD ACIKTIRIR
            </p>
            <p className="text-white mb-5" style={{ 
                fontFamily: 'Roboto Condensed, sans-serif', 
                fontSize: '75px', 
                fontWeight: '300', 
                lineHeight: '1',
                letterSpacing: '1px'
            }}>
              PİZZA, DOYURUR
            </p>
            
            <Button
              tag={Link}
              to="/siparis-formu"
              color="warning"
              size="lg"
              className="rounded-pill px-5 py-3 fs-5 fw-bold"
              style={{ 
                minWidth: '200px',
                fontFamily: 'Barlow, sans-serif'
              }}
            >
              ACIKTIM
            </Button>
        </div>
      </Container>
    </section>
  );
}

export default Home;