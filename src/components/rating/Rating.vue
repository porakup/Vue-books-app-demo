<template>
  <div class="app-rating">
    <v-icon color="#ffd900" size="20" class="i_icon" v-for="star in parseInt(param)" :key="'star_yellow_'+star">mdi-star</v-icon>
    <v-icon color="#e5e5e5" size="20" class="i_icon" v-for="star in (5 - parseInt(param))" :key="'star_blank_'+star">mdi-star</v-icon>
</div>
</template>

<style scoped lang="scss">

.app-rating {
    position:relative;
    width: 100%;
    margin-bottom: 3px;
}

</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Rating',
  props: {
    param: {
      type: String,
      required: true,
      default: '0'
    }
  }
});
</script>
