<template>
  <transition :name="transitionName">
    <router-view class="child-view"></router-view>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        transitionName: 'slide-right',
        containers: []
      }
    },
    beforeRouteUpdate(to, from, next) {
      if (this.containers.indexOf(to.name) >= 0) {
        this.containers.pop();
        this.transitionName = 'slide-right'
      } else {
        this.containers.push(from.name);
        this.transitionName = 'slide-left'
      }
      //if (isBack) {

      //} else {

      //}
      this.$router.isBack = false
      next()
    }
  }
</script>

<style scoped>
  .child-view {
    position: absolute;
    width: 100%;
    transition: all .5s cubic-bezier(0, 0, .58, 1);
  }

  .slide-left-enter, .slide-right-leave-active {
    opacity: .55;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100%, 0);
  }
</style>
