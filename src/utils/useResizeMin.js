import { ref, onMounted, onUnmounted } from "vue";

export default () => {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);
  const onUpdate = () => {
    width.value =window.innerWidth;
    height.value = window.innerHeight;
  }

  onMounted(() => {
    window.addEventListener('resize', onUpdate);
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onUpdate);
  })

  return {width, height}
}