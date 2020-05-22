// pages/cart/index.js
import { getSetting, chooseAddress, openSetting, showToast } from '../../utils/index';
Page({
    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cartGoods: [],
        allprice: 0,
        goodsTotalNumber: 0
    },
    async address() {
        // 获取当前权限状态 
        try {
            let state = await getSetting()
            if (state == false) await openSetting()
            let address = await chooseAddress()
            wx.setStorageSync("address", address)
            this.setAddress()
        } catch (error) {
            console.error(error)
        }
    },
    payOrder() {
        //1.获取token
        let token = wx.getStorageSync('token');
        //2.判断token是否存在 存在继续执行支付 不存在跳转页面获取授权 请求接口 获取token
        if (!token) {
            wx.navigateTo({
                url: '../auth/index',
            });
        } else {
            console.log("token已经有了")
        }
    },
    // 获取用户选中的商品的数量
    getCheckedNumber() {
        let num = 0;
        this.data.cartGoods.forEach(r => {
            if (r.checked) {
                num += r.num
            }
        })
        this.setData({
            goodsTotalNumber: num
        })
    },

    // 设置当前收货地址
    setAddress() {
        let address = wx.getStorageSync("address") || {}
        this.setData({
            address
        })
    },
    // 从缓存中 将用户加入购物车的商品赋值给data  以便展示
    getCartGoods() {
        let cartGoods = wx.getStorageSync("cart");
        console.log(cartGoods);
        cartGoods = cartGoods.filter(r => r.checked)
        console.log(cartGoods)
        this.setData({
            cartGoods
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.setAddress()
        this.getCartGoods()
        this.getAllPrice()
        this.getCheckedNumber()
    },

    // 获取总价格
    getAllPrice() {
        let res = 0
        this.data.cartGoods.forEach(r => {
            if (r.checked) {
                res += r.goods_price * r.num
            }
        })
        this.setData({
            allprice: res
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},


    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})