"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const axios = require("../../axios.js");
const pinia_myPlayBack = require("../../pinia/myPlayBack.js");
const pinia_myShare = require("../../pinia/myShare.js");
const pinia_myMore = require("../../pinia/myMore.js");
if (!Array) {
  const _component_Player = common_vendor.resolveComponent("Player");
  _component_Player();
}
if (!Math) {
  (SongBlockOne + MoreDetails + ShareSort)();
}
const ShareSort = () => "../module/ShareSort.js";
const MoreDetails = () => "../module/MoreDetails.js";
const SongBlockOne = () => "../module/SongBlockStyle/SongBlockOne.js";
const _sfc_main = {
  __name: "index",
  props: {
    id: String
  },
  setup(__props) {
    const Props = __props;
    const myPlayBack = pinia_myPlayBack.useMyPlayBack();
    const myShare = pinia_myShare.useMyShare();
    const myMore = pinia_myMore.useMyMore();
    common_vendor.onMounted(() => {
      getAlbum(Props.id);
      getAlbumDetailDynamic(Props.id);
    });
    let listArray = common_vendor.reactive([]);
    let albumObj = common_vendor.reactive({});
    function getAlbum(id) {
      let time = Date.now();
      axios.instance.get("/album", {
        params: {
          id,
          timestamp: time
        }
      }).then((res) => {
        listArray.push(...res.data.songs);
        Object.assign(albumObj, res.data.album);
      }).catch((err) => {
        console.error(err);
      });
    }
    let countObj = common_vendor.reactive({});
    function getAlbumDetailDynamic(id) {
      axios.instance.get("/album/detail/dynamic", {
        params: {
          id
        }
      }).then((res) => {
        Object.assign(countObj, res.data);
      }).catch((err) => {
        console.error(err);
      });
    }
    function formatTimestampToDateString(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = "0" + (date.getMonth() + 1);
      const day = "0" + date.getDate();
      return year + "." + month + "." + day;
    }
    function routerReturn() {
      common_vendor.wx$1.navigateBack({
        delta: 1
        // 返回的页面层数，1表示返回上一级页面，2表示返回上两级页面，以此类推
      });
    }
    function formatFansCount(fansCount) {
      if (fansCount >= 1e8) {
        return (Math.floor(fansCount / 1e7) / 10).toFixed(1) + " 亿";
      } else if (fansCount >= 1e4) {
        return (Math.floor(fansCount / 1e3) / 10).toFixed(1) + " 万";
      } else {
        return fansCount;
      }
    }
    function Click(lisArray) {
      myPlayBack.PostAddSongList(listArray);
    }
    function routerPush(center, type, event) {
      common_vendor.wx$1.navigateTo({
        url: center + "?type=" + type + "&id=" + event + "&content=" + encodeURIComponent(JSON.stringify(
          albumObj
        ))
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$3,
        b: common_vendor.o(($event) => routerReturn()),
        c: common_vendor.unref(albumObj).name
      }, common_vendor.unref(albumObj).name ? {
        d: common_vendor.unref(albumObj).blurPicUrl,
        e: common_vendor.unref(albumObj).blurPicUrl,
        f: common_vendor.t(common_vendor.unref(albumObj).name),
        g: common_vendor.f(common_vendor.unref(albumObj).artists, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: index < common_vendor.unref(albumObj).artists.length - 1
          }, index < common_vendor.unref(albumObj).artists.length - 1 ? {} : {}, {
            c: index
          });
        }),
        h: common_vendor.t(formatTimestampToDateString(common_vendor.unref(albumObj).publishTime)),
        i: common_vendor.t(common_vendor.unref(albumObj).description)
      } : {}, {
        j: common_assets._imports_1$5,
        k: common_vendor.t(formatFansCount(common_vendor.unref(countObj).subCount)),
        l: common_assets._imports_1$6,
        m: common_vendor.t(formatFansCount(common_vendor.unref(countObj).commentCount)),
        n: common_vendor.o(($event) => routerPush("/pages/Review/index", 3, Props.id)),
        o: common_assets._imports_3$3,
        p: common_vendor.t(formatFansCount(common_vendor.unref(countObj).shareCount)),
        q: common_vendor.o(($event) => common_vendor.unref(myShare).SharePost(4, Props.id)),
        r: common_vendor.o(($event) => common_vendor.unref(myPlayBack).PlayDifference(common_vendor.unref(listArray))),
        s: common_assets._imports_0$4,
        t: common_vendor.o(($event) => common_vendor.unref(myPlayBack).PlayDifference(common_vendor.unref(listArray))),
        v: common_vendor.t(common_vendor.unref(listArray).length),
        w: common_assets._imports_1,
        x: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: index,
            b: "b4e1104c-0-" + i0,
            c: common_vendor.p({
              message: {
                name: item.name,
                index,
                mv: item.mv,
                ar: item.ar,
                fee: item.fee,
                hr: item.hr,
                sq: item.sq,
                id: item.id
              }
            })
          };
        }),
        y: common_vendor.o(($event) => Click(common_vendor.unref(listArray))),
        z: common_vendor.unref(myMore).TF
      }, common_vendor.unref(myMore).TF ? {} : {}, {
        A: common_vendor.unref(myShare).ShowTF
      }, common_vendor.unref(myShare).ShowTF ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b4e1104c"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/Album/index.vue"]]);
wx.createPage(MiniProgramPage);
