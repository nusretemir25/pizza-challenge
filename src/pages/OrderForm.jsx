import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Card, CardBody } from 'reactstrap';
import axios from 'axios';
import Header from '../components/Header';

const BASE_PRICE = 85.50;
const EXTRA_PRICE = 5.00;
const MAX_EXTRAS = 10;

const ingredients = [
  'Pepperoni', 'Sosis', 'Kanada Jambonu', 'Tavuk Izgara', 'Soğan', 
  'Domates', 'Mısır', 'Sucuk', 'Jalepeno', 'Sarımsak', 'Biber', 'Kabak', 'Ananas'
];

function OrderForm() {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    name: '',
    size: '',
    dough: '',
    extras: [],
    note: '',
    quantity: 1
  });
  
  const [totalPrice, setTotalPrice] = useState(BASE_PRICE);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const extrasTotal = form.extras.length * EXTRA_PRICE;
    const calculatedTotal = (BASE_PRICE + extrasTotal) * form.quantity;
    setTotalPrice(calculatedTotal);

    const nameValid = form.name.length >= 3;
    const sizeValid = form.size !== '';
    const doughValid = form.dough !== '';
    const extrasValid = form.extras.length <= MAX_EXTRAS;

    setIsValid(nameValid && sizeValid && doughValid && extrasValid);
  }, [form]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      let newExtras = [...form.extras];
      if (checked) {
        if (newExtras.length < MAX_EXTRAS) {
            newExtras.push(value);
        }
      } else {
        newExtras = newExtras.filter(item => item !== value);
      }
      setForm({ ...form, extras: newExtras });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleQuantity = (amount) => {
    if (form.quantity + amount >= 1) {
      setForm({ ...form, quantity: form.quantity + amount });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    const orderData = {
      ...form,
      pizzaName: "Position Absolute Acı Pizza",
      totalPrice: totalPrice
    };

    axios.post('https://reqres.in/api/pizza-order', orderData)
      .then((res) => {
        navigate('/siparis-onayi', { state: orderData });
      })
      .catch((err) => {
        navigate('/siparis-onayi', { state: orderData });
      });
  };

  return (
    <>
      <Header />
      
      <div className="text-white pb-5 pt-0" style={{ backgroundColor: '#CE2829' }}>
        <Container>
          <p className="mb-0 text-center" style={{fontSize: '1rem'}}>
            Anasayfa - <span className="fw-bold">Sipariş Oluştur</span>
          </p>
        </Container>
      </div>

      <Container className="pb-5 pt-4">
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <h2 className="fw-bold mb-3 fs-3">Position Absolute Acı Pizza</h2>
            <div className="d-flex align-items-center justify-content-between mb-3">
               <h3 className="fw-bold fs-2">{BASE_PRICE}₺</h3>
               <div className="text-muted">4.9 (200)</div>
            </div>
            <p className="text-muted mb-4 lh-lg">Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir.</p>
            
            <Form onSubmit={handleSubmit}>
              <FormGroup className="mb-4">
                  <Label className="fw-bold">İsim Soyisim *</Label>
                  <Input name="name" value={form.name} onChange={handleChange} minLength={3} placeholder="En az 3 karakter" className="p-3" />
              </FormGroup>

              <Row>
                <Col md={6}>
                  <Label className="fw-bold">Boyut Seç *</Label>
                  {['Küçük', 'Orta', 'Büyük'].map(s => (
                    <FormGroup check key={s} className="mb-2">
                      <Input name="size" type="radio" value={s} onChange={handleChange} checked={form.size === s} />
                      <Label check className="ms-2">{s}</Label>
                    </FormGroup>
                  ))}
                </Col>
                <Col md={6}>
                  <Label className="fw-bold">Hamur Seç *</Label>
                  <Input type="select" name="dough" value={form.dough} onChange={handleChange} className="p-2">
                    <option value="">Hamur Kalınlığı Seç</option>
                    <option value="İnce">İnce</option>
                    <option value="Normal">Normal</option>
                    <option value="Kalın">Kalın</option>
                  </Input>
                </Col>
              </Row>

              <FormGroup className="mt-5">
                <Label className="fw-bold fs-5">Ek Malzemeler</Label>
                <p className="small text-muted">En fazla 10 malzeme seçebilirsiniz. 5₺</p>
                <Row>
                  {ingredients.map(ing => (
                    <Col xs={6} md={4} key={ing} className="mb-2">
                      <FormGroup check>
                        <Input type="checkbox" name="extras" value={ing} onChange={handleChange} checked={form.extras.includes(ing)} disabled={!form.extras.includes(ing) && form.extras.length >= MAX_EXTRAS} />
                        <Label check className="ms-2 fw-bold" style={{color: '#5F5F5F'}}>{ing}</Label>
                      </FormGroup>
                    </Col>
                  ))}
                </Row>
              </FormGroup>

              <FormGroup className="mt-5">
                <Label className="fw-bold fs-5">Sipariş Notu</Label>
                <Input type="textarea" name="note" placeholder="Siparişine eklemek istediğin bir not var mı?" onChange={handleChange} className="p-3" />
              </FormGroup>

              <hr className="my-5" />

              <Row>
                  <Col md={{ size: 6, offset: 6 }}>
                      <Card className="border-0 shadow-sm" style={{backgroundColor: '#FAF7F2'}}>
                          <CardBody className="p-4">
                              <h5 className="fw-bold mb-4">Sipariş Toplamı</h5>
                              <div className="d-flex justify-content-between mb-3 fw-bold text-muted">
                                  <span>Seçimler</span>
                                  <span>{(form.extras.length * EXTRA_PRICE).toFixed(2)}₺</span>
                              </div>
                              <div className="d-flex justify-content-between text-danger fw-bold fs-5">
                                  <span>Toplam</span>
                                  <span>{totalPrice.toFixed(2)}₺</span>
                              </div>
                          </CardBody>
                      </Card>
                      <div className="d-flex mt-3">
                          <Button color="warning" onClick={() => handleQuantity(-1)} className="rounded-start py-3 fw-bold" style={{borderRadius: '5px 0 0 5px'}}>-</Button>
                          <Input value={form.quantity} className="text-center rounded-0 border-start-0 border-end-0 fw-bold" style={{width:'50px'}} readOnly />
                          <Button color="warning" onClick={() => handleQuantity(1)} className="rounded-end py-3 fw-bold" style={{borderRadius: '0 5px 5px 0'}}>+</Button>
                          <Button type="submit" color="warning" className="ms-3 flex-grow-1 fw-bold fs-5" style={{borderRadius: '5px'}} disabled={!isValid}>SİPARİŞ VER</Button>
                      </div>
                  </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default OrderForm;