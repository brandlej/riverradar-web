import { Breadcrumbs } from "@/app/components/Breadcrumbs";
import { PageLayout } from "@/app/components/PageLayout";
import { stateAbbrDict } from "@/app/constants";
import Link from "next/link";

export default function StatesLayout({
  children,
  params: { stateAbbr },
}: {
  children: React.ReactNode;
  params: { stateAbbr: string };
}) {
  const state = stateAbbrDict[stateAbbr];

  return (
    <PageLayout>
      <div className="mx-4 lg:mx-24">
        <Breadcrumbs
          className="py-4 px-6"
          items={[{ label: "Home", url: "/" }, { label: `${state} Rivers` }]}
        />
        <div className="flex flex-col pt-8 pb-6 text-center font-bold">
          <h1 className="text-4xl">{state} Rivers</h1>
        </div>
        <div className="flex justify-center mx-4 flex-wrap">{children}</div>
      </div>
    </PageLayout>
  );
}
