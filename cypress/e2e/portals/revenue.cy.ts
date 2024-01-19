/// <reference types="cypress" />

import { generateRandomValueWith2Decimals } from "./utils/generateRandomValueWith2Decimals"

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

    cy.getByTestId('revenue-portal').should('not.exist')
    cy.getByTestId('open-revenue-portal-button').click()
})

describe("Revenue Portal Testes e2e:", () => {
    describe("add", () => {
        describe("success", () => {
            it("log in | add new revenue for current month", () => {
                const revenue = {
                    categoria: 'Mesada',
                    valor: generateRandomValueWith2Decimals(865.32, 4000)
                }

                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId('categoria-revenue-select-input').select(revenue.categoria)
                cy.getByTestId('valor-revenue-input').clear().type(revenue.valor)
                cy.getByTestId('revenue-portal-send-request-button').click()

                // dashboard
                cy.getByTestId('revenue-portal').should('not.exist')

                cy.getByTestId('open-revenue-portal-button').click()

                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId(`delete-revenue-button-${revenue.categoria}-${revenue.valor}`).should('exist')
            })

            it("log in | add new revenue for past month month", () => {
                const revenue = {
                    categoria: 'Programação',
                    valor: generateRandomValueWith2Decimals(3499.76, 10000)
                }

                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId('revenue-portal-previous-month-button').click()
                cy.getByTestId('categoria-revenue-select-input').select(revenue.categoria)
                cy.getByTestId('valor-revenue-input').clear().type(revenue.valor)
                cy.getByTestId('revenue-portal-send-request-button').click()

                // dashboard
                cy.getByTestId('revenue-portal').should('not.exist')

                cy.getByTestId('open-revenue-portal-button').click()

                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId('revenue-portal-previous-month-button').click()
                cy.getByTestId(`delete-revenue-button-${revenue.categoria}-${revenue.valor}`).should('exist')
            })
        })

        describe("fail", () => {
            it("log in | fail to add: valor less than 0", () => {
                const revenue = {
                    categoria: "Programação",
                    valor: '-1'
                }
                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId('categoria-revenue-select-input').select(revenue.categoria)
                cy.getByTestId('valor-revenue-input').clear().type(revenue.valor)
                cy.getByTestId('revenue-portal-send-request-button').click()

                // dashboard
                cy.getByTestId('revenue-portal').should('not.exist')

                cy.getByTestId('open-revenue-portal-button').click()

                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId(`delete-revenue-button-${revenue.categoria}-${revenue.valor}`).should('not.exist')
            })

            it("log in | fail to add: valor equals 0", () => {
                const revenue = {
                    categoria: "Programação",
                    valor: '0'
                }
                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId('categoria-revenue-select-input').select(revenue.categoria)
                cy.getByTestId('valor-revenue-input').clear().type(revenue.valor)
                cy.getByTestId('revenue-portal-send-request-button').click()

                // dashboard
                cy.getByTestId('revenue-portal').should('not.exist')

                cy.getByTestId('open-revenue-portal-button').click()

                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId(`delete-revenue-button-${revenue.categoria}-${revenue.valor}`).should('not.exist')
            })
        })
    })

    describe("update", () => {
        describe("success", () => {
            it("log in | update revenue for current month", () => {
                const revenue = {
                    categoria: 'Mesada',
                    valor: generateRandomValueWith2Decimals(384.29, 1000)
                }

                // first, add a new revenue

                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId('categoria-revenue-select-input').select(revenue.categoria)
                cy.getByTestId('valor-revenue-input').clear().type(revenue.valor)
                cy.getByTestId('revenue-portal-send-request-button').click()

                // dashboard
                cy.getByTestId('revenue-portal').should('not.exist')

                cy.getByTestId('open-revenue-portal-button').click()

                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId(`delete-revenue-button-${revenue.categoria}-${revenue.valor}`).should('exist')

                // now, update it!

                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId(`edit-revenue-button-${revenue.categoria}-${revenue.valor}`).click()

                revenue.valor = generateRandomValueWith2Decimals(512.48, 1000)

                cy.getByTestId('categoria-revenue-select-input').select(revenue.categoria)
                cy.getByTestId('valor-revenue-input').clear().type(revenue.valor)
                cy.getByTestId('revenue-portal-send-request-button').click()

                // dashboard
                cy.getByTestId('revenue-portal').should('not.exist')
                cy.getByTestId('open-revenue-portal-button').click()

                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId(`edit-revenue-button-${revenue.categoria}-${revenue.valor}`).should('exist')

            })

            it("log in | update revenue for past month", () => {
                const revenue = {
                    categoria: 'Programação',
                    valor: generateRandomValueWith2Decimals(384.29, 1000)
                }

                // first, add a new revenue

                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId('revenue-portal-previous-month-button').click()

                cy.getByTestId('categoria-revenue-select-input').select(revenue.categoria)
                cy.getByTestId('valor-revenue-input').clear().type(revenue.valor)
                cy.getByTestId('revenue-portal-send-request-button').click()

                // dashboard
                cy.getByTestId('revenue-portal').should('not.exist')

                cy.getByTestId('open-revenue-portal-button').click()

                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId('revenue-portal-previous-month-button').click()
                cy.getByTestId(`edit-revenue-button-${revenue.categoria}-${revenue.valor}`).should('exist')

                // now, update it!

                // revenue portal
                cy.getByTestId(`edit-revenue-button-${revenue.categoria}-${revenue.valor}`).click()

                revenue.valor = generateRandomValueWith2Decimals(512.48, 1000)

                cy.getByTestId('categoria-revenue-select-input').select(revenue.categoria)
                cy.getByTestId('valor-revenue-input').clear().type(revenue.valor)
                cy.getByTestId('revenue-portal-send-request-button').click()

                // dashboard
                cy.getByTestId('revenue-portal').should('not.exist')
                cy.getByTestId('open-revenue-portal-button').click()

                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId('revenue-portal-previous-month-button').click()
                cy.getByTestId(`edit-revenue-button-${revenue.categoria}-${revenue.valor}`).should('exist')

            })
        })

        describe("fail", () => {
            it("log in | fail to update revenue: valor less than 0", () => {
                const revenue = {
                    categoria: 'Mesada',
                    valor: generateRandomValueWith2Decimals(384.29, 1000)
                }

                // first, add a new revenue

                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId('revenue-portal-previous-month-button').click()

                cy.getByTestId('categoria-revenue-select-input').select(revenue.categoria)
                cy.getByTestId('valor-revenue-input').clear().type(revenue.valor)
                cy.getByTestId('revenue-portal-send-request-button').click()

                // dashboard
                cy.getByTestId('revenue-portal').should('not.exist')

                cy.getByTestId('open-revenue-portal-button').click()

                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId('revenue-portal-previous-month-button').click()
                cy.getByTestId(`edit-revenue-button-${revenue.categoria}-${revenue.valor}`).should('exist')

                // now, update it!

                // revenue portal
                cy.getByTestId(`edit-revenue-button-${revenue.categoria}-${revenue.valor}`).click()

                revenue.valor = '-1'

                cy.getByTestId('categoria-revenue-select-input').select(revenue.categoria)
                cy.getByTestId('valor-revenue-input').clear().type(revenue.valor)
                cy.getByTestId('revenue-portal-send-request-button').click()

                // dashboard
                cy.getByTestId('revenue-portal').should('not.exist')
                cy.getByTestId('open-revenue-portal-button').click()

                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId('revenue-portal-previous-month-button').click()
                cy.getByTestId(`edit-revenue-button-${revenue.categoria}-${revenue.valor}`).should('not.exist')
            })

            it("log in | fail to update revenue: valor equals to 0", () => {
                const revenue = {
                    categoria: 'Programação',
                    valor: generateRandomValueWith2Decimals(384.29, 1000)
                }

                // first, add a new revenue

                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId('revenue-portal-previous-month-button').click()

                cy.getByTestId('categoria-revenue-select-input').select(revenue.categoria)
                cy.getByTestId('valor-revenue-input').clear().type(revenue.valor)
                cy.getByTestId('revenue-portal-send-request-button').click()

                // dashboard
                cy.getByTestId('revenue-portal').should('not.exist')

                cy.getByTestId('open-revenue-portal-button').click()

                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId('revenue-portal-previous-month-button').click()
                cy.getByTestId(`edit-revenue-button-${revenue.categoria}-${revenue.valor}`).should('exist')

                // now, update it!

                // revenue portal
                cy.getByTestId(`edit-revenue-button-${revenue.categoria}-${revenue.valor}`).click()

                revenue.valor = '0'

                cy.getByTestId('categoria-revenue-select-input').select(revenue.categoria)
                cy.getByTestId('valor-revenue-input').clear().type(revenue.valor)
                cy.getByTestId('revenue-portal-send-request-button').click()

                // dashboard
                cy.getByTestId('revenue-portal').should('not.exist')
                cy.getByTestId('open-revenue-portal-button').click()

                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId('revenue-portal-previous-month-button').click()
                cy.getByTestId(`edit-revenue-button-${revenue.categoria}-${revenue.valor}`).should('not.exist')
            })
        })
    })

    describe("delete", () => {
        describe("success", () => {
            it("log in | delete revenue", () => {
                const revenue = {
                    categoria: 'Mesada',
                    valor: generateRandomValueWith2Decimals(94.53, 4000)
                }

                // first, add a new revenue

                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId('categoria-revenue-select-input').select(revenue.categoria)
                cy.getByTestId('valor-revenue-input').clear().type(revenue.valor)
                cy.getByTestId('revenue-portal-send-request-button').click()

                // now, delete it!

                // dashboard
                cy.getByTestId('revenue-portal').should('not.exist')

                cy.getByTestId('open-revenue-portal-button').click()

                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId(`delete-revenue-button-${revenue.categoria}-${revenue.valor}`).click()

                // dashboard
                cy.getByTestId('revenue-portal').should('not.exist')

                cy.getByTestId('open-revenue-portal-button').click()

                // revenue portal
                cy.getByTestId('revenue-portal').should('exist')

                cy.getByTestId(`delete-revenue-button-${revenue.categoria}-${revenue.valor}`).should('not.exist')

            })
        })
    })
})

