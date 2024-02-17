"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const axios = require("../../axios.js");
const pinia_myPlayBack = require("../../pinia/myPlayBack.js");
const pinia_myMore = require("../../pinia/myMore.js");
const pinia_myShare = require("../../pinia/myShare.js");
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
    const myMore = pinia_myMore.useMyMore();
    const myShare = pinia_myShare.useMyShare();
    common_vendor.onMounted(() => {
      getPlaylistDetail(Props.id);
      getPlaylistDetailDynamic(Props.id);
    });
    let listObj = common_vendor.reactive({});
    let listArray = common_vendor.reactive([]);
    function getPlaylistDetail(ids) {
      axios.instance.get("/playlist/detail", {
        params: {
          id: ids
        }
      }).then((res) => {
        Object.assign(listObj, res.data.playlist);
        listArray.push(...res.data.playlist.tracks);
      }).catch((err) => {
        console.error(err);
      });
    }
    let countObj = common_vendor.reactive({});
    function getPlaylistDetailDynamic(ids) {
      axios.instance.get("/playlist/detail/dynamic", {
        params: {
          id: ids
        }
      }).then((res) => {
        Object.assign(countObj, res.data);
      }).catch((err) => {
        console.error(err);
      });
    }
    function getCurrentMonthDay() {
      const currentDate = /* @__PURE__ */ new Date();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const monthDay = month.toString().padStart(2, "0") + "月" + day.toString().padStart(2, "0") + "日";
      return monthDay;
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
    function SongClick(lisArray) {
      myPlayBack.PostAddSongList(listArray);
    }
    let bt = common_vendor.ref(null);
    function scrollToLower() {
      console.log("底部");
      bt.value = 1;
    }
    function scrollToUpper() {
      console.log("离开底部");
      bt.value = null;
    }
    function routerReturn() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => routerReturn()),
        b: common_vendor.unref(bt) == 1,
        c: common_vendor.unref(listObj).coverImgUrl,
        d: common_vendor.t(common_vendor.unref(listObj).name),
        e: common_vendor.unref(bt) === 1,
        f: common_vendor.unref(listObj).coverImgUrl,
        g: common_vendor.t(getCurrentMonthDay()),
        h: common_assets._imports_2$3,
        i: common_vendor.t(formatFansCount(common_vendor.unref(countObj).bookedCount)),
        j: common_assets._imports_1$7,
        k: common_vendor.t(formatFansCount(common_vendor.unref(countObj).commentCount)),
        l: common_assets._imports_2$4,
        m: common_vendor.t(formatFansCount(common_vendor.unref(countObj).shareCount)),
        n: common_vendor.o(($event) => common_vendor.unref(myShare).SharePost(2, Props.id)),
        o: common_assets._imports_0$4,
        p: common_vendor.o(($event) => common_vendor.unref(myPlayBack).PlayDifference(common_vendor.unref(listArray))),
        q: common_vendor.t(common_vendor.unref(listObj).trackCount),
        r: common_assets._imports_1$4,
        s: common_assets._imports_1,
        t: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: index,
            b: "a6f32dad-0-" + i0,
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
        v: common_vendor.o(($event) => SongClick(common_vendor.unref(listArray))),
        w: common_vendor.unref(myMore).TF
      }, common_vendor.unref(myMore).TF ? {} : {}, {
        x: common_vendor.unref(myShare).ShowTF
      }, common_vendor.unref(myShare).ShowTF ? {} : {}, {
        y: common_vendor.o(scrollToLower),
        z: common_vendor.o(scrollToUpper)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a6f32dad"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/OfficialListDetails/index.vue"]]);
wx.createPage(MiniProgramPage);
