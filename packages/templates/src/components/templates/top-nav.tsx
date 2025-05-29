import React from "react";

export declare type TopNavLogoProps = {
  imgSrc: string;
  alt: string;
  onClick?: () => void;
  className?: string;
};

export declare type TopNavProps = {
  children?: React.ReactNode;
};

export declare type TopNavInterface = React.FC<TopNavProps> & {
  Logo: React.FC<TopNavLogoProps>;
};

const TopNavLogo: React.FC<TopNavLogoProps> = ({
  imgSrc,
  alt,
  onClick,
  className,
}) => {
  return (
    <div onClick={onClick} className={className}>
      <img src={imgSrc} alt={alt} />
    </div>
  );
};

const TopNav: TopNavInterface = ({ children }) => {
  return <div>{children}</div>;
};

TopNav.Logo = TopNavLogo;

export default TopNav;
