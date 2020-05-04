import 'popper.js'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import jQuery from 'jquery'

global.$ = jQuery

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})