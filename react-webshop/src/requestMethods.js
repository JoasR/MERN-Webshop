import axios from "axios"

const BASE_URL = "http://localhost:5000/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzE1OTIyN2FlNDM1MTkxZmM4ZmQxZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NDEzMDk0OCwiZXhwIjoxNjc0MzkwMTQ4fQ.pE4AKkB1LjXX7hdQKvs7FTNvH4aCUMZ9gGNinK95hzQ"

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` }
})