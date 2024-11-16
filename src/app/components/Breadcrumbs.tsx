import Link from "next/link";
import cx from "classnames";

type LinkItem = {
  label: string;
  url: string;
};

type ActiveItem = {
  label: string;
};

type Item = LinkItem | ActiveItem;

export const Breadcrumbs = ({
  className,
  items,
}: {
  className?: string;
  items: Item[];
}) => {
  const classNames = cx("breadcrumbs", className);

  return (
    <div className={classNames}>
      <ul>
        {items.map((item: Item, index) => {
          if ("url" in item) {
            return (
              <li key={`${item.label}_${index}`}>
                <Link href={item.url}>{item.label}</Link>
              </li>
            );
          }
          return <li key={`${item.label}_${index}`}>{item.label}</li>;
        })}
      </ul>
    </div>
  );
};
