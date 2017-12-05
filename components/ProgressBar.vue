<template>
  <div class="progress-bar">
    <div class="progress-bar__totals">
      Intentional Connections: <strong class="progress-bar__sum">{{ sum }}</strong>
    </div>
    <div class="progress-bar__track">
      <div class="progress-bar__bar" :style="{ 'width': barWidth }"></div>
      <div class="progress-bar__percentage">{{ percentage }}%</div>
    </div>
  </div>
</template>

<script>
import { goal } from '~/config'

export default {
  data () {
    return {
      goal: goal
    }
  },

  computed: {
    sum () {
      return (this.$store.state.total > 0) ? this.$store.state.total : ''
    },

    percentage () {
      return (this.sum / this.goal * 100).toFixed(2)
    },

    barWidth () {
      return `calc(${this.percentage}% + 2px)`
    }
  }
}
</script>

<style>
.progress-bar {
  width: 100%
}

.progress-bar__totals {
  padding-bottom: 8px
}

.progress-bar__sum {
  font-size: 30px;
  text-shadow: 1px 1px 0 #fff, 2px 2px 0 rgba(0, 0, 0, .15);
  vertical-align: -4px
}

.progress-bar__track {
  position: relative;
  background-color: hsla(0, 0%, 100%, .2);
  border: 1px solid rgba(0, 0, 0, .9);
  width: 100%;
  height: 30px
}

.progress-bar__bar {
  background-color: #000;
  height: 100%
}

.progress-bar__percentage {
  position: absolute;
  right: 6px;
  top: 5px;
  font-size: 14px
}

@media (min-width: 375px) {
  .progress-bar__totals {
    padding-bottom: 14px;
    font-size: 18px
  }
}

@media (min-width: 768px) {
  .progress-bar {
    max-width: 800px;
    margin: 0 auto
  }
}
</style>
