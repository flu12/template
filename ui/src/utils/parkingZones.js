export const getParkingZoneTextFromInfo= (data, t, space) => {
  const {
    name,
    price,
    noOfFreeParkings,
  } = data;

  const parkingZoneDetails = [];

  if (space && space.name) parkingZoneDetails.push(space.name);

  if (name) parkingZoneDetails.push(name);

  if (noOfFreeParkings > 0) parkingZoneDetails.push(`${noOfFreeParkings} ${t("available parkings")}`);

  return parkingZoneDetails.join(', ');
};
