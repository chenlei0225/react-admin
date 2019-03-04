/**
 * Created by Administrator on 2019/2/27 0027.
 */
import axios from 'axios'
export const sendAjax = (url,data,method='GET')=>{
  let promise = null
  if(method==='GET'){
    promise = axios.get(url,{params:data})
  }else {
    promise = axios.post(url,data)
  }
  return new Promise((resolve,reject)=>{
    promise
      .then((res)=>{
        resolve(res.data)
      })
      .catch(err=>{
        console.log(err);
        resolve('网络不稳定，请稍后再试！')
      })
  })

}