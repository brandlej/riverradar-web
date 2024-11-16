import cx from "classnames";

export const PageLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const classNames = cx("min-h-screen container mx-auto bg-white", className);

  return <div className={classNames}>{children}</div>;
};
