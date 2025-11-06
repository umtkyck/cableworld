import Link from 'next/link'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'

export default function BlogPage() {
  const posts = [
    {
      slug: 'choosing-right-cable-harness',
      title: 'How to Choose the Right Cable Harness for Your Project',
      excerpt: 'Learn the key factors to consider when selecting cable harnesses for industrial, automotive, or consumer electronics applications.',
      author: 'Sarah Chen',
      date: '2024-03-15',
      category: 'Guide',
      readTime: '5 min read',
      image: '📚'
    },
    {
      slug: 'dfm-best-practices',
      title: 'Design for Manufacturing: Best Practices for Cable Harnesses',
      excerpt: 'Discover how DFM principles can reduce costs, improve quality, and speed up production of your cable assemblies.',
      author: 'Mike Rodriguez',
      date: '2024-03-10',
      category: 'Design',
      readTime: '7 min read',
      image: '⚙️'
    },
    {
      slug: 'ipc-620-compliance',
      title: 'Understanding IPC-620 Compliance for Cable Harnesses',
      excerpt: 'Everything you need to know about IPC-620 standards and why they matter for your cable harness manufacturing.',
      author: 'Emily Watson',
      date: '2024-03-05',
      category: 'Standards',
      readTime: '6 min read',
      image: '✓'
    },
    {
      slug: 'custom-cable-trends-2024',
      title: 'Top Custom Cable Trends in 2024',
      excerpt: 'Explore the latest trends in custom cable manufacturing, from USB4 to high-power charging solutions.',
      author: 'Tech Team',
      date: '2024-02-28',
      category: 'Industry',
      readTime: '4 min read',
      image: '🔮'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            CableWorld Blog
          </h1>
          <p className="text-xl sm:text-2xl text-slate-200 max-w-3xl mx-auto">
            Insights, guides, and news about cable harness manufacturing
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding">
        <div className="container-custom max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article key={post.slug} className="bg-white rounded-xl shadow-soft hover:shadow-large transition-shadow overflow-hidden group">
                {/* Image */}
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-8xl">
                  {post.image}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-xs font-semibold text-accent-green uppercase">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary-500 transition">
                    {post.title}
                  </h2>

                  <p className="text-slate-600 mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-primary-500 hover:text-primary-600 font-semibold flex items-center gap-2"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section-padding bg-slate-50">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Subscribe to our newsletter for the latest insights and updates
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
