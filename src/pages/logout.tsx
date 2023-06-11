import axios from "axios"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Logout = () => {
    const router = useRouter()

    useEffect(() => {

        axios.get('/api/logout', {withCredentials: true})
        .then(() => router.replace('/'))

    }, [])

}

export default Logout