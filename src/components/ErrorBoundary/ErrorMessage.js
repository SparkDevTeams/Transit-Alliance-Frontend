import React, { useEffect } from 'react';

const ErrorMessage = (props) => {
  
  useEffect(() => {
    console.log(props.error);
  }, [props.error])

  return (
    <h1>Something went wrong</h1>
  )
}

export default ErrorMessage;