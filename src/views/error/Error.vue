<template>
  <div class="container">
    <div class="card-error">
          <div class="input-container">
              <form>
                  <div class="input-group">
                      <label ><b>404 Page not found.</b></label>
                  </div>
                  <v-btn @click="gotoMain"><span class="text">Back</span></v-btn>
              </form>
          </div>
    </div>
</div>
</template>

<style scoped lang="scss">

.container {
    height: 100vh;
    text-align: center;
    line-height: 100vh;
}

.card-error {
    padding: 0px;
    margin: 0px;
    background-color: white;
    border-radius: 20px;
    height: 120px;
    width: 300px;
    box-shadow: 0 6px 10px 0 rgba(0,0,0,0.2);
    display: inline-block;
    vertical-align: middle;
    line-height: initial;
    text-align: left;
    position: relative;
}

.input-container {
    position: absolute;
    padding: 0px;
    margin: 0px;
    display: block;
    width: 200px;
    top: 25px;
    left: 50px;
    text-align: center;
}

.input-group {
    padding: 0px;
    margin: 0px;
    display: block;
    box-sizing: border-box;
}

label {
    font-size: 14px;
}

input {
    display: block;
    width: 100%;
    padding: 5px;
    box-sizing: border-box;
    outline: none;
}


button {
    margin-top: 20px;
}

.text {
  font-size: 12px;
  font-weight: bold;
}

</style>

<script lang="ts">
import router from "@/router";
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: 'Error',
  setup() {
        const gotoMain = () => { router.push({ path: '/book' }); }

  return {
    gotoMain
  }
  }
});
</script>
