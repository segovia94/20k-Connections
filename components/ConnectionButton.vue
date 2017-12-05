<template>
  <a class="connection-button" @click.prevent="handleClick()">
    <img class="connection-button__image" :src="'/svg/' + type.type + '.svg'" :alt="type.label" />
    <div class="connection-button__label">{{ type.label }}</div>
  </a>
</template>

<script>
export default {
  props: {
    type: ''
  },

  methods: {
    handleClick () {
      this.$store.commit('prepareConnection', this.type)
      this.$store.commit('showModal')
    }
  }
}
</script>

<style lang="scss">
.connection-button {
  width: 20%;
  border-radius: 100%;
  margin-bottom: 25px;
  margin-right: 1%;
  margin-left: 1%;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  border: 1px solid rgba(87, 67, 29, .4);
  box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08);
  transition: all .25s ease;
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, .8));

  &:hover {
    transform: translateY(-1px);
    filter: drop-shadow(0 0 35px rgba(255, 255, 255, 1));
  }

  &__image {
    width: 100%;
  }

  &__label {
    position: absolute;
    bottom: 0;
    margin-bottom: -15px;
    background: hsla(0, 0%, 100%, .95);
    font-size: 11px;
    padding: .3em .6em;
    border-radius: 4px;
    border: 1px solid rgba(87, 67, 29, .4);
    box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08);
    transition: all .25s ease;

    @media (min-width: 375px) {
      font-size: 13px;
    }

    @media (min-width: 576px) {
      font-size: 18px;
    }

    .connection-button:hover & {
      transform: translateY(2px);
    }
  }
}
</style>
