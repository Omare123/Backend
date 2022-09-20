import { assert, expect } from "chai";
import supertest from "supertest";
import { describe, it } from "mocha";
import app from '../server.js'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const request = supertest(app);
const loadedImage = path.join(__dirname, "./DulceDeLeche.jpg");

describe("TESTS", () => {
    it("Should response with and the object to get", async () => {
        const response = await request.get('/api/products/631216702b0676a4f1725564').timeout(10000);
        expect(response.body).to.eql({
            _id: "631216702b0676a4f1725564",
            name: "Carrot cake",
            price: "3000",
            image: "uploaded_file-1662129776210-463921314.jpg"})
    }).timeout(100000)

    it("Should response with and array", async () => {
        const response = await request.get('/api/products/').timeout(100000);
        expect(Array.isArray(response.body)).to.eql(true)
    }).timeout(100000)

    describe("Should create and delete a product", () => {
        let response = null;
        it("Should response with and object", async () => {
            let formData = {
                name: "Dulce de leche",
                price: "300"
            }
            response = await request.post('/api/products/').attach("uploaded_file", loadedImage,{ contentType: 'application/octet-stream' }).field({...formData});
            expect(typeof response.body).to.eql("object")
        }).timeout(10000000);
    
        it("Should delete the object from te db and respond with status 200", async () => {
            const responseTwo = await request.delete(`/api/products/${response.body._id}`);
            expect(responseTwo.body.deletedCount).to.eql(1)
        }).timeout(10000000);
    })
    
})