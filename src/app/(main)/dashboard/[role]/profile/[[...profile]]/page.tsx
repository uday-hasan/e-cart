"use client";
import { UserProfile, useUser } from "@clerk/nextjs";
import React from "react";

const ProfilePage = ({ params: { role } }: { params: { role: string } }) => {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata.isAdmin;
  return (
    <UserProfile path={`/dashboard/${isAdmin ? "admin" : "user"}/profile`} />
  );
};

export default ProfilePage;
