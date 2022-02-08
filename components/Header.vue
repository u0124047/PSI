<template>
  <header style="width: 100%">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" href="/">展虹日記帳</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="./forms/journal">日記帳</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="./product/dailyOutput">員工日生產</a>
          </li>
          <!-- <li class="nav-item"> -->
            <!-- <a class="nav-link" href="./gift">禮品區</a> -->
          <!-- </li> -->
          <li class="nav-item">
            <button class="btn btn-primary" v-on:click="logout">登出</button>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    logout () {
      this.$store.dispatch('signOut').then(() => {
        alert('logged out!')
        window.location.href = '/'
      })
    }
  },
};
</script>
