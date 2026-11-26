import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Define a route for uploading videos
  videoUploader: f({ video: { maxFileSize: "64MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      // You can add auth checks here if you want
      return { uploadedBy: "admin" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.uploadedBy);
      console.log("file url", file.url);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;