import { useEffect, useState } from "react";
import { getReferrals } from "../pages/api/services/getReferrals";
import { useReferrals } from "../contexts/referralsContext";
import { updateReferral } from "../pages/api/services/updateReferral";
import { deleteReferral } from "../pages/api/services/deleteReferral";

export default function List({ updateEditing }: any) {
  const { referrals, setReferrals } = useReferrals();
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const referrals = await getReferrals();
      setReferrals(referrals);
      setLoading(false);
    };

    fetchUsers();
  }, [setReferrals]);

  const handleDeleteReferral = async (e: any, id: number) => {
    e.preventDefault();
    const referralsResp = await deleteReferral(id);
    const referralsPromise = referralsResp.json();

    referralsPromise.then(() => {
      setReferrals(referrals.filter((item) => item["id"] !== id));
    });
  };

  return (
    <div className="bg-white basis-1/2 h-max m-8 shadow-sm p-8">
      {isLoading && (
        <div className="flex justify-center content-center text-lg text-gray-400">
          •••
        </div>
      )}
      {!isLoading && (
        <table className="w-full table-auto">
          <thead className="border-b-2">
            <tr className="text-sm text-gray-400 text-left">
              <th className="py-4">NAME</th>
              <th className="py-4">USERNAME</th>
              <th className="py-4">EMAIL</th>
              <th className="py-4">PHONE</th>
              <th className="py-4">ACTIONS</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-400">
            {referrals.map((referral: any) => (
              <tr key={referral.id} className="border-b-2">
                <td className="py-2">{referral.name}</td>
                <td className="py-2">{referral.username}</td>
                <td className="py-2">{referral.email}</td>
                <td className="py-2">{referral.phone}</td>
                <td className="py-2 text-center">
                  {!referral.isPreviewField && (
                    <span>
                      <span
                        className="cursor-pointer mr-4"
                        onClick={(event) => updateEditing(event, referral)}
                      >
                        ✏️
                      </span>
                      <span
                        className="cursor-pointer"
                        onClick={(event) =>
                          handleDeleteReferral(event, referral.id)
                        }
                      >
                        🗑️
                      </span>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
