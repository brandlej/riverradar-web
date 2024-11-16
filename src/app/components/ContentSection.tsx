import cx from "classnames";

export const ContentSection = ({
  id,
  className,
  vertical = false,
  children,
  style,
}: {
  id?: string;
  className?: string;
  vertical?: boolean;
  children: React.ReactNode;
  style?: {
    [key: string]: string;
  };
}) => {
  const classNames = cx(
    "flex items-center",
    vertical && "flex-col justify-center",
    className
  );

  return (
    <div id={id} className={classNames} style={style}>
      {children}
    </div>
  );
};
