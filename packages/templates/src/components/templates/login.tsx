import React from "react";

export interface LoginTemplateProps<T> {
  onSubmit?: (data: T) => void;
}

export const LoginTemplate = <
  T,
>({}: LoginTemplateProps<T>): React.ReactElement => {
  return <div>Hi, This will be the component, currently in build phase.</div>;
};
