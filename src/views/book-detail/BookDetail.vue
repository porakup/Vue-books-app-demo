<template>
  <div class="book-detail-container">
      <div class="detail-header">
          <div class="btn-container">
            <v-icon @click="goBack">mdi-menu-left</v-icon><span @click="goBack">Back</span>
          </div>
          <v-spacer></v-spacer>
            <div class="detail-title"><span>Book Detail</span></div>
          <v-spacer></v-spacer>
       </div>
       <div class="detail-container">
            <v-col cols="5" class="left-container">  
            <div class="favorite-container">
              <div class="btn-favorite" data-tooltip="Favorite">
                <v-icon class="favorite-icon" :style="{color: isFavorite? 'red':'#e5e5e5'}" @click="addFavorite">mdi-cards-heart</v-icon>
              </div>
            </div>  
            <div class="book-container">
                <div class="book-image">
                  <div class="mock" v-if="requestState > 0"></div>
                  <img class="image" v-if="requestState === 0" :src="book.image"/>
                </div>
            </div>
              <div class="footer-container">
                <div class="rating">
                  <Rating :param="book.averageRating" />
                </div>
                <div class="vote">{{`${book.votes} Votes`}}</div>
                <div class="btn-link" v-if="book.retailPrice > 0">
                    <v-btn style="text-transform: capitalize;" elevation="3" block color="success" @click="gotoBuy(book.path)">
                      <span class="buy">Buy</span><v-spacer></v-spacer><span class="price">${{book.retailPrice | currencyUsd(book.currencyCode)}}</span><v-spacer></v-spacer>
                    </v-btn>
                </div>
                <div v-else class="space-button">
                </div>
              </div>
          </v-col>
          <v-col cols="7" class="right-container">
              <div class="title-container"><span :data-tooltip="book.title">{{book.title | shortLTitle}}</span></div>

              <div class="author-container">
                <div class="author-label"><span>Authors</span></div>
                <div class="author-name"><span :data-tooltip="book.authors && book.authors.length? book.authors.join(', '):''">{{book.authors && book.authors.length? book.authors.join(', '):'' | shortLName}}</span></div>
              </div>

              <div class="isbn-container">
                <div class="isbn-label"><span>ISBN</span></div>
                <div class="isbn-name"><span>{{book.isbn}}</span></div>
              </div>

              <div class="publisher-container">
                <div class="publisher-label"><span>Publisher</span></div>
                <div class="publisher-name"><span>{{book.publisher | shortName}}</span></div>
              </div>

              <div class="date-container">
                <div class="date-label"><span>Published Date</span></div>
                <div class="date-name"><span>{{book.publishedDate | appDate}}</span></div>
              </div>

              <div class="page-container">
                <div class="page-label"><span>Page</span></div>
                <div class="page-name"><span>{{book.pageCount}}</span></div>
              </div>

              <div class="lang-container">
                <div class="lang-label"><span>Language</span></div>
                <div class="lang-name"><span>{{book.language}}</span></div>
              </div>

              <div class="desc-container">
                <!-- <span v-if="book.description && book.description.length > 500" :data-tooltip="book.description">{{book.description | shortDesc}}</span>
                <span v-else>{{book.description}}</span> -->
                <span v-if="book.description" v-html="book.description"></span>
                <span v-else>-</span>
              </div>
          </v-col>
      </div>
  </div>
</template>

<style scoped lang="scss">
.book-detail-container {
  color: black;
}

.detail-header {
  color: black;
  display: flex;
  flex-wrap: wrap;
  background-color: #e5e5e5;
  height: 35px;
  line-height: 35px;
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

.detail-title {
  margin-left: -70.150px;
}

.detail-title > span {
  color: black;
  font-size: 18px;
  font-weight: bold;
}

.detail-container {
  display: flex;
  flex-wrap: wrap;
  color: black;
}
.left-container {
  color: black;
}

.favorite-container {
  margin-top: 5px;
  position: relative;
  color: black;
}

.btn-favorite {
  position: relative;
  top: 10px;
  right: -480px;
  width: fit-content;
}

.btn-favorite:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  top: -1.2rem;
  left: 2.5rem;
  font-size: 13px;
  width: fit-content;
  padding: 0 4px;
  background: rgba(0,0,0,0.72);
  color: white;
  transform: translateX(-50%);
  z-index: 12px;
}

.book-container{
  width: fit-content;
  margin: 0 auto;
  color: black;
  padding-top: 20px;
}

