"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const pinia_myUser = require("../../pinia/myUser.js");
const _sfc_main = {
  __name: "More",
  props: {
    sort: String
  },
  setup(__props) {
    const Props = __props;
    const myUser = pinia_myUser.useMyUser();
    let listArray = [
      {
        name: null,
        data: [{
          dataName: "我的消息",
          image: common_assets.sx
        }]
      },
      {
        name: "音乐服务",
        data: [
          {
            dataName: "专辑商城",
            image: common_assets.zjsc
          },
          {
            dataName: "歌单广场",
            image: common_assets.gd$1
          }
        ]
      },
      {
        name: null,
        data: [
          {
            dataName: "分享杰瑞音乐",
            image: common_assets._imports_3$3
          },
          {
            dataName: "关于",
            image: common_assets.gy
          }
        ]
      }
    ];
    function method(event) {
      switch (event) {
        case "专辑商城":
          routerPush("/pages/DigitalAlbum/index");
          break;
        case "歌单广场":
          routerPush("/pages/SongList/index");
          break;
        case "立即登录":
          routerPush("/pages/LogIn/index");
          break;
        case "用户":
          routerPush("/pages/UserDetails/index");
          break;
      }
    }
    function routerPush(center) {
      ClickCssTF.value = 1;
      setTimeout(function() {
        ClickCssTF.value = -1;
        ClickTF.value = 0;
        common_vendor.index.navigateTo({
          url: center
        });
      }, 300);
    }
    let ClickTF = common_vendor.ref(-1);
    let ClickCssTF = common_vendor.ref(-1);
    function Click(event) {
      if (event == 0) {
        ClickCssTF.value = 1;
        setTimeout(function() {
          ClickCssTF.value = -1;
          ClickTF.value = 0;
        }, 300);
      } else {
        ClickTF.value = event;
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: Props.sort == 1
      }, Props.sort == 1 ? {
        b: common_vendor.o(($event) => Click(1))
      } : {}, {
        c: Props.sort == 2
      }, Props.sort == 2 ? {
        d: common_vendor.o(($event) => Click(1))
      } : {}, {
        e: common_vendor.unref(ClickTF) == 1
      }, common_vendor.unref(ClickTF) == 1 ? common_vendor.e({
        f: common_vendor.unref(myUser).profile.code == 200
      }, common_vendor.unref(myUser).profile.code == 200 ? {
        g: common_vendor.unref(myUser).profile.profile.avatarUrl
      } : {}, {
        h: common_vendor.unref(myUser).profile.code == 200
      }, common_vendor.unref(myUser).profile.code == 200 ? {
        i: common_vendor.t(common_vendor.unref(myUser).profile.profile.nickname),
        j: common_vendor.o(($event) => method("用户"))
      } : {
        k: common_vendor.o(($event) => method("立即登录"))
      }, {
        l: common_assets._imports_0$9,
        m: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return common_vendor.e({
            a: item.name
          }, item.name ? {
            b: common_vendor.t(item.name)
          } : {}, {
            c: common_vendor.f(item.data, (items, indexs, i1) => {
              return {
                a: items.image,
                b: common_vendor.t(items.dataName),
                c: common_vendor.o(($event) => method(items.dataName), indexs),
                d: indexs
              };
            }),
            d: index
          });
        }),
        n: common_vendor.unref(ClickCssTF) == 1 ? 1 : ""
      }) : {}, {
        o: common_vendor.unref(ClickTF) == 1
      }, common_vendor.unref(ClickTF) == 1 ? {
        p: common_vendor.o(($event) => Click(0)),
        q: common_vendor.unref(ClickCssTF) == 1 ? 1 : ""
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-057b4387"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/module/More.vue"]]);
wx.createComponent(Component);
