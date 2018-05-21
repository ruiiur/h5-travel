<!--这是信息填写页面-->
<template>
    <div class="fill-information">
       <div class="fill-information-content">
           <div>
               <h2>联系人信息</h2>
               <p>为方便携程及时与您联系，请准确填写联系人信息（手机号码Email）</p>
               <div>
                   <div class="input-wrap">
                       <label for="">姓名</label>
                       <input type="text" v-model="mainName" placeholder="请填写联系人姓名" @blur="identityNameFun()" >
                       <p v-if="mainNameCon!=''">{{mainNameCon}}</p>
                   </div>
                   <div class="input-wrap">
                       <label for="">手机号码</label>
                       <!-- <select>
                            <option value ="volvo">+86</option>
                            <option value ="saab">+852</option>
                            <option value="opel">+853</option>
                            <option value="audi">+886</option>
                        </select> -->
                       <input  type="text" placeholder="必填，用于接受短信" v-model="mainTel" @blur="identityTelFun(mainTel)">
                       <p v-if="mainTelCon!=''">{{mainTelCon}}</p>
                   </div>
                   <div class="input-wrap">
                       <label for="">Email</label>
                       <input type="text" placeholder="必填，用于接收确认单" v-model="mainEmail" @blur="identityEmailFun(mainEmail)">
                      <p v-if="mainEmailCon!=''">{{mainEmailCon}}</p>
                   </div>
               </div>
           </div>
           <div>
               <h2>旅客信息</h2>
               <p>为了您能顺利出行，请务必确认所填姓名、性别与所持证件一致</p>
               <ul>
                   <li v-for="(tour,_index) in tourArr">
                       <h3>旅客{{tour.index}} <span>{{tour.name}}信息</span><a href="JavaScript:;">添加出行人</a></h3>
                       <div class="input-wrap">
                            <label for="">中文姓名</label>
                            <input type="text" v-model="nameList[_index]" placeholder="请填写联系人信息" @input="print">
                            <p>这里是错误提示</p>
                        </div>
                        <div class="input-wrap">
                            <label for="">证件类型</label>
                            <select v-model="id" @change="seFun()">
                                <option v-for="(cd,_in) in cdTypeListArr[_index]" :value ="cd.id">{{cd.name}}</option>
                            </select>
                            <input type="text" v-model="codeList[_index]"  placeholder="所持证件号码" @input="print">
                            <p>这里是错误提示</p>
                        </div>
                        <div class="input-wrap">
                            <label for="">手机号码</label>
                            <input type="text" v-model="telList[_index]" placeholder="用于接收出游信息" @input="print">
                            <p>这里是错误提示</p>
                        </div>
                   </li>
               </ul>
           </div>
           <div>
               <h2>因服务能力有限，请您核实以下情况，以免造成出行不便。</h2>
               <p>★ [ "您选择的航班仅支持小于80岁乘客预订" ]</p>
               <p>★ 18岁以下未成年人需要至少一名家长或成年旅客全程陪同</p>
               <p>★ 本产品不接受儿童按成人提交订单，敬请谅解。</p>
           </div>
       </div>
       <div class="fill-information-bottom">
         <div>
             <div>
                 <div>
                     <p>总费用</p>
                     <h2><span>3899</span><a href="javascript:;">明细</a></h2>
                 </div>
                 <div>
                     <img src="../../assets/image/contact.png" alt="">
                     <p>联系客服</p>
                 </div>
             </div>
             <a href="javascript:;" @click="addOrderFun()">同意以上条款，去支付</a>
         </div>
       </div>
    </div>
