import { Metadata } from "next";
import { PageLayout } from "../components/PageLayout";
import { createClient } from "@/prismicio";
import { PostCard } from "../components/PostCard";

export const metadata: Metadata = {
  title: "Blog | RiverRadar",
  description:
    "Explore expert flyfishing tips on RiverRadar's blog. Discover techniques, gear reviews, and advice to enhance your flyfishing adventures.",
};

export default async function Blog() {
  const client = createClient();

  const posts = await client.getAllByType("blog_post", {
    orderings: [
      { field: "my.blog_post.publication_date", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });

  return (
    <PageLayout>
      <div className="mx-4 lg:mx-24">
        <h1 className="text-4xl py-6 text-center font-bold mb-4">Blog</h1>
        <div className="flex justify-center">
          <section className="grid grid-cols-1 gap-8 max-w-3xl w-full">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
