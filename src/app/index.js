import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';

import router from '../routers/index.js'

const app = express();
dotenv.config()

app.use(cors())
app.use(json())
app.use(router)

app.listen(process.env.PORT || 5000, () => {
    console.log(chalk.yellow.bold(`App listening on port ${process.env.PORT}`))
})

