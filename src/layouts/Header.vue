<template>
  <div class="header-layout">
    <div class="header-layout__logo">
      <router-link to="/home">
        <img src="https://cdn.filestackcontent.com/cRTlsFkT7Okny1Z7YtEA" alt="citch-logo" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Header',
  components: {},
};
</script>
<style lang="scss">
.header-layout {
  position: absolute;
  top: 0;
  left: 0;
  &__logo {
    width: 100%;
    height: 100px;
    padding: 15px;
    max-width: 100%;
    width: 150px;
    display: flex;
  }
}
</style>
