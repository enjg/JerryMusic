"use strict";
const common_vendor = require("../../../common/vendor.js");
const axios = require("../../../axios.js");
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
    common_vendor.onMounted(() => {
      getUserEvent(Props.message.id);
    });
    let listArray = common_vendor.reactive([]);
    let lasttimes = common_vendor.ref(-1);
    function getUserEvent(ids) {
      axios.instance.get("/user/event", {
        params: {
          uid: ids
        }
      }).then((res) => {
        lasttimes.value = res.data.lasttime;
        listArray.push(...res.data.events);
        console.log(res.data);
      }).catch((err) => {
        console.error(err);
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: index,
            b: "f3a97673-0-" + i0,
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
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f3a97673"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/UserDetails/module/DynamicState.vue"]]);
wx.createComponent(Component);
