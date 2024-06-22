// types/Project.ts
export interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  _createdAt: string;
  // Add other fields as needed
}
