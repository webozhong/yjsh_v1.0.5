var app = getApp();
var page1 = 0;
var url = "https://www.webozhong.com/weapp/api.php";
var key = true;
var key2 = true;
var pages = 1;
var GetList = function (that) {
  if (key && page1 < pages) {
    key = false;
    //请求服务器的数据
    wx.request({
      url: url,
      data: {
        act: 0,
        page: page1
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(1, res);
        for (var i = 0; i < res.data.jsonObj.length; i++) {
          res.data.jsonObj[i].thumbnails = res.data.jsonObj[i].thumbnails.split(";");
        };
        var lists = that.data.list;
        pages = res.data.totalPage;
        console.log(pages, page1, lists);
        for (var j = 0; j < res.data.jsonObj.length; j++) {
          lists.push(res.data.jsonObj[j]);
        }
        page1++;

        that.setData({
          list: lists,
        });
      },
      fail: function () {
      }
    })
  }

}


// 轮播图请求数据
// var Banner = function (that) {
//   if (key2) {
//     wx.request({
//       url: url,
//       data: {
//         act: 2
//       },
//       header: {
//         'content-type': 'application/json'
//       },
//       success: function (res) {
//         console.log(res);
//         for (var i = 0; i < res.data.length; i++) {
//           res.data[i].thumbnails = res.data[i].thumbnails.split(";");
//         };
//         var imgUrls = that.data.imgUrls;


//         for (var j = 0; j < 3; j++) {
//           imgUrls.push(res.data[j]);
//         }

//         that.setData({
//           imgUrls: imgUrls,
//         });
//       },
//       fail: function () {
//       }

//     })
//   }
// }


Page({
  data: {
    list: [],
    hs: "",
    imgUrls: [],
    interval: 5000,
    duration: 1000,
    scrollTop: 0,
    floorstatus: null,
    userInfos:{}
  },
  lower: function () {
    var that = this;
    key = true;

    GetList(that);

    console.log(1111111);

  },
  onShareAppMessage: function () {
    return {
      title: '遇见书画',
      desc: '遇见书画，遇见最美好的你！',
      path: '/pages/index/index'
    }
  },
 
  onLoad: function (options) {
    app.getUserInfo();
    var users = wx.getStorageSync('users');
    var userInfo = wx.getStorageSync('userInfo');
    console.log(wx.getStorageSync('users'),users.openid);
    
    var that = this;
    // Banner(that);

    var h = 0;

    //获取屏幕信息  
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res);
        h = res.windowHeight;
        that.setData({
          hs: h
        })
      }
    })


  },
  onShow: function () {
    //   在页面展示之后先获取一次数据
    var that = this;
    GetList(that);

  },
  //回到顶部
  backToTop: function () {
    this.setData({ scrollTop: 0 });
    // console.log(event);
  },
  //滚动显隐回到顶部按钮
  scrollTo: function (event) {
    if (event.detail.scrollTop > 1000) {
      this.setData({ floorstatus: true });
    } else {
      this.setData({ floorstatus: false });
    }
  }
})
