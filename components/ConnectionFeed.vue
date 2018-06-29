<template>
  <div class='connection-feed'>
    <h3 class='connection-feed__title'>Recent Connections</h3>
    <div v-if="feed.length">
      <feed-item v-for="item in feed" :key="item.id" :item="item" />
    </div>
    <div v-else>
      <loader />
    </div>
  </div>
</template>

<script>
import FeedItem from '~/components/FeedItem'
import Loader from '~/components/Loader'

export default {
  components: {
    FeedItem,
    Loader
  },

  props: {
    feed: ''
  }
}
</script>

<style lang="scss">
.connection-feed {
  position: relative;
  padding: 10px 10px 20px;
  margin: 0 auto;
  max-width: 768px;

  &__title {
    margin: 10px 0 15px;
    padding: 0
  }
}
</style>
