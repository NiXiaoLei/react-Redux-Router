//  该文件的作用, 配合 react-app-rewired 包,来实现自定义 webpack 配置
 const { injectBabelPlugin } = require('react-app-rewired');
  module.exports = function override(config, env) {
   config = injectBabelPlugin(['import', { libraryName: 'antd-mobile', style: 'css' }], config);
    return config;
  };

