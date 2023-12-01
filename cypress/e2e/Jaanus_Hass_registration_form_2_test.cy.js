beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    // 1. Passwords should match in order to submit the page:


    // Declaring testing data

    const username = 'Jaanus123'
    const name = 'Jaanus'
    const lastname = 'Hass'
    const myEmail = 'jaanustest@test.ee'
    const myPhone = '12345678'
    const password = 'Password123'
    const confirm = 'Password123'
    const differentPass = 'Password456'


    it.only('User can use only same both first and validation passwords', () => {

        // Add test steps for filling in only mandatory fields
        cy.get('#username').type(username)
        cy.get('#email').type(myEmail)
        cy.get('[data-cy="name"]').type(name)
        cy.get('#lastName').type(lastname)
        cy.get('[data-testid="phoneNumberTestId"]').type(myPhone)

        // Type confirmation password which is different from first password
        cy.get('#confirm').type(differentPass)
        cy.get('#password').type(password)

        // Assert that submit button is not enabled
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('not.be.enabled')

        // Assert that successful message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Assert that error message is visible
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')

        //Change the test so, that now there are the same values in the password and confirmation password input fields

        cy.get('#confirm').clear().type(confirm)

        // Assert that the error message is not visible anymore and the submit button is enabled
        cy.get('h2').contains('Password').click()
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('.submit_button').should('be.enabled')
        
        

    })


    //2. User can submit form with all fields added + Validation


    it('User can submit form with all fields added + Validation', () => {


        // Add test steps for filling in ALL fields
        inputValidData('johnDoe')
        cy.get('[name="fav_language"][value="CSS"]').check();
        cy.get('[name="vehicle2"][value="Car"]').check();
        cy.get('#vehicle2').check();
        cy.get('#cars').select('Saab');
        cy.get('#animal').select('Cat');

        // Assert that submit button is enabled
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // Assert that after submitting the form system show successful message
        cy.get('#success_message').should('to.be.visible')
        cy.get('#password_error_message').should('not.be.visible')

    })


    //3. User can submit form with valid data and only mandatory fields added + Validation

    it('User can submit form with valid data and only mandatory fields added + Validation', () => {

        // Add test steps for filling in ONLY mandatory fields
        inputValidData('johnDoe')


        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // Assert that after submitting the form system shows successful message
        cy.get('#success_message').should('to.be.visible')
        cy.get('#password_error_message').should('not.be.visible')

    })



    // 4. User cant submit the Registration form when Username and Phone Number are not present

    it('The user is unable to submit the form if certain required fields are left blank.', () => {

        // Add test steps for filling in ONLY mandatory fields
        inputValidData('johnDoe')

        //Clear Username & Phone number fields
        cy.get('#username').clear()
        cy.get('[data-testid="phoneNumberTestId"]').clear()

        //// Assert that submit button is not enabled
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('not.be.enabled')

        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
    })

})


/*
    Assignement 5: create more visual tests
*/


describe('Section 2: Visual tests', () => {


    // 2. Teest to checking the second picture


    it('My test for second picture', () => {

        cy.log('Will check logo2 source and size')
        cy.get('img').eq(1).should('have.attr', 'src').should('include', 'cypress_logo')

        // get element and check its parameter height, to less than 89 and greater than 70
        cy.get('img').eq(1).invoke('height').should('be.lessThan', 89)
            .and('be.greaterThan', 70)

        // get element and check its parameter width, to less than 117 and greater than 90      
        cy.get('img').eq(1).invoke('width').should('be.lessThan', 117)
            .and('be.greaterThan', 90)

    });


    //3. Checking the second link Registration form 3 

    it('Check navigation part', () => {

        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')

        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()

        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_3.html')

        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })


    //4. Check that the list of checkboxes is correct.


    it('Check that checkbox list is correct', () => {

        // Array of found elements with given selector has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)

        //Verify default state of checkbox buttons
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        // Verify labels of the checkbox buttons
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat')


        // Marking the first checkbox as checked and assert its state
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        // Marking the second checkbox as checked (first checkbox will also stay checked) and assert both checkboxes state
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

    })


    // 5. Check that the dropdown of favorite animals is correct.

    it('Check that the dropdown of favorite animals is correct', () => {

        cy.get('#animal').select(1).screenshot('Animals drop-down')
        cy.screenshot('Full page screenshot')

        // Length of array of elements in Animals dropdown

        cy.get('#animal').children().should('have.length', 6)

        // Advanced level how to check the content of the Animals dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])

            //!!!Value name for the horse is different in HTML. Should be horse instead of mouse!!!
        })
    })

})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}