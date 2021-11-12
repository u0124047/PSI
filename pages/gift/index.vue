<template>
  <div class="wrapper">
    <Header></Header>
    <div class="wrap_main">
      <div id="app">
        <div class="input-group mb-3">
          <div>
            <table class="table">
              <thead>
                <tr>
                  <th style="width: 10%">商品編號＊</th>
                  <th style="width: 10%">商品名稱＊</th>
                  <th style="width: 15%">商品內容＊</th>
                  <th style="width: 15%">價格＊</th>
                  <th style="width: 15%">市值</th>
                  <th style="width: 15%">備註</th>
                  <th style="width: 5%"></th>
                </tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="商品編號"
                      v-model="tempGift.no"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="商品名稱"
                      v-model="tempGift.name"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="商品內容"
                      v-model="tempGift.content"
                    />
                  </td>
                  <td>
                    <select
                      id="selectUnit"
                      class="form-control"
                      v-model="tempGift.price"
                    >
                      <option value="1000">1000</option>
                      <option value="2000">2000</option>
                      <option value="3000">3000</option>
                      <option value="5000">5000</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="市價"
                      v-model="tempGift.value"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="備註"
                      v-model="tempGift.note"
                    />
                  </td>
                  <td>
                    <div class="input-group-append">
                      <button
                        class="btn btn-primary"
                        type="button"
                        @click="addGift"
                      >
                        新增
                      </button>
                    </div>
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <div class="card text-center">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 0 }"
                  @click="changeVisibility(0)"
                  >全部</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 1000 }"
                  @click="changeVisibility(1000)"
                  >1000</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 2000 }"
                  @click="changeVisibility(2000)"
                  >2000</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 3000 }"
                  @click="changeVisibility(3000)"
                  >3000</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 5000 }"
                  @click="changeVisibility(5000)"
                  >5000</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  :class="{ active: visibility == 9999 }"
                  @click="changeVisibility(9999)"
                  >我的最愛</a
                >
              </li>
            </ul>
          </div>
          <table class="table" id="datatable">
            <thead>
              <tr>
                <th>No.</th>
                <th>商品圖片</th>
                <th>商品名稱</th>
                <th>商品內容</th>
                <th>價錢</th>
                <th>市價</th>
                <th>備註</th>
                <th></th>
              </tr>
              <tr v-for="(item, key, index) in gifts" :key="index">
                <td>{{ item.no }}</td>
                <td>
                  <img :src="`../img/gift/${item.price}_${item.no}.jpg`" alt="" />
                </td>
                <td style="text-align: left; font-weight:700">{{ item.name }}</td>
                <td style="text-align: left; font-weight:200"><p v-html="item.content"></p></td>
                <td>{{ item.price | currency }}</td>
                <td>{{ item.value }}</td>
                <td>{{ item.note }}</td>
                <td style="text-align: right">
                  <!-- <a v-show="!checkLike(key)" @click="likeTheItem(key, true)"
                    ><img src="~/img/icon/heart.png" alt="" />
                  </a>
                  <a v-show="checkLike(key)" @click="likeTheItem(key, false)"
                    ><img src="~/img/icon/heart_red.png" alt="" />
                  </a> -->
                  <button
                    type="button"
                    class="close ml-auto"
                    aria-label="Close"
                    @click="removeTodo(key)"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </td>
              </tr>
            </thead>
          </table>
          <div class="card-footer d-flex justify-content-between">
            <span>共有 {{ Object.values(gifts).length }} 筆</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DB } from "~/services/fireinit.js";
export default {
  head() {
    return {
      title: "日記帳",
    };
  },
  data() {
    return {
      likes: [],
      gifts: [],
      tempGift: {
        id: "",
        no: null,
        name: "",
        content: "",
        price: 1000,
        note: "",
        value: 0,
        like: false,
      },
      visibility: 0,
    };
  },
  filters: {
    dollarSign: function (n) {
      return `$ ${n}`;
    },
    currency: function (n) {
      return parseFloat(n)
        .toFixed()
        .replace(/./g, function (c, i, a) {
          return i && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
        });
    },
  },
  methods: {
    changeVisibility: function (type) {
      this.visibility = parseInt(type);
      this.refreshJournals();
    },
    addGift: function () {
      if (!this.tempGift.name) {
        return alert("請輸入商品名稱");
      } else if (!this.tempGift.content) {
        return alert("請輸入內容");
      } else if (!this.tempGift.price) {
        return alert("請輸入價格");
      }
      var newChildRef = DB.ref("Gift").push(this.tempGift);

      var tmpket = newChildRef.key;
      this.tempGift.id = tmpket;
      this.gifts[tmpket] = this.tempGift;
      this.tempGift = {
        id: "",
        no: null,
        name: "",
        content: "",
        price: this.tempGift.price,
        note: "",
        value: 0,
        like: false,
      };
      this.$nuxt.refresh();
    },
    checkLike: function (key) {
      return this.likes.indexOf(key) > -1;
    },
    likeTheItem: function (key, value) {
      if (value) {
        this.likes.push(key);
      } else {
        let index = this.likes.indexOf(key);
        this.likes.splice(index, 1);
      }
      sessionStorage.setItem("likes", this.likes);
      this.$nuxt.refresh();
    },
    removeTodo: function (key) {
      delete this.gifts[key];
      DB.ref("Gift").child(key).remove();

      this.$nuxt.refresh();
    },
    refreshJournals() {
      this.$fetch();
    },
  },
  async fetch() {
    if (this.visibility === 9999) {
      var data = DB.ref("Gift");
    } else if (this.visibility > 0) {
      var data = DB.ref("Gift").orderByChild("price").equalTo(this.visibility);
    } else {
      var data = DB.ref("Gift");
    }
    this.gifts = await data.once("value", function (snapshot) {
      console.log("data num:", snapshot.numChildren());
    });

    if (this.gifts.exists() > 0) {
        var datago = JSON.stringify(this.gifts);
        this.gifts = JSON.parse(datago);
    } else {
      this.gifts = [];
    }
  },
  mounted() {
    // if (!sessionStorage["likes"]) {
    //   sessionStorage["likes"] = [];
    // } else {
    //   this.likes = sessionStorage["likes"].split(",");
    // }
  },
  computed: {
    // getGifts: function () {
    //   if (this.visibility === 9999) {
    //     return Object.values(this.gifts).filter((item, key, index) => {
    //         console.log("item:"+key+"index:"+index)
    //         return this.likes.indexOf(item) > -1
    //     });
    //   } else {
    //     return this.gifts;
    //   }
    // },
  },
};
</script>
<style>
@import "~assets/css/global/style.css";
</style>
