import { Container } from 'reactstrap';
import { useLocation } from 'react-router-dom';

function OrderConfirmation() {
  const location = useLocation();
  const order = location.state;

  return (
  
    <div 
      className="d-flex flex-column justify-content-center align-items-center vh-100 text-center text-white" 
      style={{ 
        backgroundColor: '#CE2829',
        marginTop: '-80px' 
      }}
    >
      <Container>
        
         <div style={{ 
             fontFamily: 'Roboto Condensed, sans-serif', 
             fontWeight: '300', 
             fontSize: '50px',
             lineHeight: '1.2'
         }}>
             <p className="mb-0">
               TEBRİKLER!
             </p>
             <p className="mb-0">
               SİPARİŞİNİZ ALINDI!
             </p>
         </div>
         
        
         {order && (
            <div className="mt-5 text-white">
                <p className="fs-4 fw-bold">Ürün: {order.pizzaName}</p>
                <div className="fs-5">
                    <span className="me-3">Boyut: {order.size}</span>
                    <span>Hamur: {order.dough}</span>
                </div>
                <p className="fs-5 mt-2">Ekstralar: {order.extras.join(', ') || 'Yok'}</p>
                <p className="fs-3 fw-bold mt-4" style={{fontFamily: 'Barlow'}}>
                    Toplam Tutar: {order.totalPrice}₺
                </p>
            </div>
         )}
      </Container>
    </div>
  );
}

export default OrderConfirmation;