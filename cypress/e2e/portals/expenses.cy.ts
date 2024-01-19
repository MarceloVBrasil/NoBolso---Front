/// <reference types="cypress" />

beforeEach(() => {
    // home page
    cy.visit('/')

    cy.contains("a", 'Comece aqui').click()

    // login page
    cy.url().should('contain', '/login')

    cy.get('input[name=email]').type('marcelo.vital.brasil@gmail.com')
    cy.get('input[name=senha]').type('123')
    cy.get('button').click()
    cy.wait(100)

    // dashboard
    cy.url().should('contain', '/dashboard')

    cy.getByTestId('expenses-portal').should('not.exist')
    cy.getByTestId('open-expenses-portal-button').click()
})

describe("Expenses Portal Testes e2e:", () => {
    describe("add", () => {
        describe("success", () => {
            it("log in | add new gasto for current month", () => {
                const expense = {
                    categoria: 'Aluguel',
                    valor: generateRandomValueWith2Decimals(384.29, 1000)
                }

                // expenses portal
                cy.getByTestId('expenses-portal').should('exist')

                cy.getByTestId('categoria-gasto-select-input').select(expense.categoria)
                cy.getByTestId('valor-gasto-input').type(expense.valor)
                cy.getByTestId('expenses-portal-send-request-button').click()

                // dashboard
                cy.getByTestId('expenses-portal').should('not.exist')

                cy.getByTestId('open-expenses-portal-button').click()

                // expenses portal
                cy.getByTestId('expenses-portal').should('exist')

                cy.getByTestId(`delete-expenses-button-${expense.categoria}-${expense.valor}`).should('exist')
            })

            it("log in | add new gasto for past month month", () => {
                const expense = {
                    categoria: 'Supermercado',
                    valor: generateRandomValueWith2Decimals(34.99, 100)
                }

                // expenses portal
                cy.getByTestId('expenses-portal').should('exist')

                cy.getByTestId('gasto-portal-previous-month-button').click()
                cy.getByTestId('categoria-gasto-select-input').select(expense.categoria)
                cy.getByTestId('valor-gasto-input').type(expense.valor)
                cy.getByTestId('expenses-portal-send-request-button').click()

                // dashboard
                cy.getByTestId('expenses-portal').should('not.exist')

                cy.getByTestId('open-expenses-portal-button').click()

                // expenses portal
                cy.getByTestId('expenses-portal').should('exist')

                cy.getByTestId('gasto-portal-previous-month-button').click()
                cy.getByTestId(`delete-expenses-button-${expense.categoria}-${expense.valor}`).should('exist')
            })
        })

        describe("fail", () => {
            it("log in | fail to add: valor less than 0", () => {
                const expense = {
                    categoria: "Saúde",
                    valor: '-1'
                }
                // expenses portal
                cy.getByTestId('expenses-portal').should('exist')

                cy.getByTestId('categoria-gasto-select-input').select(expense.categoria)
                cy.getByTestId('valor-gasto-input').type(expense.valor)
                cy.getByTestId('expenses-portal-send-request-button').click()

                // dashboard
                cy.getByTestId('expenses-portal').should('not.exist')

                cy.getByTestId('open-expenses-portal-button').click()

                // expenses portal
                cy.getByTestId('expenses-portal').should('exist')

                cy.getByTestId(`delete-expenses-button-${expense.categoria}-${expense.valor}`).should('not.exist')
            })

            it("log in | fail to add: valor equals 0", () => {
                const expense = {
                    categoria: "Saúde",
                    valor: '0'
                }
                // expenses portal
                cy.getByTestId('expenses-portal').should('exist')

                cy.getByTestId('categoria-gasto-select-input').select(expense.categoria)
                cy.getByTestId('valor-gasto-input').type(expense.valor)
                cy.getByTestId('expenses-portal-send-request-button').click()

                // dashboard
                cy.getByTestId('expenses-portal').should('not.exist')

                cy.getByTestId('open-expenses-portal-button').click()

                // expenses portal
                cy.getByTestId('expenses-portal').should('exist')

                cy.getByTestId(`delete-expenses-button-${expense.categoria}-${expense.valor}`).should('not.exist')
            })
        })
    })

    describe("update", () => {
        describe("success", () => {

        })

        describe("fail", () => {

        })
    })

    describe("delete", () => {
        describe("success", () => {
            it("log in | delete gasto", () => {
                const expense = {
                    categoria: 'Aluguel',
                    valor: generateRandomValueWith2Decimals(123.45, 1000)
                }

                // first, add a new expense

                // expenses portal
                cy.getByTestId('expenses-portal').should('exist')

                cy.getByTestId('categoria-gasto-select-input').select(expense.categoria)
                cy.getByTestId('valor-gasto-input').type(expense.valor)
                cy.getByTestId('expenses-portal-send-request-button').click()

                // now, delete it!

                // dashboard
                cy.getByTestId('expenses-portal').should('not.exist')

                cy.getByTestId('open-expenses-portal-button').click()

                // expenses portal
                cy.getByTestId('expenses-portal').should('exist')

                cy.getByTestId(`delete-expenses-button-${expense.categoria}-${expense.valor}`).click()

                // dashboard
                cy.getByTestId('expenses-portal').should('not.exist')

                cy.getByTestId('open-expenses-portal-button').click()

                // expenses portal
                cy.getByTestId('expenses-portal').should('exist')

                cy.getByTestId(`delete-expenses-button-${expense.categoria}-${expense.valor}`).should('not.exist')

            })
        })
    })
})

function generateRandomValueWith2Decimals(seed: number, range: number) {
    return (seed + Math.random() * range).toFixed(1) + '5'
}