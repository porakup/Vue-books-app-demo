<template>
  <div class="app-footer">
    my books app 2021
  </div>
</template>

<style scoped lang="scss">
  .app-footer {
    color: white;
    background-color: #0f0f86;
    width: 100%;
    z-index: 2;
    padding: 7px;
    text-align: center;
    font-size: 12px;
    position: absolute;
    bottom: 0px;
  }
</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Footer'
});
</script>
