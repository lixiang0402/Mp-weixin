// components/goodslist/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartGoods: {
      type: Array
    },
    number: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    cartGoods: []
  },
  lifetimes: {
    attached() {
      this.setData({
        cartGoods: getApp().globalData.cartGoods
      });
      console.log(this.data.cartGoods)

    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})