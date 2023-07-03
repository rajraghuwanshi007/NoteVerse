import React, { useContext } from "react";
import NoteContext from "../Context/notes/NoteContext";
export default function Alert() {
  const context = useContext(NoteContext);
  const { alert, loading } = context;
  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    !loading && (
      <div style={{ height: "50px" }}>
        {alert && (
          <div
            className={`alert alert-${alert.type} alert-dismissible fade show`}
            role="alert"
          >
            <strong>{capitalize(alert.type)} </strong>
            {alert.msg}
          </div>
        )}
      </div>
    )
  );
}
