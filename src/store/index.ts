import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import AppModule, { AppState } from './modules/app.module'

Vue.use(Vuex)

export interface RootState {
  app: AppState;
}

const vuexLocal = new VuexPersistence<RootState>({
  storage: window.localStorage,
  modules: ['app'],
})

export default new Vuex.Store<RootState>({
  modules: {
    app: AppModule,
  },
  plugins: [vuexLocal.plugin],
})
