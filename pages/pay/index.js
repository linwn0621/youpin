import {
  getSetting,
  openSetting,
  chooseAddress,
  requestPayment,
  showToast
} from "../../utils/asyncWx.js"
import {
  request
} from "../../request/request.js"
// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {}, //存收货信息 
    cars: [],//购物小车数据
    totalmoney: 0,//总价
    totalnum: 0//总数量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取购物车小车商品内容 cars
    const cars = wx.getStorageSync("cars") || []
    //获取当前选择的地址
    let address = wx.getStorageSync("address") || {};

    this.setData({
      cars, address
    })
    this.getmoney(cars)
  },
  // 计算价格数量
  getmoney(cars) {
    let totalmoney = 0;
    let totalnum = 0;
    cars.forEach(v => {
      if (v.checked) {
        totalnum += v.num
        totalmoney += v.num * v.goods_price
      }
    });
    this.setData({
      totalmoney, totalnum, cars
    })
    console.log(totalmoney)
  },
  // 选择地址
  async handleAddressChoose(e) {
    // 捕捉错误
    try {
      // 先查询用户是否有权限
      const setting = await getSetting();
      console.log(setting)
      //打开微信的权限设置 看能不能直接设置地址权限
      if (!setting.authSetting["scope.address"]) {
        //打开设置授权页面
        await openSetting();

      }
      //获取用户的地址 wx.chooseAddress
      let address = await chooseAddress();
      console.log(address)
      //拼接地址
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      //存到缓存和 this.data中
      wx.setStorageSync("address", address);
      this.setData({
        address
      })
    } catch (e) {
      console.log(e)
    }
  },
  // 重选地址
  async handleChange() {
    try {
      //获取用户的地址 wx.chooseAddress
      let address = await chooseAddress();
      console.log(address)
      //拼接地址
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      //存到缓存和 this.data中
      wx.setStorageSync("address", address);
      this.setData({
        address
      })

    } catch (e) {

    }
  },
  // 点击去支付
  async handlePay() {
    try {
      const token = wx.getStorageSync("token");
      // 判断是否有token
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/index',
        })
        // console.log(123)
      }
      // 获取创建订单所需数据
      const { totalmoney, address, cars } = this.data
      const order_price = totalmoney
      const consignee_addr = address.all
      let goods = []
      cars.forEach(v => {
        if (v.checked) {
          let params = {}
          params["goods_id"] = v.goods_id
          params["goods_number"] = v.num
          params["goods_price"] = v.goods_price
          goods.push(params)
        }
      })
      // 发请求创建订单
      const {
        order_number
      } = await request({
        url: "/my/orders/create",
        method: "post",
        data: { order_price, consignee_addr, goods }
      });

      // 获取支付参数
      const {
        pay
      } = await request({
        url: "/my/orders/req_unifiedorder",
        method: "post",
        data: { order_number }
      })
      // 4.发起支付 wx.requestPayment //https://developers.weixin.qq.com/miniprogram/dev/api/open-api/payment/wx.requestPayment.html 
      //https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=9_1
      await requestPayment(pay);
  
      //5. 查询一下订单状态
      let res = await request({
        url: "/my/orders/chkOrder",
        method: "post",
        data: {
          order_number
        }
      });
      console.log(res)
      //提示用户 支付成功
      await showToast({
        title: "支付成功"
      });
      //6 手动删除已经支付的商品信息
      let newCarts = wx.getStorageSync("cars") || [];
      //!v.checked 没有被选中支付的商品
      newCarts = newCarts.filter(v => !v.checked)
      //设置回本地缓存
      wx.setStorageSync("cars", newCarts);
      //7. 跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/index',
      })

    } catch (e) {
      //提示用户 支付失败
      showToast({
        title: "支付失败"
      })
    }

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