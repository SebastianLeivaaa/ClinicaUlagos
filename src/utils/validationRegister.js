export function validateRut(input) {
    const fullRut = input;
    const regex = /^\d{7,8}-[\dkK]$/;
    if(regex.test(fullRut)){
        let rutSplit = fullRut.split('-');
        let rut = rutSplit[0];
        let digV = rutSplit[1];
        let sum = 0;
        let j = 2;
        
        if(digV == 'K' ){
            digV = 'k';
        }
        for(let i = rut.length - 1; i >=0; i--){
            sum += (rut[i] * j);
            j++;
            if(j > 7){
                j=2;
            }
        }
        
        let vDiv = Math.floor(sum/11);
        let vMult = vDiv * 11;
        let vRes = sum - vMult;
        let vFinal = 11 - vRes;
  
        if(digV == 'k' && vFinal == 10){
            return true;
        }else if(digV == 0 && vFinal == 11){
            return true;
        }else if (digV == vFinal){
            return true;
        }else {
            return false;
        }
    }else {
            return false;
    }
  }

  export function validateDate(date){
    const dateFormat = new Date(date);
    const currentDate = new Date();
    const minDate = new Date("1910-01-01");

    return dateFormat < currentDate && dateFormat > minDate;
}


export function validateFormatPhone(phone) {
    const regex = /^9\d{0,8}$/;
    return regex.test(phone);
  }

export function validateEmailFormat(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

