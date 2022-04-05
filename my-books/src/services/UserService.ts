import axios from "axios";
import { LoginReqType } from "../types";

const User_API_URL='https://api.marktube.tv/v1/me'

export default class UserService{
    //login
    public static async login(reqData: LoginReqType): Promise<string>{
        const response=await axios.post(User_API_URL,reqData);
        return response.data.token
    }
    //logout
    public static async logout(token: string): Promise<void>{
        await axios.delete(User_API_URL,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
    }
}