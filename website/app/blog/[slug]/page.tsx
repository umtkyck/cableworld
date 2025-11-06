import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react'

// Blog post data (in real app, fetch from CMS/API)
const posts = {
  'choosing-right-cable-harness': {
    title: 'How to Choose the Right Cable Harness for Your Project',
    author: 'Sarah Chen',
    date: '2024-03-15',
    readTime: '5 min read',
    category: 'Guide',
    content: `
      <p>Choosing the right cable harness for your project is crucial for ensuring reliability, performance, and cost-effectiveness. In this comprehensive guide, we'll walk you through the key considerations.</p>

      <h2>1. Application Requirements</h2>
      <p>Start by understanding your specific application needs. Consider the environment where the cable harness will operate, including temperature ranges, exposure to chemicals or moisture, and mechanical stress.</p>

      <h2>2. Electrical Specifications</h2>
      <p>Determine the voltage and current requirements for your application. This will influence conductor size, insulation type, and overall cable design.</p>

      <h2>3. Connector Types</h2>
      <p>Select appropriate connectors based on your mating requirements, environmental sealing needs, and ease of assembly.</p>

      <h2>4. Cable Routing and Length</h2>
      <p>Plan the physical routing of your cable harness carefully. Consider bending radii, strain relief points, and overall cable management.</p>

      <h2>Conclusion</h2>
      <p>By carefully considering these factors, you can select a cable harness that meets your project's technical and budgetary requirements.</p>
    `
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug as keyof typeof posts]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom section-padding max-w-4xl">
        <Link href="/blog" className="flex items-center gap-2 text-slate-600 hover:text-primary-500 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </Link>

        <article>
          <div className="mb-8">
            <span className="text-sm font-semibold text-accent-green uppercase mb-4 block">
              {post.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-slate-600">
              <span className="flex items-center gap-2">
                <User className="w-5 h-5" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {new Date(post.date).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {post.readTime}
              </span>
            </div>
          </div>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 pt-8 border-t">
            <Link href="/blog" className="btn-primary">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to All Posts
            </Link>
          </div>
        </article>
      </div>
    </div>
  )
}
