import Link from "next/link";
import { PageLayout } from "./components/PageLayout";
import notFoundTrout from "./assets/not_found_trout.jpg";
import Image from "next/image";

export default function NotFound() {
  return (
    <PageLayout>
      <h1 className="text-4xl py-6 text-center font-bold">Not found</h1>
      <div className="flex flex-col items-center">
        <Image
          src={notFoundTrout}
          className="rounded-md"
          alt="Trout swimming in water"
          priority
        />
      </div>

      <div className="p-8 flex flex-col items-center text-xl">
        That&apos;s awkward, this page doesn&apos;t exist.
        <Link href="/" className="mt-4">
          <button className="btn btn-sm btn-neutral">Go To Home</button>
        </Link>
      </div>
    </PageLayout>
  );
}
