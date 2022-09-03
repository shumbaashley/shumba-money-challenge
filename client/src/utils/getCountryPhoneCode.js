const getCountryPhoneCode = (country) => {
  let phoneCode;

  switch (country) {
    case "Botswana":
      phoneCode = "+267";
      break;
    case "United Kingdom":
      phoneCode = "+44";
      break;
    case "Zimbabwe":
      phoneCode = "+263";
      break;
    case "South Africa":
      phoneCode = "+27";
      break;
    default:
      phoneCode = "+267";
      break;
  }

  return phoneCode;
};

export default getCountryPhoneCode;
