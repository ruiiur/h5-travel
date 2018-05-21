<!--这是分类页面-->
<template>
    <div>
       <p>这是分类页面</p>
       <!-- 底部组件 -->
    <footerView :footerObject="footerObject"></footerView>
    </div>
</template>
<script>
import footerView from '../../components/footer'
export default {
    name: 'classification',
    props: {
    },
    data(){
        return{
            footerObject:'classification',
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

