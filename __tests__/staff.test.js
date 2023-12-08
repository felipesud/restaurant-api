const mongoose = require("mongoose");
const request = require("supertest");
const server = require("../server");

require("dotenv").config();

/* Connecting to the database before each test. */
describe('Test Handlers', () => {
    beforeEach(async () => {
        await mongoose.connect(process.env.MONGODB_URI);
    });
    
    /* Closing database connection after each test. */
    afterEach(async () => {
        await mongoose.connection.close();
    });

    test("should return all staff", async() => {        
        const res = await request(server).get("/staff");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
    

    
    test("should return one staff", async () => {
        const res = await request(server).get(
            "/staff/656521e22a38c885afc08645"
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.firstName).toBe("Anita");    
    });
});