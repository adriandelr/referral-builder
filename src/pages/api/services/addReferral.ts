export const addReferral = async (payload: any) => {
  const referralsResp = await fetch(
    "https://jsonplaceholder.typicode.com/users/",
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
  if (!referralsResp.ok) throw new Error("Failed to add patient data");

  return referralsResp;
};
