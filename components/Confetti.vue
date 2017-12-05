<template>
  <div>
    <canvas ref="confetti"></canvas>
  </div>
</template>

<script>
// globals
let ctx
let W
let H
let startH
let mp = 140 // max particles
let particles = []
let angle = 0
let confettiActive = true
let animationComplete = true
let reactivationTimerHandler
let animationHandler

class ParticleColors {
  constructor () {
    this.colorOptions = ['DodgerBlue', 'OliveDrab', 'Gold', 'pink', 'SlateBlue', 'lightblue', 'Violet', 'PaleGreen', 'SteelBlue', 'SandyBrown', 'Chocolate', 'Crimson']
    this.colorIndex = 0
    this.colorIncrementer = 0
  }

  getColor () {
    if (this.colorIncrementer >= 10) {
      this.colorIncrementer = 0
      this.colorIndex++
      if (this.colorIndex >= this.colorOptions.length) {
        this.colorIndex = 0
      }
    }
    this.colorIncrementer++
    return this.colorOptions[this.colorIndex]
  }
}

class ConfettiParticle {
  constructor (color) {
    this.x = Math.random() * W // x-coordinate
    this.y = (Math.random() * H) - H // y-coordinate
    this.r = this.randomFromTo(10, 30) // radius;
    this.d = (Math.random() * mp) + 10 // density;
    this.color = color
    this.tilt = Math.floor(Math.random() * 10) - 10
    this.tiltAngleIncremental = (Math.random() * 0.07) + 0.05
    this.tiltAngle = 0
  }

  draw () {
    ctx.beginPath()
    ctx.lineWidth = this.r / 2
    ctx.strokeStyle = this.color
    ctx.moveTo(this.x + this.tilt + (this.r / 4), this.y)
    ctx.lineTo(this.x + this.tilt, this.y + this.tilt + (this.r / 4))
    return ctx.stroke()
  }

  randomFromTo (from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from)
  }
}

// polyfill for requestAnimationFrame
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = callback => {
    return window.setTimeout(callback, 1000 / 60)
  }
}

export default {
  data () {
    return {
      canvas: ''
    }
  },

  mounted () {
    this.canvas = this.$refs.confetti

    this.setGlobals()

    this.$store.watch(
      // When the returned result changes...
      state => {
        return state.celebrating
      },
      // Run this callback
      status => {
        if (status) {
          this.initializeConfetti()
          this.restartConfetti()
        } else {
          this.deactivateConfetti()
        }
      }
    )
  },

  methods: {
    setGlobals () {
      ctx = this.canvas.getContext('2d')
      startH = window.innerHeight
    },

    initializeConfetti () {
      particles = []
      animationComplete = false
      let particleColor = new ParticleColors()
      for (let i = 0; i < mp; i++) {
        particles.push(new ConfettiParticle(particleColor.getColor()))
      }
      this.startConfetti()
    },

    draw () {
      ctx.clearRect(0, 0, W, H)
      let results = []
      for (let i = 0; i < mp; i++) {
        if (particles[i] !== undefined) {
          results.push(particles[i].draw())
        }
      }
      this.update()

      return results
    },

    update () {
      let remainingFlakes = 0
      let particle
      angle += 0.01

      for (let i = 0; i < mp; i++) {
        particle = particles[i]
        if (animationComplete || particle === undefined) {
          this.stopConfetti()
          return
        }

        if (!confettiActive && particle.y < -15) {
          particle.y = H + 100
          continue
        }

        this.stepParticle(particle, i)

        if (particle.y <= H) {
          remainingFlakes++
        }
        this.checkForReposition(particle, i)
      }

      if (remainingFlakes === 0) {
        this.stopConfetti()
      }
    },

    checkForReposition (particle, index) {
      if ((particle.x > W + 20 || particle.x < -20 || particle.y > H) && confettiActive) {
        if (index % 5 > 0 || index % 2 === 0) { // 66.67% of the flakes
          this.repositionParticle(particle, Math.random() * W, -10, Math.floor(Math.random() * 10) - 20)
        } else {
          if (Math.sin(angle) > 0) {
            // Enter from the left
            this.repositionParticle(particle, -20, Math.random() * H, Math.floor(Math.random() * 10) - 20)
          } else {
            // Enter from the right
            this.repositionParticle(particle, W + 20, Math.random() * H, Math.floor(Math.random() * 10) - 20)
          }
        }
      }
    },

    stepParticle (particle, particleIndex) {
      particle.tiltAngle += particle.tiltAngleIncremental
      particle.y += (Math.cos(angle + particle.d) + 3 + particle.r / 2) / 2
      particle.x += Math.sin(angle)
      particle.tilt = (Math.sin(particle.tiltAngle - (particleIndex / 3))) * 15
    },

    repositionParticle (particle, xCoordinate, yCoordinate, tilt) {
      particle.x = xCoordinate
      particle.y = yCoordinate
      particle.tilt = tilt
    },

    startConfetti () {
      let newHeight = window.innerHeight
      W = window.innerWidth
      H = (startH > newHeight) ? startH : newHeight
      this.canvas.width = W
      this.canvas.height = H
      mp = Math.round(W / 10)
      this.animationLoop()
    },

    animationLoop () {
      if (animationComplete) {
        return null
      }
      animationHandler = requestAnimationFrame(this.animationLoop)
      return this.draw()
    },

    clearTimers () {
      clearTimeout(reactivationTimerHandler)
      clearTimeout(animationHandler)
    },

    deactivateConfetti () {
      confettiActive = false
    },

    stopConfetti () {
      animationComplete = true
      if (ctx === undefined) {
        return
      }
      ctx.clearRect(0, 0, W, H)
    },

    restartConfetti () {
      this.clearTimers()
      this.stopConfetti()
      reactivationTimerHandler = setTimeout(() => {
        confettiActive = true
        animationComplete = false
        this.initializeConfetti()
      }, 100)
    }
  }
}
</script>

<style lang="scss">
canvas {
  display: block;
  z-index: 1;
  pointer-events: none;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>
