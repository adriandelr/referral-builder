export const deleteReferral = async (id: number) => {
  const referralsResp = await fetch(
    "https://jsonplaceholder.typicode.com/users/" + id,
    {
      method: "DELETE",
    }
  );
  if (!referralsResp.ok) throw new Error("Failed to delete referral data");

  return referralsResp;
};
