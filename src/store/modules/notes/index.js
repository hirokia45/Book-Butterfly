import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: true,
  state() {
    return {
      notes: [
        {
          id: 1,
          userName: "Hiroki",
          date: 1602691359680,
          title: "Harry Potter",
          author: "someone",
          category: "novel",
          pageFrom: 150,
          pageTo: 170,
          comment:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quos at voluptas eos nemo fugit,"
        },
        {
          id: 2,
          userName: "Hiroki",
          date: 1602691359680,
          title: "Harry Potter",
          author: "someone",
          category: "novel",
          pageFrom: 150,
          pageTo: 170,
          comment:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quos at voluptas eos nemo fugit,"
        },
        {
          id: 3,
          userName: "Hiroki",
          date: 1602691359680,
          title: "Harry Potter",
          author: "someone",
          category: "novel",
          pageFrom: 150,
          pageTo: 170,
          comment:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quos at voluptas eos nemo fugit,"
        }
      ]
    };
  },
  mutations,
  actions,
  getters
}
