<template>
  <div class="add_box">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm upForm"
      action = "http://localhost:3000/shop"
      method = "POST"
      enctype="multipart/form-data"
    >
      <el-form-item label="店铺名称" prop="name">
        <el-input v-model="ruleForm.name" name="shop_name"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <Dropdown trigger="click" style="width:100%">
          <!-- <a href="javascript:void(0)"> -->
          <el-input v-model="ruleForm.address" @input.native="getaddress" name="shop_address"></el-input>
          <!-- </a> -->
          <DropdownMenu slot="list">
            <DropdownItem
              v-for="(item,index) in address_list"
              :key="index"
              @click.native="changeAddress(item.address)"
            >{{ item.address }}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="ruleForm.phone" name="shop_phone"></el-input>
      </el-form-item>
      <el-form-item label="店铺简介">
        <el-input v-model="ruleForm.intro" name="shop_intro"></el-input>
      </el-form-item>
      <el-form-item label="店铺标语">
        <el-input v-model="ruleForm.slogan" name="shop_slogan"></el-input>
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
          <ivew-switch v-model="ruleForm.ensure" name="shop_ensure"></ivew-switch>
        </div>
        <div class="specia">
          <p>蜂鸟专送</p>
          <ivew-switch v-model="ruleForm.bird" name="shop_bird"></ivew-switch>
        </div>
        <div class="specia">
          <p>新店开铺</p>
          <ivew-switch v-model="ruleForm.newshop" name="shop_newshop"></ivew-switch>
        </div>
        <div class="specia">
          <p>外卖保</p>
          <ivew-switch v-model="ruleForm.take" name="shop_take"></ivew-switch>
        </div>
        <div class="specia">
          <p>准时达</p>
          <ivew-switch v-model="ruleForm.punctuality" name="shop_punctuality"></ivew-switch>
        </div>
        <div class="specia">
          <p>开发票</p>
          <ivew-switch v-model="ruleForm.invoice" name="shop_invoice"></ivew-switch>
        </div>
      </el-form-item>
      <el-form-item label="配送费" >
        <el-input-number v-model="num" :precision="1" :step="0.5" :max="10" :min="0" name="shop_num"></el-input-number>
      </el-form-item>

       <el-form-item label="起送价" >
        <el-input-number v-model="amount" :precision="1" :step="1.0" :max="30" :min="0" name="shop_amount"></el-input-number>
      </el-form-item>

      <el-form-item label="上传店铺头像" class="upload-box" >
        <div>
        <span class="el-icon-plus"></span>
        <input  class="upload" type="file"   name="shop_logo" />  
        </div>
      </el-form-item>
      <el-form-item label="上传营业执照" class="upload-box">
        <div>
        <span class="el-icon-plus"></span>
        <input  class="upload" type="file"   name="shop_business_premits" />  
        </div>
      </el-form-item>
      <el-form-item label="上传餐饮服务许可证" class="upload-box">
        <div>
        <span class="el-icon-plus"></span>
        <input  class="upload" type="file"  name="shop_licence"  />  
        </div>
      </el-form-item>
      <el-form-item>
        <input type="button" value="提交" @click= "submitForm" class="sub-btn">
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {Switch} from 'iview'
export default {
  beforeRouteLeave(to,from,next){
    if(confirm('确认离开吗？')){
      next()
    }else{
      next(false)
    }
  },
  components:{
    'ivew-switch':Switch
  },
  data() {
    return {
      amount:20,
      num:1,
      startTime: "",
      endTime: "",
      address_list: {},
      ruleForm: {
        name: "",
        address: "",
        phone: "",
        intro: "",
        slogan: "",
        date1: "",
        date2: "",
        ensure: true,
        bird: true,
        newshop: true,
        take: true,
        punctuality: true,
        invoice: true,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11个字符", trigger: "blur" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
     submitForm() {
       if(confirm('确认添加该商铺吗？')){
         var options = {
             "beforeSubmit" : this.checkForm,
             "success" : this.resultForm,
             "resetForm" : true,
             "dataType" : "json"
         };
         $(".upForm").ajaxSubmit(options);
       }
    },
    checkForm (formData, form, options) {

    },
    resultForm (data, status) {
      var  _this = this
       if ( data ) {
         switch ( data.status ) {
           case 1:
              _this.$message.error('此店铺信息已经存在');
             break;
           case 2:
              _this.$message.success('店铺添加成功！');
             _this.$router.push('/home')
             break;
           case 3:
             _this.$message.error('网络或是服务器有延迟！！！')
             break;
           default:
             break;
         }
       }
    },
    getaddress() {
      setTimeout(async () => {
        const result = await this.$https({
          url: "/v1/pois",
          params: {
            type: "search",
            city_id: 2,
            keyword: this.ruleForm.address
          }
        });
        this.address_list = result.data;
      }, 1500);
    },
    changeAddress(val) {
      this.ruleForm.address = val;
    }
  }
};
</script>
<style scoped>
.add_box {
  width: 700px;
  margin: 0 auto;
}
.specia {
  display: inline-block;
  padding-right: 20px;
}
.specia p {
  display: inline-block;
  padding-right: 10px;
}
.upload{
  display: block;
  border: 1px dotted #999;
  /* width:76px; */
  height: 76px;
  text-indent: -100px;
  position: relative;
  z-index: 100;
}
.upload:hover{
  border-color: orange;
  transition: all 0.3s
}
.upload-box div{
  position: relative;
  display: inline-block;
}
.upload-box div:hover{
  color:orangered;
  transition: all 0.3s
}
.upload-box span{
  height: 40px;
  width:40px;
  font-size: 40px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
}
.sub-btn{
    color: #FFF;
    background-color: #67C23A;
    border-color: #67C23A;display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #DCDFE6;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
}
</style>