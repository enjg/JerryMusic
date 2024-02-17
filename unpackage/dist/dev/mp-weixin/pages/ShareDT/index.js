"use strict";
const common_vendor = require("../../common/vendor.js");
const axios = require("../../axios.js");
const pinia_myShare = require("../../pinia/myShare.js");
const pinia_myUser = require("../../pinia/myUser.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const myShare = pinia_myShare.useMyShare();
    const myUser = pinia_myUser.useMyUser();
    let listArray = ["", "song", "playlist", "mv", "album"];
    common_vendor.onMounted(() => {
      if (myShare.ShareContentSort == 2) {
        getPlaylistDetail(myShare.id);
      } else if (myShare.ShareContentSort == 1) {
        getSongDetail(myShare.id);
      } else if (myShare.ShareContentSort == 4) {
        getAlbum(myShare.id);
      }
    });
    let SongListObj = common_vendor.reactive({});
    function getPlaylistDetail(ids) {
      axios.instance.get("/playlist/detail", {
        params: {
          id: ids
        }
      }).then((res) => {
        Object.assign(SongListObj, res.data.playlist);
        console.log(SongListObj);
      }).catch((err) => {
        console.error(err);
      });
    }
    let songObj = common_vendor.reactive({});
    function getSongDetail(id) {
      axios.instance.get("/song/detail", {
        params: {
          ids: id
        }
      }).then((res) => {
        Object.assign(songObj, res.data.songs[0]);
        console.log(res.data.songs[0]);
      }).catch((err) => {
        console.error(err);
      });
    }
    let AlbumObj = common_vendor.reactive({});
    function getAlbum(id) {
      let time = Date.now();
      axios.instance.get("/album", {
        params: {
          id,
          timestamp: time
        }
      }).then((res) => {
        console.log(res.data.album);
        Object.assign(AlbumObj, res.data.album);
      }).catch((err) => {
        console.error(err);
      });
    }
    function routerReturn() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
    let text = common_vendor.ref("");
    function ShareResourcePost() {
      console.log(text.value);
      axios.instance("/share/resource", {
        params: {
          id: myShare.id,
          type: listArray[myShare.ShareContentSort],
          cookie: myUser.cookie,
          msg: text.value
        }
      }).then((res) => {
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      });
      routerReturn();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => routerReturn()),
        b: common_vendor.o(($event) => ShareResourcePost()),
        c: common_vendor.unref(text),
        d: common_vendor.o(($event) => common_vendor.isRef(text) ? text.value = $event.detail.value : text = $event.detail.value),
        e: common_vendor.unref(myShare).ShareContentSort == 2
      }, common_vendor.unref(myShare).ShareContentSort == 2 ? {
        f: common_vendor.unref(SongListObj).coverImgUrl,
        g: common_vendor.t(common_vendor.unref(SongListObj).name),
        h: common_vendor.t(common_vendor.unref(SongListObj).creator.nickname)
      } : {}, {
        i: common_vendor.unref(myShare).ShareContentSort == 1
      }, common_vendor.unref(myShare).ShareContentSort == 1 ? {
        j: common_vendor.unref(songObj).al.picUrl,
        k: common_vendor.t(common_vendor.unref(songObj).name),
        l: common_vendor.f(common_vendor.unref(songObj).ar, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: index < common_vendor.unref(songObj).ar.length - 1
          }, index < common_vendor.unref(songObj).ar.length - 1 ? {} : {}, {
            c: index
          });
        })
      } : {}, {
        m: common_vendor.unref(myShare).ShareContentSort == 4
      }, common_vendor.unref(myShare).ShareContentSort == 4 ? {
        n: common_vendor.unref(AlbumObj).picUrl,
        o: common_vendor.t(common_vendor.unref(AlbumObj).name),
        p: common_vendor.f(common_vendor.unref(AlbumObj).artists, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: index < common_vendor.unref(AlbumObj).artists.length - 1
          }, index < common_vendor.unref(AlbumObj).artists.length - 1 ? {} : {}, {
            c: index
          });
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c96f3aee"], ["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/pages/ShareDT/index.vue"]]);
wx.createPage(MiniProgramPage);
