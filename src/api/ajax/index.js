/**
 * Created by Administrator on 2019/2/27 0027.
 */
import {sendAjax} from './ajax'
import jsonp from 'jsonp'


const prefix = process.env.NODE_ENV === 'development' ? '' : 'http://localhost:5000';
export const resLogin = ({username,password})=>sendAjax(`${prefix}/login`,{username,password},'POST')
export const resAddUser = (user)=> sendAjax(`${prefix}/manage/user/add`,user,'POST')
export const resWeather = (city)=>{

  return new Promise((resolve,reject)=>{
    jsonp(
      `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
      {},
      (err,data)=>{
        if(!err){
          resolve(data.results[0].weather_data[0])
        }else {
          console.log('天气请求失败：',err)
          reject('请求天气失败~')
        }
      }
    )
  })
}
export const resCategory = parentId =>sendAjax(`${prefix}/manage/category/list`,{parentId})
export const resAddCategory = (parentId,categoryName)=>sendAjax(`${prefix}/manage/category/add`,{parentId,categoryName},'POST')
export const resUpdateCategory = (categoryId,categoryName)=>sendAjax(`${prefix}/manage/category/update`,{categoryId,categoryName},'POST')
export const resChildrenCategory = categoryId => sendAjax(`${prefix}/manage/category/info`,{categoryId})
export const reqProducts = (pageNum,pageSize) => sendAjax(`${prefix}/manage/product/list`,{pageNum,pageSize})
export const searchProducts = (searchType,searchValue,pageNum,pageSize) => sendAjax(`${prefix}/manage/product/search`,{[searchType]:searchValue,pageNum,pageSize})
