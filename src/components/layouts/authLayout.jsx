"use client";

import { HeaderSection } from "../fragments/auth/header";
import { IllustrationSection } from "../fragments/auth/illustration";

export const AuthLayout = ({
  title,
  description,
  bgColor,
  illustrationContent,
  children,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col items-center">
        <HeaderSection title={title} description={description} />

        <div className="w-full grid md:grid-cols-2 gap-8 items-center">
          <IllustrationSection bgColor={bgColor}>
            {illustrationContent}
          </IllustrationSection>

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
