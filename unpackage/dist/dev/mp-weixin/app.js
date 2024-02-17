"use strict";
const common_vendor = require("./common/vendor.js");
const axios = require("./axios.js");
const pinia_myUser = require("./pinia/myUser.js");
if (!Math) {
  "./pages/discover/index.js";
  "./pages/User/index.js";
  "./pages/DynamicState/index.js";
  "./pages/SongList/index.js";
  "./pages/PlaylistTag/index.js";
  "./pages/PlaylistTabDetails/index.js";
  "./pages/PlaylistDetails/index.js";
  "./pages/PlaylistCover/index.js";
  "./pages/Leaderboard/index.js";
  "./pages/MvCharts/index.js";
  "./pages/NewSongsAlbums/index.js";
  "./pages/MusicalStyle/index.js";
  "./pages/MusicalStyleDetails/index.js";
  "./pages/Album/index.js";
  "./pages/Singer/index.js";
  "./pages/OfficialListDetails/index.js";
  "./pages/PlayDetails/index.js";
  "./pages/search/index.js";
  "./pages/SingerList/index.js";
  "./pages/Sensibilities/index.js";
  "./pages/Review/index.js";
  "./pages/VideoPlayback/index.js";
  "./pages/Roam/index.js";
  "./pages/LogIn/index.js";
  "./pages/Verify/index.js";
  "./pages/UserDetails/index.js";
  "./pages/DailyRecommendation/index.js";
  "./pages/DigitalAlbum/index.js";
  "./pages/DigitalAlbumDetails/index.js";
  "./pages/BestSellerList/index.js";
  "./pages/LanguageStyleAlbum/index.js";
  "./pages/ShareDT/index.js";
}
function getRegisterAnonimous(myUser) {
  let time = Date.now();
  return axios.instance.get("/register/anonimous", {
    params: {
      timestamp: time
    }
  }).then((res) => {
    myUser.cookie = res.data.cookie;
    console.log(res.data.cookie);
  }).catch((err) => {
    console.error(err);
  });
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
    getRegisterAnonimous(pinia_myUser.useMyUser());
  },
  // ... 其他生命周期钩子
  setup() {
    const myUser = pinia_myUser.useMyUser();
    return {
      myUser
    };
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/20130/Desktop/杰瑞音乐小程序/App.vue"]]);
const Player = () => "./pages/module/player.js";
const app = common_vendor.createApp(App);
app.use(common_vendor.createPinia());
app.component("Player", Player);
app.mount("#app");
