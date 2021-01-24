<template>
    <v-card class="ads-item">
        <div class="ads-top">
        </div>
        <div class="ads-thumbnail">
          <div class="adsDisplay" :v-html="ads">
          </div>
        </div>
        <div class="ads-info">
            <div class="ads-title">
              <span>Advertisement</span>
            </div>
            <div class="ads-badges">
              <span class="badges" >Ads</span>
            </div>
        </div>
    </v-card>
</template>

<style scoped lang="scss">

.ads-item {
  position: relative;
  margin:10px 20px 20px 20px;
  height:400px;
}

.ads-top {
  height: 29px;
}

.ads-thumbnail {
  height: 270px;
}

.ads-thumbnail > .adsDisplay {
  margin: 0 auto;
  background-color: #e5e5e5;
  height: 270px;
  width: 200px;
}

.ads-info {
  padding: 8px 12px 12px 12px;
  position: relative;
  z-index: 12px;
  text-align: center;
}

.ads-title > span {
  color: black;
  margin-bottom: -5px;
  font-size: 18px;
  font-weight: bold;
}

.ads-badges {
  background-color: #ffd900;
  width:fit-content;
  padding: 5px 10px 5px 10px;
  border-radius: 8px;
  position: relative;
  top: 10px;
  left: 40%
}

.badges {
  color: black;
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
}


</style>

<script lang="ts">
import { defineComponent, onMounted, ref} from '@vue/composition-api';

export default defineComponent({
  name: 'AdsItem',
  setup() {

    const ads = ref<any>(null);

    onMounted(()=> {
      // ads.value = document.getElementById('divadsensedisplaynone').innerHTML
    })

    return {
      ads
    }
  }
});
</script>
