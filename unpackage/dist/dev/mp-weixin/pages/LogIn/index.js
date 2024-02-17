"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const axios = require("../../axios.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let phone = common_vendor.ref("");
    let LogInTF = common_vendor.ref(null);
    function LogInClick() {
      if (phone.value.length != 11) {
        LogInTF.value = 1;
        phone.value = "";
        setTimeout(function() {
          LogInTF.value = -1;
        }, 250);
      } else {
        postCaptchSent(phone.value);
        common_vendor.wx$1.navigateTo({
          url: "/pages/Verify/index?phone=" + phone.value
        });
      }
    }
    function postCaptchSent(phones) {
      axios.instance.get("/captcha/sent", {
        params: {
          phone: phones
        }
      }).then((res) => {
      }).catch((err) => {
        console.error(err);
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$9,
        b: common_assets._imports_0$9,
        c: common_vendor.unref(phone),
        d: common_vendor.o(($event) => common_vendor.isRef(phone) ? phone.value = $event.detail.value : phone = $event.detail.value),
        e: common_vendor.o(($event) => LogInClick()),
        f: common_vendor.unref(LogInTF) === 1 ? 1 : ""
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6481b1ef"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/LogIn/index.vue"]]);
wx.createPage(MiniProgramPage);
