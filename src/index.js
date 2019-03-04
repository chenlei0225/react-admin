/**
 * Created by Administrator on 2019/2/26 0026.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter as Router} from 'react-router-dom'
import './assets/less/index.less'
import MemoryUtils from './utils/memoryUtils'
import {getItem} from './utils/storageUtils'

const user = getItem();
if (user && user._id) {
  MemoryUtils.user = user;
}
ReactDOM.render(<Router><App/></Router>,document.getElementById('root'))