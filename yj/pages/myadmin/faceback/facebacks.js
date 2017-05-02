// pages/logs/logss.js
Page({
  data:{
    disabled:true,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  input:function(e){
    var that=this;
    if(e.detail.value){
      that.setData({
        disabled:false
      })
    }
    else{
      that.setData({
        disabled:true
      })
    }
  },

  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  formSubmit: function(e) {
    var that = this;
    wx.request({
      url: 'https://www.webozhong.com/api/index/savefeedback',
      data: {
        message:e.detail.value.message,
        number:e.detail.value.number
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        console.log(res);
        console.log(res.data);
        console.log("success");
        //console.log(data.meesage);
        //console.log(data.number);
        
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  
})