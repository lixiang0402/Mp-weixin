// pages/goods_detail/index.js
import { $get } from '../../request/index'
import { showToast } from '../../utils/index'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        goods_id: '',
        goodsObj: {},
        // originalGoodsObj:{},
        goodsCartLength: 0,
        isCollect: false
    },
    GoodsInfo: {},
    async getGoodsDetail() {
        console.log("getGOodsDetail执行")
        let { message: goodsObj } = await $get('/goods/detail', { goods_id: this.data.goods_id })
        this.GoodsInfo = goodsObj
        this.setData({
            goodsObj: {
                pics: goodsObj.pics,
                goods_id: goodsObj.goods_id,
                goods_price: goodsObj.goods_price,
                goods_name: goodsObj.goods_name,
                //数据中有webp格式 iphone不支持webp  正则替换jpg
                goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg')
            }
        })
    },
    collect(e) {
        let collectCart = wx.getStorageSync('collectCart') || [];
        let id = e.currentTarget.dataset.id
        let Nedd = collectCart.findIndex(r => parseInt(r.goods_id) == id)
        let isCollect = false
        console.log("收藏功能执行")
        if (Nedd == -1) {
            collectCart.push(this.GoodsInfo)
            isCollect = true
            showToast("添加收藏成功")
        } else {
            collectCart = collectCart.filter(r => r.goods_id !== id)
            isCollect = false
            showToast("已取消收藏")
        }
        this.setData({
            isCollect
        })
        wx.setStorageSync('collectCart', collectCart);
    },
    // 点击加入购物车
    addCart() {
        // console.log(this.GoodsInfo);
        //  获取缓存中的购物车数组  
        // 添加商品判断缓存数组中是否存在
        //  不存在给当前商品添加一个num值=1 然后push
        //  如果存在将num值++push 
        //  最终将新的数据 覆盖掉缓存中的数组
        let cart = wx.getStorageSync("cart") || [];
        // console.log(cart);
        let index = cart.findIndex(r => r.goods_id === this.GoodsInfo.goods_id)
        console.log(index);
        // index=-1 代表数组中没有加入购物车的商品
        // =0代表存在当前加入购物车的商品
        if (index === -1) {
            this.GoodsInfo.num = 1
            this.GoodsInfo.checked = false
            cart.push(this.GoodsInfo)
        } else {
            cart[index].num++
        }
        wx.setStorageSync('cart', cart);
        wx.showToast({
            title: '加入购物车成功',
            icon: 'success',
            mask: true,
        });
        this.getCartGoodsLength()
    },
    // 点击轮播图查看大图
    previewImage(e) {
        wx.previewImage({
            urls: this.data.goodsObj.pics.map(r => r.pics_big),
            current: e.currentTarget.dataset.item
        })
    },
    // 从storage中获取购物车数据 获取length
    getCartGoodsLength() {
        let cart = wx.getStorageSync('cart');
        this.setData({
            goodsCartLength: cart.length
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.data.goods_id = options.goods_id;
        this.getGoodsDetail()
    },

    onClickService() {},
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        // 购物车角标显示
        this.getCartGoodsLength()

        // 再onshow方法中 获取options
        let curPages = getCurrentPages();
        let page = curPages[curPages.length - 1]
        let id = parseInt(page.options.goods_id)
        // 收藏功能
        console.log(id)
        let collectCart = wx.getStorageSync('collectCart');
        let isCollect = collectCart.findIndex(r => r.goods_id == id)
        console.log(isCollect)
        if (isCollect == -1) {
            this.setData({
                isCollect: false
            })
        } else {
            this.setData({
                isCollect: true
            })
        }
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