import ProductCategory from "@/page/ProductCategory";
import { mainCategories, toCategorySlug } from "@/data/products";

export function generateStaticParams() {
  return mainCategories.map((category) => ({
    categorySlug: toCategorySlug(category),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const match = mainCategories.find(
    (category) => toCategorySlug(category) === categorySlug
  );

  return {
    title: match ?? "Products",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  return <ProductCategory categorySlug={categorySlug} />;
}
