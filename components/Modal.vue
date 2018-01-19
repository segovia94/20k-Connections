<template>
  <transition name="modal">
    <div class="modal">
      <div class="modal__overlay" @click="close()"></div>
      <div class="modal__content">
        <div class="modal__close-button" @click="close()">
          <img src="/svg/close.svg" width="20" alt="Close modal window" />
        </div>
        <div class='modal__icon'>
          <img class='modal__icon-svg' :src="'/svg/' + type.type + '.svg'" :alt="type.label" />
        </div>
        <blockquote class='modal__quote'>“{{ type.description }}”</blockquote>

        <form class='connection-form' @submit.prevent="submitForm()">
          <input type='text' class='connection-form__website' name="website" v-model="website" />
          <input type='text' class='connection-form__input' maxlength="500" placeholder='Comment (optional)' v-model="comment" />
          <div class="connection-form__notice">(Please do not include any identifying information, like last names)</div>
          <input class='connection-form__submit' type='submit' value='Submit' />
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    type: {}
  },

  data () {
    return {
      spam: true,
      website: '', // This is our honeypot field
      comment: ''
    }
  },

  mounted () {
    // Assume it takes more than 3 seconds to add a comment
    window.setTimeout(() => {
      this.spam = false
    }, 3000)
  },

  methods: {
    close () {
      this.$store.commit('hideModal')
    },

    submitForm () {
      this.close()

      // Don't submit the form if the honeypot website field is filled out since that means it is spam.
      if (this.website.length > 0) {
        return
      }

      const payload = {
        type: this.type.type,
        comment: this.comment
      }

      // Remove the comment if it is spam due to being written in less than 3 seconds
      if (this.spam) {
        payload.comment = ''
      }

      this.$store.dispatch('createConnection', payload)
      this.comment = ''
    }
  }
}
</script>

<style lang="scss">
.modal-leave-active {
  transition: opacity .3s;
}

.modal {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  &, &__overlay {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  &__overlay {
    position: absolute;
    z-index: 1;
    background: rgba(55, 58, 71, .9);
    transition: opacity .3s;
    backface-visibility: hidden;
    pointer-events: auto;
    will-change: opacity;

    .modal-leave-to & {
      opacity: 0;
    }
  }

  &__content {
    width: 75%;
    max-width: 410px;
    min-width: 200px;
    border-radius: 5px;
    box-shadow: 0 0 50px 0 rgba(0, 0, 0, .5);
    padding: 30px;
    position: relative;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #eeeaec;
    background-image: linear-gradient(0deg, hsla(0, 0%, 100%, .4), hsla(0, 0%, 100%, 0)), url(~/assets/images/bg-mobile-2x.jpg);
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: contain;
    pointer-events: auto;
    animation-name: anim-open;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    will-change: transform, opacity;

    .modal-leave-to & {
      animation-name: anim-close;
      animation-duration: .3s;
      animation-timing-function: ease-out;
      animation-fill-mode: forwards;
    }
  }

  &__close-button {
    position: absolute;
    padding: 17px;
    right: 0;
    top: 0;
    opacity: .5;
    transition: opacity .25s ease;
    cursor: pointer;
    will-change: opacity;

    &:hover {
      opacity: 1;
    }
  }

  &__icon {
    width: 140px;
    height: 140px;
    border-radius: 100%;
    box-shadow: 0 4px 6px rgba(50, 50, 93, .15), 0 1px 3px rgba(0, 0, 0, .08);
    position: relative;
  }

  &__icon-svg {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
  }

  &__quote {
    margin: 20px 10px 40px;
    font-style: italic;
    font-size: 18px;
  }
}

.connection-form {
  width: 100%;

  &__input {
    width: 95%;
    height: 42px;
    margin-bottom: 5px;
    font-size: 16px;
    border: 1px solid rgba(0, 0, 0, .5);
    border-radius: 3px;
    box-shadow: 0 7px 14px rgba(50, 50, 93, .1), 0 3px 6px rgba(0, 0, 0, .08), 0 0 15px 0 #fff;
    padding: 5px 10px;
    transition: all .25s ease;

    &:focus {
      outline: none;
      box-shadow: 0 7px 14px rgba(50, 50, 93, .1), 0 3px 6px rgba(0, 0, 0, .08), 0 0 25px 0 #fd811f;
    }
  }

  &__notice {
    font-size: 12px;
    color: #000;
    text-shadow: 1px 1px 0 #fff;
    filter: drop-shadow(0 0 3px rgba(255, 255, 255, .9));
    margin-bottom: 20px;
  }

  &__submit {
    appearance: none;
    white-space: nowrap;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    padding: 0 14px;
    box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08);
    border-radius: 4px;
    border: 0;
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
    background-color: #fd811f;
    color: #fff;
    text-decoration: none;
    transition: all .15s ease;
    cursor: pointer;

    &:hover {
      color: #fff;
      background-color: #e4711b;
    }

    &:active {
      color: #e6ebf1;
      background-color: #ff6a1b;
    }
  }

  // This is our honeypot
  &__website {
    display: none !important;
  }
}

@keyframes anim-open {
  0% {
    transform: matrix(.7, 0, 0, .7, 0, 0);
    opacity: 0;
  }
  14.583333% {
    transform: matrix(1.02563, 0, 0, 1.09149, 0, 0);
  }
  22.916667% {
    transform: matrix(1.05078, 0, 0, 1.02012, 0, 0);
  }
  31.25% {
    transform: matrix(1.01973, 0, 0, .97422, 0, 0);
  }
  45.833333% {
    transform: matrix(.99202, 0, 0, 1.00651, 0, 0);
  }
  47.916667% {
    transform: matrix(.99241, 0, 0, 1.00726, 0, 0);
  }
  50% {
    transform: matrix(.99329, 0, 0, 1.00671, 0, 0);
    opacity: 1;
  }
  64.583333% {
    transform: matrix(1.00057, 0, 0, .99795, 0, 0);
  }
  70.833333% {
    transform: matrix(1.00119, 0, 0, .99903, 0, 0);
  }
  81.25% {
    transform: matrix(1.00044, 0, 0, 1.00058, 0, 0);
  }
  to {
    transform: matrix(1, 0, 0, 1, 0, 0);
    opacity: 1;
  }
}

@keyframes anim-close {
  0% {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d(.8, .8, 1);
  }
}
</style>
