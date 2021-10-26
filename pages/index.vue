<template>
  <div class="wrapper">
    <Header></Header>
    <div class="wrap_main">
    <input type="text" class="form-control" placeholder="帳號" v-model="formEmail">
    <input type="password" class="form-control" placeholder="密碼" v-model="formPassword">
    <button class="btn btn-primary" type="button" @click="login">登入</button>
    </div>
  </div>
</template>

<script>
// import { auth } from "~/services/fireinit.js";
import Header from "~/components/Header.vue";
export default {
  data() {
    return {
      formEmail: "",
      formPassword: ""
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch("auth/signInWithEmail", {
          email: this.formEmail,
          password: this.formPassword,
        })
        .then((data) => {
          if (data.status === "success") {
            const user = data.user;
            console.log("[Signed in]", this.formEmail);
            window.location.href = './forms/journal';
          } else {
            console.log(error.message);
            const errorCode = error.code;
            const errorMessage = error.message;
            window.location.href = './forms/journal';
          }
        });
    },
  },
};
</script>

<style>
@import "~assets/css/global/style.css";
</style>
