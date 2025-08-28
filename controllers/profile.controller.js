import updateProfile from "../services/profile.service";

/**
 * Handles updating a user profile.
 * Route: PUT /profiles/:profileId
 */
const handleUpdateProfile = async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const { bio, location } = req.body;

    const updatedProfile = await updateProfile(profileId, { bio, location });

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found." });
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};
