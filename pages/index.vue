<template>
  <div class="app">
    <div class="intro-screen">
      <header class="heading">
        <img class="heading__logo" src="~/assets/images/logo.png" alt="Intentional Evangelistic Connections">
        <user-counter :count="$store.state.usersOnline" />
      </header>

      <div class="connection-question">In which of the following seven ways have you connected with unbelievers?</div>

      <div class="connection-grid">
        <connection-button v-for="type in connectionTypes" :key="type.type" :type="type" />
      </div>

      <div class="totals">
        <progress-bar />
      </div>
    </div>

    <connection-feed :feed="feed" />

    <modal :type="$store.state.preparedConnection" v-if="$store.state.showModal" />

    <confetti />
  </div>
</template>

<script>
import { connectionTypes } from '~/services/connections'
import ConnectionButton from '~/components/ConnectionButton'
import ProgressBar from '~/components/ProgressBar'
import UserCounter from '~/components/UserCounter'
import ConnectionFeed from '~/components/ConnectionFeed'
import Modal from '~/components/Modal'
import Confetti from '~/components/confetti'

export default {
  components: {
    ConnectionButton,
    ProgressBar,
    UserCounter,
    Modal,
    ConnectionFeed,
    Confetti
  },

  data () {
    return {
      userCount: 5,
      connectionTypes: connectionTypes
    }
  },

  computed: {
    feed () {
      return this.$store.getters.getFeed
    }
  },

  created () {
    // Get the initial Feed list of connections.
    this.$store.dispatch('createFeed')

    // Get the initial Total number of connections made.
    this.$store.dispatch('getTotals')

    // Get the number of online users.
    this.$store.dispatch('registerUsersOnline')
  }
}
</script>

<style lang="scss">
.app {
  text-align: center;
  font-family: HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;
  font-weight: 300;
}

.intro-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(~/assets/images/bg-mobile-2x.jpg), linear-gradient(180deg, #815232, #eeeaec 45%);
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: contain;

  @media (min-height: 550px) and (orientation: portrait) {
    height: 100vh;
  }

  @media (min-width: 540px) {
    background-image: url(~/assets/images/bg-mobile-2x.jpg), linear-gradient(180deg, #815232, #eeeaec 25%);
  }

  @media (min-height: 737px) {
    height: auto;
    background-image: url(~/assets/images/bg-desktop-2x.jpg), linear-gradient(180deg, #fd811f, #5595c5 20%);
    background-size: cover;
  }

  @media (min-width: 568px) and (orientation: landscape) {
    background-image: url(~/assets/images/bg-desktop-2x.jpg), linear-gradient(180deg, #fd811f, #5595c5 20%);
    background-size: cover;
  }

  @media (min-width: 768px) {
    height: auto;
    background-image: url(~/assets/images/bg-desktop-2x.jpg), linear-gradient(180deg, #fd811f, #5595c5 20%);
  }
}

.heading {
  position: relative;
  width: 100%;
  flex-grow: 1;
  padding-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  &__logo {
    max-height: 150px;
    filter: drop-shadow(0 0 20px rgba(0, 0, 0, .4)) drop-shadow(0 0 20px rgba(255, 255, 255, 1));

    @media (min-width: 375px) {
      max-height: 175px;
    }

    @media (min-width: 768px) {
      max-height: 200px;
    }
  }
}

.connection-question {
  padding: 0 20px 15px;

  @media (min-width: 375px) {
    font-size: 18px;
  }

  @media (min-height: 737px) {
    padding-bottom: 40px;
    font-size: 20px;
  }
}

.connection-grid {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  @media (min-width: 576px) {
    max-width: 675px;
  }

  @media (min-width: 768px) and (min-height: 750px) {
    max-width: 820px;
  }
}

.totals {
  width: 100%;
  flex-grow: 2;
  padding: 20px 30px;
  background-image: linear-gradient(0deg, hsla(0, 0%, 100%, .7), hsla(0, 0%, 100%, 0));
  border-bottom: 1px solid rgba(140, 96, 69, .1);

  @media (min-height: 737px) {
    padding-top: 40px;
    padding-bottom: 30px;
  }
}
</style>
