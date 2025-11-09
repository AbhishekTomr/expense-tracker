"use client";
import _ from "lodash";
import React, { useEffect, useState } from "react";

function ExpenseInsights() {
  const [insights, setInsights] = useState<string>("");
  useEffect(() => {
    fetch("/api/ai/insights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail: "imabhishek111@gmail.com" }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setInsights(data.insights ?? "");
      })
      .catch(() => {
        console.error("no user found");
      });
  }, []);
  return (
    <div className="border-2 shadow-2xl bg-white my-6 p-6 rounded-2xl text-[14px]">
      <h1 className="text-[20px] font-semibold">Insights 🤖</h1>
      {insights.length ? (
        <div dangerouslySetInnerHTML={{ __html: insights }} />
      ) : (
        <div>Generating Insights ...</div>
      )}
    </div>
  );
}

export default ExpenseInsights;
