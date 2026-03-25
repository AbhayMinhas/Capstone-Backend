import {
  createSOS,
  getEmergency,
  getUserEmergencies,
  resolveEmergency,
} from "./emergency.service.js";

export const getMyEmergencies = async (req, res, next) => {
  try {
    const data = await getUserEmergencies(req.user._id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const getEmergencyById = async (req, res, next) => {
  try {
    const data = await getEmergency(req.params.id, req.user._id);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const resolveSOS = async (req, res, next) => {
  try {
    const data = await resolveEmergency(req.params.id, req.user._id);

    res.status(200).json({
      success: true,
      message: "SOS marked as resolved",
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const triggerSOS = async (req, res, next) => {
  try {
    const result = await createSOS(req.user, req.body);

    res.status(201).json({
      success: true,
      message: "SOS triggered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
