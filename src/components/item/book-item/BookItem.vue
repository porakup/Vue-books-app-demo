<template>
    <v-card class="book-item">
        <div class="book-favorite">
          <div class="btn-favorite" data-tooltip="Favorite">
            <v-icon class="favorite-icon" :style="{color: isFavorite? 'red':'#e5e5e5'}" @click="addFavorite">mdi-cards-heart</v-icon>
          </div>
        </div>
        <div class="book-thumbnail">
          <v-img @click="gotoDetail" class="image" max-height="270" max-width="200" :src="book.thumbnail"></v-img>
        </div>
        <div class="book-info">
            <div class="book-title">
              <span v-if="book.title" @click="gotoDetail" :style="{'--data-pos': book.title.length > 25? '120px':'130px'}"  :data-tooltip="book.title">{{book.title | shortTitle}}</span>
              <span v-else>Title not found</span>
            </div>
            <div class="book-author">
              <span v-if="book.authors.length" :style="{'--data-pos': book.authors.join(', ').length > 30? '120px':'130px'}" :data-tooltip="book.authors.join(', ')">{{book.authors.join(', ') | shortName}}</span>
              <span v-else>Author not found</span>
            </div>
            <div class="book-price">
              <span class="price" v-if="!book.isFree && book.retailPrice">${{book.retailPrice | currencyUsd(book.currencyCode)}}</span>
              <span class="free" v-else-if="book.isFree">FREE</span>
              <span class="notSale" v-else-if="!book.retailPrice && !book.isFree">Not for Sale</span>
            </div>
        </div>
    </v-card>
</template>

<style scoped lang="scss">

.book-item {
  position: relative;
  margin:10px 20px 20px 20px;
  height:400px;
}

.book-favorite {
  padding-top: 5px;
  width: fit-content;
}

.btn-favorite {
  position: relative;
  top: 2px;
  right: -235px;
}

.favorite-icon {
  position: relative;
  font-size: 20px;
  cursor: pointer;
}

.btn-favorite:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  top: -.90rem;
  font-size: 13px;
  width: fit-content;
  padding: 0 4px;
  background: rgba(0,0,0,0.72);
  color: white;
  transform: translateX(-50%);
  z-index: 12px;
}

.book-thumbnail {
  height: 270px;
}

.book-thumbnail > .image {
  margin: 0 auto;
}

.book-info {
  padding: 8px 12px 12px 12px;
  position: relative;
  z-index: 12px;
}

.book-title > span {
  color: black;
  margin-bottom: -5px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}

.book-author > span {
  margin-left: 2px;
  margin-right: 2px;
  margin-top: -8px;
  margin-bottom: 5px;
  font-size: 12px;
  color: rgb(58, 57, 57);
  font-weight: bold;
}

.book-price > span {
  margin-top: 10px;
  font-size: 21px;
  font-weight: bold;
}

.price {
  color: #0f0f86;
}

.free {
  color: black;
  font-size: 12px !important;
}

.notSale {
  color: red;
  font-size: 12px !important;
}

.book-title > span:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  top: -.20rem;
  left: var(--data-pos);
  font-size: 13px;
  width: fit-content;
  padding: 0 4px;
  background: rgba(0,0,0,0.72);
  color: white;
  transform: translateX(-50%);
  z-index: 12px;
}

.book-author > span:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: 60px;
  left: var(--data-pos);
  font-size: 13px;
  width: fit-content;
  padding: 0 4px;
  background: rgba(0,0,0,0.72);
  color: white;
  transform: translateX(-50%);
  z-index: 12px;
}

</style>

<script lang="ts">
import router from '@/router';
import { computed, defineComponent, onMounted, ref, watch } from '@vue/composition-api';
import store from '../../..//store/index';

export default defineComponent({
  name: 'BookItem',
     props: {
    book: {
      type: Object,
      required: true,
      default: {}
    }
  },
  setup(props) {

    const favoriteListState = computed( () => { return store.getters.getFavoriteBookList})

    const bookId = computed( () => { return props.book.id});

    const isFavorite =  ref<boolean>(false);

    watch( () => favoriteListState.value,
        async (favoriteList) => {
        const findBook = await favoriteList.find((book: any)=> { return book.id === bookId.value});
        isFavorite.value = findBook ? true : false;
      });

    const addFavorite = async () => {
      if(!isFavorite.value){
        await store.dispatch("addRequestAction");
        await store.dispatch("addFavoriteBookAction", props.book);
        await store.dispatch("requestDoneAction");
      }else {
        await store.dispatch("addRequestAction");
        await store.dispatch("removeFavoriteBookAction", props.book);
        await store.dispatch("requestDoneAction");
      }
    }

    const gotoDetail = async () => {
      await store.dispatch("setCurrentRouteAction", '/detail');
      router.push({ path: `/book/${bookId.value}` });
    }

    onMounted( async () => {
      const findBook = await favoriteListState.value.find((book: any)=> { return book.id === bookId.value});
      isFavorite.value = findBook ? true : false;
    })

    return {
        isFavorite,
        addFavorite,
        gotoDetail
    }

  }
});
</script>
