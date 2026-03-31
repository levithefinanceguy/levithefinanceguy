import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "../../content/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Personal finance articles, investing insights, and wealth-building strategies from Levi The Finance Guy. Transparent and practical.",
  openGraph: {
    title: "Blog | Levi The Finance Guy",
    description:
      "Personal finance articles and investing insights. Transparent and practical.",
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const categoryColors: Record<string, string> = {
  finance: "text-accent-green",
  health: "text-blue-400",
  markets: "text-yellow-400",
  lifestyle: "text-purple-400",
};

export default function BlogPage() {
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Levi The Finance Guy Blog",
            description:
              "Personal finance articles and investing insights from Levi.",
            author: { "@type": "Person", name: "Levi" },
            url: "https://levithefinanceguy.com/blog",
          }),
        }}
      />

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="mb-12 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
            The <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-gray-400 leading-relaxed">
            Thoughts on money, investing, and building wealth.
          </p>
        </div>

        <div className="space-y-1">
          {sortedPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block py-8 border-b border-card-border hover:bg-card-bg/30 transition-all -mx-4 px-4 rounded-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs font-semibold uppercase tracking-wider ${categoryColors[post.category] || "text-gray-400"}`}>
                  {post.category}
                </span>
                <span className="text-gray-600 text-xs">&middot;</span>
                <span className="text-xs text-gray-500">{formatDate(post.date)}</span>
                <span className="text-gray-600 text-xs">&middot;</span>
                <span className="text-xs text-gray-500">{post.readingTime}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-accent-green transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-400 leading-relaxed">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
