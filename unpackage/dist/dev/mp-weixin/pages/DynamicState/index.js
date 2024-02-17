"use strict";
const common_vendor = require("../../common/vendor.js");
const axios = require("../../axios.js");
const pinia_myUser = require("../../pinia/myUser.js");
if (!Math) {
  More();
}
const More = () => "../module/More.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const myUser = pinia_myUser.useMyUser();
    common_vendor.onMounted(() => {
      if (myUser.profile.code) {
        getEvent(lasttime.value);
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
          lasttime: lasttimes
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
    function JsonStringObj(event) {
      return JSON.parse(event);
    }
    function formatTimestampToDateString(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      return year + "-" + month + "-" + day;
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
            a: item.user.avatarUrl,
            b: common_vendor.t(item.user.nickname),
            c: common_vendor.t(formatTimestampToDateString(item.showTime)),
            d: common_vendor.t(JsonStringObj(item.json).msg),
            e: index
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-71afb68e"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/DynamicState/index.vue"]]);
wx.createPage(MiniProgramPage);
