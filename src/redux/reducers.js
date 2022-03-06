/* 用来根据老的state和指定的action生成并返回新的state函数 */

// import storageUtils from "../utils/storageUtils"
import {combineReducers} from 'redux'


//github官方教程
var userReducer = function (state = {}, action) {
    console.log('userReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            }
        default:
            return state;
    }
}
var itemsReducer = function (state = [], action) {
    console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'ADD_ITEM':
            return [
                ...state,
                action.item
            ]
        default:
            return state;
    }
}



// import {combineReducers} from './自写redux/index'

// import {SET_HEAD_TITLE,RECEIVE_USER,SHOW_ERROR_MSG,RESET_USER} from './action-type'
/* 用来管理头部标题的reducer函数 */
const initTitle='YUWEI - Inspiration & Notes From All Around Web'
function headTitle(state=initTitle,action){
    console.log(action.type)
    switch(action.type){
        case 'set_head_title':
            return action.data
        default:
            return state
    }
}

/* 管理用户名的reducer */
const initUser = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
// const initUser=storageUtils.getUser()
function user(state=initUser,action){
    switch(action.type){
/*         case RECEIVE_USER:
            return action.user
        case SHOW_ERROR_MSG:
            const errorMsg = action.errorMsg
            return {...state,errorMsg} //不要直接修改原本的状态数据
        case RESET_USER:
            return {} */
        default:
            return state
    }
}

/* 
向外默认暴露的是合并产生的总的reducer函数
管理的总的state的结构 
{
    headTitle: '首页',
    user:{}
}*/

export default combineReducers({
    headTitle,
    user,
    userReducer,
    itemsReducer
})