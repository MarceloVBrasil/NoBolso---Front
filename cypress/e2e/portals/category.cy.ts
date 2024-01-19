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

    cy.getByTestId('category-portal').should('not.exist')
    cy.getByTestId('open-category-portal-button').click()
})

describe("Category Portal e2e Tests: ", () => {
    describe("add", () => {
        describe("success", () => {
            it("log in | add gasto category", () => {
                const categoria = {
                    nome: `Teste - ${crypto.randomUUID()}`,
                    meta: '100000',
                    tipo: 'gasto',
                    userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f'
                }

                // category portal
                cy.getByTestId('category-portal').should('exist')

                cy.getByTestId('gasto-radio-button').check()
                cy.get('input[name="nova-categoria"]').type(categoria.nome)
                cy.getByTestId('meta-input').clear().type(categoria.meta)
                cy.getByTestId('categoria-portal-send-request-button').click()

                // dashboard
                cy.getByTestId('category-portal').should('not.exist')

                cy.getByTestId('open-category-portal-button').click()

                // category portal
                cy.getByTestId('category-portal').should('exist')

                cy.getByTestId(`${categoria.nome}-${categoria.meta}`).should('exist')
            })

            it("log in | add receita category", () => {
                const categoria = {
                    nome: `Teste - ${crypto.randomUUID()}`,
                    meta: '100000',
                    tipo: 'receita',
                    userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f'
                }

                // category portal
                cy.getByTestId('category-portal').should('exist')

                cy.getByTestId('receita-radio-button').check()
                cy.get('input[name="nova-categoria"]').type(categoria.nome)
                cy.getByTestId('meta-input').clear().type(categoria.meta)
                cy.getByTestId('categoria-portal-send-request-button').click()

                // dashboard
                cy.getByTestId('category-portal').should('not.exist')

                cy.getByTestId('open-category-portal-button').click()

                // category portal
                cy.getByTestId('category-portal').should('exist')

                cy.getByTestId(`${categoria.nome}-${categoria.meta}`).should('not.exist')
                cy.getByTestId(`${categoria.nome}-${0}`).should('exist')
            })
        })

        describe("fail", () => {
            it("log in | fail to add: invalid meta", () => {
                const categoria = {
                    nome: `Teste - ${crypto.randomUUID()}`,
                    meta: '-10',
                    tipo: 'gasto'
                }

                // category portal
                cy.getByTestId('category-portal').should('exist')

                cy.getByTestId('gasto-radio-button').check()
                cy.get('input[name="nova-categoria"]').type(categoria.nome)
                cy.getByTestId('meta-input').clear().type(categoria.meta)
                cy.getByTestId('categoria-portal-send-request-button').click()

                // dashboard
                cy.getByTestId('category-portal').should('not.exist')

                cy.getByTestId('open-category-portal-button').click()

                // category portal
                cy.getByTestId('category-portal').should('exist')

                cy.getByTestId(`${categoria.nome}-${categoria.meta}`).should('not.exist')
            })

            it("log in | fail to add: category name already exists", () => {
                const categoria = {
                    nome: 'Internet',
                    meta: '40000',
                    tipo: 'gasto'
                }

                // category portal
                cy.getByTestId('category-portal').should('exist')

                cy.getByTestId('gasto-radio-button').check()
                cy.get('input[name="nova-categoria"]').type(categoria.nome)
                cy.getByTestId('meta-input').clear().type(categoria.meta)
                cy.getByTestId('categoria-portal-send-request-button').click()

                // dashboard
                cy.getByTestId('category-portal').should('not.exist')

                cy.getByTestId('open-category-portal-button').click()

                // category portal
                cy.getByTestId('category-portal').should('exist')

                cy.getByTestId(`${categoria.nome}-${categoria.meta}`).should('not.exist')
            })

            it("log in | fail to add: tipo invalid", () => {
                const categoria = {
                    nome: `Teste - ${crypto.randomUUID()}`,
                    meta: '78465.82',
                    tipo: 'invalid tipo'
                }

                // category portal
                cy.getByTestId('category-portal').should('exist')

                cy.get('input[name="nova-categoria"]').type(categoria.nome)
                cy.getByTestId('meta-input').clear().type(categoria.meta)
                cy.getByTestId('categoria-portal-send-request-button').click()

                // dashboard
                cy.getByTestId('category-portal').should('not.exist')

                cy.getByTestId('open-category-portal-button').click()

                // category portal
                cy.getByTestId('category-portal').should('exist')

                cy.getByTestId(`${categoria.nome}-${categoria.meta}`).should('not.exist')
            })

        })

    })

    describe("update", () => {
        describe("sucess", () => {
            it("log in | update category", () => {
                const categoria = {
                    id: "ed4053c9-ab66-4c1a-a24b-1ad846039914",
                    nome: "Celular",
                    meta: '400',
                    tipo: "gasto",
                    userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f'
                }

                // category portal
                cy.getByTestId('category-portal').should('exist')

                cy.getByTestId('category-portal').should('exist')
                cy.getByTestId(`edit-category-button-${categoria.nome}`).click()
                cy.getByTestId('meta-input').clear().type(categoria.meta)
                cy.getByTestId('categoria-portal-send-request-button').click()

                // dashboard
                cy.getByTestId('category-portal').should('not.exist')

                cy.getByTestId('open-category-portal-button').click()

                // category portal
                cy.getByTestId('category-portal').should('exist')

                cy.getByTestId(`${categoria.nome}-${categoria.meta}`).should('exist')
            })

            describe("fail", () => {
                it("log in | fail to update: invalid meta", () => {
                    const categoria = {
                        id: "8a2b3c43-23e6-4037-a48e-9a81ffd5010c",
                        nome: "Internet",
                        meta: "-10",
                        tipo: "gasto"
                    }

                    // category portal
                    cy.getByTestId('category-portal').should('exist')
                    cy.getByTestId(`edit-category-button-${categoria.nome}`).click()
                    cy.getByTestId('meta-input').clear().type(categoria.meta)
                    cy.getByTestId('categoria-portal-send-request-button').click()

                    // dashboard
                    cy.getByTestId('category-portal').should('not.exist')

                    cy.getByTestId('open-category-portal-button').click()

                    // category portal
                    cy.getByTestId('category-portal').should('exist')

                    cy.getByTestId(`${categoria.nome}-${categoria.meta}`).should('not.exist')
                })
            })
        })
    })

    describe("delete", () => {
        describe("success", () => {
            it("log in | delete category", () => {
                const categoria = {
                    nome: `Teste - ${crypto.randomUUID()}`,
                    meta: '100000',
                    tipo: 'gasto',
                    userId: 'dfd5d673-a960-4a76-9fb2-5a71ceae796f'
                }
                // add a new category first

                // category portal
                cy.getByTestId('category-portal').should('exist')

                cy.getByTestId('gasto-radio-button').check()
                cy.get('input[name="nova-categoria"]').type(categoria.nome)
                cy.getByTestId('meta-input').clear().type(categoria.meta)
                cy.getByTestId('categoria-portal-send-request-button').click()

                // now, delete it!

                // dashboard
                cy.getByTestId('category-portal').should('not.exist')

                cy.getByTestId('open-category-portal-button').click()

                // category portal
                cy.getByTestId('category-portal').should('exist')

                cy.getByTestId(`delete-category-button-${categoria.nome}`).scrollIntoView().wait(800).click()

                // dashboard
                cy.getByTestId('category-portal').should('not.exist')

                cy.getByTestId('open-category-portal-button').click()

                // category portal
                cy.getByTestId('category-portal').should('exist')

                cy.getByTestId(`${categoria.nome}-${categoria.meta}`).should('not.exist')
            })
        })
    })
})