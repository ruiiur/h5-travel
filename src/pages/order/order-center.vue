<!--这是订单中心页面-->
<template>
    <div>
       <p>这是订单中心页面</p>
       <!-- 底部组件 -->
     <footerView :footerObject="footerObject"></footerView>
    </div>
</template>
<script>
import footerView from '../../components/footer'
export default {
    name: 'orderCenter',
    props: {
        title: {
            type: String
        }
    },
    data(){
        return{
            footerObject:'order-center'
        }
    },
    methods: {

    },
    components: {
      footerView,
    },
}
</script>

<style>

</style>

