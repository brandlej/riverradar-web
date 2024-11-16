import { PageLayout } from "@/app/components/PageLayout";

export default function RiverDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageLayout>
      <div className="mx-4 lg:mx-24">{children}</div>
    </PageLayout>
  );
}
