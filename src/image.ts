import home1_left from './img/2_living_l.webp'
import home1_right from './img/2_living_r.webp'
import home1_top from './img/2_living_t.webp'
import home1_bottom from './img/2_living_bo.webp'
import home1_front from './img/2_living_f.webp'
import home1_back from './img/2_living_ba.webp'

import home2_left from './img/2_mainroom_l.webp'
import home2_right from './img/2_mainroom_r.webp'
import home2_top from './img/2_mainroom_t.webp'
import home2_bottom from './img/2_mainroom_bo.webp'
import home2_front from './img/2_mainroom_f.webp'
import home2_back from './img/2_mainroom_ba.webp'


import left11 from './img/2_secondroom_l.webp'
import right11 from './img/2_secondroom_r.webp'
import top11 from './img/2_secondroom_t.webp'
import bottom11 from './img/2_secondroom_bo.webp'
import front11 from './img/2_secondroom_f.webp'
import back11 from './img/2_secondroom_ba.webp'

import left from './img/2_wsahroom_l.webp'
import right from './img/2_wsahroom_r.webp'
import top from './img/2_wsahroom_t.webp'
import bottom from './img/2_wsahroom_bo.webp'
import front from './img/2_wsahroom_f.webp'
import back from './img/2_wsahroom_ba.webp'

const image={
    home1: {
      image: [ home1_right,home1_left, home1_top, home1_bottom, home1_front, home1_back],// 左右前后上下
    },
    home2: {
      image: [ home2_right,home2_left, home2_top, home2_bottom, home2_front, home2_back]
    },

    home5:{
      image: [ right11, left11,top11, bottom11, front11, back11]

    },
    home3:{
      image: [right,left,  top, bottom, front, back]

    },
  }
  export {image}