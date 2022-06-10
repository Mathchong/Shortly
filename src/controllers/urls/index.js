export default class urlsController {

    async shortenUrl(req, res) {
        try {
            res.status(200).send("shorten Url")

        } catch (e) {
            res.status(500).send(e)
        }
    }

    async getUrlById(req, res) {
        try {
            res.status(200).send("Get URL by Id")

        } catch (e) {
            res.status(500).send(e)
        }
    }

    async redirectToUrl(req, res) {
        try {
            res.status(200).send("redirect")

        } catch (e) {
            res.status(500).send(e)
        }
    }

    async deleteUrlById(req, res) {
        try {
            res.status(200).send("delete Url")

        } catch (e) {
            res.status(500).send(e)
        }
    }
}