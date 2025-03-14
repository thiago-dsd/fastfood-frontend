"use client";

import { useEffect } from "react";

const requireAuth = () => {
  const loggedIn = document.cookie.includes("session_token=");

  if (!loggedIn) {
    window.location.href = "/login";
  }
};

export const AuthPageInvisible = () => {
  useEffect(() => {
    requireAuth();
  }, []);

  return <></>;
};
