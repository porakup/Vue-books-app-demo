<template>
  <div class="book-container">
      <v-col cols="2" class="left-container">
        <v-card class="filter-container">
          <v-divider class="top-divider"></v-divider>
          <div class="filter-box">
            <span class="filter-label">Filter</span>
            <v-spacer></v-spacer>
            <span class="filter-clear" @click="clearFilter">clear</span>
          </div>
          <v-row class="filter-ebook">
            <v-col cols="6">
              <InputCheckbox :label="'Ebook'" :checked-value="'Y'" :isChecked="filter.isEbook === 'Y'" @checkboxChange="setFilterIsEbook"/>
            </v-col>
            <v-col cols="6">
              <InputCheckbox :label="'Non-Ebook'" :checked-value="'N'" :isChecked="filter.isEbook === 'N'" @checkboxChange="setFilterIsEbook"/>
            </v-col>
          </v-row>
          <v-divider class="filter-divider"></v-divider>
          <v-row class="filter-paid">
            <v-col cols="6">
              <InputCheckbox :label="'Free'" :checked-value="'Y'" :isChecked="filter.isFree === 'Y'" @checkboxChange="setFilterIsFree"/>
            </v-col>
            <v-col cols="6">
              <InputCheckbox :label="'Paid'" :checked-value="'N'" :isChecked="filter.isFree === 'N'" @checkboxChange="setFilterIsFree"/>
            </v-col>
          </v-row>
          <v-divider class="filter-divider"></v-divider>
          <v-expansion-panels flat :value="toggle.retailePrice?0:1">
            <v-expansion-panel @change="setToggleRetailPrice">
              <v-expansion-panel-header class="expand-header">
                <span class="expand-label">Retail Price Range</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="expand-content">
                <v-range-slider
                  dense
                  thumb-color="#ffd900"
                  track-color="#0f0f86"
                  track-fill-color="#0f0f86"
                  height="25"
                  max="1000"
                  min="0"
                  v-model="filter.priceRange"
                  @change="setFilterPriceRange">
                </v-range-slider>
                <div class="price-number" v-if="(filter.priceRange[0] > 0) || (filter.priceRange[1] > 0)">
                  <span>${{filter.priceRange[0] | currencyUsd('USD')}}</span>
                  <v-spacer></v-spacer>
                  <span>${{filter.priceRange[1] | currencyUsd('USD')}}</span>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-divider class="filter-divider"></v-divider>
          <v-expansion-panels flat :value="toggle.category?0:1">
            <v-expansion-panel @change="setToggleCategory">
              <v-expansion-panel-header class="expand-header">
                <span class="expand-label">Category</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="expand-content">
                <InputIcon v-model="filter.category" @search="setFilterCategory"/>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-divider class="filter-divider"></v-divider>
          <v-expansion-panels flat :value="toggle.language?0:1">
            <v-expansion-panel @change="setToggleLanguage">
              <v-expansion-panel-header class="expand-header">
                <span class="expand-label">Language</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="expand-content">
                  <SelectCustom
                    id="lang"
                    name="lang"
                    :items="langList"
                    :item-value="'alpha2Code'"
                    :item-text="'name'"
                    @change="setFilterLanguage"
                    v-model="filter.lang"/>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-divider class="filter-divider"></v-divider>
          <v-expansion-panels flat :value="toggle.printType?0:1">
            <v-expansion-panel @change="setTogglePrintType">
              <v-expansion-panel-header class="expand-header">
                <span class="expand-label">Print Type</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="expand-content">
                  <SelectCustom
                    id="printType"
                    name="printType"
                    :items="printTypeList"
                    :item-value="'code'"
                    :item-text="'name'"
                    @change="setFilterPrintType"
                    v-model="filter.printType"/>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-divider class="filter-divider"></v-divider>
          <v-expansion-panels flat :value="toggle.sort?0:1">
            <v-expansion-panel @change="setToggleSort">
              <v-expansion-panel-header class="expand-header">
                <span class="expand-label">Sort</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="expand-content">
                <SelectCustom
                    id="sort"
                    name="sort"
                    :items="sortList"
                    :item-value="'code'"
                    :item-text="'name'"
                    @change="setFilterSort"
                    v-model="filter.sort"/>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-divider class="filter-divider"></v-divider>
          <v-expansion-panels flat :value="toggle.rating?0:1">
            <v-expansion-panel @change="setToggleRating">
              <v-expansion-panel-header class="expand-header">
                <span class="expand-label">Rating</span>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="expand-content">
                <InputCheckbox class="checkbox-rating" :component="'Rating'" param="5" :checked-value="'5'" :isChecked="filter.rating === '5'" @checkboxChange="setFilterRating"/>
                <InputCheckbox class="checkbox-rating" :component="'Rating'" param="4" :checked-value="'4'" :isChecked="filter.rating === '4'" @checkboxChange="setFilterRating"/>
                <InputCheckbox class="checkbox-rating" :component="'Rating'" param="3" :checked-value="'3'" :isChecked="filter.rating === '3'" @checkboxChange="setFilterRating"/>
                <InputCheckbox class="checkbox-rating" :component="'Rating'" param="2" :checked-value="'2'" :isChecked="filter.rating === '2'" @checkboxChange="setFilterRating"/>
                <InputCheckbox class="checkbox-rating" :component="'Rating'" param="1" :checked-value="'1'" :isChecked="filter.rating === '1'" @checkboxChange="setFilterRating"/>
                <div class="end-filter"></div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
      <v-col cols="10" class="right-container">
         <v-container fluid grid-list-md>
            <v-layout row wrap>
                <v-flex class="item-container" xs6 md3 v-for="book in filterList" :key="book.id">
                  <component :is="book.ads === true?'AdsItem':'BookItem'" :book="book"/>
                </v-flex>
                <v-flex xs6 md3 v-for="(mock,index) in 8" :key="index" v-show="!filterList.length && (requestState > 0)">
                  <BookSkeleton/>
                </v-flex>
            </v-layout>
            <div class="pagination">
              <v-select
              :items="resultList"
              id="result"
              name="result"
              :item-value="'code'"
              :item-text="'name'"
              @change="setPagination"
              :menu-props="{ top: true, offsetY: true }"
              solo
              background-color="#ffd900"
              color="black"
              item-color="black"
              rounded
              v-model="pagination.pageSize"/>
            </div>
        </v-container>
      </v-col>
  </div>
