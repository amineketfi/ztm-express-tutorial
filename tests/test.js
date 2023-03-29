
const request = require('supertest');
const app = require('../server');
const model = require('../models/friends.model');
const expect = require('chai').expect;

const localhost  = 'http://localhost:3000'

describe('GET /api/friends', () => {
  it('should respond with the friends list', async () => {
    const response = await request(app).get('/api/friends');
    expect(response.status).to.equal(200);
    expect(response.body).to.equal(model);
  });
});

describe('GET /api/friends/:friendId', () => {
  it('should respond with 400 if friend does not exist', async () => {
    const friend = model[model.length-1];
    const fakeId = friend.id+1
    const response = await request(app).get(`/api/friends/${fakeId}`);
    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({error: `Friend does not exist`});
  });

  it('should respond with the friend details if friend exists', async () => {
    const friend = model[0];
    const response = await request(app).get(`/api/friends/${friend.id}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(friend);
  });
});

describe('POST /api/friends', () => {
  const newFriend = { name: 'John Smith' };

  it('should respond with 400 if name is not provided', async () => {
    const response = await request(app).post('/api/friends').send({});
    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({error: 'Missing friend name'});
  });

  it('should respond with the new friend details if name is provided', async () => {
    const response = await request(app).post('/api/friends').send(newFriend);
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.include(newFriend);
  });

  it('should add the new friend to the model', async () => {
    const response = await request(app).post('/api/friends').send(newFriend);
    expect(model.length).to.be.greaterThan(0);
    expect(model[model.length - 1]).to.deep.include(newFriend);
  });
});
