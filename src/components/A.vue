<template>
  <section>
    <div>子组件</div>
    <p>{{getName}}</p>
    <com-achild/>
  </section>
</template>

<script>
import ComAchild from "./Achild.vue";

  export default {
    components:{
      ComAchild,
    },
    setup(props) {
      // 子组件中的函数
      const getName=()=>{
        return '我是测试数据';
      }

      return{
        getName
      }
    }
  }
</script>
