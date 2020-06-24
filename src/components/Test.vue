<template>
  <div>
    <p>
      年龄:{{ count }}
      <input v-model="count" />
    </p>
    <p>
      <span>名字:{{name.id}}</span>
      <input v-model="name.id" />
    </p>
    <p>
      <span>shallowRef{{foo}}</span>
      <input v-model="foo" />
    </p>
    <p>
      <span>常量{{str}}</span>
      <input v-model="str" />
    </p>
  </div>

</template>

<script>
  import { 
    ref, 
    reactive, 
    watchEffect, 
    watch, 
    shallowRef, 
    isReactive, 
    isRef, 
    toRefs 
  } from "vue";
  export default {
    setup() {
      const count = ref(4);
      // temp.value就是一个响应式代理对象
      // 但是temp还是一个ref对象
      const temp = ref({name: '3'})
      // 原理同上
      const tempArray = ref([3,4,5])
      const count1 = reactive({name: {id: 18}});
      const count1Array = reactive([[1,2,3],[4,5]])
      const foo = shallowRef({});
      foo.value = {};
      console.log(5555, count1)

      watchEffect(()=>{
        console.log('watchEffect',count.value)
      },
      
      )

      watch(
        ()=> count1.name,
        (name, prevName) => {
        console.log('watch', name, prevName)
      })

      const str = '';
      return {
        count,
        ...toRefs(count1),
        foo,
        str
      }
    },
  }
</script>