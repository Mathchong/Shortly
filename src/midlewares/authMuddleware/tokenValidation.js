import connectDB from "../../app/connectDB.js";

export default async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    if (!token) {
        res.sendStatus(401);
        return;
    }
    res.locals.token = token;

    const db = await connectDB()
    const session = await db.query(`SELECT * FROM sessions WHERE token = $1 `,[token])
    if(!session.rowCount) return res.sendStatus(401);

    res.locals.userId = session.rows[0].userId

    next();
}