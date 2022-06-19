import supertest from "supertest";
import {server} from "../src/application";

const testUser = {
    "username": "Test man",
    "age": 22,
    "hobbies": [
        "test hobby", "very test hobby"
    ]
};

const firstTestDesc = "Get all api/users";
supertest(server)
    .get('/api/users/')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect([])
    .end((err) => {
        console.log(firstTestDesc)
        if (err) {
            console.error("failed", err.message);
        } else {
            console.log("passed");
        }
        server.close();
    });

const secondTestDesc = "save new user POST api/users";
supertest(server)
    .post('/api/users/')
    .send(testUser)
    .expect('Content-Type', /json/)
    .expect(201)
    .expect((res) => {
        const username = res.body.username;
        if (username !== "Test man") {
            throw new Error(`Expected username:"Test man", got "${username}"`)
        }
    })
    .end((err) => {
        console.log(secondTestDesc)
        if (err) {
            console.error("failed", err.message);
        } else {
            console.log("passed");
        }
        server.close();
    })

const thirdTestDesc = "save new user POST api/users and get";
supertest(server)
    .get('/api/users/asd')
    .expect(404)
    .expect((res) => {
        const text = res.text;
        if (text !== "\"Page not found\"") {
            throw new Error(`Expected message:"Page not found", got ${text}`)
        }
    })
    .end((err) => {
        console.log(thirdTestDesc)
        if (err) {
            console.error("failed", err.message);
        } else {
            console.log("passed");
        }
        server.close();
    })

const fourthTestDesc = "wrong url api/users/asd";
supertest(server)
    .get('/api/users/asd')
    .expect('Content-Type', /json/)
    .expect(404)
    .expect((res) => {
        const text = res.text;
        if (text !== "\"Page not found\"") {
            throw new Error(`Expected message:"Page not found", got ${text}`)
        }
    })
    .end((err) => {
        console.log(fourthTestDesc);
        if (err) {
            console.error("failed", err.message);
        } else {
            console.log("passed");
        }
        server.close();
    });
