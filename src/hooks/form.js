import { useState, useEffect, useContext } from 'react'
;
import { LoginContext } from '../context/settings/login';

const useForm = (callback, defaultValues={}) => {
  const {capabilities} = useContext(LoginContext)

  const [values, setValues] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    if (capabilities.includes('create')) callback({...values});
    
  };

  const handleChange = (event) => {
    let name, value;
    if(typeof(event) === 'object'){
      name = event.target.name;
      value = event.target.value;
    } else {
      console.log('event from slider', event)
      // hard coded for Mantine slider functionality 
      // change "difficulty" language if desired
      // change name dynamically if doing stretch goal!
      name = 'difficulty';
      value = event;
    }

    if (parseInt(value)) {
      value = parseInt(value);
    }

    setValues(values => ({ ...values, [name]: value }));
  };

  useEffect( () => {
    setValues( defaultValues );
  }, [defaultValues]);

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
