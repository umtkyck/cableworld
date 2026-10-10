import Link from 'next/link'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'

export default function BlogPage() {
  const posts = [
    {
      slug: 'choosing-right-cable-harness',
      title: 'How to Choose the Right Cable Harness for Your Project',
      excerpt:
        'Learn the key factors to consider when selecting cable harnesses for industrial, automotive, or consumer electronics applications.',
      author: 'Sarah Chen',
      date: '2024-03-15',
      category: 'Guide',
      readTime: '5 min read',
      image: '📚',
    },
    {
      slug: 'dfm-best-practices',
      title: 'Design for Manufacturing: Best Practices for Cable Harnesses',
      excerpt:
        'Discover how DFM principles can reduce costs, improve quality, and speed up production of your cable assemblies.',
      author: 'Mike Rodriguez',
      date: '2024-03-10',
      category: 'Design',
      readTime: '7 min read',
      image: '⚙️',
    },
    {
      slug: 'ipc-620-compliance',
      title: 'Understanding IPC-620 Compliance for Cable Harnesses',
      excerpt:
        'Everything you need to know about IPC-620 standards and why they matter for your cable harness manufacturing.',
      author: 'Emily Watson',
      date: '2024-03-05',
      category: 'Standards',
      readTime: '6 min read',
      image: '✓',
    },
    {
      slug: 'custom-cable-trends-2024',
      title: 'Top Custom Cable Trends in 2024',
      excerpt:
        'Explore the latest trends in custom cable manufacturing, from USB4 to high-power charging solutions.',
      author: 'Tech Team',
      date: '2024-02-28',
      category: 'Industry',
      readTime: '4 min read',
      image: '🔮',
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero */}
      <section className="section-padding bg-slate-900 text-white">
        <div className="container-custom text-center">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">Harness Cart Blog</h1>
          <p className="mx-auto max-w-3xl text-xl text-slate-200 sm:text-2xl">
            Insights, guides, and news about cable harness manufacturing
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding">
        <div className="container-custom max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft transition-shadow hover:shadow-large dark:border-slate-800 dark:bg-slate-900"
              >
                {/* Image */}
                <div className="flex aspect-video items-center justify-center bg-slate-100 text-8xl dark:bg-slate-800">
                  {post.image}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <span className="text-xs font-semibold uppercase text-accent-green">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="mb-3 text-2xl font-bold text-slate-900 transition group-hover:text-slate-600 dark:text-white dark:group-hover:text-slate-300">
                    {post.title}
                  </h2>

                  <p className="mb-4 text-slate-600 dark:text-slate-400">{post.excerpt}</p>

                  <div className="flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-2 font-semibold text-slate-900 underline underline-offset-4 hover:no-underline dark:text-white"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-slate-50 dark:bg-slate-900">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">Stay Updated</h2>
          <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
            Subscribe to our newsletter for the latest insights and updates
          </p>
          <form className="mx-auto flex max-w-xl flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-transparent focus:ring-2 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            <button type="submit" className="btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
