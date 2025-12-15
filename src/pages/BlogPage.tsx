import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FixedSocialBar from "@/components/FixedSocialBar";
import FloatingParticles from "@/components/FloatingParticles";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "Dining Room Design Tips for 2024: Create a Space to Savor",
    excerpt: "The dining room is more than just a place to eat; it's where we gather with family and friends, celebrate special moments, and create lasting memories. In 2024, dining room design trends are focusing on creating spaces that are not only stylish but also warm and welcoming.",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=800",
    category: "Interior Design",
    date: "August 2024"
  },
  {
    id: 2,
    title: "Bathroom Design Tips for 2024: Elevate Your Space",
    excerpt: "Transform your bathroom into a spa-like retreat with these modern design tips. From minimalist fixtures to luxurious finishes, discover how to create a bathroom that combines functionality with elegance.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800",
    category: "Interior Design",
    date: "August 2024"
  },
  {
    id: 3,
    title: "Maximizing Small Spaces: Smart Interior Solutions",
    excerpt: "Living in a compact space doesn't mean compromising on style or comfort. Learn clever tricks and design strategies to make the most of every square foot in your home.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800",
    category: "Interior Design",
    date: "July 2024"
  },
  {
    id: 4,
    title: "Color Trends: Bold Palettes for Modern Homes",
    excerpt: "Explore the latest color trends that are transforming interior spaces. From earthy tones to vibrant accents, discover how to use color to create mood and personality in your rooms.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
    category: "Design Trends",
    date: "July 2024"
  },
  {
    id: 5,
    title: "The Art of Lighting: Creating Ambiance in Every Room",
    excerpt: "Good lighting can transform any space from ordinary to extraordinary. Discover layered lighting techniques and fixture choices that enhance your interior design.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800",
    category: "Interior Design",
    date: "June 2024"
  },
  {
    id: 6,
    title: "Sustainable Interior Design: Eco-Friendly Choices",
    excerpt: "Learn how to make environmentally conscious design choices without sacrificing style. From sustainable materials to energy-efficient solutions, create a beautiful home that's kind to the planet.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800",
    category: "Sustainability",
    date: "June 2024"
  }
];

const BlogPage = () => {
  return (
    <>
      <Helmet>
        <title>Blog | Cross Angle Interior - Design Tips & Inspiration</title>
        <meta
          name="description"
          content="Read the latest interior design tips, trends, and inspiration from Cross Angle Interior. Get expert advice on transforming your spaces."
        />
      </Helmet>
      <FloatingParticles count={30} />
      <main className="min-h-screen relative z-10">
        <FixedSocialBar />
        <Navbar />

        {/* Hero Section */}
        <section className="pt-32 pb-20 relative bg-gradient-to-b from-background to-accent/5">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1920')` }}
          />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Blog
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Leading Interior Designer in Jamshedpur
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {blogPosts.map((post) => (
                  <article key={post.id} className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-muted-foreground text-sm">{post.date}</span>
                      </div>
                      <h2 className="font-serif text-xl font-semibold text-foreground mb-3 hover:text-primary transition-colors cursor-pointer">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      <Button variant="outline">Read More</Button>
                    </div>
                  </article>
                ))}
              </div>

              {/* Sidebar */}
              <aside className="space-y-8">
                {/* Search */}
                <div className="bg-card p-6 rounded-xl shadow-lg">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded" />
                    Search Here
                  </h3>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                    />
                    <button className="absolute right-0 top-0 bottom-0 px-4 bg-primary text-primary-foreground rounded-r-lg">
                      Search
                    </button>
                  </div>
                </div>

                {/* Recent Posts */}
                <div className="bg-card p-6 rounded-xl shadow-lg">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded" />
                    Recent Posts
                  </h3>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 4).map((post) => (
                      <div key={post.id} className="flex gap-4 cursor-pointer group">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div>
                          <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <span className="text-xs text-muted-foreground">{post.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-card p-6 rounded-xl shadow-lg">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded" />
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {["Interior Design", "Design Trends", "Sustainability", "Tips & Tricks"].map((cat) => (
                      <div
                        key={cat}
                        className="flex items-center justify-between p-2 hover:bg-accent/50 rounded-lg cursor-pointer transition-colors"
                      >
                        <span className="text-foreground">{cat}</span>
                        <span className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded">
                          {Math.floor(Math.random() * 10) + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default BlogPage;
