import firebase from 'firebase/app'
import { config } from '~/config'

export const FirebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()

export function snapshotToArray (snapshot) {
  let returnArr = []

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val()
    item.id = childSnapshot.key
    returnArr.push(item)
  })

  return returnArr
}
