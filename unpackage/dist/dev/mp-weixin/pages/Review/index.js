"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const axios = require("../../axios.js");
if (!Math) {
  reviewBlock();
}
const reviewBlock = () => "../module/reviewBlock.js";
const _sfc_main = {
  __name: "index",
  props: {
    type: String,
    id: String
  },
  setup(__props) {
    const Props = __props;
    let sortType = common_vendor.ref(2);
    let time = common_vendor.ref(null);
    common_vendor.onMounted(() => {
      if (Props.type == 0) {
        getSongDetail(Props.id);
      }
      if (Props.type == 3) {
        getAlbum(Props.id);
      }
      getCommentHot(Props.id, Props.type, 20, 0);
    });
    common_vendor.watch(() => sortType.value, (newValue) => {
      time.value = null;
      commentListArray.length = 0;
      if (newValue == 2) {
        getCommentHot(Props.id, Props.type, 20, time.value);
      }
      if (newValue == 3) {
        getCommentNew(Props.id, Props.type, commentListArray.length / 20 + 1, 20, 3, time.value);
      }
    });
    let song = common_vendor.reactive({});
    function getSongDetail(id) {
      axios.instance.get("/song/detail", {
        params: {
          ids: id
        }
      }).then((res) => {
        Object.assign(song, res.data.songs[0]);
      }).catch((err) => {
        console.error(err);
      });
    }
    let albumObj = common_vendor.reactive({});
    function getAlbum(id) {
      axios.instance.get("/album", {
        params: {
          id
        }
      }).then((res) => {
        Object.assign(albumObj, res.data.album);
      }).catch((err) => {
        console.error(err);
      });
    }
    let commentListArray = common_vendor.reactive([]);
    function getCommentHot(ids, types, limits, befores) {
      axios.instance.get("/comment/hot", {
        params: {
          id: ids,
          type: types,
          limit: limits,
          before: befores
        }
      }).then((res) => {
        commentListArray.push(...res.data.hotComments);
        time.value = res.data.hotComments[res.data.hotComments.length - 1].time;
      }).catch((err) => {
        console.error(err);
      });
    }
    function getCommentNew(ids, types, pageNos, pageSizes, sortTypes, cursors) {
      axios.instance.get("/comment/new", {
        params: {
          id: ids,
          type: types,
          pageNo: pageNos,
          pageSize: pageSizes,
          sortType: sortTypes,
          cursor: cursors
        }
      }).then((res) => {
        commentListArray.push(...res.data.data.comments);
        time.value = res.data.data.comments[res.data.data.comments.length - 1].time;
      }).catch((err) => {
        console.error(err);
      });
    }
    function handleScrollToUpper() {
      console.log("头部");
    }
    function handleScrollToLower() {
      console.log("底部");
      if (sortType.value == 2) {
        getCommentHot(Props.id, Props.type, 20, time.value);
      }
      if (sortType.value == 3) {
        getCommentNew(Props.id, Props.type, commentListArray.length / 20 + 1, 20, 3, time.value);
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$2,
        b: common_vendor.unref(song).name
      }, common_vendor.unref(song).name ? {
        c: common_vendor.unref(song).al.picUrl,
        d: common_vendor.t(common_vendor.unref(song).name),
        e: common_vendor.t(common_vendor.unref(song).alia[0]),
        f: common_vendor.t(common_vendor.unref(song).ar[0].name)
      } : {}, {
        g: common_vendor.unref(albumObj).name
      }, common_vendor.unref(albumObj).name ? {
        h: common_vendor.unref(albumObj).picUrl,
        i: common_vendor.t(common_vendor.unref(albumObj).name),
        j: common_vendor.t(common_vendor.unref(albumObj).artists[0].name)
      } : {}, {
        k: common_vendor.o(($event) => common_vendor.isRef(sortType) ? sortType.value = 2 : sortType = 2),
        l: common_vendor.unref(sortType) == 2 ? 1 : "",
        m: common_vendor.o(($event) => common_vendor.isRef(sortType) ? sortType.value = 3 : sortType = 3),
        n: common_vendor.unref(sortType) == 3 ? 1 : "",
        o: common_vendor.f(common_vendor.unref(commentListArray), (item, index, i0) => {
          return {
            a: index,
            b: "6bb6a698-0-" + i0,
            c: common_vendor.p({
              event: item
            })
          };
        }),
        p: common_vendor.o(handleScrollToUpper),
        q: common_vendor.o(handleScrollToLower)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6bb6a698"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/Review/index.vue"]]);
wx.createPage(MiniProgramPage);
