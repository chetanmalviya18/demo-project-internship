import db from "../models/index.cjs";

const { Profile } = db;

//Updates a user's profile.

const updateProfile = async (profileId, userId, profileData) => {
  const profile = await Profile.findByPk(profileId);

  if (profile.userId !== userId) {
    throw new Error("You are not authorized to update this profile.");
  }

  if (!profile) return { status: 404, message: "Profile not found." };

  await profile.update(profileData);
  return { status: 200, data: profile };
};

export default updateProfile;
