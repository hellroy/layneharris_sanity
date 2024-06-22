import type { PortableTextBlock, Slug, ImageAsset } from "@sanity/types";

export interface Project {
  _id: string;
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  duration?: Date;
  coverImage?: ImageAsset;
  body: PortableTextBlock[];
}
