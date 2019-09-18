<template>
    <div class="shutter">
        <div class="box">
            <div class="el-icon-error-box">
                <span class="el-icon-error" @click="exit"></span>
            </div>
            <div>
                  <el-form
                    label-width="100px"
                    class="demo-ruleForm"
                  >     
                     <el-form-item label="店铺名称">
                        <el-input v-model="name" name="shop_name" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="店铺地址">
                        <el-input v-model="address" name="shop_address" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input v-model="phone" name="shop_phone"></el-input>
                    </el-form-item>
                     <el-form-item label="店铺简介">
                        <el-input v-model="intro" name="shop_intro"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺标语">
                        <el-input v-model="slogan" name="shop_slogan"></el-input>
                    </el-form-item>
                      <el-form-item label="营业时间" required>
                        <el-time-select
                        style= "margin-right:10px"
                        placeholder="起始时间"
                        v-model="startTime"
                        name="shop_start"
                        :picker-options="{
                            start: '06:30',
                            step: '00:15',
                            end: '18:00'
                        }"
                        ></el-time-select>
                        <el-time-select
                        placeholder="结束时间"
                        v-model="endTime"
                        name="shop_end"
                        :picker-options="{
                            start: '08:30',
                            step: '00:15',
                            end: '24:00',
                            minTime: startTime
                            }"
                        ></el-time-select>
                    </el-form-item>
                    <el-form-item label="店铺特点" prop="delivery">
                        <div class="specia" >
                        <p>品牌保证</p>
                        <ivew-switch v-model="ensure" name="shop_ensure"></ivew-switch>
                        </div>
                        <div class="specia">
                        <p>蜂鸟专送</p>
                        <ivew-switch v-model="bird" name="shop_bird"></ivew-switch>
                        </div>
                        <div class="specia">
                        <p>新店开铺</p>
                        <ivew-switch v-model="newshop" name="shop_newshop"></ivew-switch>
                        </div>
                        <div class="specia">
                        <p>外卖保</p>
                        <ivew-switch v-model="take" name="shop_take"></ivew-switch>
                        </div>
                        <div class="specia">
                        <p>准时达</p>
                        <ivew-switch v-model="punctuality" name="shop_punctuality"></ivew-switch>
                        </div>
                        <div class="specia">
                        <p>开发票</p>
                        <ivew-switch v-model="invoice" name="shop_invoice"></ivew-switch>
                        </div>
                    </el-form-item>
                    <el-form-item label="配送费" >
                        <el-input-number v-model="num" :precision="1" :step="0.5" :max="10" :min="0" name="shop_num"></el-input-number>
                    </el-form-item>

                    <el-form-item label="起送价" >
                        <el-input-number v-model="amount" :precision="1" :step="1.0" :max="30" :min="0" name="shop_amount"></el-input-number>
                    </el-form-item>   
                   <el-button type="success" @click.prevent= 'save' class="modify-btn">修改</el-button>
                  </el-form>     
            </div>
        </div>
    </div>
</template>

<script>
import {Switch} from 'iview'
import { mapActions } from 'vuex'
export default {
    components:{
    'ivew-switch':Switch
  },
    data(){
        return{
            name:this.$route.query && this.$route.query.shop_name || '',
            address: this.$route.query && this.$route.query.shop_address || '',
            phone:this.$route.query && this.$route.query.shop_phone || '',
            intro:this.$route.query && this.$route.query.shop_intro || '',
            slogan:this.$route.query && this.$route.query.shop_slogan || '',
            startTime:this.$route.query && this.$route.query.shop_start || '',
            endTime:this.$route.query && this.$route.query.shop_end || '',
            ensure:this.$route.query && this.$route.query.shop_ensure ,
            bird:this.$route.query && this.$route.query.shop_bird ,
            newshop:this.$route.query && this.$route.query.shop_newshop ,
            take:this.$route.query && this.$route.query.shop_take ,
            punctuality:this.$route.query && this.$route.query.shop_punctuality ,
            invoice:this.$route.query && this.$route.query.shop_invoice,
            num:this.$route.query && this.$route.query.shop_num || '',
            amount:this.$route.query && this.$route.query.shop_amount || ''
        }
    },
    methods:{
        exit(){
            this.$router.go(-1);
            this.$message.error('取消修改！')
        },
        ...mapActions(['modifyShopItems']),
        save(){
            if(confirm('确认修改吗？')){
                this.modifyShopItems({
                    _id:this.$route.query._id,
                    shop_phone:this.phone,
                    shop_intro:this.intro,
                    shop_slogan:this.slogan,
                    shop_start:this.startTime,
                    shop_end:this.endTime,
                    shop_ensure:this.ensure,
                    shop_bird:this.bird,
                    shop_newshop:this.newshop,
                    shop_take:this.take,
                    shop_punctuality:this.punctuality,
                    shop_invoice:this.invoice,
                    shop_num:this.num,
                    shop_amount:this.amount
                })
                this.$message.success('修改成功')
                this.$router.push('/shoplist')
                // location.reload()
            }
        }
    }

}
</script>

<style scoped>
    .shutter{
        position:fixed;
        width:100%;
        height: 100%;
        z-index: 999;
        background-color: rgba(0,0,0,.7);
        left:0;
        top: 0;
    }
    .box{
        position: fixed;
        z-index: 1000;
        width:80%;
        height: 80%;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        background-color: #fff;
        border-radius: 10px;
    }
    .el-icon-error-box{
        width:40px;
        height: 40px;
        line-height: 40px;
        font-size: 30px;
        position:absolute;
        right: 5px;
        top: 5px;
        text-align: center;
    }
    .el-icon-error-box:hover{
        color:red;
        font-size: 35px;
        transition: all .4s;
        cursor: pointer;
    }
    .demo-ruleForm{
        width:60%;
        margin: 20px auto;
    }
    .specia{
        display: inline-block;
        padding-right:20px;
    }
    .modify-btn{
        display: block;
        margin: 0 auto;
    }
</style>