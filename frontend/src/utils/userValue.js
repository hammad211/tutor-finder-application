

export const user = () => {
  
    const storedValue = localStorage.getItem("value");
    console.log('storedValue');
   

  return   storedValue;
};
