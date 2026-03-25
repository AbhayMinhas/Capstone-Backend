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
      // user.safetyProfile = {
      //   ...user.safetyProfile,
      //   ...filteredData.safetyProfile,
      //   emergencyContacts: [
      //     ...(user.safetyProfile.emergencyContacts || []),
      //     ...(filteredData.safetyProfile.emergencyContacts || []),
      //   ],
      // };

      const existingContacts = user.safetyProfile?.emergencyContacts || [];

      const incomingContacts =
        filteredData.safetyProfile?.emergencyContacts || [];

      const contactMap = new Map();

      existingContacts.forEach((contact) => {
        const key = `${contact.phone}-${contact.email?.toLowerCase()}`;
        contactMap.set(key, contact);
      });

      incomingContacts.forEach((contact) => {
        const key = `${contact.phone}-${contact.email?.toLowerCase()}`;

        if (contactMap.has(key)) {
          contactMap.set(key, {
            ...contactMap.get(key),
            ...contact,
          });
        } else {
          contactMap.set(key, contact);
        }
      });
      const mergedContacts = Array.from(contactMap.values());

      user.safetyProfile = {
        ...user.safetyProfile,
        ...filteredData.safetyProfile,
        emergencyContacts: mergedContacts,
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
