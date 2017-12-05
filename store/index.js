import Vuex from 'vuex'
import Filter from 'bad-words'
import { FirebaseApp, snapshotToArray } from '~/services/firebase'

const db = FirebaseApp.database()

const filter = new Filter()
filter.removeWords('god')
filter.removeWords('hell')

const createStore = () => {
  return new Vuex.Store({
    state: {
      showModal: false,
      preparedConnection: {},
      total: 0,
      feed: [],
      celebrating: false,
      usersOnline: 0
    },

    mutations: {
      /**
       * Hide the Modal window.
       *
       * @param state
       */
      hideModal (state) {
        state.showModal = false
      },

      /**
       * Show the Modal window.
       *
       * @param state
       */
      showModal (state) {
        state.showModal = true
      },

      /**
       * Set a new connection
       *
       * @param state
       * @param type
       */
      prepareConnection (state, type) {
        state.preparedConnection = type
      },

      /**
       * Generate/update the main connections feed.
       *
       * @param state
       * @param data
       */
      setFeed (state, data) {
        state.feed = data
      },

      /**
       * Set the Total Connections state.
       *
       * @param state
       * @param data
       */
      setTotal (state, data) {
        state.total = data
      },

      /**
       * Set the Celebration state.
       *
       * @param state
       * @param status
       */
      celebrate (state, status) {
        state.celebrating = status
      },

      /**
       * Set the number of online users.
       *
       * @param state
       * @param count
       */
      setUsersOnline (state, count) {
        state.usersOnline = count
      }
    },

    getters: {
      /**
       * Retrieve the main connections feed and reverse the order.
       *
       * @param state
       * @returns {Array.<T>}
       */
      getFeed: (state) => {
        return state.feed.reverse()
      }
    },

    actions: {
      /**
       * Generate a feed of connections from Firebase and keep it up to date.
       *
       * @param context
       */
      createFeed (context) {
        let ref = db.ref('connections').orderByKey().limitToLast(50)

        // watch for changes
        ref.on('value', snapshot => {
          const obj = snapshotToArray(snapshot)

          context.commit('setFeed', obj)
        })
      },

      /**
       * Create a new Connection and save it to Firebase.
       *
       * @param context
       * @param type
       * @param comment
       */
      createConnection (context, { type, comment }) {
        const cleanComment = comment ? filter.clean(comment) : null

        const newConnection = {
          time: new Date().getTime(),
          type: type,
          comment: cleanComment
        }
        db.ref('connections').push(newConnection)

        // update counts in a transaction
        db.ref('counts').transaction((counts) => {
          if (!counts) {
            counts = {
              comment: 0,
              friend: 0,
              invite: 0,
              like: 0,
              other: 0,
              post: 0,
              share: 0,
              total: 0
            }
          }

          counts.total++
          counts[context.state.preparedConnection.type]++

          return counts
        })

        // Start celebrating
        context.commit('celebrate', true)

        // End celebration after 5 seconds
        window.setTimeout(() => {
          context.commit('celebrate', false)
        }, 5000)
      },

      /**
       * Get the Total Connections from firebase and set the "total" state.
       *
       * @param context
       */
      getTotals (context) {
        db.ref('counts').on('value', snapshot => {
          const counts = snapshot.val()
          if (!counts) {
            return
          }

          context.commit('setTotal', counts.total)
        })
      },

      /**
       * Set the current user as online and get list of others.
       *
       * @param context
       */
      registerUsersOnline (context) {
        const ref = db.ref('online_users')

        // Register current user as online
        const userRef = ref.push()

        // When the current user disconnects, remove from online users
        db.ref('.info/connected').on('value', (snapshot) => {
          if (snapshot.val()) {
            userRef.onDisconnect().remove()
            userRef.set(true)
          }
        })

        // When the online user count changes, update in the UI
        ref.on('value', (snapshot) => {
          context.commit('setUsersOnline', snapshot.numChildren())
        })
      }
    }

  })
}

export default createStore
