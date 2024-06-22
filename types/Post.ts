// types/Post.ts
export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  _createdAt: string;
  // Add other fields as needed
}
