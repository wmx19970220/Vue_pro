<template>
    <div class="login_box">
        <h3>xxxxxx登录系统</h3>
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
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
                <Button type="success" class="margin_left" @click= 'register'>注册</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码不得少于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        setTimeout(async ()=>{
                        let params = new URLSearchParams();
                        params.append("username", this.formInline.user);
                        params.append("password", this.formInline.password);
                        const result = await  this.$https({
                            url:'http://localhost:3000/users',
                            params,
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            }
                        })  
                        switch(result.data.status){
                            case 0:this.$Message.error('异常!请重试');
                            break;
                            case 1:this.$Message.error(result.data.info);
                            break;
                            case 2: this.$Message.success(result.data.info);
                            localStorage.setItem('token',this.formInline.user)
                            this.$router.push('/home')
                            break;
                        }
                        },0)
                   
                          
                       
                    } else {
                        this.$Message.error('格式不正确!');
                    }
                })
            },
            register(){
                this.$router.push('/mine/register')
            }
        }      
    }
</script>

<style>
    .login_box{
        position: absolute;
        left:0;
        right:0;
        top:0;
        bottom:0;
        margin: auto;
        overflow: hidden;
        background-color: #fff;
        width:250px;
        height: 210px;
        border-radius: 15px;
        padding: 15px 20px;
        text-align: center;
    }
    .login_box h3{
        margin-bottom: 15px;
    }
    .margin_left{
        margin-left:20px;
    }
</style>