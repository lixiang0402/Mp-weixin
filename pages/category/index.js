// pages/category/index.js
import { $get } from '../../request/index';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftMenuList: [],
        rightMenuList: [],
        activeIndex: 0,
        cates: [],
        scrollTop: 0
    },
    search(e) {
        wx.navigateTo({
            url: '../search/index'
        });
    },
    async getMenuList() {
        let { message: cates } = await $get("/categories")
        wx.setStorageSync("cates", { time: Date.now(), data: cates });
        // console.log(res);
        let leftMenuList = cates.map(r => r.cat_name)
        let rightMenuList = cates[0].children
        this.setData({
            cates,
            leftMenuList,
            rightMenuList
        })
    },
    changeTitleAndShow(e) {
        let activeIndex = e.currentTarget.dataset.i
        let rightMenuList = this.data.cates[activeIndex].children
        this.setData({
            activeIndex,
            rightMenuList,
            scrollTop: 0
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 缓存效果
        // 思路 1.进入页面查看storage查看是否存储了cates 
        // 为空则请求服务器  
        //   2. 如果有再查看 是否超过了过期时间 
        // 超过过期时间重新请求 否则取出key

        const Cates = wx.getStorageSync('cates');
        console.log(Cates);

        if (!Cates) {
            this.getMenuList()
        } else {
            // 判断缓存中的内容是否超时 测试10s
            console.log(Cates.time, Date.now());
            if (Date.now() - Cates.time < 1000 * 10) {
                let leftMenuList = Cates.data.map(r => r.cat_name)
                let rightMenuList = Cates.data[0].children
                this.setData({
                    cates: Cates.data,
                    leftMenuList,
                    rightMenuList
                })
            } else {
                this.getMenuList()
            }
        }


        // this.getMenuList()
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