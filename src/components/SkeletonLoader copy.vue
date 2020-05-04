<template>
    <div>
      <!-- the div that is going to be multiplied by multiplyBy -->
      <div v-for="(copy, copyIndex) in _multiplyBy" :key="copyIndex">
        <!-- the rows inside the div -->
        <div v-for="(row, rowIndex) in _settings" :key="rowIndex" :class="classes.row[row.type]" :style="{ 'animation-delay': copyIndex * _animationDelay * settings.length + 's'}">
          <!-- the column containers inside the row -->
          <div v-for="(column, columnIndex) in row.row.columns" :key="columnIndex" :class="classes.columnContainer[column.type]" :style="{ width: column.width }">
            <!-- the column inside the container -->
            <div :class="classes.column[column.type]" :style="calcCellStyle(column.cellWidth)"></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    props: {
      /*
       * settings: [
       *   {
       *     type: 'line', // | optional
       *     row: {
       *       type: 'line', // | optional
       *       columns: [
       *         {
       *           type: 'line', // posibilities: 'line', 'toggle' | optional
       *           cellWidth: 'random', // posibilities: 'random', 'constant' | optional
       *           width: '25%', // posibilities: '55%', '30px', ... | *necessary
       *         }
       *       ]
       *     }
       *   }
       * ],
       * multiplyBy: 4, // | optional,
       * animationDelay: 0.4, // | optional
       */
      settings: Array,
      multiplyBy: Number,
      animationDelay: Number
    },
    data() {
        return {
            defaultValues: {
              multiplyBy: 4,
              animationDelay: 0.4,
              settings: { rowType: 'line', columnType: 'line', cellWidth: 'random' }
            },
            classes: {
              row: {
                line: 'listgroup-item skeleton-row',
              },
              columnContainer: {
                line: '',
                toggle: 'text-center toggle'
              },
              column: {
                line: 'skeleton-column',
                toggle: ''
              }
            },
        }
    },
    computed: {
        _multiplyBy: function() { return this.multiplyBy || this.defaultValues.multiplyBy },
        _animationDelay: function() { return this.animationDelay || this.defaultValues.animationDelay },
        // setting default values if necessary
        _settings: function() {
          let vm = this;
          this.settings.forEach(row => {
            row.type = row.type || vm.defaultValues.settings.rowType
            row.row.columns.forEach(column => {
              column.type = column.type || vm.defaultValues.settings.columnType
              column.cellWidth = column.cellWidth || vm.defaultValues.settings.cellWidth
            })
          })
          return this.settings;
        }
    },
    methods: {
        calcCellStyle(cellWidth) { return cellWidth === 'random' ? { 'width': Math.floor(Math.random() * 50) + 35 + '%' } : '' }
    }
}
</script>

<style scoped>
.skeleton-column {
    border-radius: 8px;
    background: #d9d9d9;
    height: 12px;
}
.skeleton-button {
    background: #d9d9d9;
    height: 12px;
    width: 5px;
}
@keyframes aniVertical {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.skeleton-row {
  animation: aniVertical 3s ease;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  opacity: 0;
}

@keyframes aniHorizontal {
  0% {
    background-position: -100% 0;
  }

  100% {
    background-position: 100% 0;
  }
}

.skeleton-row {
  position: relative;
}

.skeleton-row:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  animation-name: aniHorizontal;
  animation-duration: 3.5s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  background: linear-gradient(
    to right,
    #cccccc 2%,
    #666666 18%,
    #cccccc 33%
  );
  background-size: 50%;
}

.skeleton-row:before {
  mix-blend-mode: overlay;
}
</style>