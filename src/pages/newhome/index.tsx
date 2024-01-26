import React from 'react';
import { useParams } from 'react-router-dom';

const Newhome=(props)=> {
  const { path } = useParams();
  console.log(path);
  const queryParams = new URLSearchParams(window.location.search);
  const kw = queryParams.get('kw');
  console.log(kw);
  
  return (
    <div>
      Newhome
    </div>
  );
}
export default Newhome