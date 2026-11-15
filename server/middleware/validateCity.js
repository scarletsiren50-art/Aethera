
export const validateCity = (req, res, next) => {
  const { city } = req.query;

  if (!city || typeof city !== "string" || !city.trim()) {
    return res.status(400).json({
      success: false,
      message: "City name is required."
    });
  }

  const trimmedCity = city.trim();

  if (trimmedCity.length > 100) {
    return res.status(400).json({
      success: false,
      message: "City name cannot exceed 100 characters."
    });
  }

  const validCityPattern = /^[\p{L}\p{M}\s,.'-]+$/u;

  if (!validCityPattern.test(trimmedCity)) {
    return res.status(400).json({
      success: false,
      message: "Invalid city name. Please enter a valid location."
    });
  }

  next();
};
