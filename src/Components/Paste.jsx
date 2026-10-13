
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAllPastes } from "../Redux/PasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeAllPastes(pasteId));
  }

  function handleShare(pasteId) {
    const shareLink = `${window.location.origin}/pastes/${pasteId}`;

    navigator.clipboard
      .writeText(shareLink)
      .then(() => toast.success("Share Link Copied!"))
      .catch(() => toast.error("Unable to copy share link"));
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-indigo-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl rounded-2xl border border-purple-400/20 bg-white/5 p-6 shadow-2xl shadow-purple-900/30 backdrop-blur-xl sm:p-10">

        <h1 className="mb-2 bg-linear-to-r from-violet-400 to-indigo-400 bg-clip-text text-center text-3xl font-bold text-transparent">
          My Pastes
        </h1>

        <p className="mb-8 text-center text-slate-400">
          Search, manage, and share your saved pastes.
        </p>

        <div className="relative mb-8">
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-purple-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="11" cy="11" r="7" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16 16 4 4"
              />
            </svg>
          </span>

          <input
            className="w-full rounded-xl border border-purple-400/30 bg-slate-900/70 py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/30"
            type="search"
            placeholder="Search your pastes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-5">
          {filteredData.length > 0 ? (
            filteredData.map((paste) => {
              const createdDate = new Date(paste.createdAt);

              return (
                <div
                  key={paste._id}
                  className="rounded-xl border border-purple-400/20 bg-slate-900/60 p-5 shadow-lg transition duration-300 hover:border-purple-400/50 hover:shadow-purple-900/20"
                >
                  <h2 className="wrap-break-word text-xl font-bold text-violet-300">
                    {paste.title}
                  </h2>

                  <p className="mt-3 whitespace-pre-wrap wrap-break-word text-slate-300">
                    {paste.content}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3 border-t border-white/10 pt-4">
                    <a
                      className="rounded-lg bg-linear-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-semibold transition hover:scale-105 hover:from-violet-500 hover:to-indigo-500"
                      href={`/?pasteId=${paste._id}`}
                    >
                      Edit
                    </a>

                    <a
                      className="rounded-lg border border-indigo-400/40 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-500/20"
                      href={`/pastes/${paste._id}`}
                    >
                      View
                    </a>

                    <button
                      className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
                      onClick={() => handleDelete(paste._id)}
                    >
                      Delete
                    </button>

                    <button
                      className="rounded-lg border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/20"
                      onClick={() => {
                        navigator.clipboard
                          .writeText(paste.content)
                          .then(() => toast.success("Copied To Clipboard"))
                          .catch(() => toast.error("Unable to copy content"));
                      }}
                    >
                      Copy
                    </button>

                    <button
                      className="rounded-lg border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-300 transition hover:bg-purple-500/20"
                      onClick={() => handleShare(paste._id)}
                    >
                      Share
                    </button>
                  </div>

                  {/* Calendar-style date and time */}
                  <div className="mt-5 flex items-center gap-3 rounded-xl border border-purple-400/20 bg-slate-950/60 p-3">
                    <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-linear-to-br from-violet-600 to-indigo-600 shadow-lg shadow-purple-900/30">
                      <span className="text-xs font-medium uppercase text-purple-100">
                        {createdDate.toLocaleDateString("en-US", {
                          month: "short",
                        })}
                      </span>

                      <span className="text-xl font-bold leading-tight text-white">
                        {createdDate.getDate()}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-purple-200">
                        Created on
                      </p>

                      <p className="text-sm text-slate-300">
                        {createdDate.toLocaleDateString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                        })}
                      </p>

                      <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                        <span>◷</span>
                        {createdDate.toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-xl border border-purple-400/20 bg-white/5 px-4 py-12 text-center">
              <p className="text-lg font-semibold text-slate-300">
                {searchTerm ? "No matching pastes found" : "No pastes yet"}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                {searchTerm
                  ? "Try searching with another title."
                  : "Create your first paste from the Home page."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;