"use strict";
const common_vendor = require("../../../common/vendor.js");
const axios = require("../../../axios.js");
const pinia_myUser = require("../../../pinia/myUser.js");
const _sfc_main = {
  __name: "HomePage",
  props: {
    message: Object
  },
  setup(__props) {
    const Props = __props;
    pinia_myUser.useMyUser();
    common_vendor.onMounted(() => {
      getArtists(Props.message.id);
      getSimiArtist(Props.message.id);
    });
    let artist = common_vendor.reactive({});
    let hotSongs = common_vendor.reactive([]);
    function getArtists(ids) {
      axios.instance.get("/artists", {
        params: {
          id: ids
        }
      }).then((res) => {
        Object.assign(artist, res.data.artist);
        hotSongs.push(...res.data.hotSongs);
      }).catch((err) => {
        console.error(err);
      });
    }
    function getSimiArtist(ids) {
      console.log(ids);
      axios.instance.get("/simi/artist", {
        params: {
          id: ids
        }
      }).then((res) => {
        console.log(res.data);
      }).catch((err) => {
        console.error(err);
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(hotSongs).slice(0, 10), (item, index, i0) => {
          return {
            a: item.al.picUrl,
            b: common_vendor.t(item.name),
            c: common_vendor.f(item.ar, (items, indexs, i1) => {
              return common_vendor.e({
                a: common_vendor.t(items.name),
                b: indexs < item.ar.length - 1
              }, indexs < item.ar.length - 1 ? {} : {}, {
                c: indexs
              });
            }),
            d: index
          };
        }),
        b: common_vendor.t(common_vendor.unref(artist).briefDesc),
        c: Props.message.tf
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1fa352e0"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/Singer/module/HomePage.vue"]]);
wx.createComponent(Component);
