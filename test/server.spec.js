process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const User = require('../src/models/user');
const Blog = require('../src/models/blog');
const bcrypt = require('bcryptjs')
const config = require('../config/config');
const helper = require('../src/helpers/helper');
const jsonwebtoken = require('jsonwebtoken');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const assert = chai.assert;


chai.use(chaiHttp);

describe('Testing server part', () => {

    after(function (done) {
        process.exit(0);
    });

    describe('Testing helpers methods', () => {
        it('prepareError method', () => {
            const error = { message: 'Error' };
            const status = 'OK';
            const message = 'Second error';
            const expectedResult = {
                status: 'OK',
                message: 'Second error\nError'
            };

            const result = helper.prepareError(error, status, message);

            assert.deepEqual(result, expectedResult);
        });

        it('createToken method', () => {
            const newUser = {
                _id: 1,
                name: 'test',
                email: 'test@email.ru',
                username: 'test'
            };

            const result = helper.createToken(newUser);

            assert.isNotEmpty(result);
            assert.isString(result);
        });
    });

    describe('Users', () => {
        var password = 'test';
        var hashedPassword = '';

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    log.error(err);
                }
                hashedPassword = hash;
            })
        });

        beforeEach(done => {
            User.remove({}, (err) => {
                done();
            });
        });

        /*
        * Test the POST /api/users/register route
        */
        describe('POST /register', () => {
            it('it should not POST a user without username field', (done) => {
                const newUser = Object.assign(new User(), {
                    name: 'test',
                    email: 'test@email.ru',
                    password: hashedPassword
                });
                console.log('HI!');
                chai.request(server)
                    .post('/api/users/register')
                    .send(newUser)
                    .end((err, res) => {
                        res.should.have.status(500);
                        done();
                    });
            });

            it('it should POST a user ', (done) => {
                const newUser = Object.assign(new User(), {
                    name: 'test',
                    email: 'test@email.ru',
                    username: 'test',
                    password: hashedPassword
                });

                chai.request(server)
                    .post('/api/users/register')
                    .send(newUser)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('User has been created');
                        done();
                    });
            });
        });

        /*
        * Test the  POST /api/users/login route
        */
        describe('POST /login', () => {
            it('it shouldn`t GET an access by the given incorrect username and password', (done) => {
                const user = Object.assign(new User(), {
                    name: 'test',
                    email: 'test@email.ru',
                    username: 'test',
                    password: hashedPassword
                });

                user.save((err, user) => {
                    chai.request(server)
                        .post('/api/users/login')
                        .send({
                            username: 'Test',
                            password: 'test'
                        })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message').eql('User with username=Test not found');
                            done();
                        });
                });
            });

            it('it shouldn`t GET an access by the given username and incorrect password', (done) => {
                const user = Object.assign(new User(), {
                    name: 'test',
                    email: 'test@email.ru',
                    username: 'test',
                    password: hashedPassword
                });

                user.save((err, user) => {
                    chai.request(server)
                        .post('/api/users/login')
                        .send({
                            username: 'test',
                            password: 'Test'
                        })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message').eql('User put wrong password');
                            done();
                        });
                });
            });

            it('it should GET an access by the given username and password', (done) => {
                const user = Object.assign(new User(), {
                    name: 'test',
                    email: 'test@email.ru',
                    username: 'test',
                    password: hashedPassword
                });

                user.save((err, user) => {
                    chai.request(server)
                        .post('/api/users/login')
                        .send({
                            username: 'test',
                            password: 'test'
                        })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message').eql('Successfully login');
                            done();
                        });
                });
            });
        });
    });

    describe('Blogs', () => {
        var token = jsonwebtoken.sign({
            id: '5abba198ce47363914819192',
            name: 'test',
            username: 'test'
        }, config.secretKey, {
                expiresIn: 1440
            });

        beforeEach(done => {
            Blog.remove({}, (err) => {
                done();
            });
        });

        /*
         * Test the GET /api/blogs route
         */
        describe('GET /api/blogs', () => {
            it('it should GET all the blogs', (done) => {
                chai.request(server)
                    .get('/api/blogs')
                    .set('x-access-token', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                        done();
                    });
            });
        });

        /*
        * Test the POST /api/blogs route
        */
        describe('POST /api/blogs', () => {
            it('it should not POST a blog without body field', (done) => {
                const newBlog = Object.assign(new Blog(), {
                    title: 'test',
                    author: 'test',
                    date: new Date(new Date().toISOString()),
                });

                chai.request(server)
                    .post('/api/blogs')
                    .set('x-access-token', token)
                    .send(newBlog)
                    .end((err, res) => {
                        res.should.have.status(500);
                        done();
                    });
            });

            it('it should POST a blog ', (done) => {
                const newBlog = Object.assign(new Blog(), {
                    title: 'test',
                    author: 'test',
                    body: 'test',
                    date: new Date(new Date().toISOString()),
                });

                chai.request(server)
                    .post('/api/blogs')
                    .set('x-access-token', token)
                    .send(newBlog)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('New blog Created!');
                        done();
                    });
            });
        });

        /*
        * Test the  GET /api/blogs/:id route
        */
        describe('GET /api/blogs/:id', () => {
            it('it should GET a blog by the given id', (done) => {
                const blog = Object.assign(new Blog(), {
                    title: 'test',
                    author: 'test',
                    body: 'test',
                    date: new Date(new Date().toISOString()),
                });

                blog.save((err, blog) => {
                    chai.request(server)
                        .get('/api/blogs/' + blog._id)
                        .set('x-access-token', token)
                        .send(blog)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('title');
                            res.body.should.have.property('author');
                            res.body.should.have.property('body');
                            res.body.should.have.property('date');
                            res.body.should.have.property('_id').eql(blog._id.toString());
                            done();
                        });
                });

            });
        });

        /*
        * Test the PUT /api/blogs/:id route
        */
        describe('PUT /api/blogs/:id', () => {
            it('it should UPDATE a blog given the id', (done) => {
                const blog = Object.assign(new Blog(), {
                    title: 'test',
                    author: 'test',
                    body: 'test',
                    date: new Date(new Date().toISOString()),
                });

                blog.save((err, blog) => {
                    chai.request(server)
                        .put('/api/blogs/' + blog._id)
                        .set('x-access-token', token)
                        .send({
                            title: 'updatedTest',
                            author: 'test',
                            body: 'test',
                            date: new Date(new Date().toISOString()),
                        })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('nModified').eql(1);
                        });

                    chai.request(server)
                        .get('/api/blogs/' + blog._id)
                        .set('x-access-token', token)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('title').eql('updatedTest');
                            done();
                        })
                });
            });
        });

        /*
        * Test the DELETE /api/blogs/:id route
        */
        describe('DELETE /api/blogs/:id', () => {
            it('it should DELETE a blog given the id', (done) => {
                const blog = Object.assign(new Blog(), {
                    title: 'test',
                    author: 'test',
                    body: 'test',
                    date: new Date(new Date().toISOString()),
                });

                blog.save((err, blog) => {
                    chai.request(server)
                        .delete('/api/blogs/' + blog._id)
                        .set('x-access-token', token)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            done();
                        });
                });
            });
        });
    });

    describe('Authentication testing', () => {
        var token = jsonwebtoken.sign({
            id: '5abba198ce47363914819192',
            name: 'test',
            username: 'test'
        }, config.secretKey, {
                expiresIn: 1440
            });

        /*
         * Test the access to any /api* routes
         */
        describe('access to /api* routes', () => {
            it('it shouldn`t get access without token', (done) => {
                chai.request(server)
                    .get('/api')
                    .end((err, res) => {
                        res.should.have.status(403);
                        res.body.should.be.a('object')
                            .to.have.property('success', false)
                        done();
                    });
            });

            it('it should get access with token', (done) => {
                chai.request(server)
                    .get('/api')
                    .set('x-access-token', token)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object').to.be.empty;
                        done();
                    });
            });
        });
    });
});

