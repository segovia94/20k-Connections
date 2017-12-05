<template>
  <div class='user-counter'>
    <div class='user-counter__label'>Users Online</div>
    <div class='user-counter__count'>{{ count }}</div>
  </div>
</template>

<script>
export default {
  props: {
    count: 0
  }
}
</script>

<style>
.user-counter {
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}

.user-counter__label {
  font-size: 10px;
  color: hsla(0, 0%, 100%, .5);
  padding-bottom: 5px
}

.user-counter__count {
  font-weight: 700;
  font-size: 20px;
  border-radius: 100%;
  width: 35px;
  height: 35px;
  color: #fff;
  background-color: #57431d;
  box-shadow: 0 4px 6px rgba(50, 50, 93, .11), 0 1px 3px rgba(0, 0, 0, .08)
}

.user-counter__count {
  display: flex;
  justify-content: center;
  align-items: center
}
</style>
