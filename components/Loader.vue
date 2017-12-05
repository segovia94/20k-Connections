<template>
  <div class="loader">
    <div class="loader__item"></div>
    <div class="loader__item"></div>
    <div class="loader__item"></div>
    <div class="loader__item"></div>
    <div class="loader__item"></div>
    <div class="loader__item"></div>
  </div>
</template>

<style lang="scss">
.loader {
  width: 100%;
  padding: 0 100px 2em 100px;
  text-align: center;

  &__item {
    width: 12px;
    height: 12px;
    margin: 0 2px;
    background-color: #57431d;
    border-radius: 50%;
    opacity: 0;
    display: inline-block;
    animation: loader 2.5s infinite ease-in-out;

    &:nth-child(5) {
      animation-delay: 100ms;
    }

    &:nth-child(4) {
      animation-delay: 200ms;
    }

    &:nth-child(3) {
      animation-delay: 300ms;
    }

    &:nth-child(2) {
      animation-delay: 400ms;
    }

    &:nth-child(1) {
      animation-delay: 500ms;
    }
  }
}

@keyframes loader {
  0% {
    opacity: 0;
    transform: translateX(-300px);
  }
  33% {
    opacity: 1;
    transform: translateX(0px);
  }
  49.5% {
    transform: scale(.7);
  }
  66% {
    opacity: 1;
    transform: translateX(0px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateX(300px);
  }
}
</style>
