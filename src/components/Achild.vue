<template>
  <section>
   <div>孙子组件</div>
   <img style="width:50px;height:50px" :src="pic"/>
   <p>
      屏幕width:{{width}}
      屏幕height:{{height}}
   </p>
   <test />
  </section>
</template>

<script>
  import { inject, markRaw, reactive } from 'vue';
  import useResizeMin from '../utils/useResizeMin.js';
  import Test from './Test.vue'


  export default {
    components:{
      Test
    },
    setup(props) {
      // A组件获取父组件传递过来的帅气头像数据
      const pic = inject('pic');

      // markRaw:标记一个对象，使其永远不会转换为代理。返回对象本身 shallowRef：
      // 创建一个引用来跟踪其自身的.value突变，但不会使其值具有反应性（意思就是）
      const foo = markRaw({
        nested: true
      });
      const bar = reactive({
        nested: foo.nested
      });
      console.log(bar)
      console.log(foo)

      // 这样就很清晰width这些数据是从哪里维护的，且不会冲突其变量
      const {width,height} = useResizeMin();

      return {
        pic,
        width,
        height
      }
    }
  }
</script>