</template>
<script>
import Vue from 'vue'
// import Validator from 'vue-validator'
// Vue.use(Validator)
import axios from 'axios'
import {addOrderInfo } from '../../services/index';
import { mapState, mapActions, mapMutations } from 'vuex'
import tools from '../../common/tools'
import { apiUrl } from '../../common/env'
export default {
    data(){
        return{
           tourSelectedList:[],//旅客选择列表
           sumCount:0,
           tourArr:[],
           mainName:'',//联系人姓名
           mainTel:'',//联系人手机号
           mainEmail:'',//联系人email
           nameList:[],//旅客姓名列表
           codeList:[],//旅客身份证列表
           telList:[],//旅客联系方式列表
           cdTypeList:[
               {
                   'id':1,
                   'name':'身份证'
               },
               {
                   'id':2,
                   'name':'护照'
               },
               {
                   'id':3,
                   'name':'军官证'
               },
               {
                   'id':4,
                   'name':'回乡证'
               },
           ],//证件类型列表
           cdTypeListArr:[],
           id:1,
           mainNameCon:'',//联系人姓名验证
           mainTelCon:'',//联系人电话验证
           mainEmailCon:'',//联系人邮箱验证
        }
    },
    methods: {
        //组合游客列表
       initTourList(){
           this.tourSelectedList=JSON.parse(window.localStorage.getItem('pricePolicyList'));
           console.log(this.tourSelectedList);
            let index=1;
           for(let i=0;i<this.tourSelectedList.length;i++){
            //    this.sumCount+=parseInt(this.tourSelectedList[i].count)
            for(let j=0;j<this.tourSelectedList[i].count;j++){
               
                this.tourArr.push({'index':index++,'name':this.tourSelectedList[i].policyName.slice(0,2),'id':this.tourSelectedList[i].id});
                this.cdTypeListArr.push(this.cdTypeList);
            }
           }
           console.log(this.cdTypeListArr);
           console.log(this.tourArr);
       },
        //添加旅客信息
       addOrderFun(){
            let that = this;
            let proid=window.localStorage.getItem('proid');
            let tourid=window.localStorage.getItem('tourid');
            let policyidArr=[];
            let numArr=[];
            let departure=window.localStorage.getItem('departure');
            let idArr=[];
            for(let i=0;i<that.tourSelectedList.length;i++){
                policyidArr.push(that.tourSelectedList[i].id);
                numArr.push(that.tourSelectedList[i].count);
            }
            for(let i=0;i<that.tourArr.length;i++){
                idArr.push(that.tourArr[i].id);
                console.log(idArr);
            }
            let params={
               'mainName':that.mainName,
               'mainTel':that.mainTel,
               'mainEmail':that.mainEmail,
               'nameList':that.nameList,
               'codeList':that.codeList,
               'telList':that.telList,
               'idList':idArr,
               'proid':proid,
               'tourid':tourid,
               'policyid':policyidArr,
               'num':numArr,
               'departure':departure,
                };
             addOrderInfo(params).then(function(response){
              console.log(response);
              if(response.meta.success=true){
                   console.log('添加旅客信息成功');
              }
              else{
                   console.log('添加旅客信息失败');
              }
          }).catch(function(err){
            that.$Message.info('添加旅客信息接口获取失败');
        });
       },
       print(){
        //    console.log(this.list);
       },
       seFun(){
           alert(this.id);
       },
       //联系人姓名失去焦点的时候验证
       identityNameFun(){
           if(this.mainName==''){
               this.mainNameCon="联系人姓名不能为空";
           }
       },
       //联系人电话失去焦点的时候验证
       identityTelFun(){
           if(this.mainTel==''){
               this.mainTelCon="联系人手机号码不能为空";
           }
       },
       //联系人Email失去焦点的时候验证
       identityEmailFun(){
           if(this.mainEmail==''){
               this.mainEmailCon="联系人Email不能为空";
           }
       }
    },
    mounted(){
        this.initTourList();
    },
    components: {
     
    },
}
</script>

