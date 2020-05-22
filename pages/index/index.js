// pages/goods_list/index.js
import { $get } from "../../request/index"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperList: [],
        navList: [],
        floorList: [],
        qsearch: [],
        isQsearchShow: false
    },
    TimerId: null,
    valueChange(e) {
        let value = e.detail
        if (!value.trim()) {
            this.setData({
                isQsearchShow: false
            })
            clearTimeout(this.TimerId)
            this.data.qsearch = []
            return
        }
        clearTimeout(this.TimerId)
        this.TimerId = setTimeout(async () => {
            let { message: res } = await $get("/goods/qsearch", { query: value })
            this.setData({
                qsearch: res,
                isQsearchShow: true
            })
        }, 1000)
    },
    // 获取轮播图
    async getSwiperList() {
        let { message: res } = await $get("/home/swiperdata")
        res.forEach(r => {
            r.navigator_url = r.navigator_url.replace(/main/, 'index')
        })
        this.setData({
            swiperList: res
        })
    },
    // 获取导航区域
    async getNavList() {
        let { message: res } = await $get("/home/catitems")
        res.forEach(r => {
            // console.log(r);
            if (r.navigator_url) r.navigator_url = r.navigator_url.replace(/main/, 'index')
        })
        this.setData({
            navList: res
        })
    },
    // 获取楼层区域的数据
    async getFloorList() {
        let { message: res } = await $get("/home/floordata")
        res.forEach(r => {
            r.product_list.forEach(r => {
                r.navigator_url = r.navigator_url.replace(/\?/, "/index?")
            })
        })
        this.setData({
            floorList: res
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getSwiperList()
        this.getNavList()
        this.getFloorList()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

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