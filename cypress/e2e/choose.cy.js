  /*Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })*/

describe('choose_departure_and_designation', () => {
  beforeEach(()=>{
    cy.login()
  })
    it('selection_of_departure', () => {
      cy.contains('h1', 'Welcome to the Simple Travel Agency!').should('be.visible')
      cy.get('select[name="fromPort"]').select('Paris').should('have.value', 'Paris')
      
    })
    it('selection_of_destination',()=>{
      cy.get('select[name="toPort"]').select('New York')
      cy.get('input[value="Find Flights"]').click()

      //to verify that user are redirected to reservation page.
      let reservationpath= '/reserve.php';
      cy.location('pathname').should('eq', '/reserve.php')
      cy.aradhana('/reserve.php')


      cy.url().should('include',reservationpath)

      cy.get('h3').should('have.text','Flights from Paris to New York: ')
      cy.contains('h3','Flights from Paris to New York:').should('be.visible')
      cy.pause()

      //to choose the flight
      //cy.get('td').find('.btn btn-small').eq(1).click()
      //cy.get('tbody>tr>td').find('.btn btn-small').eq(1).click()
      cy.get('[value="Choose This Flight"]').eq(1).parent().parent().parent() 
      cy.pause()

      //to verify that user are redirected to purchase page.
      let purchasepath='/purchase.php';
      cy.url().should('include',purchasepath)


    })
    it('purchaseflight',()=>{
      cy.visit('/purchase.php')
      cy.get('#inputName').type('Tanjiro')
      cy.get('#address').type('Japan')
      cy.get('#city').type('Nagoya')
      cy.get('#state').type('statesss')
      cy.get('#zipCode').type(223344)
      cy.get('#cardType').select('American Express')
      cy.get('#creditCardNumber').type(111222333)
      cy.get('#creditCardMonth').type(10)
      cy.get('#creditCardYear').type(2024)
      cy.get('#nameOnCard').type("Tanjiro")
      //to check
      cy.get('[type="checkbox"]').check()
      cy.get('input[value="Purchase Flight"]').click()
      cy.contains('h1','Thank you for your purchase today!').should('be.visible')
      let confirmationpath='/confirmation.php';
      cy.url().should('include',confirmationpath)
      





    })
   

})