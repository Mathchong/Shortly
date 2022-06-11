import connectDB from "../../app/connectDB.js"

export default class usersController {

    async getUserById(req, res) {
        try {
            const { userIdToken } = res.locals
            const userIdParams = res.locals.paramId

            const db = await connectDB()

            const totalStats = await db.query(`SELECT users.id, users.name, sum(urls.visits) as "visitCount" 
                                         from users
                                         left join urls on urls."userId" = users.id
                                         WHERE users.id = $1
                                         group by users.id`, [userIdParams])
            if (!totalStats.rowCount) return res.status(404).json({ message: "User not found", status: 404 })
            let { id, name, visitCount } = totalStats.rows[0]

            if(!visitCount) visitCount = 0

            const shortenedUrls = await db.query(`SELECT id, "shortUrl", "completeUrl" as url, visits as "visitsCount"  
                                                    FROM urls
                                                    where "userId" = $1`, [userIdParams])

            return res.status(200).send({ id, name, visitCount, shortenedUrls: shortenedUrls.rows })

        } catch (e) {
            return res.status(500).send(e)
        }
    }

    async getRanking(req, res) {
        try {
            const db = await connectDB()

            const rank = await db.query(`SELECT users.id, users.name, count(urls."userId") as "linkCount", COALESCE(sum(urls.visits),0) as "visitCount" from users
            left join urls on urls."userId" = users.id
            group by users.id
            order by "linkCount" desc
            limit 10`)

            return res.status(200).send(rank.rows)
        } catch (e) {
            res.status(500).send(e)
        }
    }
}