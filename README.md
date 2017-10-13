# weinihaigou-better
单页面 海淘商城(优化版)

# 前言

这次主要是对之前本胖写的单页面 海淘商城做一个系统性的优化。
此项目大大小小共 16 个主体页面，涉及注册、登录、商品详情、购物车、下单、订单、订单详情等等，是一个完整的流程。一般公司即便是官网的单页面项目都没这么复杂，如果这个项目能驾驭的了，相信大部分公司的其他单页面应用也就不在话下，即便更复杂，也不会比这个高到哪里去。

# 主要优化点
1.APP.vue中新增了<com-header>,<com-footer>等基础组件，显示隐藏flag都放state里面，这样的好处就是不会让人感觉其实是多页面切换哈（本胖描述的就是这么朴素）。<br/>
2.需要登录权限的组件的跳转判断由之前在每个组件里面判断统一放到main.js，通过router.beforeEach统一控制，不过要注意的是vue的初始化都要在获取用户权限的回调里，具体实现代码可以看main.js。<br/>
3.将很多组件都要用到的axios以及API挂载到Vue.prototype，这样就不用再每个需要使用的组件中再去import。<br/>
4.还有一些就是将之前有部分地方用到jq的都改成了数据驱动。<br/>
5.用了keep-alive缓存部分组件

__注：此项目纯属个人瞎搞，正常购买请选择唯妮海购官网。__


## 技术栈

vue2 + vue-cli + vuex + vue-router + webpack + ES6/7 


## 关于 数据接口 的说明

该项目所有接口都来自唯妮海购，如有侵权，请联系本胖。马上删除。

## 项目运行


```
git clone https://github.com/lvpangpang/weinihaigou-better.git 

cd weinihaigou-better

npm install（<strong>有时候会报错，plantomjs-prebuildt@2.1.15 install 'node install.js'，没关系，也是跑的起来的哈，应该是node版本问题</strong>）

npm run dev 

```

```
如果你用过npm run build 打包出来dist文件夹，想运行里面的index.html,可以安装下面的指令来(注意需要修改api.js里面的const pxy = '/api' 改成const pxy = '';)
npm install http-server
cd dist
http-server -P http://www.weinihaigou.com/

或者本地开一个nginx，配置nginx.conf就行


```

# 说明

>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

>  或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

>  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

>  如果您不想注册的可以直接用这个账户 用户名 15757135989 密码 123456

> 吕胖胖的博客 http://www.qdfuns.com/house/15098.html

# 目标功能
- [x] 登录、注册 -- 完成
- [x] 首页 -- 完成
- [x] 分类 -- 完成
- [x] 搜索 -- 完成
- [x] 搜索结果以及筛选 -- 完成
- [x] 购物车功能 -- 完成
- [x]  商品详情页 -- 完成
- [x] 商家详情页 -- 完成
- [x] 登录、注册 -- 完成
- [x] 个人中心 -- 完成
- [x] 下单功能 -- 完成 
- [x] 订单列表 -- 完成
- [x] 订单详情 -- 完成
- [x] 添加、删除、修改收货地址 -- 完成
- [x] 付款 -- 不过最好不要在这里付款哈

# 部分截图

<img src="https://github.com/lvpangpang/weinihaigou/blob/master/pics/img%20(1).png" width="360" height="500"/><img src="https://github.com/lvpangpang/weinihaigou/blob/master/pics/img%20(2).png" width="360" height="500"/>

<img src="https://github.com/lvpangpang/weinihaigou/blob/master/pics/img%20(3).png" width="360" height="500"/><img src="https://github.com/lvpangpang/weinihaigou/blob/master/pics/img%20(4).png" width="360" height="500"/>

<img src="https://github.com/lvpangpang/weinihaigou/blob/master/pics/img%20(5).png" width="360" height="500"/><img src="https://github.com/lvpangpang/weinihaigou/blob/master/pics/img%20(6).png" width="360" height="500"/>

<img src="https://github.com/lvpangpang/weinihaigou/blob/master/pics/img%20(7).png" width="360" height="619"/><img src="https://github.com/lvpangpang/weinihaigou/blob/master/pics/img%20(8).png" width="360" height="500"/>

<img src="https://github.com/lvpangpang/weinihaigou/blob/master/pics/img%20(9).png" width="360" height="500"/><img src="https://github.com/lvpangpang/weinihaigou/blob/master/pics/img%20(10).png" width="360" height="500"/>

<img src="https://github.com/lvpangpang/weinihaigou/blob/master/pics/img%20(11).png" width="360" height="500"/><img src="https://github.com/lvpangpang/weinihaigou/blob/master/pics/img%20(12).png" width="360" height="500"/>

<img src="https://github.com/lvpangpang/weinihaigou/blob/master/pics/img(13).png" width="360" height="500"/><img src="https://github.com/lvpangpang/weinihaigou/blob/master/pics/img(14).png" width="360" height="500"/>




