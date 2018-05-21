<!--这是搜索列表页面-->
<template>
    <div class="search-list">
        <div class="search-input">
            <i></i>
            <form action="">
                 <input type="search" placeholder="请输入搜索内容" v-model="inputMessage" @keyup.enter="searchGoods()" @blur="blurInput" @focus="focusInput">
            </form>
            <a v-if="delInput" @click="clearInput"></a>
            <!-- <button @click="searchGoods(1,5)">搜索</button> -->
            <!-- <a v-if="del" @click="deleted"></a> -->
       </div>
       <div class="scroll-content">
     <v-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <ul v-if="searchList.length>0">
            <li v-for="search in searchList">
                <a href="javascript:;">
                    <img :src="apiUrl+search.coverImg" alt="">
                    <div>
                        <h2>{{search.aliaseName}}</h2>
                        <h3><span>{{search.tags[0]}}</span><span>{{search.tags[1]}}</span><span>{{search.tags[2]}}</span><span>{{search.tags[3]}}</span></h3>
                        <p>[目的地]<span>{{search.destination}}</span></p>
                        <h1><span v-if="userType==2 && homeSite==site.sitename" v-for="site in search.sites">{{site.directprice}}</span><em>销量100</em></h1>
                    </div>
                </a>
            </li>
        </ul>
       </v-loadmore> 
         <p v-if="allLoaded==true" class="without">没有更多数据了</p>
       </div>
       <p v-if="searchList.length==0">没有符合要求的内容</p> 
    </div>
</template>
<script>
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);
import { Search } from 'mint-ui';
import Vue from 'vue'
import axios from 'axios'
import { getHomeList } from '../../services/index';
import { mapState, mapActions, mapMutations } from 'vuex'
import tools from '../../common/tools'
import { apiUrl } from '../../common/env'
export default {
    // name: '搜索',
    props: {
        title: {
            type: String
        }
    },
    data(){
        return{
           apiUrl:'',
           delInput:'',
           inputMessage:'',
           userType:'',
           homeSite:'',
           topStatus: '',
           allLoaded:false,//判断是否加载完毕
           searchList:[
                // {
                //     image:require('../../assets/image/hot-1.png'),
                //     content:'海南三亚4日3晚跟团游(5钻)·【小长假精选】',
                //     productFeatures:'可独立成团 零自费 零购物', 
                //     preferential:'2人预订，立减300元/单',
                //     price:'3899.00',
                //     sales:120,         
                // },
           ],
           page:0,
           totalCount:'',
        }
    },
    methods: {
        ...mapActions(['getHomeList']),
            getInitList(page){
                let that = this;
                that.apiUrl=apiUrl;
                let objParams = {
                    "keywords":that.inputMessage,
                    "start":page
                };
                getHomeList(objParams).then(function(response) {
                    console.log(response);
                    console.log(response.meta.success);
                    if(response.meta.success==true){
                        for(let i = 0; i < response.data.page.content.length; i++) {
                            that.searchList.push(response.data.page.content[i]);
                        }
                        that.homeSite=response.data.site;
                        that.totalCount=response.data.page.totalElements;
                        //console.log(response.data.page.content);
                        console.log('数据获取成功');
                        if(response.data.userType==2){
                            that.userType=2;
                        }
                        else if(response.data.userType==1){
                            that.userType=1;
                        }
                        else if(response.data.userType==3){
                            that.userType=3;
                        }
                    }
                    else{
                        console.log('数据获取失败');
                    }
                }).catch(function(err) {
                    that.$Message.info('接口获取失败');
                });
        },
        // 搜索对应产品
      searchGoods() {
        // 将文本框的删除按钮隐藏
        this.page=0;
        this.searchList = [];
        this.delInput = false;
        if (this.inputMessage == '') {
         this.$Message.info('请输入商品需要搜索的商品名称');
          return;
        }
        // 删除两端的空格
        this.inputMessage = this.inputMessage.replace(/(^\s*)|(\s*$)/g, '');
        this.getInitList(this.page);
      },
        clearInput(){
            this.inputMessage='';
        },
        // 当文本框获取焦点的时候
      focusInput() {
        this.delInput = true;
      },
      // 当文本框失去焦点的时候
      blurInput() {
        this.delInput = false;
        // this.searchGoods(0);
      },
    //    handleTopChange(status) {
    //     this.topStatus = status;
    //   },
     //下拉加载  
      loadTop() { 
          this.searchList = [];
        this.getInitList(0);  
        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位 
      },
      loadBottom() {
        // 上拉加载  
        if(this.page>=this.totalCount/10){
            this.allLoaded=true;
        }
        this.more();// 上拉触发的分页查询  
        this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位  
    },
   
      more(){  
          // 分页查询  
         this.page++;
         this.getInitList(this.page); 
       },  
    },
    mounted(){
        this.getInitList(this.page);//初次访问列表
    },
    components: {
      'v-loadmore':Loadmore 
    },
}
</script>

