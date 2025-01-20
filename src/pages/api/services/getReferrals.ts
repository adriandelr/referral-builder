export const getReferrals = async () => {
  const referralsResp = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  if (!referralsResp.ok) throw new Error("Failed to fetch patients data");
  const patients = await referralsResp.json();

  return patients;
};
