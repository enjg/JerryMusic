import axios from 'axios';
import mpAdapter from 'axios-miniprogram-adapter';

// 创建一个新的 Axios 实例并设置适配器


//请提供自己库的IP地址
let url = '';
const instance = axios.create({
	adapter: mpAdapter,
	baseURL: url,
	timeout: 5000 // 设置你的接口地址
});

export default instance;