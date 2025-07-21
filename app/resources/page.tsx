"use client";

import { useState } from "react";
import { resources, ResourceItem } from "@/lib/resources-data";
import { Download, Lock, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [error, setError] = useState("");

  const filteredResources = resources.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownloadClick = (resource: ResourceItem) => {
    setSelectedResource(resource);
    setPasswordInput("");
    setError("");
    setShowPasswordPrompt(true);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResource) return;
    setDownloading(true);
    setError("");
    // Call the API route to validate password and proxy the file
    const res = await fetch(`/api/resources/download?title=${encodeURIComponent(selectedResource.title)}&password=${encodeURIComponent(passwordInput)}`);
    if (res.status === 200) {
      // Download the file as a blob
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = selectedResource.title + selectedResource.fileLink.substring(selectedResource.fileLink.lastIndexOf('.'));
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setShowPasswordPrompt(false);
    } else if (res.status === 401) {
      setError("Incorrect password. Please try again.");
    } else {
      setError("Failed to download file. Please try again later.");
    }
    setDownloading(false);
  };

  return (
    <div className="min-h-screen px-8 md:px-16 lg:px-24 py-12 pb-40 main-content-mobile-pb">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <h1 className="text-3xl font-bold text-primary">// Resources</h1>
          <div className="relative max-w-md w-full">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl font-mono text-sm text-primary placeholder-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
            />
          </div>
        </div>
        <div className="space-y-6">
          {filteredResources.length === 0 && (
            <p className="text-muted text-center">No resources found.</p>
          )}
          {filteredResources.map((resource, idx) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="card-minimal flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h2 className="text-lg font-bold text-accent mb-1">{resource.title}</h2>
                {resource.description && <p className="text-xs text-muted break-all">{resource.description}</p>}
              </div>
              <button
                className="btn-primary flex items-center gap-2"
                onClick={() => handleDownloadClick(resource)}
              >
                <Download size={16} /> Download
              </button>
            </motion.div>
          ))}
        </div>
        {/* Password Prompt Modal */}
        {showPasswordPrompt && selectedResource && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <form
              onSubmit={handlePasswordSubmit}
              className="bg-card p-8 rounded-xl shadow-lg flex flex-col gap-4 min-w-[320px] border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 mb-2">
                <Lock size={18} className="text-accent" />
                <span className="font-bold text-primary">Enter password to download</span>
              </div>
              <input
                type="password"
                placeholder="Password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                autoFocus
                disabled={downloading}
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowPasswordPrompt(false)}
                  disabled={downloading}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={downloading}>
                  {downloading ? "Downloading..." : "Download"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
} 