export default class usersController {

    async getUserById(req, res) {
        try {
            res.status(200).send("getUserById")

        } catch (e) {
            res.status(500).send(e)
        }
    }

    async getRanking(req, res) {
        try {
            res.status(200).send("getRanking")

        } catch (e) {
            res.status(500).send(e)
        }
    }
}