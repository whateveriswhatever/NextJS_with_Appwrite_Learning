"use client";

import useAuth from "@/context/useAuth";
import ProfileCard from "@/components/ProfileCard";
import React from "react";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const router = useRouter();

  const { setAuthStatus } = useAuth();

  return <></>;
};

export default LogoutPage;
