"use client";

import { useState } from "react";
import type { CafeComment } from "@/lib/types";

type CommentForm = {
  name: string;
  title: string;
  content: string;
};

type CommentFormErrors = {
  nameError?: string;
  titleError?: string;
  contentError?: string;
};

function validateCommentForm(form: CommentForm): CommentFormErrors {
  const errors: CommentFormErrors = {};

  const name = form.name.trim();
  const title = form.title.trim();
  const content = form.content.trim();

  if (!name) errors.nameError = "Name is required.";
  else if (name.length > 50)
    errors.nameError = "Name cannot exceed 50 characters.";

  if (!title) errors.titleError = "Title is required.";
  else if (title.length > 100)
    errors.titleError = "Title cannot exceed 100 characters.";

  if (!content) errors.contentError = "Comment content is required.";

  return errors;
}

export default function CafeComments({
  initialComments,
}: {
  initialComments: CafeComment[];
}) {
  const [comments, setComments] = useState<CafeComment[]>(initialComments);
  const [form, setForm] = useState<CommentForm>({
    name: "",
    title: "",
    content: "",
  });
  const [formErrors, setFormErrors] = useState<CommentFormErrors>({
    nameError: "",
    titleError: "",
    contentError: "",
  });

  function updateForm(field: keyof CommentForm, value: string) {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  }

  function handleSubmitComment() {
    const errors = validateCommentForm(form);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const comment: CafeComment = {
      id: Date.now(),
      author: form.name || "Anonymous",
      title: form.title || "No Title",
      content: form.content,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setComments((prevComments) => [comment, ...prevComments]);
    setForm({
      name: "",
      title: "",
      content: "",
    });
    setFormErrors({});
  }
  return (
    <div>
      <section className="mt-10">
        <div className="flex items-end justify-between">
          <h3 className="text-lg font-semibold">Comments</h3>
          <div className="text-xs text-zinc-700 dark:text-zinc-400">
            {comments.length} total
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-2xl border border-amber-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-white/3"
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm">{comment.author}</strong>
                <div className="text-xs text-zinc-700 dark:text-zinc-400">
                  {comment.title}
                </div>
              </div>
              <div className="mt-2 text-sm text-zinc-800 dark:text-zinc-200">
                {comment.content}
              </div>
              <div className="mt-3 text-right text-[11px] text-zinc-600 dark:text-zinc-500">
                [{comment.date}]
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h3 className="text-lg font-semibold">Leave a Comment</h3>

        <div className="mt-4 grid gap-3 sm:grid-cols-[12rem_1fr_auto] sm:items-end">
          {/* Name + Title column */}
          <div className="flex flex-col gap-3">
            {/* Name */}
            <div className="flex flex-col">
              <p className="min-h-4 text-xs text-red-600">
                {formErrors.nameError ?? "\u00A0"}
              </p>
              <input
                placeholder="Your name"
                value={form.name}
                onChange={(e) => updateForm("name", e.target.value)}
                className={`w-full rounded-xl border bg-white/80 p-3 text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 dark:bg-white/3 dark:text-zinc-100 dark:placeholder:text-zinc-500
            ${
              formErrors.nameError
                ? "border-red-300 focus:ring-red-300/60 dark:border-red-500/40"
                : "border-amber-200/70 focus:ring-amber-300/60 dark:border-white/10 dark:focus:ring-violet-500/40"
            }`}
              />
            </div>

            {/* Title */}
            <div className="flex flex-col">
              <p className="min-h-4 text-xs text-red-600">
                {formErrors.titleError ?? "\u00A0"}
              </p>
              <input
                placeholder="Comment title"
                value={form.title}
                onChange={(e) => updateForm("title", e.target.value)}
                className={`w-full rounded-xl border bg-white/80 p-3 text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 dark:bg-white/3 dark:text-zinc-100 dark:placeholder:text-zinc-500
            ${
              formErrors.titleError
                ? "border-red-300 focus:ring-red-300/60 dark:border-red-500/40"
                : "border-amber-200/70 focus:ring-amber-300/60 dark:border-white/10 dark:focus:ring-violet-500/40"
            }`}
              />
            </div>
          </div>

          {/* Comment column */}
          <div className="flex flex-col min-w-0">
            <p className="min-h-4 text-xs text-red-600">
              {formErrors.contentError ?? "\u00A0"}
            </p>
            <textarea
              value={form.content}
              onChange={(e) => updateForm("content", e.target.value)}
              placeholder="Your comment"
              aria-label="Leave a comment"
              className={`min-h-28 w-full min-w-0 resize-y rounded-xl border bg-white/80 p-3 text-sm text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 dark:bg-white/3 dark:text-zinc-100 dark:placeholder:text-zinc-500
          ${
            formErrors.contentError
              ? "border-red-300 focus:ring-red-300/60 dark:border-red-500/40"
              : "border-amber-200/70 focus:ring-amber-300/60 dark:border-white/10 dark:focus:ring-violet-500/40"
          }`}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmitComment}
            className="w-full sm:w-auto sm:self-end rounded-xl bg-amber-600/90 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-300/60 dark:bg-violet-500/90 dark:hover:bg-violet-500 dark:focus:ring-violet-500/40"
          >
            Submit
          </button>
        </div>
      </section>
    </div>
  );
}
