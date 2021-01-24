<template>
<v-card class="book-skeleton">
    <v-skeleton-loader class="favorite-skeleton" type="image"/>
    <v-skeleton-loader class="image-skeleton" type="image"/>
    <v-skeleton-loader class="title-skeleton" type="image"/>
    <v-skeleton-loader class="author-skeleton" type="image"/>
    <v-skeleton-loader class="price-skeleton" type="image"/>
</v-card>
</template>

<style scoped lang="scss">
.book-skeleton {
   position: relative;
   margin: 10px 20px 20px 20px;
   height: 400px;
}

.favorite-skeleton {
   position: relative;
   top: 8px;
   right: -230px;
   height: 25px;
   width: 25px;
}

.image-skeleton {
   padding: 10px 20px 5px 20px;
   width: 215px;
   margin: 0 auto;
}

.title-skeleton {
   padding: 2px 20px 10px 20px;
   height: 22px;
   width: 220px;
}

.author-skeleton {
   padding: 8px 20px 0 20px;
   height: 24px;
   width: 150px;
}

.price-skeleton {
    padding: 10px 20px 0 20px;
    height: 30px;
    width: 100px;
}

</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'BookSeleketon'
});
</script>
