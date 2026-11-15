
export const getHealth = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Aethera Backend is running successfully!",
    project: "Aethera Weather Intelligence",
    timestamp: new Date().toISOString()
  });
};
