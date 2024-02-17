import axios from 'axios';
import mpAdapter from 'axios-miniprogram-adapter';

// 创建一个新的 Axios 实例并设置适配器
	
// https://mu-api.yuk0.com
//http://116.205.238.28:8090
//
const instance = axios.create({
  adapter: mpAdapter,
  baseURL: 'https://mu-api.yuk0.com',
   timeout: 5000// 设置你的接口地址
});

export default instance;