.book-image {
  height: 438.5575px;
  width: 308.86875px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.image {
  height: 438.5575px;
  width: 308.86875px;
}

.mock {
  height: 438.5575px;
  width: 308.86875px;
  background-color: #e5e5e5;
}

.footer-container {
  margin-top: 10px;
  padding: 20px 50px 10px 50px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  color: black;
  line-height: 50px;
}
.rating {
  color: black;
  margin: 0 auto;
}
.vote {
  color: black;
  margin: 0 auto;
  font-size: 15px;
  font-weight: bold;
}

.btn-link {
  width: 200px;
  color: black;
   margin: 0 auto;
}

.space-button {
  width: 200px;
}

.buy,.price {
  font-size: 20px;
  font-weight: bold;
}

.right-container {
  color: black;
  font-size: 22px;
}

.title-container {
  color: black;
  background-color:rgb(250, 244, 244);
  height: 50px;
  line-height: 50px;
  font-size: 25px;
  font-weight: bold;
  width: 700px;
}
.title-container > span {
    margin-left: 20px;
}

.title-container > span:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  top: 4.5rem;
  right: 20px;
  font-size: 13px;
  width: fit-content;
  padding: 0 4px;
  background: rgba(0,0,0,0.72);
  color: white;
  transform: translateX(-50%);
  z-index: 12px;
}

.author-container {
  color: black;
  display: flex;
  flex-wrap: wrap;
  height: 40px;
  line-height: 40px;
  margin-top: 10px;
  width: 700px;
}
.author-label {
  color: black;
  background-color:#e5e5e5;
  width: 25%;
} 
.author-label > span {
  margin-left: 20px;
}
.author-name {
  color: black;
  background-color:rgb(250, 244, 244);
  width: 75%;
}
.author-name > span {
  margin-left: 20px;
}
.author-name > span:hover::after {
  content: attr(data-tooltip);
  position: absolute;
  top: 8.2rem;
  right: 30rem;
  font-size: 13px;
  width: fit-content;
  padding: 0 4px;
  background: rgba(0,0,0,0.72);
  color: white;
  transform: translateX(-50%);
  z-index: 12px;
}

.isbn-container {
  color: black;
  display: flex;
  flex-wrap: wrap;
  height: 40px;
  line-height: 40px;
  margin-top: 10px;
  width: 700px;
}
.isbn-label {
  color: black;
  background-color:#e5e5e5;
  width: 25%;
} 
.isbn-label > span {
  margin-left: 20px;
}
.isbn-name {
  color: black;
  background-color:rgb(250, 244, 244);
  width: 75%;
}
.isbn-name > span {
  margin-left: 20px;
}

.publisher-container {
  color: black;
  display: flex;
  flex-wrap: wrap;
  height: 40px;
  line-height: 40px;
  margin-top: 10px;
  width: 700px;
}
.publisher-label {
  color: black;
  background-color:#e5e5e5;
  width: 25%;
} 
.publisher-label > span {
  margin-left: 20px;
}
.publisher-name {
  color: black;
  background-color:rgb(250, 244, 244);
  width: 75%;
}
.publisher-name > span {
  margin-left: 20px;
}

.date-container {
  color: black;
  display: flex;
  flex-wrap: wrap;
  height: 40px;
  line-height: 40px;
  margin-top: 10px;
  width: 700px;
}
.date-label {
  color: black;
  background-color:#e5e5e5;
  width: 25%;
} 
.date-label > span {
  margin-left: 20px;
}
.date-name {
  color: black;
  background-color:rgb(250, 244, 244);
  width: 75%;
}
.date-name > span {
  margin-left: 20px;
}

.page-container {
  color: black;
  display: flex;
  flex-wrap: wrap;
  height: 40px;
  line-height: 40px;
  margin-top: 10px;
  width: 700px;
}
.page-label {
  color: black;
  background-color:#e5e5e5;
  width: 25%;
} 
.page-label > span {
  margin-left: 20px;
}
.page-name {
  color: black;
  background-color:rgb(250, 244, 244);
  width: 75%;
}
.page-name > span {
  margin-left: 20px;
}

.lang-container {
  color: black;
  display: flex;
  flex-wrap: wrap;
  height: 40px;
  line-height: 40px;
  margin-top: 10px;
  width: 700px;
}
.lang-label {
  color: black;
  background-color:#e5e5e5;
  width: 25%;
} 
.lang-label > span {
  margin-left: 20px;
}
.lang-name {
  color: black;
  background-color:rgb(250, 244, 244);
  width: 75%;
}
.lang-name > span {
  margin-left: 20px;
}

.desc-container {
  margin-top: 10px;
  color: black;
  background-color:rgb(250, 244, 244);
  // height: 200px;
  // line-height: 20px;
  width: 700px;
  padding: 10px;
  margin-bottom: 30px;
}
// .desc-container > span {
//     margin-left: 20px;
// }

// .desc-container > span:hover::after {
//   content: attr(data-tooltip);
//   position: absolute;
//   left: 760px;
//   bottom: 200px;
//   font-size: 13px;
//   width: fit-content;
//   padding: 0 4px;
//   background: rgba(0,0,0,0.72);
//   color: white;
//   transform: translateX(-50%);
//   z-index: 12px;
// }

