import axios from "axios"

const BASE_URL = "http://localhost:5000/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzE1OTIyN2FlNDM1MTkxZmM4ZmQxZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NDUwNzI3NiwiZXhwIjoxNjc0NzY2NDc2fQ.CdoNVI6AZdM7xwJ31iWg_l2VkTW0cv2AwJpyR5OBnh8"
export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: { token: `Bearer ${TOKEN}` }
})