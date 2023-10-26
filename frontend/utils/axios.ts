import axios from 'axios';
import https from 'https';

const instance = axios.create({
	httpsAgent: new https.Agent({
		rejectUnauthorized: false, // 注意：这将允许不安全的连接，不建议用于生产环境
	}),
});

console.log('instance: ', instance);

export default instance;
