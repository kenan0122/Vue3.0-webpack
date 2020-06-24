<template>
  <section>
    <h2>我是:{{ userName }}</h2>

    请输入年龄:<input type="text" v-model="age">
    <br/><br/>
    我的年龄是:{{userMsg}}
     我的年龄是:{{authorMsg}}
  </section>
</template>

<script>
  import { ref,computed } from "vue";

  export default {
    props: {
      userName: String
    },
    setup(props, context) {
      // context.attrs
      // context.slots
      // context.parent
      // context.root
      // context.emit
      // context.refs
      console.log(`组件传递props${props.userName}`);
      console.log(`组件的上下文对象${context}`);

      const age = ref("");
      //传入函数的方式
      // computed() 计算属性 传入一个 function 函数，可以得到一个只读的计算属性 
      // 传入一个对象可以自定义get set函数 返回一个响的应式ref对象
      // compute的是只读的
      const userMsg = computed(() =>{
        return age.value
      });

       //传入对象自定义get set的形式
    const authorMsg = computed({
      get(){
        return age.value
      },
      set(val){
        age.value=val;
      }
    });

    return {
      age,
      userMsg,
      authorMsg
    };

    }
  }
</script>