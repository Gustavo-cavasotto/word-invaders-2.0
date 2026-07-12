describe('World Invaders', () => {
  it('mostra a home e navega entre as telas', () => {
    cy.visit('/')
    cy.contains('ion-button', 'JOGAR').should('be.visible')

    cy.contains('ion-button', 'ARSENAL').click()
    cy.contains('ion-title', 'Arsenal').should('be.visible')
    cy.go('back')

    cy.contains('ion-button', 'CONFIGURAÇÕES').click()
    cy.contains('ion-title', 'Configurações').should('be.visible')
  })
})
