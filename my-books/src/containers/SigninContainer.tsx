import Signin from "../components/Signin"
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {login as loginSagaStart} from '../redux/modules/auth'

export default function SigninContainer(){
    const dispatch=useDispatch();
    const login=useCallback((reqData)=>{//reqData를 받아 saga함수가 시작할 수 있게 처리 -> saga함수에서 비동기
        dispatch(loginSagaStart(reqData))
    },[dispatch]); 
    return <Signin login={login} />
}