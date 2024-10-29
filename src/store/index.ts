import Vue from 'vue'
import Vuex from 'vuex'
import car from '../store/modules/car';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    car
  }
})
