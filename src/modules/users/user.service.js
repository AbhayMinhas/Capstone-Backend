import User from "../auth/auth.model.js";

export const updateUserProfile = async (user, updateData) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "safetyProfile",
  ];

  const allowedSafetyFields = [
    "bloodGroup",
    "allergies",
    "medicalNotes",
    "emergencyContacts",
  ];

  const filteredData = {};

  Object.keys(updateData).forEach((key) => {
    if (allowedFields.includes(key)) {
      filteredData[key] = updateData[key];
    }
  });

  if (filteredData.safetyProfile) {
    const inputProfile = filteredData.safetyProfile;
    const filteredSafetyProfile = {};

    Object.keys(inputProfile).forEach((key) => {
      if (allowedSafetyFields.includes(key)) {
        filteredSafetyProfile[key] = inputProfile[key];
      }
    });

    filteredData.safetyProfile = filteredSafetyProfile;
  }

  Object.keys(filteredData).forEach((key) => {
    if (key === "safetyProfile") {
      user.safetyProfile = {
        ...user.safetyProfile,
        ...filteredData.safetyProfile,
      };
    } else {
      user[key] = filteredData[key];
    }
  });

  await user.save();

  const safeUser = user.toObject();
  delete safeUser.password;

  return safeUser;
};
