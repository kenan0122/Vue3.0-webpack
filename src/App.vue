<template>
  <section>
    <h2>{{ title }}</h2>

    <h3>我是：{{userInfo.userName}}</h3>

    <h3>我叫小王，来自：{{city}}</h3>
    <button @click="getUserCity">你来自哪个城市？</button>

    <h3>{{Msg}}</h3>
    <button @click="getUserInfo">介绍一下你自己</button>

    <h3>转换reactive类型数据{{userInfo.userName}}</h3>
    <h3>转换reactive类型数据{{code}}</h3>

    <com-user :userName="'洁哥哥'"/>
    <com-watch />
    <com-a ref="comRef"/>
    <custom-ref />

    <router-view></router-view>
  </section>
</template>

<script>
import { reactive, ref, isRef, toRefs, provide, onMounted  } from "vue";
import ComUser   from './components/User.vue';
import ComWatch from './components/Watch.vue';
import ComA from "./components/A.vue";
import CustomRef from './components/CustomRef.vue';

export default {
  components:{
    ComUser,
    ComWatch,
    ComA,
    CustomRef
  },
  setup() {
    // reactive() 函数接收一个普通对象，返回一个响应式的数据对象,
    // 支持Map、Set、WeakSet、WeakMap数据结构
    const userInfo = reactive({userName: '阿南'});

    // ref() 函数用来根据给定的值创建一个响应式的数据对象，ref() 函数调用的返回值
    // 是一个对象，这个对象上只包含一个 .value 属性。
    const city = ref('');
    const getUserCity=()=>{
      city.value="上海";
    }

    //  isRef() 用来判断某个值是否为 ref() 创建出来的对象。 
    // isProxy、isReactive、isReadonly都大同小异
    const name=ref("虎克小哥哥");
    const zone=ref("北京");
    const Msg=ref("");
    const getUserInfo=()=>{
      if(isRef(name)){
        Msg.value=`我叫${name.value},來自${zone.value}`
      }else{
        Msg.value=`我叫${name.value}`
      }
    }

    // toRefs() 函数可以将 reactive() 创建出来的响应式对象，转换为普通的对象，就是
    // 可以將reactive多层对象类型的响应对象，转化为普通类型的响应数据
    const data = reactive({
      userInfo: {
        userName: '阿珂'
      },
      code: 200
    });

    //  provide() 和 inject() 可以实现嵌套组件之间的数据传递。父级组件中使用 provide() 
    // 函数向下传递数据；子级组件中使用 inject() 获取上层传递过来的数据
    const pic='https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1461286262,427682797&fm=26&gp=0.jpg';
    // 父组件冒泡共享数据pic
    provide('pic', pic);
    //也支持传递响应式数据
    const pic1 = ref('pic');
    provide('pic1',pic1);

    // ref 组件实例获取
    const  comRef = ref(null);
    //需要在domx渲染类型的生命周期后使用
    onMounted(() => {
       //获取子组件实例，调用其内部函数
      console.log(comRef.value.getName())
    })

    return {
      title: "Hello Word Vue3.0",
      userInfo,
      city,
      getUserCity,
      Msg,
      getUserInfo,
      ...toRefs(data),
      comRef
    }
  }
};
</script>

<style>
  body {
    padding: 50px;
    color: #42b983;
    text-align: center;
    background-color: #282c34;
  }
</style>