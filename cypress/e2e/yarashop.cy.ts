/// <reference types="cypress" />

import { last } from "cypress/types/lodash"

const user = {nombreCompleto:"Hermelida Leiva", correo: 'hermalinda.leiva@gmail.com', telefono: "999999999", password: '141232'}
const userNew = {nombreCompleto:"Hermelinda Levan", correo: 'hermalindaLevan@gmail.com'}

describe('Yarashop', () => {
  it('Successfully loads', () => {
    cy.visit('/')
  })

  it('Registrar usuario', () => {
    cy.get('.itemsMenu > .btn2').click();
    cy.get('#name').type(user.nombreCompleto);
    cy.get('#email').type(user.correo);
    cy.get('#telefono').type(user.telefono);

    cy.get('.btn1.r1 > .button-text').click();

    cy.get('#direccion').type("Avenida los girasoles 123");
    cy.get('#pais').type("Perú");
    cy.get('#pswd').type(user.password);
    cy.get('#confirmoContra').type(user.password);
    cy.get('.btn1.r2 > .button-text').click();
    cy.get('#susc').type("FREE");
    cy.get('#razonSocial').type("La tiendita de Hemelinda");
    cy.get('.btn1.r3 > .button-text').click();
    cy.wait(500);
  })


  it('Inicio de sesion', () => {
    cy.get('.itemsMenu > [href="/login"]').click();
    cy.get('#correo').type(user.correo);
    cy.get('#contra').type(user.password);
    cy.get('.btn1 > .astro-QU7SWCVN').click();
    cy.wait(500);
  })

  it('Actualizar Bodeguero', () => {
    cy.get('#name8').type('{selectAll}{backspace}'+userNew.nombreCompleto);
    cy.get('#correo8').type('{selectAll}{backspace}'+userNew.correo);
    cy.get(':nth-child(3) > :nth-child(7) > .btn1').click();
    cy.wait(3000);
  })

  it('Eliminar Bodeguero', () => {
    cy.get(':nth-child(3) > :nth-child(6) > .btn2').click();
    cy.wait(1000);
  })

})