import { useState } from "react";
import Form from "../components/form";
import List from "../components/list";

export interface IEdit {
  isEditing: boolean;
  selectedId?: number;
}

export default function Home() {
  const [editing, setEditing] = useState<IEdit>({
    isEditing: false,
    selectedId: 0,
  });

  const updateEditing = (e: any, referral: any) => {
    e.preventDefault();
    setEditing({ isEditing: true, selectedId: referral.id });
  };

  const disableEditing = () => setEditing({ isEditing: false });

  return (
    <main className="flex flex-col xl:flex-row">
      <Form editing={editing} disableEditing={disableEditing} />
      <List updateEditing={updateEditing} />
    </main>
  );
}
