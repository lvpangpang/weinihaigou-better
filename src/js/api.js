const pxy = '/api';
const API = {
    // 登录权限相关
    login : pxy + '/user/login.shtml',
    loginOut : pxy + '/user/loginOut.shtml',
    checkUser : pxy + '/user/checkUser.shtml',

    // 首页相关
    indexMo : pxy + '/indexMo.shtml',

    // 热门搜索相关
    theme : pxy + '/find/theme.shtml',
    themeBanner : pxy + '/find/themeBanner.shtml',

    // 分类相关
    getCategory : pxy + '/category/getCategory.shtml',
    getCategoryTwo :  pxy + '/category/getCategoryTwo.shtml',

    // 搜索相关
    getTextSearch : pxy + '/find/getTextSearch.shtml',
    hotSearch : pxy + '/solr/hotSearch.shtml',
    getHotSearch : pxy + '/find/getHotSearch.shtml',

    // 搜索结果相关
    searchGoods : pxy + '/solr/searchGoods.shtml',

    // 购物车相关
    delShopCar : pxy + '/trade/delShopCar.shtml',
    addShopCar : pxy + '/trade/addShopCar.shtml',
    shopCarIndexMobile : pxy +'/trade/shopCarIndexMobile.shtml',

    // 商品详情相关
    detailMo : pxy + '/goods/detailMo.shtml',
    getIntervalPrice : pxy + '/goods/getIntervalPrice.shtml',
    ifCollect : pxy + '/person/ifCollect.shtml',
    insertCollect : pxy + '/person/insertCollect.shtml',
    addShopCar : pxy + '/trade/addShopCar.shtml',
    drawCoupon : pxy + '/goods/drawCoupon.shtml',
    carCount : pxy + '/carCount.shtml',

    // 支付相关
    toMoPalaceOrder : pxy + '/trade/toMoPalaceOrder.shtml',

    // 个人中心相关
    tradeCount : pxy + '/ord/myTradeCount.shtml',

    // 确认订单相关
    createOrder : pxy + 'trade/createOrder.shtml',
    toPay : pxy + '/trade/toPay.shtml',
    saveUserDetail : pxy + '/person/saveUserDetail.shtml',

    // 订单相关
    orderMo : pxy + '/ord/orderMo.shtml',
    delTrade : pxy + '/ord/delTrade.shtml',
    updateTrade : pxy + '/trade/updateTrade.shtml',
    updateStatus : pxy + '/ord/updateStatus.shtml',

    // 订单详情相关
    tradeMoDetail : pxy + '/ord/tradeMoDetail.shtml',
    delTrade : pxy + '/ord/delTrade.shtml',
    updateTrade : pxy + '/trade/updateTrade.shtml',
    updateStatus : pxy + '/ord/updateStatus.shtml',
    toPay : pxy + '/trade/toPay.shtml',

    // 注册相关
    sendMoRandmoCode : pxy + '/user/sendMoRandmoCode.shtml',
    userRegister : pxy + '/user/userRegister.shtml',

    // 地址相关
    addressMo : pxy + '/person/addressMo.shtml',
    mgrAddrFlag : pxy + '/user/mgrAddrFlag.shtml',
    delAddress : pxy + '/person/delAddress.shtml',
    insertAddr : pxy + '/user/insertAddr.shtml',
};
export default API;