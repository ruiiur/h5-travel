<!--这是支付页面-->
<template>
    <div class="pay">
       <div class="pay-top">
           <div>
               <p>共计：</p>
               <span>￥</span>
           </div>
           <h1>
               2899.00
           </h1>
       </div>
       <div class="pay-btn">
           <p>选择支付方式</p>
           <div>
               <img src="../../assets/image/wechat.png" alt="">
               <span>微信支付</span>
           </div>
       </div>
    </div>
</template>
<script>
export default {
    name:'支付',
    data(){
        return{
            // footerObject:'order-center'
        }
    },
    methods: {

    },
    components: {
      
    },
}
</script>

<style lang="scss">
.pay{
    .pay-top{
        height:toRem(350px);
        background-image: linear-gradient(-61deg, #2a64d0 0%, #52b4d9 47%, #40cbc1 70%, #2ee1a8 100%);
        padding:toRem(100px) 0 0 toRem(51px);
        >div{
            display: inline-block;
            vertical-align: top;
            width:toRem(100px);
            text-align: right;
            margin-right: toRem(10px);
            >p{
                @include sc(toRem(33px),#fff);
                margin-top: toRem(10px);
                margin-bottom: toRem(35px);
            }
            >span{
                @include sc(toRem(38px),#fff);
            }
        }
        >h1{
            display: inline-block;
            @include sc(toRem(157px),#fff);
            line-height: toRem(157px);
        }
    }
    .pay-btn{
        margin: toRem(136px) auto 0 auto;
        width:toRem(598px);
        >p{
            @include sc(toRem(30px),#646464);
            margin-bottom: toRem(26px);
        }
        >div{
            width:toRem(598px);
            height:toRem(100px);
            margin: auto;
            background: url('../../assets/image/btn-bg.png');
            background-size: cover;
            text-align: center;
            >img{
                @include wh(toRem(67px),toRem(67px));
                vertical-align: top;
                margin-top: toRem(17px);
            }
            >span{ 
                display: inline-block;
                @include sc(toRem(40px),#4e4e4e);
                margin-top:toRem(22px);
                margin-left: toRem(17px);
            }
        }
    }
}
</style>

