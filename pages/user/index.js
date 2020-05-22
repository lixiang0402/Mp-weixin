// pages/user/index.

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userinfo: {},
        collectCarLength: 0
    },
    // 点击按钮获取用户信息
    getuserinfo(e) {
        let userinfo = e.detail.userInfo;
        this.setData({
            userinfo
        })
        wx.setStorageSync('userinfo', userinfo);
    },
    previewImg(e) {
        let img = e.currentTarget.dataset.image
        wx.previewImage({
            current: img,
            urls: [img],
        });
    },
    feedback() {},
    callKefu() {
        wx.makePhoneCall({
            phoneNumber: "18330010171",
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    // 跳转去收藏页面
    toCollectPage() {
        wx.navigateTo({
            url: '/pages/collect/index',
        });
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
        let userinfo = wx.getStorageSync('userinfo');
        // 获取缓存中收藏商品的数量
        let collects = wx.getStorageSync('collectCart') || [];
        this.setData({
            userinfo,
            collectCarLength: collects.length
        })
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