<template>
  <v-app>
     <Header/>
      <v-main>
          <div class="app-content">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
      </v-main>
     <Footer/>
     <Loader :openLoader="openLoader"/>
     <ErrorModal :openModal="openModal" :message="message" @close="closeModal"/>
</v-app>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<script lang="ts">
import Vue from 'vue';
import './styles/app.scss';
import Header from './components/layouts/header/Header.vue';
import Footer from './components/layouts/footer/Footer.vue';
import ErrorModal from './components/modal/error-modal/ErrorModal.vue';
import Loader from './components/loader/Loader.vue';
import { reactive, ref, toRefs, watch } from '@vue/composition-api';
import store from './store/index';

export default Vue.extend({
  name: 'App',
  components: { 
   Header,
   Footer,
   ErrorModal,
   Loader
  },
  setup() {
    const state = reactive({
      openModal: false,
      request: 0,
      message: '',
      openLoader: false
    })

    const html = ref(document.getElementsByTagName("HTML")[0]);

    watch( () => store.getters.getErrorMessage,
        async (errMessage) => {
        if (errMessage) {
          state.message = errMessage
          state.openModal = true
        }else {
          state.message = ''
          state.openModal = false
        }
      });

    watch( () => store.getters.getRequest,
        async (request) => {
        if (request > 0) {
          state.request = request
          state.openLoader = true
          html.value.setAttribute("style", "overflow-y: hidden;");
        }else {
          state.request = 0
          state.openLoader = false
          html.value.setAttribute("style", "overflow-y: scroll;");
        }
      });  

    const closeModal = async () => {
      await store.dispatch("clearErrorMessageAction");
    }

    return {
      ...toRefs(state),
      closeModal
    }
  }
});
</script>
