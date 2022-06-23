/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  name: "Milanea a la napolitana",
  summary: "Muy buena milanesa",
  diets: "ketogenic"
};

describe('/recipes routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('Deberia traer todas las recetas', async () =>
      await agent.get('/recipes')
      .expect(200)
      .expect('Content-Type', /json/)
    );
  });
  describe('GET /recipes/:id', () => {
    it('Deberia traer el detalle de la receta segun su id', async () =>
      await agent.get('/recipes/716426')
      .expect(200)
      .expect('Content-Type', /json/)
    );
  });
  describe('POST /recipes', () => {
    it('Deberia crear una nueva receta', () =>
      agent.post('/recipes')
      .send(recipe)
      .then(() => {
        expect(200)
        expect('Content-Type', /json/)
      })
    );
  });
});





