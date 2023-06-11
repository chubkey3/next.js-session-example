import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Protected = () => {
    const [username, setUsername] = useState<string>("")

    const router = useRouter()

    useEffect(() => {
        axios.get('/api/protected', {withCredentials: false})
        .then((res) => {setUsername(res.data.username)})
        .catch(() => {
            router.replace('/login')
        })
    }, [])
    
    return (
        <div>
            <h1>Hi, {username}!</h1>
            <h3>You are Logged In!</h3>
            <p>You can view this page because you have a session cookie stored!</p>
        </div>
    )
}


export default Protected