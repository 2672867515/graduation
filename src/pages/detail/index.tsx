import React from 'react'
import Vr from '../../components/VR/index.tsx'
import { useParams } from 'react-router-dom';
import  './index.scss'

const Detail=(props)=> {
  const { id } = useParams();
  console.log(id);
  
  return (
    <div className='detail'>page2222
      <Vr />
    </div>
  )
}
export default Detail