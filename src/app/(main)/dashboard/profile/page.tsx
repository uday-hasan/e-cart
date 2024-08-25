"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import React from "react";

const DashboardProfile = () => {
  const { userId } = useAuth();
  const { user } = useUser();
  return <div>User ID: {user?.fullName}</div>;
};

export default DashboardProfile;
