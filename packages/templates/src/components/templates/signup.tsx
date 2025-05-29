import React from "react";

export interface SignupTemplateProps<T> {}

export const SignupTemplate = <
  T,
>({}: SignupTemplateProps<T>): React.ReactElement => {
  return (
    <div>Hi, This will be the signup component, currently in build phase.</div>
  );
};
