<template>
  <div>
    <div id="editor" type="text/plain" style="width:1024px;height:500px;"></div>
    <button @click="submits">保存</button>
    <button @click="xieru">写入</button>
  </div>
</template>

<script>
import "../../../public/ueditor/js/ueditor.config.js";
import "../../../public/ueditor/js/ueditor.all.js";
import "../../../public/ueditor/js/zh-cn.js";
export default {
  name: "hello",
  data() {
    return {
      ue: "",
      uedata: localStorage.getItem('uedata') && JSON.parse( localStorage.getItem('uedata')) || [],
      xierudata: []
    };
  },
  mounted() {
    this.ue = UE.getEditor("editor", {
      BaseUrl: "",
      UEDITOR_HOME_URL: "public"
      // toolbars:[]
    });
  },
  methods: {
    submits() {
      this.uedata.push(UE.getEditor("editor").getContent());
      console.log( this.uedata )
      console.log(this.uedata.join("\n"));

      localStorage.setItem('uedata',JSON.stringify( this.uedata))

    },
    xieru() {
      UE.getEditor("editor").setContent("欢迎使用ueditor");
    }
  }
};
</script>
