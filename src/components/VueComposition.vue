<script>
  import {
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onErrorCaptured,
    onRenderTracked,
    onRenderTriggered
  } from 'vue';

  export default {
    // setup() 函数是 vue3 中统一的入口函数
    //所有生命周期函数定义都是需要定义在次函数下才生效，setup 函数中无法访问到 this
   // 所有的组件参数都是通过，setup函数中包含props和context参数，props参数默认是响应式的
    setup() {
      console.log("setup");
      onRenderTracked(() => {
        console.log("onRenderTracked");
      });
      onRenderTriggered((event) => {
        console.log('onRenderTriggered')
      });
      onBeforeMount(() => {
        console.log("onBeforeMount");
      });
      onMounted(() => {
        console.log("onMounted");
      });
      onBeforeUpdate(() => {
        console.log("onBeforeUpdate");
      });
      onUpdated(() => {
        console.log("onUpdated");
      });
      onBeforeUnmount(() => {
        console.log("beforeDestroy");
      });
      onUnmounted(() => {
        console.log("onUnmounted");
      });
      onErrorCaptured(() => {
        console.log("onErrorCaptured");
      });
      return {
      };
    }
  }
</script>