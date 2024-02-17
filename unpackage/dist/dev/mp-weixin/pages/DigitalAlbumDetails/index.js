"use strict";
const common_vendor = require("../../common/vendor.js");
const axios = require("../../axios.js");
const _sfc_main = {
  __name: "index",
  props: {
    id: String
  },
  setup(__props) {
    const Props = __props;
    let myHeight = common_vendor.ref("15vh");
    common_vendor.onMounted(() => {
      getAlbumDetail(Props.id);
      getAlbum(Props.id);
      getCommentAlbum(Props.id);
    });
    let AlbumDetail = common_vendor.reactive({});
    function getAlbumDetail(ids) {
      axios.instance.get("/album/detail", {
        params: {
          id: ids
        }
      }).then((res) => {
        Object.assign(AlbumDetail, res.data);
      }).catch((err) => {
        console.error(err);
      });
    }
    let listArray = common_vendor.reactive([]);
    function getAlbum(ids) {
      axios.instance.get("/album", {
        params: {
          id: ids
        }
      }).then((res) => {
        listArray.push(...res.data.songs);
      }).catch((err) => {
        console.error(err);
      });
    }
    let AlbumReviewList = common_vendor.reactive([]);
    function getCommentAlbum(ids) {
      axios.instance.get("/comment/album", {
        params: {
          id: ids
        }
      }).then((res) => {
        AlbumReviewList.push(...res.data.hotComments);
      }).catch((err) => {
        console.error(err);
      });
    }
    function formTimeData(cever) {
      if (cever !== "<br>" && cever !== "</br>") {
        return true;
      }
    }
    function routerPush(center, type, event) {
      common_vendor.index.navigateTo({
        url: center + "?type=" + type + "&id=" + event
      });
    }
    function routerReturn() {
      common_vendor.wx$1.navigateBack({
        delta: 1
        // 返回的页面层数，1表示返回上一级页面，2表示返回上两级页面，以此类推
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(AlbumDetail).code
      }, common_vendor.unref(AlbumDetail).code ? {
        b: common_vendor.unref(AlbumDetail).album.blurImgUrl
      } : {}, {
        c: common_vendor.unref(AlbumDetail).code && !common_vendor.unref(AlbumDetail).album.blurImgUrl
      }, common_vendor.unref(AlbumDetail).code && !common_vendor.unref(AlbumDetail).album.blurImgUrl ? {
        d: common_vendor.unref(AlbumDetail).album.coverUrl
      } : {}, {
        e: common_vendor.o(($event) => routerReturn()),
        f: common_vendor.unref(AlbumDetail).code
      }, common_vendor.unref(AlbumDetail).code ? common_vendor.e({
        g: common_vendor.unref(AlbumDetail).album.coverUrl,
        h: common_vendor.t(common_vendor.unref(AlbumDetail).album.albumName),
        i: common_vendor.t(common_vendor.unref(AlbumDetail).album.artistName),
        j: common_vendor.o(($event) => routerPush("/pages/Singer/index", null, common_vendor.unref(AlbumDetail).album.artistId)),
        k: common_vendor.t(common_vendor.unref(AlbumDetail).product.price),
        l: common_vendor.f(common_vendor.unref(AlbumDetail).product.tags, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        m: common_vendor.f(common_vendor.unref(AlbumDetail).product.descr, (item, index, i0) => {
          return common_vendor.e({
            a: formTimeData(item.resource)
          }, formTimeData(item.resource) ? {
            b: common_vendor.t(item.resource)
          } : {}, {
            c: index
          });
        }),
        n: common_vendor.unref(myHeight),
        o: common_vendor.unref(myHeight) == "15vh"
      }, common_vendor.unref(myHeight) == "15vh" ? {
        p: common_vendor.o(($event) => common_vendor.isRef(myHeight) ? myHeight.value = "auto" : myHeight = "auto")
      } : {
        q: common_vendor.o(($event) => common_vendor.isRef(myHeight) ? myHeight.value = "15vh" : myHeight = "15vh")
      }, {
        r: common_vendor.unref(AlbumDetail).product.mvPlayUrl
      }, common_vendor.unref(AlbumDetail).product.mvPlayUrl ? {
        s: common_vendor.unref(AlbumDetail).product.mvPlayUrl
      } : {}, {
        t: common_vendor.unref(listArray).length
      }, common_vendor.unref(listArray).length ? {
        v: common_vendor.t(common_vendor.unref(listArray).length),
        w: common_vendor.f(common_vendor.unref(listArray), (item, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: common_vendor.t(item.name),
            c: index
          };
        })
      } : {}, {
        x: common_vendor.f(common_vendor.unref(AlbumReviewList), (item, index, i0) => {
          return common_vendor.e({
            a: item.user.avatarUrl,
            b: common_vendor.t(item.user.nickname),
            c: common_vendor.t(item.timeStr),
            d: common_vendor.t(item.content),
            e: item.beReplied.length
          }, item.beReplied.length ? {
            f: common_vendor.t(item.beReplied[0].user.nickname),
            g: common_vendor.t(item.beReplied[0].content)
          } : {}, {
            h: index
          });
        }),
        y: common_vendor.o(($event) => routerPush("/pages/Review/index", 3, Props.id))
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-43363f9f"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/DigitalAlbumDetails/index.vue"]]);
wx.createPage(MiniProgramPage);
