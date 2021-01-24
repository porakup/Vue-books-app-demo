<template>
  <div class="app-header">
      <div class="app-logo">
        <span class="text-logo" @click="gotoBook()">MY BOOKS APP</span>
      </div>
      <v-spacer></v-spacer>
      <div class="search-bar">
          <InputSearch/>
      </div>
      <v-spacer></v-spacer>
      <div class="app-menu">
        <div class="button">
            <span class="favorite-button" @click="gotoFavorite()">favorite</span>
          </div>
      </div>
  </div>
</template>

<style scoped lang="scss">
  .app-header {
    color: white;
    position: fixed; 
    background-color: #0f0f86;
    width: 100%;
    height: 60px;
    line-height: 60px;
    z-index: 2;
    padding: 8px;
    align-items: center;
    display: flex;
  }

  .app-logo {
    position: relative;
    left: 10px;
    font-size: 24px;
    font-weight: bold;
  }

  .text-logo {
    cursor: pointer;
  }

  .search-bar {
    margin-left: -52px;
    width: 500px;
    position: relative;
    text-align: center;
  }

  .favorite-button {
    font-size: 20px;
    font-weight: bold;
    position: relative;
    right: 40px;
    cursor: pointer;
  }
</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import InputSearch from '../../input/input-search/InputSearch.vue'
import store from '../../../store/index';
import router from '@/router';

export default defineComponent({
  name: 'Header',
  components: { InputSearch },
  setup() {

    const gotoBook = async () => {
      if(router.currentRoute.path !== '/book') {
          await store.dispatch("setCurrentRouteAction", '/book');
          router.push({ path: '/book' });
      }
    };

    const gotoFavorite = async () => {
      if(router.currentRoute.path !== '/favorite') {
           await store.dispatch("setCurrentRouteAction", '/favorite');
           router.push({ path: '/favorite' });
      }
    };

    return {
      gotoBook,
      gotoFavorite
    }
  }
});
</script>
