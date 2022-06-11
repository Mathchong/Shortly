import { nanoid } from 'nanoid';

import connectDB from '../../app/connectDB.js'

export default class urlsController {

    async shortenUrl(req, res) {
        try {
            const { url } = req.body
            if(!url) return res.status(422).json({message: "Invalid body, must send 'url'"})
            const regex = /^(http|https):\/\//
            if (!regex.test(url)) return res.status(422).json({message: "URL must start with 'http://' or 'https://'"})

            const shortUrl = nanoid(11)

            const db = await connectDB()

            await db.query(`INSERT INTO urls ("completeUrl", "shortUrl", visits, "userId") VALUES
                            ($1, $2, 0, $3 )`, [url, shortUrl, res.locals.userId])

            return res.status(201).json({ shortUrl })

        } catch (e) {
            return res.status(500).send(e)
        }
    }

    async getUrlById(req, res) {
        try {
            const urlId = res.locals.paramId

            const db = await connectDB()

            const url = await db.query(`SELECT urls.id, urls."shortUrl", urls."completeUrl" as url
                                        FROM urls 
                                        WHERE id = $1`, [urlId])
            if (!url.rowCount) return res.status(404).json({ message: "url not found", status: 404 })

            return res.status(200).json({ ...url.rows[0] })

        } catch (e) {
            res.status(500).send(e)
        }
    }

    async redirectToUrl(req, res) {
        // try {
            const { shortUrl } = req.params
            console.log(shortUrl)

            const db = await connectDB()

            const url = await db.query(`SELECT "completeUrl",visits from urls where "shortUrl"= $1`, [shortUrl])
            if (!url.rowCount) return res.status(404).json({ message: "url not found", status: 404 })

            let count = url.rows[0].visits + 1
            console.log(count )
            await db.query(`UPDATE urls SET visits = $1 WHERE "shortUrl" = $2`, [count,shortUrl])

            return res.redirect(200, url.rows[0].completeUrl)

        // } catch (e) {
        //     res.status(500).send(e)
        // }
    }

    async deleteUrlById(req, res) {
        try {
            const urlId = res.locals.paramId
            const { userId } = res.locals

            const db = await connectDB()

            const url = await db.query(`SELECT "userId" from urls where "id"= $1`, [urlId])
            if (!url.rowCount) return res.status(404).json({ message: "url not found", status: 404 })


            if (url.rows[0].userId != userId) return res.status(401).json({ message: "no authorized", status: 401 })

            await db.query(`DELETE FROM urls where id=$1`, [urlId])

            res.sendStatus(204)

        } catch (e) {
            res.status(500).send(e)
        }
    }
}