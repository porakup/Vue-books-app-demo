<template>
  <div class="favorite-container">
      <div class="favorite-header">
          <div class="btn-container">
            <v-icon @click="goBack">mdi-menu-left</v-icon><span @click="goBack">Back</span>
          </div>
          <v-spacer></v-spacer>
            <div class="favorite-title"><span>My Favorite Books</span></div>
          <v-spacer></v-spacer>
          <span>{{`${favoriteBookList?(favoriteBookList.length).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","):0} books`}}</span>
       </div>
         <v-col cols="12" class="favorite-list">
          <v-container fluid grid-list-md>
              <v-layout row wrap>
                  <v-flex class="item-container" xs6 md2 v-for="book in favoriteBookList" :key="book.id">
                    <FavoriteItem :book="book"/>
                  </v-flex> 
                  <v-flex xs6 md2 v-for="(mock,index) in 8" :key="index" v-show="!favoriteBookList.length && (requestState > 0)">
                    <BookSkeleton/>
                  </v-flex>
              </v-layout>
          </v-container>
          </v-col>
  </div>
</template>

<style scoped lang="scss">
.favorite-container {
  color: black;
}

.favorite-header {
  color: black;
  display: flex;
  flex-wrap: wrap;
  background-color: #e5e5e5;
  height: 35px;
  line-height: 35px;
  width: 100%;
}

.btn-container > button {
  color: black;
  font-size: 30px !important;
  font-weight: bold;
  cursor: pointer;
}

.btn-container > span {
  color: black;
  font-size: 18px !important;
  font-weight: bold;
  cursor: pointer;
}

.favorite-title {
  margin-left: -70.150px;
}

.favorite-title > span {
  color: black;
  font-size: 18px;
  font-weight: bold;
}

.favorite-header > span {
  font-weight: bold;
  margin-right: 35px;
}

.favorite-container {
  display: flex;
  flex-wrap: wrap;
  color: black;
}


</style>

<script lang="ts">
import store from "@/store";
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from "@vue/composition-api";
import BookSkeleton from '../../components/skeleton/book-skeleton/BookSkeleton.vue';
import FavoriteItem from '../../components/item/favorite-item/FavoriteItem.vue';

export default defineComponent({
  name: 'BookDetail',
  components: {
    BookSkeleton,
    FavoriteItem,
  },
  setup() {
        store.dispatch("addRequestAction");
        
        const requestState  = computed( () => { return store.getters.getRequest});

        const favoriteListState = computed( () => { return store.getters.getFavoriteBookList})

        const state = reactive({
          favoriteBookList: favoriteListState.value || []
        });

        const goBack = () => { history.back(); }

          watch( () => favoriteListState.value,
            async (favoriteList) => {
            state.favoriteBookList = favoriteList;
        });

        const addFavorite = () => {return}

        const gotoDetail = () => {return}

        onMounted( async () => {
          await store.dispatch("requestDoneAction");
        })

    return {
      ...toRefs(state),
      goBack,
      requestState,
      addFavorite,
      gotoDetail
    }    
  }
});
</script>
