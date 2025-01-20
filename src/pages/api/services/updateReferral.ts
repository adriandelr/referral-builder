export const updateReferral = async (id: number, payload: any) => {
  const referralsResp = await fetch(
    "https://jsonplaceholder.typicode.com/users/" + id,
    {
      method: "PUT",
      body: JSON.stringify(payload),
    }
  );
  if (!referralsResp.ok) throw new Error("Failed to update referral data");

  return referralsResp;
};
