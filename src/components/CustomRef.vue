<template>
  <section>
    轻轻松松实现防抖
    {{text}}
    <input v-model="text"/>
  </section>
</template>

<script>
  import { customRef } from "vue";

  // 只需要返回一个响应Ref对象,可自定义get,set
  const useDebounce = (value, delay = 1000) => {//10000秒之后才会更新text的值
    return customRef(
      (track, trigger) => {
        let timeout
        return {
          get() {
            track(); // 必须调用次函数才会触发更新
            return value;
          },
          set(newValue) {
            clearTimeout(timeout);
            timeout = setTimeout(()=>{
              value = newValue;
              trigger()//必须调用次函数才会触发更新
            }, delay)
          }
        }
      }
    )
  }
  export default {
    setup(props) {
      
      return {
        text: useDebounce()
      }
    }
  }
</script>