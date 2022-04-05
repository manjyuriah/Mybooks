import { push } from "connected-react-router";
import { createActions, handleActions , Action } from "redux-actions";
import { call, put, select, takeEvery } from "redux-saga/effects";
import TokenService from "../../services/TokenService";
import UserService from "../../services/UserService";
import { LoginReqType,AuthState } from "../../types";

const initialState: AuthState={//초기값 설정
    token:null,
    loading:false,
    error:null
};

const prefix='my-books/auth';

export const {pending,success,fail} = createActions(
    "PENDING",
    "SUCCESS",
    "FAIL",
    {prefix}
)
const reducer = handleActions <AuthState,string>(
    {
    PENDING: (state)=>({
        ...state,
        loading:true,
        error:null,
    }),
    SUCCESS: (state,action)=>({//성공시 토큰을 받아야하기 때문에 action
        token:action.payload,
        loading:false,
        error:null,
    }),
    FAIL: (state,action: any)=>({
        ...state,
        loading:false,
        error:action.payload,
    }),
},initialState,{prefix})

export default reducer;
//saga
export const {login,logout}=createActions("LOGIN","LOGOUT",{prefix})

//login이라는 액션이 dispatch되면 loginSaga실행 
function* loginSaga(action: Action<LoginReqType>){//email 과 password 필요 -> action을 받아 내부의 payload에 email과 password로 이뤄진 객체를 사용
    //비동기 로직
    try{
        yield put(pending());
        const token:string = yield call(UserService.login, action.payload);//login api의 데이터를 받아옴 -> inline으로 작성시 api로직이 같이 들어오니까 따로 빼기
        TokenService.set(token)
        //로컬스토리지에 토큰 담기
        yield put(success(token));
        //로그인시 가입페이지->리스트페이지
        //push
        yield put(push("/"))
    }catch(error){
        yield put(fail(new Error('UNKNOWN_ERROR')))
    }
}
//logou이라는 액션이 dispatch되면 logouSaga실행 
function* logoutSaga(){
    try{
        yield put(pending());
        const token:string = yield select((state)=>state.auth.token)
        yield call(UserService.logout,token)
        TokenService.set(token)

    }catch(error){
    }finally {
        TokenService.remove();
        yield put(success(null));
    }
}
export function* authSaga(){
    yield takeEvery(`${prefix}/LOGIN`,loginSaga);
    yield takeEvery(`${prefix}/LOGOUT`,logoutSaga);
}