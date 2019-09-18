<template>
  <div style="overflow:hidden;">
    <h2>管理员信息</h2>
    <el-card class="box-card">
      <div class="text item">
        用户名:
        <span>{{  username }}</span>
      </div>
      <div class="text item">
        注册时间:
        <span>{{  time }}</span>
      </div>
      <div class="text item">
        管理员权限:
        <span>管理员</span>
      </div>
      <div class="text item">
        邮箱:
        <span>{{ email }}</span>
      </div>
      <div class="text item">
        上传头像
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      imageUrl: "",
      username:'',
      time:'',
      email:''
    };
  },
  created(){
      this.getUsers();
      setTimeout(()=>{
        const result = this.$store.state.user.users.data;
            const token = localStorage.getItem('token');
            
            result.forEach(ele => {
                if(ele.username==token){
                    this.username=ele.username;
                    this.time=ele.time;
                    this.email=ele.email;
                }
            });
      },30)
     
  },
  methods: {
      ...mapActions(['getUsers']),
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style >
h2 {
  text-align: center;
  font-size: 30px;
}
.text {
  font-size: 18px;
}
.text span {
  color: chocolate;
}
.item {
  padding: 18px 0;
}
.box-card {
  width: 480px;
  margin: 15px auto;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-left:80px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>