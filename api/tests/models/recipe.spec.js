const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');


describe('Recipe model', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name and summary', (done) => {
        Recipe.create({
          name: 'hola',
          summary: 'Hola',
        })
          .then(() => done())
          .catch(() => done(new Error('it should create a new recipe')));
      });
    });
    describe('summary', () => {
      it('should throw an error if summary is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a summary')))
          .catch(() => done());
      });
    });
    describe('healthScore', () => {
      it('should throw an error if healthScore is not an integer', (done) => {
        Recipe.create({
          name: 'hola',
          summary: 'Hola',
          healthScore: 'catorce',
        })
          .then(() => done(new Error('healthScore should be an integer')))
          .catch(() => done());
      });
      it('should work when its a valid healthScore', (done) => {
        Recipe.create({
          name: 'hola',
          summary: 'Hola',
          healthScore: 10,
        })
          .then(() => done())
          .catch(() => done(new Error('it should create a new recipe')));
      });
    });
    describe('steps', () => {
      it('should throw an error if steps is not a valid text', (done) => {
        Recipe.create({
          name: 'hola',
          summary: 'Hola',
          healthScore: false,
        })
          .then(() => done(new Error('It requires a valid steps')))
          .catch(() => done());
      });
      it('should work when its a valid image', (done) => {
        Recipe.create({
          name: 'hola',
          summary: 'Hola',
          steps: 'doce pasos',
        })
          .then(() => done())
          .catch(() => done(new Error('it should create a new recipe')));
      });
    });
  });
});