'use strict';

const assert = require('assert');
const request = require('supertest');

const Koa = require('../..').server;

describe('app.request', function () {
  const app1 = new Koa();
  app1.request.message = 'hello';

  const app2 = new Koa();

  it('should merge properties', function (done) {
    app1.use(function * () {
      assert.equal(this.request.message, 'hello');
      this.status = 204;
    });

    request(app1.listen())
      .get('/')
      .expect(204, done);
  });

  it('should not affect the original prototype', function (done) {
    app2.use(function * () {
      assert.equal(this.request.message, undefined);
      this.status = 204;
    });

    request(app2.listen())
      .get('/')
      .expect(204, done);
  });
});
