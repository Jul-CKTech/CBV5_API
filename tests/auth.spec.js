import supertest from 'supertest'
import {expect} from 'chai'
import 'dotenv/config'

describe('Auth', () => {
    it('Successful log in', async () => {
        const response = await supertest(process.env.BASE_URL)
            .post('/v5/user/login')
            .send({email: process.env.EMAIL, password: process.env.PASSWORD})
        expect(response.status).to.eq(200)
        expect(response.body.payload.token).to.be.a('string')
    })
    it('Log in with invalid credentials', async () => {
        const response = await supertest(process.env.BASE_URL)
            .post('/v5/user/login')
            .send({email: 'invalid', password: 'invalid'})
        expect(response.status).to.eq(400)
        expect(response.body.message).to.eq('Auth failed')
    })
})
