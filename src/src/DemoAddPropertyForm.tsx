import { useState } from "react";
import { AddPropertyForm } from "@/components/AddPropertyForm";

export default function DemoAddPropertyForm() {
  const [showForm, setShowForm] = useState(true);

  return (
    <div>
      {showForm && (
        <AddPropertyForm
          onClose={() => setShowForm(false)}
          onSubmit={property => alert(JSON.stringify(property, null, 2))}
        />
      )}
      {!showForm && (
        <button onClick={() => setShowForm(true)}>
          Show Add Property Form
        </button>
      )}
    </div>
  );
}
