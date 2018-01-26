import * as env from '../../constants/env';
import axios from 'axios' ;

export function getUserPack(){
    let url = env.API_UP + '/coworking-space/user-packs';
    return axios.get(url);
}
export function registerUserPack(email, phone, subscription_id){
    let url = env.API_UP + '/coworking-space/register';
    return axios.post(url, {
        email : email,
        phone : phone,
        subscription_id : subscription_id
    })
}