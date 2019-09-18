 <template>
    <el-table
      :data="users.data"
      stripe
      style="width: 100%">
      <el-table-column
      type="index"
      :index="indexMethod"
      width="100" >
    </el-table-column>
      <el-table-column
        prop="time"
        label="注册日期"
        width="400">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户姓名"
        width="300">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
    </el-table>
  </template>

  <script>
    import { mapState, mapActions } from 'vuex';
    export default {
        computed: {
          ...mapState({
            users:state => state.user.users
          })
        } ,
        methods:{
          ...mapActions(['getUsers'])
        },
        created(){
          this.getUsers();
        }
    }
  </script>