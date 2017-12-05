import { FirebaseApp } from '~/services/firebase'

export default function ({ isServer, req }) {
  // If nuxt generate, pass this middleware
  if (isServer && !req) return

  FirebaseApp.auth().signInAnonymously().catch(error => {
    console.error('Error Signing In! Code: %o, Message: %o', error.code, error.message)
  })
}
