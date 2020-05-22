// pages/cart/index.js
import { getSetting, chooseAddress, openSetting, showToast } from '../../utils/index';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({
    /**
     * 页面的初始数据
     */
    data: {
        address: {},
        cartGoods: [],
        allselect: false,
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
    // 设置当前收货地址
    setAddress() {
        let address = wx.getStorageSync("address") || {}
        this.setData({
            address
        })
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
    // 从缓存中 将用户加入购物车的商品赋值给data  以便展示
    getCartGoods() {
        let cartGoods = wx.getStorageSync("cart");
        // cartGoods.map(r => {
        //     r.goods_img = r.pics.map(r => r.pics_mid)
        //     console.log(r);
        // })
        // console.log(cartGoods);
        // App.globalData.cartGoods=cartGoods;

        // this.data.cartGoods = cartGoods
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
        if (this.data.cartGoods.length > 0) {
            this.getCheckedNumber()
            this.getAllPrice()
            this.isAllSelect()
        }
    },
    // 改变当前商品是否被选中 需要购买
    changechecked(e) {
        let i = e.currentTarget.dataset.i
        this.data.cartGoods[i].checked = !this.data.cartGoods[i].checked;
        this.isAllSelect()
        this.getAllPrice()
        this.getCheckedNumber()
        this.setData({
            cartGoods: this.data.cartGoods
        })
    },
    // 商品数量的加减
    changeGoodsNumber(event) {
        let i = event.currentTarget.dataset.i
        let value = event.detail
        this.data.cartGoods[i].num = value
        this.getAllPrice()
        this.getCheckedNumber()
        this.setData({
            cartGoods: this.data.cartGoods
        })
        // console.log(event);

        // console.log(event.detail);
    },
    // 是否需要全选
    isAllSelect() {
        let allselect = this.data.cartGoods.every(r => r.checked)
        this.setData({
            allselect
        })
    },
    // 点击全选按钮
    changeallselect() {
        this.data.allselect = !this.data.allselect
        this.data.cartGoods.forEach(r => r.checked = this.data.allselect)
        this.getAllPrice()
        this.getCheckedNumber()
        this.setData({
            cartGoods: this.data.cartGoods
        })
    },
    // 获取总价格
    getAllPrice() {
        let res = 0
        this.data.cartGoods.forEach(r => {
            if (r.checked) {
                res += r.goods_price * r.num
            }
        })
        wx.setStorageSync('cart', this.data.cartGoods);
        this.setData({
            allprice: res
        })
    },
    // 是否删除商品
    async onClose(event) {
        let i = event.currentTarget.dataset.i
        const { position, instance } = event.detail;
        if (position == 'cell') return instance.close()
        if (position == 'right') {
            Dialog.confirm({
                message: '确定删除该商品吗？',
            }).then(() => {
                this.data.cartGoods.splice(i, 1)
                this.setData({
                    cartGoods: this.data.cartGoods
                })
                instance.close();
                this.getAllPrice()
                this.getCheckedNumber()
                wx.setStorageSync('cart', this.data.cartGoods);
            });
        }

    },
    // 点击提交按钮
    async submitOrder() {
        // 判断用户有没有填写收获地址
        if (!this.data.address.userName) return await showToast("您还没有填写收货地址")
        //判断购物车是否为空
        if (this.data.cartGoods.length <= 0) return await showToast("您的购物车是空的哦")

        // 跳转到支付页面
        wx.navigateTo({
            url: '../pay/index',
        });
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
    onHide: function() {
        console.log("页面隐藏了");
        wx.setStorageSync('cart', this.data.cartGoods);
    },

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