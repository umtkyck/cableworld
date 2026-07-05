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
  },
  'dfm-best-practices': {
    title: 'Design for Manufacturing: Best Practices for Cable Harnesses',
    author: 'Mike Rodriguez',
    date: '2024-03-10',
    readTime: '7 min read',
    category: 'Design',
    content: `
      <p>Design for Manufacturing (DFM) is a critical discipline in cable harness production. Applying DFM principles early in the design phase can dramatically reduce costs, improve quality, and shorten lead times.</p>

      <h2>1. Standardize Components</h2>
      <p>Wherever possible, use standard connectors, wire gauges, and terminals. Custom components increase tooling costs and lead times, while standard parts benefit from economies of scale and proven reliability.</p>

      <h2>2. Minimize Wire Cut Lengths</h2>
      <p>Design harnesses with wire lengths that align with automated cutting equipment capabilities. Avoid unnecessarily tight length tolerances, which force manual processing and drive up cost.</p>

      <h2>3. Simplify Breakout Points</h2>
      <p>Every breakout adds assembly time. Consolidate breakouts where routing allows, and keep branch angles consistent to simplify board layouts and jig design.</p>

      <h2>4. Specify Testable Designs</h2>
      <p>Ensure every circuit can be verified with automated continuity and hipot testing. Include test points where necessary and document expected resistance values.</p>

      <h2>5. Document Clearly</h2>
      <p>Complete, unambiguous drawings with pinout tables, wire lists, and labeling specifications prevent costly back-and-forth during quoting and production.</p>

      <h2>Conclusion</h2>
      <p>DFM is a partnership between designer and manufacturer. Engage your harness supplier early — a short DFM review before finalizing a design routinely saves 10-30% on unit cost.</p>
    `
  },
  'ipc-620-compliance': {
    title: 'Understanding IPC-620 Compliance for Cable Harnesses',
    author: 'Emily Watson',
    date: '2024-03-05',
    readTime: '6 min read',
    category: 'Standards',
    content: `
      <p>IPC/WHMA-A-620 is the industry standard for the requirements and acceptance of cable and wire harness assemblies. Understanding what compliance means helps you specify quality correctly and audit suppliers effectively.</p>

      <h2>What Is IPC-620?</h2>
      <p>IPC-620 defines acceptability criteria for crimps, solder terminations, splices, connector assembly, molding, marking, and testing of cable and harness assemblies. It is jointly developed by IPC and the Wire Harness Manufacturer's Association (WHMA).</p>

      <h2>The Three Product Classes</h2>
      <p>Class 1 covers general electronic products where cosmetic imperfections are acceptable. Class 2 covers dedicated service electronics requiring extended life. Class 3 covers high-reliability products — aerospace, medical, military — where failure is not an option.</p>

      <h2>Why It Matters</h2>
      <p>Specifying the correct IPC-620 class on your drawings removes ambiguity from quality expectations. It gives inspectors objective accept/reject criteria and gives you recourse when workmanship falls short.</p>

      <h2>Certification and Training</h2>
      <p>Look for suppliers whose operators and inspectors hold current Certified IPC Specialist (CIS) credentials, and whose trainers are Certified IPC Trainers (CIT). Certification must be renewed periodically, so verify dates.</p>

      <h2>Conclusion</h2>
      <p>IPC-620 compliance is the baseline for professional harness manufacturing. Specify the class that matches your application, and verify your supplier's certification before awarding production.</p>
    `
  },
  'custom-cable-trends-2024': {
    title: 'Top Custom Cable Trends in 2024',
    author: 'Tech Team',
    date: '2024-02-28',
    readTime: '4 min read',
    category: 'Industry',
    content: `
      <p>The custom cable industry continues to evolve rapidly. Here are the trends shaping cable and harness design in 2024.</p>

      <h2>1. USB4 and Thunderbolt Adoption</h2>
      <p>With 40Gbps data rates and 240W power delivery, USB4 cables demand tighter impedance control and higher-quality shielding than previous generations. Certified e-marker chips are now standard in high-power designs.</p>

      <h2>2. High-Power EV Charging</h2>
      <p>Electric vehicle growth is driving demand for liquid-cooled charging cables and 800V-rated harness systems, with new requirements for thermal monitoring conductors integrated into the bundle.</p>

      <h2>3. Miniaturization</h2>
      <p>Wearables and compact IoT devices are pushing micro-coax and 36-40 AWG assemblies into the mainstream, requiring specialized crimping and inspection equipment.</p>

      <h2>4. Sustainable Materials</h2>
      <p>Halogen-free, recyclable jacket compounds and bio-based insulation materials are moving from niche to standard as OEMs pursue sustainability targets.</p>

      <h2>5. Digital Quoting and DFM Automation</h2>
      <p>AI-assisted quoting platforms now parse CAD drawings directly, returning manufacturability feedback and pricing in minutes instead of days — exactly what we built Harness Cart to do.</p>

      <h2>Conclusion</h2>
      <p>Staying ahead of these trends helps engineers design cables that are faster to source, cheaper to build, and ready for next-generation applications.</p>
    `
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug as keyof typeof posts]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="container-custom section-padding max-w-4xl">
        <Link href="/blog" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </Link>

        <article>
          <div className="mb-8">
            <span className="text-sm font-semibold text-accent-green uppercase mb-4 block">
              {post.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-slate-600 dark:text-slate-400">
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
            className="max-w-none text-lg leading-relaxed text-slate-700 dark:text-slate-300 [&_p]:mb-6 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 dark:[&_h2]:text-white"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
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
