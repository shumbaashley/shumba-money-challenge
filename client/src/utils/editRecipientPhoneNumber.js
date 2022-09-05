import getCountryPhoneCode from "./getCountryPhoneCode";

const editRecipientPhoneNumber = (phoneNumber, country) => {
  const phoneCode = getCountryPhoneCode(country);
  let result = phoneNumber.split(phoneCode);
  return result[1];
};

export default editRecipientPhoneNumber;
