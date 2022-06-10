export default class accountController {
    async signup(req, res) {
        try {
            res.status(200).send("signUp")

        } catch (e) {
            res.status(500).send(e)
        }
    }
    
    async signin(req, res) {
        try {
            res.status(200).send("signin")

        } catch (e) {
            res.status(500).send(e)
        }
    }

}