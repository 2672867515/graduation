import home1_left from './img/home1_left.jpg'
import home1_right from './img/home1_right.jpg'
import home1_top from './img/home1_top.jpg'
import home1_bottom from './img/home1_bottom.jpg'
import home1_front from './img/home1_front.jpg'
import home1_back from './img/home1_back.jpg'

import home2_left from './img/home2_left.jpg'
import home2_right from './img/home2_right.jpg'
import home2_top from './img/home2_top.jpg'
import home2_bottom from './img/home2_bottom.jpg'
import home2_front from './img/home2_front.jpg'
import home2_back from './img/home2_back.jpg'

import left from './img/2l.jpg'
import right from './img/2r.jpg'
import top from './img/2t.jpg'
import bottom from './img/2bo.jpg'
import front from './img/2f.jpg'
import back from './img/2ba.jpg'

const image={
    home1: {
      image: [home1_left, home1_right, home1_top, home1_bottom, home1_front, home1_back],// 左右前后上下
    },
    home2: {
      image: [home2_left, home2_right, home2_top, home2_bottom, home2_front, home2_back]
    },
    home3:{
      image: [left, right, top, bottom, front, back]

    }
  }
  export {image}