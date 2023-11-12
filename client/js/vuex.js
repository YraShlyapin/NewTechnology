import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            count: 0,
            users: {}
        }
    },
    mutations: {
        increment(state){
            state.count++
        },
        initialiseStore(state) {
			if(localStorage.getItem('store')) {
                this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				)
			}
		}
    }
})

store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state));
})

export default store