import db from "../models/index.cjs";

const { Profile } = db;

//Updates a user's profile.

const updateProfile = async (profileId, profileData) => {
  const profile = await Profile.findByPk(profileId);

  if (!profile) return null; //Profile Not Found

  await profile.update(profileData);
  return profile;
};

export default updateProfile;
