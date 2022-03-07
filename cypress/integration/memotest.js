//<reference types="Cypress" />

const URL = "http://127.0.0.1:5500/index.html"
context("Memotest", () => {
    const CANTIDAD_CARTAS = 40;

    before(() =>{
        cy.visit(URL);        
    })

    describe('Creacion de juego', () => {
        it ('Que inicia el juego', () => {
            cy.get('#nuevo').click();
        })
        it('La cantidad de cartas es correcta', () =>{
            cy.get('#tablero').find('.carta').should('have.length', CANTIDAD_CARTAS);
        })

        it('Que las cartas sean aletorias', () =>{
            let cartasOriginales = [];
            let cartasNuevas = [];
            
            cy.get('.carta').then( cartas =>{                
                cartas.each((i, carta) => cartasOriginales.push (carta.dataset.id));
            });
            
            cy.get('#nuevo').click();
            
            cy.get('.carta').then( cartas =>{
                cartas.each((i, carta) => cartasNuevas.push (carta.dataset.id));
            });
            
            cy.wrap(cartasOriginales).should('not.deep.equal', cartasNuevas);
        })

        it('Que el jugador 1 esta activo al inicio del juego', () => {
            cy.get('#display-p1').should('have.class', 'active')
            cy.get('#display-p2').should('not.have.class', 'active')
        })
    })
    
    describe('Que resuelve el juego', () => {
        let mapaDePares, listaDePares;
        it ('Elige combinacion incorrecta', () =>{
            cy.get('#nuevo').click();
            cy.get('.reverso').then( cartas =>{                
                mapaDePares = obtenerPares(cartas);
                listaDePares = Object.values(mapaDePares);
                let count = 0;
                cy.wait(500);
                cy.get(listaDePares[0][1]).click();
                cy.wait(150)    
                cy.get(listaDePares[1][0]).click();
                cy.wait(150)                  
                    
                
            })
            
            cy.get('.girada').should('have.length', 0);
            
        })
        it ('Que no sume puntos por combinacion incorrecta  ', () =>{            
            cy.get('#display--points-p1').should('have.text', 0);
        })
        
        it('Que cambia el jugador activo', () => {
            cy.get('#display-p2').should('have.class', 'active')
            cy.get('#display-p1').should('not.have.class', 'active')
        })

        it ('Que resuelve el juego', () =>{
            
            cy.get('.reverso').then( cartas =>{                
                
                cy.wait(500);
                listaDePares.forEach((par) =>{    
                    console.log(par[0])                
                    cy.get(par[0]).click();
                    cy.wait(150)    
                    cy.get(par[1]).click();
                    cy.wait(150)                  
                    
                })
            })
            
            cy.get('.girada').should('have.length', 40);
            
        })
        it ('Que los puntajes sean correctos', () =>{
            cy.get('#display--points-p2').should('have.text', 210);
            cy.get('#display--points-p1').should('have.text', 0);
        })
        
    })
    
    
})

function obtenerPares(cartas){
    const pares = {};

    cartas.each((i, carta) =>{
        if(pares[carta.dataset.id])
            pares[carta.dataset.id].push(carta);
        else
            pares[carta.dataset.id] = [carta];
    })
    console.log ("pares ", pares)
    return pares;

}