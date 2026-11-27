"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { unstable_noStore as noStore } from "next/cache";

export default function AdminContent() {
  const [videoUrl, setVideoUrl] = useState("");
  const [reviews, setReviews] = useState("");
  const [pendingReviews, setPendingReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/content").then((res) => res.json()),
      fetch("/api/reviews/pending").then((res) => res.json())
    ]).then(([contentData, pendingData]) => {
      if (contentData.videoUrl) setVideoUrl(contentData.videoUrl);
      if (contentData.reviewsJson) setReviews(JSON.stringify(contentData.reviewsJson, null, 2));
      if (Array.isArray(pendingData)) setPendingReviews(pendingData);
      setIsLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoUrl,
          reviewsJson: JSON.parse(reviews || "[]"),
        }),
      });
      alert("Content updated successfully!");
    } catch (err) {
      alert("Error saving content. Check your JSON format.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleApproveReview = async (review: any) => {
    try {
      const currentReviews = JSON.parse(reviews || "[]");
      const newReview = { name: review.name, location: review.location, rating: review.rating, text: review.text };
      const updatedReviews = [...currentReviews, newReview];
      
      await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoUrl,
          reviewsJson: updatedReviews,
        }),
      });

      await fetch(`/api/reviews/${review.id}`, { method: "DELETE" });
      
      setReviews(JSON.stringify(updatedReviews, null, 2));
      setPendingReviews(pendingReviews.filter(r => r.id !== review.id));
      alert("Review approved and added to homepage!");
    } catch (err) {
      alert("Error approving review.");
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      setPendingReviews(pendingReviews.filter(r => r.id !== id));
    } catch (err) {
      alert("Error deleting review.");
    }
  };

  if (isLoading) return <div className="text-center py-32 text-brand-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-brand-white dark:bg-brand-black p-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-brand-black dark:text-brand-white">Content Management</h1>
          <button onClick={() => router.push("/admin/bookings")} className="text-brand-burgundy font-bold">Back to Bookings</button>
        </div>

        <div className="space-y-8 bg-gray-50 dark:bg-brand-charcoal p-8 rounded-sm border border-gray-200 dark:border-brand-black">
          
          <div>
            <label className="block text-sm font-bold text-brand-black dark:text-brand-white mb-2">Homepage Video</label>
            <p className="text-xs text-gray-500 mb-4">Upload a video directly from your device.</p>
            
            {videoUrl ? (
              <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-sm">
                <p className="text-green-600 dark:text-green-500 text-sm font-bold">Video uploaded successfully!</p>
                <p className="text-xs text-gray-500 mt-1 truncate">{videoUrl}</p>
                <button onClick={() => setVideoUrl("")} className="text-red-500 text-xs font-bold mt-2 hover:underline">Remove Video</button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 dark:border-brand-gray/30 rounded-sm p-8 text-center bg-white dark:bg-brand-black">
                <UploadButton<OurFileRouter, "videoUploader">
                  endpoint="videoUploader"
                  onClientUploadComplete={(res) => {
                    if (res && res[0]) {
                      setVideoUrl(res[0].url);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                  appearance={{
                    button: "bg-brand-burgundy text-brand-white px-6 py-2 rounded-sm font-bold text-sm hover:bg-brand-burgundy/80",
                    allowedContent: "text-gray-500 text-xs"
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-brand-black dark:text-brand-white mb-2">Active Reviews (JSON)</label>
            <textarea 
              rows={10}
              className="w-full bg-white dark:bg-brand-black border border-gray-300 dark:border-brand-gray/30 rounded-sm px-4 py-3 text-brand-black dark:text-brand-white font-mono text-sm"
              value={reviews}
              onChange={(e) => setReviews(e.target.value)}
            />
          </div>

          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-brand-burgundy text-brand-white font-bold uppercase tracking-wider py-4 rounded-sm hover:bg-brand-burgundy/80 transition-colors disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Content Changes"}
          </button>
        </div>

        {/* Pending Reviews Section */}
        <div className="mt-12 bg-gray-50 dark:bg-brand-charcoal p-8 rounded-sm border border-gray-200 dark:border-brand-black">
          <h2 className="text-2xl font-serif font-bold text-brand-black dark:text-brand-white mb-6">Pending Customer Reviews</h2>
          {pendingReviews.length === 0 ? (
            <p className="text-gray-500">No pending reviews.</p>
          ) : (
            <div className="space-y-4">
              {pendingReviews.map((review) => (
                <div key={review.id} className="bg-white dark:bg-brand-black p-4 border border-gray-200 dark:border-brand-gray/30 rounded-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-brand-black dark:text-brand-white">{review.name} <span className="text-gray-500 text-sm font-normal">({review.location || "Unknown"})</span></p>
                      <div className="flex gap-1 mt-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-brand-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleApproveReview(review)} className="bg-green-600 text-white px-4 py-2 text-xs font-bold uppercase rounded-sm hover:bg-green-700">Approve</button>
                      <button onClick={() => handleDeleteReview(review.id)} className="bg-red-600 text-white px-4 py-2 text-xs font-bold uppercase rounded-sm hover:bg-red-700">Delete</button>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-brand-gray text-sm italic mt-2">"{review.text}"</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}