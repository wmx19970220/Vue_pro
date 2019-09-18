<template>
    <div class="B-box">
    <router-view></router-view>
    </div>
</template>

<style scoped>

.B-box{
    width:100%;
    height: 100%;
    position:fixed;
    z-index: 1000;
    left: 0;
    top:0;
    background: rgb(50, 64, 87) ;
}
</style>