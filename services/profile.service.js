import db from "../models/index.cjs";

const { Profile } = db;

//Updates a user's profile.

const updateProfile = async (profileId, profileData) => {
  const userId = req.user.id;
  const profile = await Profile.findByPk(profileId);

  if (profile.userId !== userId) {
    throw new Error("You are not authorized to update this profile.");
  }

  if (!profile) return null; //Profile Not Found

  await profile.update(profileData);
  return profile;
};

export default updateProfile;
