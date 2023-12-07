import { Hono } from 'hono'
import axios from "axios"
import https from 'node:https'
import Parser from './parser/parser'

const app = new Hono()

app.get('/api/gethello', (c) => {
    return c.json({ message: "hello there!" })
})

app.get('/api/checkhalal', async (c) => {

    const company = c.req.query('company') as string
    
    if (typeof company === 'undefined') {

        return c.json({ message: "This is Halal Checker", data: "Please input something!" }, 422)
    }

    if (company === "") {

        return c.json({ message: "This is Halal Checker", data: "Please put your input!" }, 404)
    }

    const halalURL = `https://www.halal.gov.my/v4/index.php?data=ZGlyZWN0b3J5L2luZGV4X2RpcmVjdG9yeTs7Ozs=`

    try {

        var urlencoded = new URLSearchParams()
    
        urlencoded.append("cari", company)

        const res = await fetch(halalURL, {
            method: 'POST',
            tls: {
                rejectUnauthorized: false
            },
            body: urlencoded
        })

        const data = await res.text()

        const returnObj = Parser(data)

        return c.json({message: "This is Hono", data: returnObj}, 200)

    } catch (err) {

        return c.json({data: "Something went wrong :("}, 500)
        
    }

})

export default app
