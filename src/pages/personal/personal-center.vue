<!--这是个人中心页面-->
<template>
    <div>
       <p>这是个人中心页面</p>
       <!-- 底部组件 -->
    <footerView :footerObject="footerObject"></footerView>
    </div>
</template>
<script>
import footerView from '../../components/footer'
export default {
    name: 'personalCenter',
    props: {
        title: {
            type: String
        }
    },
    data(){
        return{
            footerObject:'personal-center'
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

