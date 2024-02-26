"use strict";
const common_vendor = require("../../../common/vendor.js");
const axios = require("../../../axios.js");
const pinia_myUser = require("../../../pinia/myUser.js");
if (!Math) {
  DynamicStateBlockOne();
}
const DynamicStateBlockOne = () => "../../module/DynamicStateBlock/DynamicStateBlockOne.js";
const _sfc_main = {
  __name: "DynamicState",
  props: {
    message: Object
  },
  setup(__props) {
    const Props = __props;
    pinia_myUser.useMyUser();
    common_vendor.onMounted(() => {
      getUserEvent();
    });
    let eventArray = common_vendor.reactive([]);
    function getUserEvent() {
      axios.instance.get("/user/event", {
        params: {
          uid: 8866570372
        }
      }).then((res) => {
        eventArray.push(...res.data.events);
        console.log(eventArray);
      }).catch((err) => {
        console.error(err);
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(eventArray), (item, index, i0) => {
          return {
            a: index,
            b: "0d1bb299-0-" + i0,
            c: common_vendor.p({
              message: item
            })
          };
        }),
        b: Props.message.TF
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0d1bb299"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/User/DynamicState/DynamicState.vue"]]);
wx.createComponent(Component);
