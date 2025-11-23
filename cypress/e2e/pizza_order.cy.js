describe('Pizza Sipariş Testi', () => {
  beforeEach(() => {
    // Projenin çalıştığı adres
    cy.visit('http://localhost:5173/siparis-formu');
  });

  it('Metin girilebiliyor mu?', () => {
    // İsim alanına yazı yaz
    cy.get('input[name="name"]').type('Test Kullanıcısı').should('have.value', 'Test Kullanıcısı');
  });

  it('Malzeme seçilebiliyor mu?', () => {
    // İlk malzemeyi seç
    cy.get('input[type="checkbox"]').first().check().should('be.checked');
  });

  it('Formu doldurup gönderince onay sayfasına gidiyor mu?', () => {
    // 1. İsim Gir
    cy.get('input[name="name"]').type('Cypress Test');
    
    // 2. Boyut Seç (İlk radyo butonu)
    cy.get('input[name="size"]').first().check({force: true});
    
    // 3. Hamur Seç (Dropdown'dan 'Kalın' seç)
    cy.get('select[name="dough"]').select('Kalın');

    // 4. Sipariş Ver butonuna tıkla
    cy.get('button[type="submit"]').click();

    // 5. Adres değişti mi kontrol et
    cy.url().should('include', '/siparis-onayi');
  });
});