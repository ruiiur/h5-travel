<!--这是预加载组件-->
<template>
    <div>
        <div class="preloader-indicator-overlay"></div>
        <div class="preloader-indicator-modal">
            <span class="preloader preloader-white"></span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'loader',
    props: {
        title: {
            type: String
        }
    },
    methods: {

    }
}
</script>

<style>

</style>

