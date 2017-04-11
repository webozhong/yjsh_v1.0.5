//app.js
//app.js


App({
  globalData: {
    encryptedData: "",
    userInfo: "",
    js_code: "",
    openid: "",
    session_key: ""
  },
  getUserInfo: function (cb) {
    var that = this;
    var users = wx.getStorageSync('users')||{};
    var userInfo = wx.getStorageSync('userInfo')||{};
    // var url = "https://api.weixin.qq.com/sns/jscode2session";
    // var data = {
    //   appid: "wx71342e901702563e",
    //   secret: "35c7ae455cbaba53adb3c11b054b7093",
    //   js_code: that.globalData.js_code,
    //   grant_type: "authorization_code"
    // }

    if (that.globalData.userInfo) {
      typeof cb == "function" && cb(that.globalData.userInfo)
    } else {
      wx.login({
        success: res => {

          that.globalData.js_code = res.code
          wx.getUserInfo({
            success: res => {
              that.globalData.userInfo = res.userInfo;
              var objz = {};
              objz.userInfo = res.userInfo;
              wx.setStorageSync('userInfo',objz)
              typeof cb == "function" && cb(that.globalData.userInfo);

              // 请求官方接口，获取openid和session_key
              wx.request({
                url: "https://api.weixin.qq.com/sns/jscode2session",
                data: {
                  appid: "wx71342e901702563e",
                  secret: "35c7ae455cbaba53adb3c11b054b7093",
                  js_code: that.globalData.js_code,
                  grant_type: "authorization_code"
                },
                success: function (res) {
                  var obj = {};
                  console.log(res.data, that);
                  obj.openid = res.data.openid;
                  obj.session_key = res.data.session_key;
                  wx.setStorageSync('users',obj);
                  
                  // console.log(that.globalData.userInfo);
                  console.log(users,userInfo);
                },
                fail: function () {

                }
              })

              // ajaxUserInfo(url, data);

            }
          })
        }
      })
    }

  }


  //   wx.getUserInfo({
  //   success: function(res) {
  //     var userInfo = res.userInfo
  //     var nickName = userInfo.nickName
  //     var avatarUrl = userInfo.avatarUrl
  //     var gender = userInfo.gender //性别 0：未知、1：男、2：女 
  //     var province = userInfo.province
  //     var city = userInfo.city
  //     var country = userInfo.country
  //   }
  // })
  // encryptedData 解密后为以下 json 结构，详见加密数据解密算法
  // {
  //     "openId": "OPENID",
  //     "nickName": "NICKNAME",
  //     "gender": GENDER,
  //     "city": "CITY",
  //     "province": "PROVINCE",
  //     "country": "COUNTRY",
  //     "avatarUrl": "AVATARURL",
  //     "unionId": "UNIONID",
  //     "watermark":
  //     {
  //         "appid":"APPID",
  //     "timestamp":TIMESTAMP
  //     }
  // }

})


// function ajaxUserInfo(url, data) {
//   var xhr = new XMLHttpRequest();
//   if (xhr) {
//     xhr.open("POST", url, true);
//     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
//     req.send(data);
//     req.onreadystatechange = function () {
//       if (req.readyState == 4) {
//         if (req.status == 200) {
//           console.log("success");
//         } else {
//           console.log("error");
//         }
//       }
//     }
//   }

// }