import { useEffect, useState } from "react";
import { addReferral } from "../pages/api/services/addReferral";
import { updateReferral } from "../pages/api/services/updateReferral";
import { useReferrals } from "../contexts/referralsContext";

export default function Form({ editing, disableEditing }: any) {
  const { referrals, setReferrals } = useReferrals();
  const [inputName, setInputName] = useState("");
  const [inputUser, setInputUser] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const payload = {
    id: referrals.length,
    name: inputName,
    username: inputUser,
    email: inputEmail,
    phone: inputPhone,
  };

  const isPreviewExist = referrals.find((v) => v["isPreviewField"]);

  const initFormFields = (values?: any) => {
    setInputName((values && values.name) || "");
    setInputUser((values && values.username) || "");
    setInputEmail((values && values.email) || "");
    setInputPhone((values && values.phone) || "");
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldId = e.target.id;
    const fieldValue = e.target.value;
    if (!editing.isEditing) {
      const previewField = {
        id: referrals.length,
        name: inputName,
        username: inputUser,
        email: inputEmail,
        phone: inputPhone,
        isPreviewField: true,
      };
      if (fieldId === "inputName") {
        previewField.name = fieldValue;
        setInputName(fieldValue);
      }
      if (fieldId === "inputUser") {
        previewField.username = fieldValue;
        setInputUser(fieldValue);
      }
      if (fieldId === "inputEmail") {
        previewField.email = fieldValue;
        setInputEmail(fieldValue);
      }
      if (fieldId === "inputPhone") {
        previewField.phone = fieldValue;
        setInputPhone(fieldValue);
      }

      if (isPreviewExist) {
        const updatePreview = referrals.map((item) =>
          item["isPreviewField"] === true ? previewField : item
        );
        setReferrals(updatePreview);
      } else {
        setReferrals([...referrals, previewField]);
      }

      if (
        !previewField.name &&
        !previewField.username &&
        !previewField.email &&
        !previewField.phone &&
        isPreviewExist
      )
        setReferrals(referrals.slice(0, -1));
    } else {
      if (fieldId === "inputName") setInputName(fieldValue);
      if (fieldId === "inputUser") setInputUser(fieldValue);
      if (fieldId === "inputEmail") setInputEmail(fieldValue);
      if (fieldId === "inputPhone") setInputPhone(fieldValue);
    }
  };

  const handleAddReferral = async (e: any) => {
    e.preventDefault();
    const referralsResp = await addReferral(payload);
    const referralsPromise = referralsResp.json();

    referralsPromise.then(() => {
      setReferrals([...referrals.slice(0, -1), payload]);
      initFormFields();
    });
  };

  const handleUpdateReferral = async (e: any) => {
    e.preventDefault();
    payload.id = editing.selectedId;
    const referralsResp = await updateReferral(editing.selectedId, payload);
    const referralsPromise = referralsResp.json();

    referralsPromise.then(() => {
      const updatedReferrals = referrals.map((ref) =>
        ref["id"] === editing.selectedId
          ? {
              id: editing.selectedId,
              name: inputName,
              username: inputUser,
              email: inputEmail,
              phone: inputPhone,
            }
          : ref
      );

      setReferrals(updatedReferrals);
      disableEditing();
      initFormFields();
    });
  };

  useEffect(() => {
    if (editing.isEditing) {
      const selectedReferral = referrals.find(
        (ref) => ref["id"] === editing.selectedId
      );
      initFormFields(selectedReferral);
    }
  }, [editing, referrals]);

  return (
    <div className="bg-white basis-1/2 h-max m-8 shadow-sm p-16">
      <div className="text-2xl font-bold">Referral Builder</div>
      <div className="text-gray-500 text-sm font-bold mt-6 mb-2">
        Personal Details
      </div>
      <div className="bg-gray-200 w-full h-0.5"></div>

      <form
        className="grid grid-cols-auto xl:grid-cols-2"
        onSubmit={editing.isEditing ? handleUpdateReferral : handleAddReferral}
      >
        <div className="py-4">
          <div className="text-xs text-gray-400">NAME</div>
          <div>
            <input
              id="inputName"
              value={inputName}
              className="w-11/12 h-[40px] px-2 border-2 border-gray-400 rounded-sm"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="py-4">
          <div className="text-xs text-gray-400">USERNAME</div>
          <div>
            <input
              id="inputUser"
              value={inputUser}
              className="w-11/12 h-[40px] px-2 border-2 border-gray-400 rounded-sm"
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="py-4">
          <div className="text-xs text-gray-400">EMAIL</div>
          <div>
            <input
              id="inputEmail"
              value={inputEmail}
              className="w-11/12 h-[40px] px-2 border-2 border-gray-400 rounded-sm"
              onChange={handleInputChange}
              type="email"
              required
            />
          </div>
        </div>

        <div className="py-4">
          <div className="text-xs text-gray-400">PHONE</div>
          <div>
            <input
              id="inputPhone"
              value={inputPhone}
              className="w-11/12 h-[40px] px-2 border-2 border-gray-400 rounded-sm"
              onChange={handleInputChange}
              type="tel"
              required
            />
          </div>
        </div>

        <div className="py-4"></div>

        <div className="py-4">
          <button
            type="submit"
            className="w-11/12 h-[40px] bg-green-500 rounded-sm text-white"
          >
            {editing.isEditing ? "UPDATE" : "CREATE"} REFERRAL
          </button>
        </div>
      </form>
    </div>
  );
}
