<template>
  <div>
    <router-view></router-view>
    <el-table :data="shops.data" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.shop_name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop_address }}</span>
            </el-form-item>
            <el-form-item label="店铺介绍">
              <span>{{ props.row.shop_intro }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.shop_phone }}</span>
            </el-form-item>
            <el-form-item label="店铺标语">
              <span>{{ props.row.shop_slogan }}</span>
            </el-form-item>
            <el-form-item label="店铺头像">
              <img
                :style="{
              width: '50px',height: '50px'
            }"
                :src="'http://localhost:3000/upload/'+ props.row.shop_logo"
              />
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="店铺名称" prop="shop_name"></el-table-column>
      <el-table-column label="店铺地址" prop="shop_address"></el-table-column>
      <el-table-column label="店铺介绍" prop="shop_intro"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="modify(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="delShop(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      shops: state => state.shop.shops
    })
  },
  methods: {
    ...mapActions(["getShops", "delShopItems"]),
    delShop(_id) {
      if (confirm("确定删除吗？")) {
        this.delShopItems(_id);
        this.$message.success("删除成功!");
      } else {
        this.$message.error("取消删除");
      }
    },
    modify(data) {
      this.$router.push({
        name: "modify",
        query: {
          ...data
        }
      });
    }
  },
  created() {
    this.getShops();
  },
};
</script>

<style>
.demo-table-expand > div {
  width: 45%;
  box-sizing: border-box;
}
.demo-table-expand span {
  color: black;
}
</style>