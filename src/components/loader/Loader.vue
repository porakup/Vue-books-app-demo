<template>
<div class="loader-spinner" v-if="openLoader">
  <div class="spinner-container">
    <div class="spinner">
        <div></div><div></div><div></div><div></div>
    </div>
  </div>
</div> 
</template>

<style scoped lang="scss">

.loader-spinner {
  z-index: 15;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
}

.spinner-container {
  z-index: 16;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 auto;
  height: 100%;
}

.spinner {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.spinner div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 50px;
  height: 50px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.spinner div:nth-child(1) {
  animation-delay: -0.45s;
}
.spinner div:nth-child(2) {
  animation-delay: -0.3s;
}
.spinner div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";


export default defineComponent({
  name: 'Loader',
  props: {
    openLoader: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {

    const close = () => {
      emit('close');
    }

    return {
      close
    }
  }
});
</script>