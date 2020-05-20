<template>
    <div :class="cardClass">
        <div v-if="type === 'line'" class="rectangle" :style="lineStyle"></div>
        <div v-else-if="type === 'full-line'" class="rectangle" :style="fullLineStyle"></div>
        <div v-else-if="type === 'dot'" class="dot"></div>
        <div v-else class="card h-100 d-flex flex-column justify-content-between mx-1">
            <img class="card-img-top" :src="require('@/assets/2x3loading.png')"/>
            <div class="card-block p-1" :class="isTextCenter">
              <div class="rectangle" :style="headingStyle"></div>
              <div v-if="isWithYear" class="rectangle mt-1" style="height: 13px; width: 36px"></div>
            </div>
            <div v-if="isWithButtons" class="card-footer p-0">
                <div class="row no-gutters" style="height: 29px">
                    <div class="col d-flex justify-content-center">
                      <div class="d-flex align-items-center">
                        <span class="dot"></span>
                      </div>
                    </div>
                    <div class="col-7 d-flex justify-content-center">
                      <div class="d-flex align-items-center">
                        <span class="dot"></span>
                      </div>
                    </div>
                    <div class="col d-flex justify-content-center">
                      <div class="d-flex align-items-center">
                        <span class="dot"></span>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            validator: value => ['small', 'line', 'full-line', 'dot', ''].includes(value)
        },
        lineHeight: String
    },
    data() {
        return {
        }
    },
    computed: {
        cardClass() {
            if(['line', 'full-line', 'dot'].includes(this.type)) return ''
            if(this.type === 'small') return 'mt-2 col-4 col-sm-3 col-md-2'
            return 'mt-2 col-6 col-md-4 col-lg-3 col-xl-2'
        },
        lineStyle() {
          return { width: this.calcRandomWidth(), height: this.lineHeight }
        },
        fullLineStyle() {
          return { width: '100%', height: this.lineHeight }
        },
        headingStyle() {
          const style = { width: this.calcRandomWidth() }
          if(this.type === 'small') style.height = '19px'
          else style.height = '21px'
          return style
        },
        isTextCenter() {
          if(this.type === 'small') return 'd-flex justify-content-center'
        },
        isWithButtons() {
          if(this.type === 'small') return false
          return true
        },
        isWithYear() {
          if(this.type === 'small') return false
          return true
        }
    },
    methods: {
        calcRandomWidth(cellWidth) { return Math.floor(Math.random() * 50) + 35 + '%' }
    }
}
</script>

<style scoped>
.card-img-top{
    object-fit: cover;
    width: 100%;
}
.dot {
  height: 14px;
  width: 14px;
  background-color: #d9d9d9;
  border-radius: 50%;
  display: inline-block;
}
.rectangle {
  background-color: #d9d9d9;
}
</style>