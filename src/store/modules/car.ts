const state = {
    car: []
};
  
const mutations = {
    SET_USER(state, id) {
        state.car.push(id);
    },
    CLEAR_USER(state) {
        state.car = [];
    }
};
  
const actions = {
    delete({ commit }, id) {
        // Вызывается при успешной авторизации
        commit('SET_USER', id);
    },
    logout({ commit }) {
        // Очищает состояние при выходе пользователя
        commit('CLEAR_USER');
    }
};
  
const getters = {
    car: (state) => state.car,
    userName: (state): string | null => state.user ? state.user.name : null
};
  
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};