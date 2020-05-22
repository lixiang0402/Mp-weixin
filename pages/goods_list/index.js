// pages/goods_list/index.js
import { $get } from '../../request/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0,
        goodsList: [],
        queryInfo: {
            query: "",
            cid: "",
            pagenum: 1,
            pagesize: 10
        }
    },
    Total: 0,
    search(e) {
        wx.navigateTo({
            url: '../search/index',
        });
    },
    onChange(event) {

    },
    async getGoodsList() {
        let { message: res } = await $get('/goods/search', this.data.queryInfo)
        this.Total = Math.ceil(res.total / this.data.queryInfo.pagesize)
        this.setData({
            goodsList: [...this.data.goodsList, ...res.goods]
        })
        wx.stopPullDownRefresh()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.data.queryInfo.cid = options.cid || ""
        this.data.queryInfo.query = options.query || ""
        this.getGoodsList()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

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
        this.data.goodsList = []
        this.data.queryInfo.pagenum = 1;
        this.getGoodsList()
        // wx.startPullDownRefresh()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        if (this.data.queryInfo.pagenum >= this.Total) {
            wx.showToast({
                title: '没有更多数据了呢~',
                icon: 'none',
            });
        } else {
            this.data.queryInfo.pagenum++;
            this.getGoodsList()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})