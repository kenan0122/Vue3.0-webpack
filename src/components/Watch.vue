<template>
  <section>
    <h2>Hello World Vue3.0</h2>
    请输入地址:<input type="text" v-model="city">
    请输入年龄:<input type="text" v-model="age">
     <button @click="stop">不想给你知道我的年龄</button>
    <br/>
  </section>
</template>

<script>
  import { ref,watch } from "vue";
  export default {
    setup(props) {
      const city = ref('上海');
      const age = ref(18);
     

      // 监听某个响应对象
      const stop2 = watch(
        ()=> age.value,
        (age, prevAge)=>{
          console.log("age:",age,"prevAge",prevAge)
        },
        {
          // 是否触发深度监听
          deep: true
        }
      );

       //调用监听实例函数，可以停止监听
      //stop2()

      // 监听多个响应对象
      const stop3 = watch(
        [
          () => age.value,
          () => city.value
        ],
        ( [age, city], [prevAge, prevCity] ) => {
          console.log("age:",age,"prevage",prevage)
          console.log("city:",city,"prevcity",prevcity)
        },
        {
           lazy: true // 是否触发深度监听
        }
      );

      return {
        city, 
        age,
        stop3
      }
    }
  }
</script>