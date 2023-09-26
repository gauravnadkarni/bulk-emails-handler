export const isPositiveInt = (value) => {
    return !isNaN(value) && 
           parseInt(Number(value)) === value && 
           !isNaN(parseInt(value, 10)) && (parseInt(value, 10) >0);
  }