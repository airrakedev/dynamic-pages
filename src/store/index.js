import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
   state: {
      personalData: {
         email: 'email@mail.com',
         name: 'Liam Nesson',
         password: 'password'
      },
      coffeePlan: {
         packageDeal: {},
         totalPurchase: 0,
         deliveryTo: '',
         recipient: ''
      },
      authenticated: false
   },
   getters: {
      isAuthenticated: state => state.authenticated
   },
   mutations: {
      PURCHASE (state, payload) {
         state.coffeePlan = payload
      },
      AUTHENTICATE (state, payload) {
         state.authenticated = payload
      }
   },
   actions: {
      processPurchase ({ commit }, payload) {
         if (payload) {
            commit('PURCHASE', payload)
            return Promise.resolve(true)
         } else {
            return Promise.reject(false)
         }
      },
      checkEmail ({ state }, email) {
         return new Promise((resolve, reject) => {
            setTimeout(() => {
               if (state.personalData.email === email) {
                  return resolve(true)
               } else {
                  return reject(false)
               }
            }, 1500)
         })
      },
      checkAccount ({ state, commit }, payload) {
         const { email, password } = state.personalData
         return new Promise((resolve, reject) => {
            setTimeout(() => {
               if (email === payload.email && password === payload.password) {
                  commit('AUTHENTICATE', true)
                  resolve(state.personalData)
               } else {
                  reject(false)
               }
            }, 1500);
         })

      }
   },
   modules: {
   }
})
