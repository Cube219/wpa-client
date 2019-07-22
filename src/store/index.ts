import Vue from 'vue';
import Vuex from 'vuex';

// import example from './module-example'
// import pageInfos from './pageInfos';
import pageInfos from './modules/pageInfos';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      pageInfos,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: (process.env.DEV === undefined),
  });

  return Store;
}
