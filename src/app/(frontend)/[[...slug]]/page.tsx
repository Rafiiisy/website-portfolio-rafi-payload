import { notFound } from "next/navigation";

import { RenderBlocks } from "@/blocks/render-blocks";
import { getPayloadFind } from "@/utilities/get-payload-find";
import { getPayloadGlobal } from "@/utilities/get-payload-global";

import type { Metadata } from "next";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    slug?: string[];
  }>;
};

async function queryPage(slug?: string[]) {
  const isHomepage = !slug || slug.length === 0;
  const where = isHomepage
    ? { isHomepage: { equals: true } }
    : {
        and: [
          { isHomepage: { equals: false } },
          { url: { equals: `/${slug.join("/")}` } },
        ],
      };

  const pages = await getPayloadFind({
    collection: "pages",
    depth: 2,
    limit: 1,
    where,
  });

  if (!pages.docs.length) {
    notFound();
  }

  return pages.docs[0] as unknown as Record<string, unknown>;
}

export default async function Page({ params }: PageProps) {
  const pageParams = await params;
  const page = await queryPage(pageParams.slug);

  return <RenderBlocks blocks={page.layout as never} />;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const pageParams = await params;
  const page = await queryPage(pageParams.slug);
  const meta = (page.meta || {}) as Record<string, string>;
  const settings = (await getPayloadGlobal({ slug: "settings", depth: 0 })) as unknown as Record<
    string,
    unknown
  >;
  const defaultMeta = (settings.defaultMeta || {}) as Record<string, string>;

  return {
    title: String(meta.title || page.title || defaultMeta.title || settings.siteName || ""),
    description: meta.description || defaultMeta.description || undefined,
  };
}
