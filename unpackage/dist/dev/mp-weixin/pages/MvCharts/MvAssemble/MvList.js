"use strict";
const common_vendor = require("../../../common/vendor.js");
const axios = require("../../../axios.js");
if (!Math) {
  Mvblock();
}
const Mvblock = () => "../MV/Mvblock.js";
const _sfc_main = {
  __name: "MvList",
  props: {
    message: Object
  },
  setup(__props) {
    const Props = __props;
    common_vendor.onMounted(() => {
      getTopMv(Props.message.name);
    });
    let listArray = common_vendor.reactive([]);
    function getTopMv(name) {
      axios.instance.get("/top/mv", {
        params: {
          limit: 50,
          area: name
        }
      }).then((res) => {
        listArray.push(...res.data.data);
      }).catch((err) => {
        console.error(err);
      });
    }
    function getDate() {
      const date = /* @__PURE__ */ new Date();
      const currentMonth = date.getMonth() + 1;
      const currentDate = date.getDate();
      return currentMonth + "月" + currentDate + "日";
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(getDate()),
        b: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: index,
            b: "f0057fa1-0-" + i0,
            c: common_vendor.p({
              message: {
                obj: item,
                index
              }
            })
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f0057fa1"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/MvCharts/MvAssemble/MvList.vue"]]);
wx.createComponent(Component);
