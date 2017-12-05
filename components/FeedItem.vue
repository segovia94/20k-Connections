<template>
  <div class="feed-item">
    <div class="feed-item__metadata">
      <img class="feed-item__icon" :src="'/svg/' + connection.type + '.svg'" :alt="connection.label" width="30" height="30" />
      <strong class="feed-item__label">{{ connection.label }}</strong>
      <div class="feed-item__time">
        <timeago :since="item.time" :auto-update="60"></timeago>
      </div>
    </div>

    <div class="feed-item__comment" v-if="item.comment">“{{ item.comment }}”</div>
  </div>
</template>

<script>
import { getConnectionConfig } from '~/services/connections'

export default {
  props: {
    item: ''
  },

  computed: {
    connection () {
      return getConnectionConfig(this.item.type)
    }
  }
}
</script>

<style>
.feed-item {
  padding: 10px;
  margin: 0 0 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background-color: hsla(0, 0%, 100%, .9)
}

.feed-item__metadata {
  display: flex;
  align-items: center
}

.feed-item__time {
  font-size: 14px;
  font-style: italic
}

.feed-item__icon {
  margin-right: 10px
}

.feed-item__label {
  margin-right: 10px;
  flex-grow: 3;
  text-align: left
}

.feed-item__comment {
  margin-top: 10px;
  padding: 8px 15px;
  border-radius: 3px;
  background-color: hsla(48, 91%, 86%, .5);
  box-shadow: inset 0 0 6px 0 rgba(0, 0, 0, .2)
}
</style>
