// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Web3 from 'web3'
import router from './router'
import './css/init.scss'
import { Button, Select, Form, FormItem, Input, Option, Col, Row, Radio, RadioGroup, DatePicker, TimePicker, Switch, Checkbox, CheckboxGroup } from 'element-ui'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Select)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Option)
Vue.use(Col)
Vue.use(Row)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Switch)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)

window.addEventListener('load', async () => {
  // 考虑到新版的Metamask，并且默认启用了隐私模式
  // https://blog.csdn.net/rejames/article/details/89876967
  // 检查是否是新的MetaMask 或 DApp浏览器
  // petshop中的就是i这么操作的，react的unbox也是这样考虑的
  var web3Provider
  if (window.ethereum) {
    web3Provider = window.ethereum
    try {
      // 请求用户授权
      await window.ethereum.enable()
    } catch (error) {
      // 用户不授权时
      console.error('User denied account access')
    }
  } else if (window.web3) {   // 老版 MetaMask Legacy dapp browsers...
    web3Provider = window.web3.currentProvider
  } else {
    // 使用本地的web3
    web3Provider = new Web3.providers.HttpProvider('http://localhost:8545')
  }
  window.web3 = new Web3(web3Provider)

  // 自带的方式
  // if (typeof web3 !== 'undefined') {
  //   console.log('Web3 injected browser: OK.')
  //   window.web3 = new Web3(window.web3.currentProvider)
  // } else {
  //   console.log('Web3 injected browser: Fail. You should consider trying MetaMask.')
  //   // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  //   window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  // }

  // 连接另一台的时候使用的
  // 获取metamask的web3，自己主要用于找到metamask地址才用的；

  // window.metamask = window.web3
  // window.web3 = new Web3(new Web3.providers.HttpProvider('http://192.168.0.110:8545'))

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  })
})
