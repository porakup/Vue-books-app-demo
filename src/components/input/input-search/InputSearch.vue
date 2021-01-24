<template>
  <div class="input-search">
    <input type="text" v-model="text" placeholder="Search book" />
    <div class="btn-search" @click="search">
        <v-icon>mdi-magnify</v-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .input-search {
    color: black;
    display: block;
    width: 450px;
  }

  .input-search > input {
    height: 35px;
    width: 400px;
    background-color: white;
    padding-left: 5px;
    padding-right: 5px;
    font-size: 14px;
    line-height: 15px;
    float: left;
    outline: none;
    cursor: text;
  }

  .btn-search {
    float: left;
    height: 35px;
    width: 50px;
    display: block;
    margin-left: -2px;
    background-color: #ffd900;
    position: relative;
    cursor: pointer;

  }

  .btn-search > i { 
      color: black;
      position: relative;
      top: -13px;
      right: -1px;
      font-size: 25px;
      font-weight: bold;
      transform: scaleX(-1);
      -webkit-transform: scaleX(-1);
      cursor: pointer;
  }

</style>

<script lang="ts">
import router from '@/router';
import { computed, defineComponent, ref, watch } from '@vue/composition-api';
import store from '../../../store/index';

export default defineComponent({
  name: 'InputSearch',
  props: {
    currentPath: {
      type: String,
      default: ''
    }
  },
  setup() {

    const text = ref('');

    const currentRoute = computed( () => { return store.getters.getCurrentRoute });

     watch( () => currentRoute.value,
        (path) => {
        if (path !== '/book') {
          if(text.value) {
            text.value = '';
          }
        }
      });

    const search = async () => {
      if(text.value) {
        await store.dispatch("setQueryAction", text.value);
        if(router.currentRoute.path !== '/book') {
          await store.dispatch("setCurrentRouteAction", '/book');
          router.push({ path: '/book' });
        }
      }
    }

    return {
      text,
      search,
      currentRoute
    }
  }
});
</script>
