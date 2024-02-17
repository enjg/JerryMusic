"use strict";
const common_vendor = require("../../common/vendor.js");
const axios = require("../../axios.js");
const pinia_myUser = require("../../pinia/myUser.js");
const _sfc_main = {
  __name: "index",
  props: {
    phone: String
  },
  setup(__props) {
    const Props = __props;
    const myUser = pinia_myUser.useMyUser();
    let VerificationCode = common_vendor.ref("");
    common_vendor.watch(() => VerificationCode.value, (newValue) => {
      if (newValue.length == 4) {
        postCaptchaVerify(Props.phone, newValue);
      }
    });
    function postCaptchaVerify(phones, captchas) {
      axios.instance.get("/captcha/verify", {
        params: {
          phone: phones,
          captcha: captchas
        }
      }).then((res) => {
        if (res.data.code == 200) {
          postLoginCellphone(phones, captchas);
        }
      }).catch((err) => {
        console.error(err);
      });
    }
    function postLoginCellphone(phones, captchas) {
      axios.instance.get("/login/cellphone", {
        params: {
          phone: phones,
          captcha: captchas
        }
      }).then((res) => {
        myUser.cookie = res.data.cookie;
        getUserDetail(res.data.account.id);
      }).catch((err) => {
        console.error(err);
      });
    }
    function getUserDetail(ids) {
      axios.instance.get("/user/detail", {
        params: {
          uid: ids
        }
      }).then((res) => {
        console.log(res.data);
        Object.assign(myUser.profile, res.data);
        common_vendor.wx$1.navigateBack({
          delta: 2
          // 返回的页面层数，1表示返回上一级页面，2表示返回上两级页面，以此类推
        });
      }).catch((err) => {
        console.error(err);
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(Props.phone),
        b: common_vendor.unref(VerificationCode),
        c: common_vendor.o(($event) => common_vendor.isRef(VerificationCode) ? VerificationCode.value = $event.detail.value : VerificationCode = $event.detail.value)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8a81cb5a"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/Verify/index.vue"]]);
wx.createPage(MiniProgramPage);
