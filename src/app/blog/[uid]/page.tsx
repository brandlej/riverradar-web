import { Metadata } from "next";
import { notFound } from "next/navigation";

import { SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage } from "@prismicio/next";
import { RichText } from "@/app/components/RichText";
import { PageLayout } from "@/app/components/PageLayout";

type Params = { uid: string };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  return {
    title: `${prismic.asText(page.data.title)} | RiverRadar`,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || undefined,
      images: [
        {
          url: page.data.meta_image.url || "",
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient();

  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  const { slices, title, publication_date, description, featured_image } =
    page.data;

  return (
    <PageLayout>
      <div className="mx-4 lg:mx-24">
        <section className="pt-4 flex flex-col gap-12">
          <div className="flex flex-col items-center gap-3 w-full">
            <div className="flex flex-col gap-6 items-center">
              <p className="opacity-75 border-b-2 w-min pb-1">
                {new Date(publication_date || "").toLocaleDateString()}
              </p>
              <div className="text-center">
                <RichText field={title} />
              </div>
            </div>
            <div className="my-4">
              <RichText field={description} />
            </div>
            <PrismicNextImage
              field={featured_image}
              sizes="100vw"
              className="w-full max-w-3xl max-h-96 rounded-xl object-cover"
            />
          </div>
        </section>
        <SliceZone slices={slices} components={components} />
      </div>
    </PageLayout>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("blog_post");

  // Define a path for every Document.
  return pages.map((page) => {
    return { uid: page.uid };
  });
}
