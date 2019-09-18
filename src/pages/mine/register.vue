<template>
  <div class="register_box">
    <h3>xxx注册系统</h3>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="user">
        <Input type="text" v-model="formInline.user" placeholder="用户名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="密码">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="email">
        <Input type="email" v-model="formInline.email" placeholder="邮箱">
          <Icon type="ios-at-outline" slot="prepend"/>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">注册</Button>
        <Button type="success" class="margin_left" @click="login">登录</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        password: "",
        email:"",
        time:"",        
      },
      ruleInline: {
        user: [{ required: true, message: "请填写用户名", trigger: "blur" }],
        password: [
          { required: true, message: "请填写密码", trigger: "blur" },
          {
            type: "string",
            min: 6,
            message: "密码不得少于6位",
            trigger: "blur"
          }
        ],
        email: [{ required: true, message: "请填写用户名", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.formInline.time=new Date(Date.now()).toLocaleString();
          setTimeout(async () => {
            let params = new URLSearchParams();
            params.append("username", this.formInline.user);
            params.append("password", this.formInline.password);
            params.append("email",this.formInline.email);
            params.append("time",this.formInline.time);
            const result = await this.$https({
              url: "http://localhost:3000/users",
              method: "post",
              data: params,
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              }
            });
            switch (result.data.status) {
              case 0:
                this.$Message.error(result.data.info);
                break;
              case 1:
                this.$Message.success(result.data.info);
                this.$router.push("/mine/login");
                break;
              default:
                this.$Message.success(result.data.info);
            }
          }, 0);
        } else {
          this.$Message.error("格式不正确!");
        }
      });
    },
    login() {
      this.$router.push("/mine");
    }
  }
};
</script>

<style>
.register_box {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  overflow: hidden;
  background-color: #fff;
  width: 250px;
  height: 270px;
  border-radius: 15px;
  padding: 15px 20px;
  text-align: center;
}
.register_box h3 {
  margin-bottom: 15px;
}
.margin_left {
  margin-left: 20px;
}
</style>