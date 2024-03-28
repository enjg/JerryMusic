"use strict";
const common_vendor = require("../../common/vendor.js");
const axios = require("../../axios.js");
const pinia_myUser = require("../../pinia/myUser.js");
if (!Array) {
  const _component_Player = common_vendor.resolveComponent("Player");
  _component_Player();
}
if (!Math) {
  (More + DynamicStateBlockOne)();
}
const DynamicStateBlockOne = () => "../module/DynamicStateBlock/DynamicStateBlockOne.js";
const More = () => "../module/More.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const myUser = pinia_myUser.useMyUser();
    common_vendor.onMounted(() => {
      if (myUser.profile.code) {
        getEvent(lasttime.value);
      }
      getEvent(lasttime.value);
      if (myUser.cookie !== null) {
        getTopic();
      }
    });
    common_vendor.watch(() => myUser.profile, () => {
      getEvent(lasttime.value);
    }, {
      deep: true
    });
    let listArray = common_vendor.reactive([]);
    let lasttime = common_vendor.ref(null);
    function getEvent(lasttimes) {
      axios.instance.get("/event", {
        params: {
          lasttime: lasttimes,
          cookie: myUser.cookie
        }
      }).then((res) => {
        console.log(res.data);
        listArray.push(...res.data.event);
      }).catch((err) => {
        console.error(err);
      });
    }
    function routerPush() {
      common_vendor.wx$1.navigateTo({
        url: "/pages/LogIn/index"
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          sort: 1
        }),
        b: !common_vendor.unref(myUser).profile.code
      }, !common_vendor.unref(myUser).profile.code ? {
        c: common_vendor.o(($event) => routerPush())
      } : {}, {
        d: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: index,
            b: "71afb68e-1-" + i0,
            c: common_vendor.p({
              message: item
            })
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-71afb68e"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/DynamicState/index.vue"]]);
wx.createPage(MiniProgramPage);