<style lang="scss">
.fill-information{
    .fill-information-content{
        background: #1c7dab;
        padding: toRem(38px) toRem(28px) toRem(50px) toRem(28px);
        padding-bottom: toRem(148px);
        >div{
            background: #fff;
            &:nth-child(1),&:nth-child(2){
                border:1px solid #f39800;
                border-radius: toRem(10px);
                >h2{
                    @include sc(toRem(38px),#f39800);
                    line-height: toRem(38px);
                    padding-left: toRem(7px);
                    margin-bottom: toRem(9px);
                    font-weight: bold;
                }
                >p{
                   @include sc(toRem(22px),#9a9a9a); 
                   line-height: toRem(22px);
                   padding-left: toRem(7px);
                   padding-bottom: toRem(16px);
                   border-bottom:1px solid #a0a0a0;
                }
                .input-wrap{
                    margin-bottom: toRem(20px);
                    padding-left: toRem(25px);
                    >label{
                       display: inline-block;
                       width:toRem(112px);
                       @include sc(toRem(28px),#373737);
                       margin-right: toRem(23px);
                       text-align: right;
                    }
                    >select{
                        height:toRem(75px);
                         border:1px solid #858585;
                    }
                    >input{
                        @include wh(toRem(362px),toRem(75px));
                        padding-left: toRem(20px);
                        border:1px solid #858585;
                    }
                    >input::placeholder{
                        @include sc(toRem(25px),#9a9a9b);
                    }
                    >p{
                        // display: none;
                        margin-left: toRem(140px);
                        color:red;
                    }
                }
            }
            &:nth-child(1){
               padding: toRem(25px) toRem(15px) toRem(42px) toRem(13px);
               margin-bottom: toRem(37px);
               >p{
                   margin-bottom: toRem(48px);
               }
            }
             &:nth-child(2){
                padding: toRem(25px) toRem(15px) toRem(15px) toRem(13px);
                margin-bottom: toRem(19px);
                >p{
                   margin-bottom: toRem(35px); 
                }
                >ul{
                    >li{
                        margin-bottom: toRem(47px);
                        >h3{
                            @include sc(toRem(30px),#010101);
                            line-height: toRem(30px);
                            font-weight: bold;
                            padding-left: toRem(10px);
                            margin-bottom: toRem(38px);
                            >span{
                                @include sc(toRem(30px),#373737); 
                                margin-left: toRem(35px);
                                font-weight: normal;
                                &.child{
                                    @include sc(toRem(28px),#83ba00); 
                                }
                            }
                            >a{
                                float: right;
                                font-weight: normal;
                               @include sc(toRem(22px),#0075a9);  
                            }
                        }
                    }
                }
            }
            &:nth-child(3){
                border-radius: toRem(10px);
                padding: toRem(25px) toRem(23px) toRem(14px) toRem(23px);
                >h2{
                   @include sc(toRem(19px),#575757); 
                   line-height: toRem(19px);
                   margin-bottom: toRem(15px);
                }
                >p{
                    @include sc(toRem(15px),#575757); 
                    line-height: toRem(15px);
                    margin-bottom: toRem(11px);
                }
            }
        }
    }
    .fill-information-bottom{
        position: fixed;
        bottom: 0;
        height:toRem(98px);
        width:100%;
        >div{
            width: 100%;
            position: relative;
            >div{
                background: #eee;
                padding: toRem(10px) 0 0 toRem(10px);
                >div{
                    display: inline-block;
                    &:nth-child(1){
                        >p{
                           @include sc(toRem(22px),#eb6100); 
                           line-height: toRem(22px);
                           margin-bottom: toRem(4px);
                        }
                        >h2{
                            line-height: toRem(50px);
                            padding-left: toRem(16px);
                            >span{
                                @include sc(toRem(50px),#eb6100);
                                &:before{
                                    content:'￥';
                                    @include sc(toRem(24px),#eb6100);
                                }
                            }
                            >a{
                               text-decoration: underline;
                               @include sc(toRem(20px),#272727); 
                               margin-left: toRem(17px);
                               margin-right: toRem(45px);
                            }
                        }
                    }
                    &:nth-child(2){
                        text-align: center;
                        >img{
                            @include wh(toRem(47px),toRem(46px));
                        }
                        >p{
                           @include sc(toRem(17px),#272727); 
                        }
                    }
                }
            }
            >a{
                position: absolute;
                display: inline-block;
                top:0;
                right:0;
                @include wh(toRem(389px),toRem(98px));
                @include sc(toRem(30px),#fff);
                text-align: center;
                background: #222;
                line-height: toRem(98px);
            }
        }
    }
}
</style>

