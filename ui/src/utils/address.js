export const getAddressTextFromInfo = (data = {}) => {
  const {
    city,
    country,
    county,
    houseNumber,
    postalCode,
    street,
  } = data;

  const addressDetails = [];

  if (street) addressDetails.push(`Str. ${street}`)

  if (houseNumber) addressDetails.push(`Nr. ${houseNumber}`);

  if (city) addressDetails.push(city);

  if (postalCode) addressDetails.push(postalCode);

  if (county) addressDetails.push(county);

  if (country) addressDetails.push(country);

  return addressDetails.join(', ');
};
