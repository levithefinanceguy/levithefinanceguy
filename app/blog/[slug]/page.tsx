import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../../../content/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title} | Levi The Finance Guy`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderInline(text: string) {
  // Parse **bold**, [links](url)
  const parts: (string | React.ReactElement)[] = [];
  const regex = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1]) {
      // **bold**
      parts.push(<strong key={match.index} className="text-white font-semibold">{match[1]}</strong>);
    } else if (match[2] && match[3]) {
      // [text](url)
      parts.push(
        <a key={match.index} href={match[3]} target="_blank" rel="noopener noreferrer" className="text-accent-green hover:underline">
          {match[2]}
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: { type: string; content: string }[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("## ")) {
      elements.push({ type: "h2", content: trimmed.slice(3) });
    } else if (trimmed.startsWith("### ")) {
      elements.push({ type: "h3", content: trimmed.slice(4) });
    } else {
      elements.push({ type: "p", content: trimmed });
    }
  }

  return elements.map((el, i) => {
    if (el.type === "h2")
      return (
        <h2 key={i} className="text-2xl font-bold text-white mt-10 mb-4">
          {renderInline(el.content)}
        </h2>
      );
    if (el.type === "h3")
      return (
        <h3 key={i} className="text-xl font-semibold text-white mt-8 mb-3">
          {renderInline(el.content)}
        </h3>
      );
    return (
      <p key={i} className="text-gray-400 leading-[1.85] mb-5">
        {renderInline(el.content)}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: { "@type": "Person", name: post.author },
            publisher: {
              "@type": "Organization",
              name: "Levi The Finance Guy",
            },
          }),
        }}
      />

      <article className="max-w-2xl mx-auto px-4 py-16 animate-fade-in-up">
        <Link
          href="/blog"
          className="text-sm text-gray-500 hover:text-accent-green transition-colors mb-8 inline-block"
        >
          &larr; Back to Blog
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-green">
              {post.category}
            </span>
            <span className="text-gray-600 text-xs">&middot;</span>
            <span className="text-xs text-gray-500">{post.readingTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>By {post.author}</span>
            <span>&middot;</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
        </header>

        <div className="prose-custom">{renderContent(post.content)}</div>

        {post.content.includes("amzn.to") || post.content.includes("join.robinhood") || post.content.includes("crypto.com/app") ? (
          <p className="text-[10px] text-gray-600 mt-8">
            This article contains affiliate links. If you purchase through them, I may earn a small commission at no extra cost to you.
          </p>
        ) : null}

        <div className="mt-16 pt-8 border-t border-card-border">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-sm text-gray-500">Written by</p>
              <p className="font-semibold">Levi</p>
            </div>
            <Link
              href="/blog"
              className="px-6 py-2 border border-card-border rounded-lg text-sm hover:border-accent-green/50 transition-all"
            >
              More Articles
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
