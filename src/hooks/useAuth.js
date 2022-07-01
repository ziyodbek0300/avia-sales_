import {useEffect} from "react";
import {useCookies} from "react-cookie";
import {useDispatch, useSelector} from "react-redux";
import {getMe} from "../redux/user/actions";
import Cookies from "js-cookie"
const useAuth = () => {
    const dispatch = useDispatch()
    const [cookies] = useCookies(['token']);

    const currentUser = useSelector(state => state.user.currentUser)
    const loading = useSelector(state => state.user.loading)

    useEffect(() => {
        dispatch(getMe())
    }, [Cookies.get("token")])

    return [currentUser,loading]
}

export default useAuth