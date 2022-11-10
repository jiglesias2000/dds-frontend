import React from "react";

export default function Loading() {
  return (
    <div
      style={{
        position: "absolute",
        transform: "translate(-50%, -50%)",
        top: "50%",
        left: "50%",
        zIndex: 100,
      }}
    >
      <div
        className="spinner-border spinner-border-xl align-center text-info"
        style={{ width: "5rem", height: "5rem" }}
      ></div>
    </div>
  );
}