</style>

<script lang="ts">
import router from "@/router";
import store from "@/store";
import { computed, defineComponent, onMounted, reactive, ref, toRefs, watch } from "@vue/composition-api";
import BookService from '../../service/Bookservice';
import Rating from '../../components/rating/Rating.vue'

export default defineComponent({
  name: 'BookDetail',
  components: {
    Rating
  },
  setup() {

        store.dispatch("clearQueryAction");

        const state = reactive({
          book: {}
        });
        
        const bookId = computed(()=> {return router.currentRoute.params.id});

        const requestState  = computed( () => { return store.getters.getRequest});

        const favoriteListState = computed( () => { return store.getters.getFavoriteBookList})

        const isFavorite =  ref<boolean>(false);

        const mapToBook = (book: any) => {

                  const { volumeInfo, saleInfo } = book;
                  let resp: any = {id: book.id };
                  if(volumeInfo) {
                    resp = {
                      ...resp,
                      title: volumeInfo.title || '',
                      authors: volumeInfo.authors || [],
                      publisher: volumeInfo.publisher || '',
                      publishedDate: volumeInfo.publishedDate || '',
                      description: volumeInfo.description || '',
                      industryIdentifiers: volumeInfo.industryIdentifiers || [],
                      pageCount: volumeInfo.pageCount || '0',
                      printType: volumeInfo.printType || '',
                      categories: volumeInfo.categories || [],
                      averageRating: volumeInfo.averageRating?Math.floor(parseInt(volumeInfo.averageRating)).toString():'0',
                      votes: volumeInfo.ratingsCount || 0,
                      image: volumeInfo.imageLinks? volumeInfo.imageLinks.thumbnail : '' || '',
                      thumbnail: volumeInfo.imageLinks? volumeInfo.imageLinks.smallThumbnail : '' || '',
                      language: volumeInfo.language || '',
                    }

                     if(resp.industryIdentifiers.length) {
                      const isbn = resp.industryIdentifiers.find((obj: any)=>{ return obj.type === 'ISBN_13'})
                      || resp.industryIdentifiers.find((obj: any)=>{ return obj.type === 'ISBN_10'})
                      || '';
                      resp.isbn = isbn? isbn.itentifier: '';
                    }

                  }else {
                    resp = {
                      ...resp,
                      title: '',
                      authors: [],
                      publisedDate: '',
                      industryIdentifiers: [],
                      pageCount: '0',
                      printType: '',
                      categories: [],
                      averageRating: '0',
                      image: '',
                      thumbnail: '',
                      language: '',
                    }
                  }

                  if(saleInfo) {
                      const { retailPrice } = saleInfo
                      resp = {
                        ...resp,
                      isEbook: saleInfo.isEbook? true : false,
                      isFree: saleInfo.saleability === 'FREE'? true : false,
                      path: saleInfo.buyLink || ''
                      }
                      if(retailPrice) {
                        resp = {
                          ...resp,
                          retailPrice: retailPrice.amount || 0,
                          currencyCode: retailPrice.currencyCode || ''
                        }
                      }
                  }else {
                    resp = {
                        ...resp,
                      isEbook: false,
                      isFree: false,
                      retailPrice: 0,
                      path: ''
                      }
                  }
                  return resp
          }

        const initData = async () => {
            const resp = await BookService.getBookById(bookId.value).then(response => {
              return mapToBook(response);
            });

            state.book = resp;
            const findBook = await favoriteListState.value.find((book: any)=> { return book.id === bookId.value});
            isFavorite.value = findBook ? true : false;
            await store.dispatch("requestDoneAction");
        }
        

        const goBack = () => { history.back(); }

          watch( () => favoriteListState.value,
            async (favoriteList) => {
            const findBook = await favoriteList.find((book: any)=> { return book.id === bookId.value});
            isFavorite.value = findBook ? true : false;
        });

        const gotoBuy = (path: string) => { window.open(path, '_blank');}

        const addFavorite = async () => {
          if(!isFavorite.value){
            await store.dispatch("addRequestAction");
            await store.dispatch("addFavoriteBookAction", state.book);
            await store.dispatch("requestDoneAction");
          }else {
            await store.dispatch("addRequestAction");
            await store.dispatch("removeFavoriteBookAction", state.book);
            await store.dispatch("requestDoneAction");
          }
        }

        store.dispatch("setCurrentRouteAction", `/book/${bookId}`);

        onMounted( async () => {
          await initData();
        })

    return {
      ...toRefs(state),
      bookId,
      goBack,
      addFavorite,
      isFavorite,
      requestState,
      gotoBuy
    }    
  }
});
</script>