<style lang="scss">
.search-list{
     .search-input {
        background: #000;
        height: toRem(100px);
        padding: toRem(22px) toRem(28px);
        box-sizing: border-box;
           input {
            position: relative;
            width: 100%;
            height: toRem(55px);
            border: 1px solid #00a0e9;
            background: #f8f8f8;
            // border-radius: toRem(2px);
            padding-left: toRem(50px);
            box-sizing: border-box;
            font-size: toRem(26px);
            box-shadow: inset 0px 0px 12px 0px rgba(0, 0, 0, 0.13);
        }
        input[type="search"]::-webkit-search-cancel-button {
            display: none;
            -webkit-appearance: none;
        }
        input::-webkit-input-placeholder {
            color: #999;
            font-size: toRem(26px);
        }
        i {
            position: absolute;
            z-index: 100;
            top: toRem(34px);
            left: toRem(40px);
            width: toRem(35px);
            height: toRem(35px);
            background: url("../../assets/image/detail-search.png") no-repeat 0 0;
            background-size: toRem(35px) toRem(35px);
        }
        a {
            position: absolute;
            z-index: 100;
            top: toRem(35px);
            right: toRem(37px);
            width: toRem(24px);
            height: toRem(24px);
            background: url("../../assets/image/clear.png") no-repeat center;
            background-size: toRem(24px) toRem(24px);
        }
    }
    .scroll-content{
        height: calc(100vh - #{toRem(100px)});
        overflow-y: auto;
    }
    ul{
        background: #ededed;
        padding:toRem(24px);
        min-height:calc(100vh - #{toRem(100px)});
        >li{
           margin-bottom: toRem(24px);
           background: #fff;
           >a{
               width:100%;
               display: inline-block;
               border:1px solid #00a0e9;
               border-radius: toRem(10px);
               padding: toRem(12px) toRem(39px) toRem(14px) toRem(17px);
               >img{
                  @include wh(toRem(271px),toRem(178px)); 
                  margin-right: toRem(28px);
               }
               >div{
                   display: inline-block;
                   vertical-align: top;
                   width: calc(100% - #{toRem(307px)});
                   margin-top: toRem(5px);
                   >h2{
                       @include sc(toRem(28px),#252525);
                       line-height: toRem(28px);
                   }
                   >h3{
                       @include sc(toRem(18px),#2b2a2a);
                       line-height: toRem(18px);
                       margin: toRem(15px) 0 toRem(9px) 0;
                       >span{
                           @include sc(toRem(18px),#828282);
                           margin-right: toRem(5px);
                       }
                   }
                   >p{
                       @include sc(toRem(18px),#f60f46);
                       line-height: toRem(18px);
                       margin-bottom: toRem(21px);
                       >span{
                           @include sc(toRem(18px),#fc3d6a);
                           margin-left: toRem(5px);
                       }
                   }
                   >h1{
                       line-height: toRem(37px);
                    //    margin-top: toRem(30px);
                       >span{
                           &:before{
                               content:'￥';
                               @include sc(toRem(30px),#ff414b);
                           }
                           @include sc(toRem(37px),#ff414b);
                            &:after{
                               content:'起';
                               @include sc(toRem(21px),#ff414b);
                           }
                       }
                       >em{
                           float: right;
                           @include sc(toRem(17px),#4c4f50);
                           line-height: toRem(17px);
                           margin-top: toRem(20px);
                       }
                   }
               }
           } 
        }
    }
    .without{
        height: toRem(50px);
        line-height: toRem(50px);
        text-align: center;
    }
}
</style>

