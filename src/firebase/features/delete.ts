export default async ({ featureSnapshot }) => {
  return await featureSnapshot.ref.delete();
};
