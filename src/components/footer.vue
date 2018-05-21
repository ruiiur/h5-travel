 <!--底部tab-->
<template>
<div class="toolbar">
  <div class="toolbar-inner home-tab">
    <router-link :to="footerObject == 'home'?'#':'/'"  class="link" :class="{'active':footerObject==''?'active':''}"><i></i><p>首页</p></router-link>
    <router-link :to="footerObject == 'classification'?'#':'/classification'"  class="link" :class="{'active':footerObject=='classification'?'active':''}"><i></i><p>分类</p></router-link>
    <router-link :to="footerObject == 'order-center'?'#':'/order-center'"  class="link" :class="{'active':footerObject=='order-center'?'active':''}"><i></i><p>订单中心</p></router-link>
    <router-link :to="footerObject == 'personal-center'?'#':'/personal-center'"  class="link" :class="{'active':footerObject=='personal-center'?'active':''}"><i></i><p>个人中心</p></router-link>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["footerObject"]
};
</script>

<style lang="scss" scoped>
.toolbar {
  background: #fff;
  height: toRem(130px);
  background-color: #e5e5e5;
  box-shadow: 0px 0px toRem(38px) 0px rgba(200, 200, 200, 0.57);
  position: fixed;
  bottom:0;
  width: 100%;
  // .toolbar a.link {
  //   line-height: 0 !important;
  // }
  .toolbar-inner {
    > a {
      width: 24.5%;
      display: inline-block;
      // -webkit-box-pack: justify;
      // -ms-flex-pack: justify;
      // -webkit-justify-content: space-between;
      // justify-content: space-between;
      // align-items: center;
      // overflow: visible;
      // -webkit-box-flex: 1;
      // -ms-flex: 1;
      // -webkit-box-orient: vertical;
      // -moz-box-orient: vertical;
      // -ms-flex-direction: column;
      // -webkit-flex-direction: column;
      // flex-direction: column;
      text-align: center;
      > p {
        font-size: toRem(18px);
        color: #666;
        line-height: toRem(18px);
        margin-left: 0 !important;
      }
      &.active {
        > p {
          color: #005c8e;
        }
      }
      i {
        width: toRem(70px);
        height: toRem(60px);
        display: inline-block;
        margin-top: toRem(15px);
      }
      &:nth-child(1) {
        i {
          background: url("../assets/image/none-1.png") no-repeat;
          background-size: 100%;
        }
        &.active {
          i {
            background: url("../assets/image/active-1.png") no-repeat;
            background-size: 100%;
          }
        }
      }
      &:nth-child(2) {
        i {
          background: url("../assets/image/none-2.png") no-repeat;
          background-size: 100%;
        }
        &.active {
          i {
            background: url("../assets/image/active-2.png") no-repeat;
            background-size: 100%;
          }
        }
      }
      &:nth-child(3) {
        i {
          background: url("../assets/image/none-3.png") no-repeat;
          background-size: 100%;
        }
        &.active {
          i {
            background: url("../assets/image/active-3.png") no-repeat;
            background-size: 100%;
          }
        }
      }
      &:nth-child(4) {
        i {
          background: url("../assets/image/none-4.png") no-repeat;
          background-size: 100%;
        }
        &.active {
          i {
            background: url("../assets/image/active-4.png") no-repeat;
            background-size: 100%;
          }
        }
      }
    }
  }
}
</style>