</template>

<style scoped lang="scss">
  .book-container {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 60px;
  }

  .left-container,
  .right-container {
    padding: 0px;
    height: 100%;
  }

  .filter-container {
    margin: 10px;
    border-radius: 0px !important;
    height: 100%;
  }

  .top-divider {
    border-top: 1px solid rgb(0,0,0,0.08) !important;
  }

  .filter-box {
    margin: 5px;
    padding: 5px;
    background-color: #ffd900;
    display: flex;
    align-items: center;
  }

  .filter-label {
    font-weight: bold;
  }

  .filter-clear{
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
  }

  .filter-divider {
    width: 90%;
    margin-left: 5%;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .filter-ebook,
  .filter-paid {
    padding: 5px 15px 5px 15px;
  }

  .expand-header {
    padding: 5px 12px 5px 12px;
    min-height: 36px !important;
  }

  .expand-label {
    color: black;
    font-weight: bold;
    font-size: 15px;
  }

  .price-number {
    display: flex;
  }

  .price-number > span {
    font-size: 15px;
    font-weight: bold;
  }

  .checkbox-rating {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .end-filter {
    margin-bottom: 20px;
  }

  .item-container {
    z-index: 0px;
  }

  .pagination {
    position: absolute;
    bottom: 31.5px;
    right: 31px;
    width: 157px;
    z-index: 15px;
    color: black;
    font-size: 20px;
    font-weight: bold;
    cursor:pointer;
  }

</style>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, toRefs, watch } from '@vue/composition-api';
import BookService from '../../service/Bookservice';
import store from '../../store/index';
import InputCheckbox from '../../components/input/input-checkbox/InputCheckbox.vue';
import SelectCustom from '../../components/select/select-custom/SelectCustom.vue';
import InputIcon from '../../components/input/input-icon/InputIcon.vue';
import Book from '@/types/Book';
import BookSkeleton from '../../components/skeleton/book-skeleton/BookSkeleton.vue';
import BookItem from '../../components/item/book-item/BookItem.vue';
import AdsItem from '../../components/item/ads-item/AdsItem.vue';

export default defineComponent({
  name: 'Book',
  components: { 
    InputCheckbox,
     SelectCustom,
     InputIcon,
     BookSkeleton,
     BookItem,
     AdsItem
  },
  setup() {

    const sortList = ref([{code:'relevance', name:'Relevance'}, {code:'newest', name: 'Newest'}]);
    const langList = ref([{name: 'English', alpha2Code: 'en'}, {name: 'Thai', alpha2Code: 'th'}, {name: 'Other', alpha2Code: 'ot'}]);
    const printTypeList = ref([{code:'books',name:'Book'},{code:'magazines',name:'Magazine'}]);
    const resultList = ref([{code: 10,name:'Show 10'},{code: 20,name:'Show 20'},{code: 40,name:'Show 40'}]);
    
    const queryState = computed( () => { return store.getters.getQuery });
    const toggleState = computed( () => { return store.getters.getToggle });
    const filterState = computed( () => { return store.getters.getFilter });
    const paginationState = computed( () => { return store.getters.getPagination});
    const requestState  = computed( () => { return store.getters.getRequest});

    const interval = ref<any>(null);

    const filterList = ref<any>([]);
    const bookList = ref<any>([]);
    const adsList = ref<any>([]);

    const searchFlag = ref<boolean>(false);
    
    const state = reactive({
              toggle: toggleState.value,
              pagination: paginationState.value,
              filter: filterState.value,
            }); 
             
    const mapToBook = (items: Array<any>) => {
       return items.map((item: any) => {
            const { volumeInfo, saleInfo } = item;
            let resp: any = {id: item.id };
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
          });
    }



    const clearFilter = async () => {
      await store.dispatch("clearFilterAction");
      await store.dispatch("addRequestAction");
      filterList.value = [...bookList.value];
      
      if(adsList.value.length) {
        let index = 0;
        for(let i = 0; i < filterList.value.length; i++) {
          if(filterList.value[i].ads === true){
            continue;
          }
          const n = i + 1;
          if(n % 5 === 0){
            filterList.value.splice(n, 0, adsList.value[index]);
            index++;
          }
          if((index -1) === (adsList.value.length - 1)) {
            break;
          }
        }
      }
      await store.dispatch("requestDoneAction");
    }

    const setToggleRetailPrice = async () => {
      state.toggle.retailePrice = !state.toggle.retailePrice
      await store.dispatch("setToggleAction", state.toggle);
    }

    const setToggleCategory = async () => {
      state.toggle.category = !state.toggle.category
      await store.dispatch("setToggleAction", state.toggle);
    }

    const setToggleLanguage = async () => {
      state.toggle.language = !state.toggle.language
      await store.dispatch("setToggleAction", state.toggle);
    }

    const setTogglePrintType = async () => {
      state.toggle.printType = !state.toggle.printType
      await store.dispatch("setToggleAction", state.toggle);
    }

    const setToggleSort = async () => {
      state.toggle.sort = !state.toggle.sort
      await store.dispatch("setToggleAction", state.toggle);
    }

    const setToggleRating = async () => {
      state.toggle.rating = !state.toggle.rating
      await store.dispatch("setToggleAction", state.toggle);
    }

    const filterOnlyNonEbook = async () => {
      if(!filterList.value.length){
        return
      }
      filterList.value = filterList.value.filter((book: Book) => {
        return book.isEbook == false
      })
    }

    const filterAllFree = async () => {
      if(!filterList.value.length){
        return
      }
      filterList.value = filterList.value.filter((book: Book) => {
        return book.isFree == true
      })
    }

    const filterAllPaid = async () => {
      if(!filterList.value.length){
        return
      }
      filterList.value = filterList.value.filter((book: Book) => {
        return book.isFree == false
      })
    }

    const filterPrice = async () => {
      if(!filterList.value.length){
        return
      }
      filterList.value = filterList.value.filter((book: Book) => {
        const {retailPrice, currencyCode} = book;
        let resp = retailPrice;
        if(currencyCode && currencyCode.toUpperCase()=== 'THB' && retailPrice) {
          resp = retailPrice / 30
        }
        return (resp >= state.filter.priceRange[0]) && (resp <= state.filter.priceRange[1]);
      });
    }

    const filterLang = async () => {
      if(!filterList.value.length){
        return
      }
      filterList.value = filterList.value.filter((book: Book) => {
        if(state.filter.lange === 'ot'){
          return (book.language !== 'th') && (book.language !== 'en');
        }else {
          return book.language == state.filter.lang;
        }
      })
    }

    const filterRating = async () => {
      if(!filterList.value.length){
        return
      }
      filterList.value = filterList.value.filter((book: Book) => {
        return book.averageRating == state.filter.rating;
      })
    }

    const filterBook = async () => {
      await store.dispatch("addRequestAction");
      filterList.value = [...bookList.value];

      if(state.filter.isEbook === 'N') {
        filterOnlyNonEbook();
      }
      if(state.filter.isFree === 'Y') {
        filterAllFree();
      }
      if(state.filter.isFree === 'N') {
        filterAllPaid();
      }
      if((state.filter.priceRange[0] > 0) && (state.filter.priceRange[1] > 0)) {
        filterPrice();
      }
      if(state.filter.lang) {
        filterLang();
      }
      if(state.filter.rating) {
        filterRating();
      }

      if(adsList.value.length) {
        let index = 0;
        for(let i = 0; i < filterList.value.length; i++) {
          if(filterList.value[i].ads === true){
            continue;
          }
          const n = i + 1;
          if(n % 5 === 0){
            filterList.value.splice(n, 0, adsList.value[index]);
            index++;
          }
          if((index -1) === (adsList.value.length - 1)) {
            break;
          }
        }
      }
      
      await store.dispatch("requestDoneAction");
    }

      const searchBook = async () => {
       searchFlag.value = true;  
      const text = queryState.value;
      const filter = state.filter;
      const pagination = state.pagination;

      const resp = await BookService.searchBook(text, filter, pagination).then(response => {
          let { items } = response;
          if(items && items.length){
            items = mapToBook(items);
            adsList.value = [];
            for (let i = 0; i < items.length; i++) {
              const n = i+1;
              if(n % 5 === 0) {
                adsList.value.push({title: `Advertisement ${n}`, ads: true});
              }
            }
          }
          return items
        }
      );
      bookList.value = resp;
      filterList.value = [...resp];
      await filterBook();
      await store.dispatch("requestDoneAction");
      await store.dispatch("clearQueryAction");
    }

    const setFilterIsEbook = async (val: string) =>{
      state.filter.isEbook = val;
      await store.dispatch("setFilterAction", state.filter);
      if(state.filter.isEbook === 'Y') {
        await searchBook();
      }else {

        if(interval.value){
          clearTimeout();
        }

        interval.value = setTimeout( async () => {
              interval.value = null
              await filterBook();
        },500);
  
      }
    }

    const setFilterIsFree = async (val: string) =>{
      if(interval.value){
          clearTimeout();
        }

        interval.value = setTimeout( async () => {
              interval.value = null
              state.filter.isFree = val;
              await store.dispatch("setFilterAction", state.filter);
              await filterBook();
        },0);
    }

    const setFilterCategory = async (val: string) =>{
      state.filter.category = val;
      await store.dispatch("setFilterAction", state.filter);
      await searchBook();
    }

    const setFilterPriceRange = async (val: Array<number>) =>{
      if(interval.value){
        clearTimeout();
      }
      interval.value = setTimeout( async () => {
          interval.value = null;
          state.filter.priceRange = val;
          await store.dispatch("setFilterAction", state.filter);
          await filterBook();
      },500);
    }

    const setFilterLanguage = async (val: string) => {
        if(interval.value){
          clearTimeout();
        }

        interval.value = setTimeout( async () => {
            interval.value = null
            state.filter.lang = val;
            await store.dispatch("setFilterAction", state.filter);
            await filterBook();
        },500);
    }

    const setFilterPrintType = async (val: string) =>{
      state.filter.printType = val;
      await store.dispatch("setFilterAction", state.filter);
      await searchBook();
    }

    const setFilterSort = async (val: string) =>{
      state.filter.sort = val;
      await store.dispatch("setFilterAction", state.filter);
      await searchBook();
    }

    const setFilterRating = async (val: string) =>{
      if(interval.value){
          clearTimeout();
        }

        interval.value = setTimeout( async () => {
           interval.value = null
           state.filter.rating = val;
           await store.dispatch("setFilterAction", state.filter);
           await filterBook();
        },0);
    }

    watch( () => queryState.value,
        async (text) => {
        if (text &&  !searchFlag.value) {
          await searchBook();
        }
      });

    watch( () => toggleState.value,
        async (toggle) => {
        if (toggle) {
          state.toggle = toggle;
        }
      });  

    watch( () => filterState.value,
        async (filter) => {
        if (filter) {
          state.filter = filter;
        }
      });

    watch( () => paginationState.value,
      async (page) => {
      if (page) {
        state.pagination = page;
      }
    });
      
    watch( () => requestState.value,
        async (request) => {
        if (request === 0) {
          searchFlag.value = false;
        }
    });    

    const setPagination = async () => {
      await store.dispatch("setPaginationAction", state.pagination);
      await searchBook();
    }


    onMounted( async () => {
      await searchBook();
    })

    return {
      ...toRefs(state),
      langList,
      sortList,
      printTypeList,
      resultList,
      searchBook,
      clearFilter,
      setToggleRetailPrice,
      setToggleCategory,
      setToggleLanguage,
      setTogglePrintType,
      setToggleSort,
      setToggleRating,
      setFilterIsEbook,
      setFilterIsFree,
      setFilterCategory,
      setFilterPriceRange,
      setFilterLanguage,
      setFilterPrintType,
      setFilterSort,
      setFilterRating,
      queryState,
      toggleState,
      filterState,
      paginationState,
      requestState,
      filterOnlyNonEbook,
      filterAllFree,
      filterAllPaid,
      filterPrice,
      filterLang,
      filterRating,
      filterList,
      bookList,
      searchFlag,
      adsList,
      setPagination,
      interval
    };
  }
});
</script>
