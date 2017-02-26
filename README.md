# dky-web

dky-web designed by express + jquery + handlebars, run on node environment.

## Getting started

* 确保系统中装有node环境，如没有请参照以下方式安装
    * **Windows** [下载链接](https://nodejs.org/en/download/)
    * **Mac** `brew install node`
    * **CentOS** `yum install node`
* 根目录执行`npm install`安装依赖包
* 开发模式执行`npm install gulp -g`,然后执行`gulp`
* 打开浏览器输入`http://localhost:3000/`

## Testing
Tests are written with mocha.
- Install: `npm install -g mocha`
- Run: `mocha` or `npm test`

## Deploy

* 部署需要负载均衡，请用`PM2`；访问量不大，请执行`npm start`即可
