export const getValueOfPayment = (subscriptionType, price) => {
  let valueOfPayment = 0;
  if(subscriptionType === "30"){
    valueOfPayment = price;
  }
  else if(subscriptionType === "40"){
    const oneDayPrice = price / 30;
    valueOfPayment = Math.floor( oneDayPrice * 40);
  }
  else if(subscriptionType === "60"){
    valueOfPayment = price * 2;
  }
  else if(subscriptionType === "90"){
    valueOfPayment = price * 3;
  }
  else if(subscriptionType === "360"){
    valueOfPayment = price  * 12;
  }
 return valueOfPayment;
};
