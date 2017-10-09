import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store( {
    state : {
        comNavigationName : '',
        comHeaderFlag : false,
        comFooterFlag : false,
        activeIndex : false,
        activeClass : false,
        activeMy : false,
        isLoading : false,
        isLogin : false,
        carCount : 0,
    },
    mutations : {
        changeComHeaderFlag( state, flag ) {
            state.comHeaderFlag = flag;
        },
        changeComFooterFlag( state , flag ) {
            state.comFooterFlag = flag;
        },
        changeIndex( state ) {
            state.activeIndex = true;
            state.activeClass = false;
            state.activeMy = false;
        },
        changeClass( state ) {
            state.activeIndex = false;
            state.activeClass = true;
            state.activeMy = false;
        },
        changeMy( state ) {
            state.activeIndex = false;
            state.activeClass = false;
            state.activeMy = true;
        },
        changeIsLoading( state, flag ) {
            state.isLoading = flag;
        },
        changeIsLogin( state, flag ) {
            state.isLogin = flag;
        },
        changeCarCount( state, num ) {
            state.carCount = num;
        }
    },
    actions: {
        changeComHeaderFlag1( context, flag ) {
            context.commit('changeComHeaderFlag', flag);
        },
        changeComFooterFlag1( context, flag ) {
            context.commit('changeComFooterFlag', flag);
        },
        changeIndex1( context ) {
            context.commit('changeIndex');
        },
        changeClass1( context ) {
            context.commit('changeClass');
        },
        changeMy1( context ) {
            context.commit('changeMy');
        },
        changeIsLoading1( context, flag ) {
            context.commit('changeIsLoading', flag);
        },
        changeIsLogin1( context, flag ) {
            context.commit( 'changeIsLogin', flag );
        },
        changeCarCount1( context, num ) {
            context.commit( 'changeCarCount', num );
        }
    }
});

export default store;