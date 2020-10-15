import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: true,
  state() {
    return {
      notes: {
        1: {
          id: 1,
          userName: "Hiroki",
          date: 1602691359680,
          title: "Harry Potter 1",
          author: "someone",
          category: "novel",
          pageFrom: 150,
          pageTo: 170,
          comment:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quos at voluptas eos nemo fugit,"
        },
        2: {
          id: 2,
          userName: "Hiroki",
          date: 1602691359680,
          title: "Harry Potter 2",
          author: "someone",
          category: "novel",
          pageFrom: 150,
          pageTo: 170,
          comment:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quos at voluptas eos nemo fugit,"
        },
        3: {
          id: 3,
          userName: "Hiroki",
          date: 1602691359680,
          title: "Harry Potter 3",
          author: "someone",
          category: "novel",
          pageFrom: 150,
          pageTo: 170,
          comment:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quos at voluptas eos nemo fugit,"
        }
      }
    };
  },
  mutations,
  actions,
  getters
}
