<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="1-0" theme="dark" width="auto" >

                <MenuItem name="1-0">
                <Icon type="logo-apple" />
                        <router-link to='/home' tag="div" style="display:inline-block">首页</router-link>
                </MenuItem>
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-albums" />
                        数据管理
                    </template>
                    <MenuItem name="1-1"><router-link to='/users' tag="div">用户列表</router-link></MenuItem>
                    <MenuItem name="1-2"><router-link :to= "{name:'shoplist'}" tag="div">商家列表</router-link></MenuItem>
                    <!-- <MenuItem name="1-3"><router-link to='' tag="div">食品列表</router-link></MenuItem>
                    <MenuItem name="1-4"><router-link to='' tag="div">订单列表</router-link></MenuItem>
                    <MenuItem name="1-5"><router-link to='' tag="div">管理员列表</router-link></MenuItem> -->
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="md-add" />
                        添加数据
                    </template>
                    <MenuItem name="2-1"><router-link to='/add_the_shop' tag="div">添加商铺</router-link></MenuItem>
                    <!-- <MenuItem name="2-2"><router-link to='' tag="div">添加商品</router-link></MenuItem> -->
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-podium" />
                        图表
                    </template>
                    <MenuItem name="3-1"><router-link :to= "{name:'charts'}" tag="div">用户分布</router-link></MenuItem>
                </Submenu>
                <Submenu name="4">
                    <template slot="title">
                        <Icon type="md-create" />
                        编辑
                    </template>
                    <MenuItem name="4-1"><router-link to='/edit' tag="div">文本编辑</router-link></MenuItem>
                </Submenu>
                 <Submenu name="5">
                    <template slot="title">
                        <Icon type="md-flower" />
                        设置
                    </template>
                    <MenuItem name="5-1"><router-link to='/admin' tag="div">管理员设置</router-link></MenuItem>
                </Submenu>
                 <Submenu name="6">
                    <template slot="title">
                        <Icon type="ios-help-circle" />
                        说明
                    </template>
                    <MenuItem name="6-1"><router-link to='' tag="div">说明</router-link></MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <Header :style="{boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                <p> 欢迎来到XXX后台管理系统</p>
                <Dropdown>
                    <Avatar icon="ios-person" size="large" class="el-dropdown-link" />
                    <DropdownMenu slot="list">
                        <DropdownItem><router-link to='/home' tag='div'>首页</router-link></DropdownItem>
                        <DropdownItem @click.native= "exit">退出</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Header>
            <Content :style="{padding: '0 16px 16px',height: '100%'}" >
                
                <Card style="height:100%; margin-top:10px;">
                    <div style="height:100%">
                        <router-view></router-view>
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>
<script>
    export default {
            methods:{
                exit(){
                    localStorage.removeItem('token');
                    this.$router.replace('/')
                }
            }
        }
</script>

<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height: 100%;
        overflow-y:auto;
        
    }
    .ivu-layout{
        /* height: 100%; */
        overflow-y:auto;
    }
    .ivu-layout-header{
        background-color: #515a6e!important;
        color: #f5f7f9;
        font-size: 24px;
        display: flex;
        justify-content:space-between;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }

    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover  {
    border-right: none;
    color: #2d8cf0;
    background: #363e4f!important;
}
    a{
        color:#fff;
    } 
    
    .ivu-menu-submenu div{
        padding:14px 24px 14px 43px;
    }
    .ivu-menu-submenu .ivu-menu-item{
        padding: 0!important;
    }
     .ivu-menu-item:hover div{
        background-color: #48576a!important;
    }
</style>