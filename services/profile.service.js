import db from "../models/index.cjs";

const { Profile } = db;

//Updates a user's profile.

const updateProfile = async (userId, profileData) => {
  const profile = await Profile.findOne({ where: { userId: userId } });

  if (!profile) return null; //Profile Not Found

  await profile.update(profileData);
  return profile;
};
