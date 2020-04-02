
import {
  request
} from "../../request/request.js"// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
    tabs: [{
      id: 0,
      value: "全部",
      isActive: true,
      type: 1,
    }, {
      id: 1,
      value: "待付款",
      isActive: false,
      type: 2,
    }, {
      id: 2,
      value: "待发货",
      isActive: false,
      type: 3, //订单类型
    }],
    type: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = 1
    this.getorders(type)
  },
  // 获取订单数据
  async getorders(type) {
    // 请求 拿到对应 type 的数据
    let { orders } = await request({
      url: "/my/orders/all",
      data: {
        type
      }
    })
    console.log(orders)
    orders.forEach(v => {
      v["create_time_cn"] = (new Date(v.create_time * 1000).toLocaleString())
    })
    this.setData({
      orders
    })
  },
  // 点击切换
  handletabsChange(e) {
    console.log(e.detail)
    let tabs = e.detail;
    tabs.map(async v => {
      if (v.isActive) {
        let type = v.type
        this.getorders(type)
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})