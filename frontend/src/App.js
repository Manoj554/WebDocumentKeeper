import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routing from './HOC/routing';
import { isUserLoggedIn } from './actions';


const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state=>state.auth);

  useEffect(()=>{
    if(!auth.authenticate){
        dispatch(isUserLoggedIn());
    }
  }, [dispatch,auth.authenticate]);


  return (
    <>
      <Routing/>
    </>
  )
}

export default App;
