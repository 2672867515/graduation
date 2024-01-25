import React from 'react';
import { useParams } from 'react-router-dom';

const Newhome=(props)=> {
  const { path } = useParams();
  console.log(path);
  const queryParams = new URLSearchParams(window.location.search);
  const qValue = queryParams.get('q');
  console.log(qValue);
  
  return (
    <div>
      Newhome
    </div>
  );
}
export default Newhome