import connectDB from './../../app/connectDB.js'
import bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid'

export default class accountController {
    async signup(req, res) {
        try {
            const db = await connectDB()
            const {name,email,password} = req.body

            const hash = bcrypt.hashSync(password,7)

            const create = await db.query(`INSERT INTO users (name, email, password) VALUES
                            ($1,$2,$3)`,[name,email,hash])
            console.log(create)
            return res.sendStatus(201)
            
        } catch (e) {
            return res.status(500).send(e)
        }
    }
    
    async signin(req, res) {
        try {
            const db = await connectDB()
            const {email,password} = req.body

            const user = await db.query(`select * from users where email = $1`,[email])
            if(!user.rowCount) return res.sendStatus(401)

            const token = uuid()

            await db.query(`INSERT INTO sessions ("userId",token) VALUES
                            ($1,$2)`,[user.rows[0].id,token])

            return res.status(200).send(token)

        } catch (e) {
            res.status(500).send(e)
        }
    }

}