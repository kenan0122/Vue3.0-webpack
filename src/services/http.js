import mockFactory from '../mock/mockFactory';

/**
 * 直接根据空间名称很函数名称直接返回mock数据源
 * @param {}} namespace 
 * @param {}} funName 
 */
const mockRequest = (namespace, funName, parent) => {
  return new Promise((resolve) => {
    // 模拟数据
    let time = setTimeout(() => {
      clearTimeout(time);
      resolve(mockFactory[namespace][funName].data);
    }, 500);
  })
}

/**
 * 根据每个模块生产函数
 * @param {*} option     接口服务对应的实例配置
 * @param {*} request    接口服务请求实例
 * @param {*} namespace  服务所属空间名称(就是scope隔离下)
 */
const packageNewFuns = (option, request, namespace) => {
  const packages = {};
  Object.keys(option.funs).forEach((funName) => {
    packages[funName] = (parent) => {
      // 如果是mock接口
      if(mockFactory[namespace][funName].mock) {
        return mockRequest(namespace, funName, parent)
      } else {
        // 真实请求
      }
    };
  });

  return packages;
}

const post = () => {
  return 'post';
}

export default {
  packageNewFuns,
  post
};