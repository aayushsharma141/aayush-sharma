import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, MapPin, Calendar, Ruler, Clock, Palette, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const project = projects[currentIndex];
  
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Link to="/gallery">
            <Button>Back to Portfolio</Button>
          </Link>
        </div>
      </div>
    );
  }

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const relatedProjects = projects
    .filter((p) => p.id !== project.id && p.type === project.type)
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{project.title} | Crossangle Interior</title>
        <meta name="description" content={project.brief} />
      </Helmet>

      <Navbar />
      <WhatsAppButton />

      <main className="pt-24">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/gallery" className="hover:text-primary transition-colors">Portfolio</Link>
            <span>/</span>
            <span className="text-foreground">{project.title}</span>
          </nav>
        </div>

        {/* Hero Image */}
        <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="container mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-4">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-background mb-4">
                {project.title}
              </h1>
              <p className="text-background/80 text-lg md:text-xl max-w-2xl">
                {project.style} • {project.location}
              </p>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* The Brief */}
              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-primary" />
                  The Brief
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {project.brief}
                </p>
              </section>

              {/* Our Approach */}
              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-primary" />
                  Our Approach
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {project.approach}
                </p>
              </section>

              {/* Gallery */}
              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-primary" />
                  Project Gallery
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.gallery.map((item, index) => (
                    item.images.map((img, imgIndex) => (
                      <div
                        key={`${index}-${imgIndex}`}
                        className="aspect-[4/3] rounded-xl overflow-hidden"
                      >
                        <img
                          src={img}
                          alt={`${project.title} - ${item.room}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ))
                  ))}
                </div>
              </section>

              {/* Materials & Finishes */}
              <section>
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-primary" />
                  Materials & Finishes
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.materials.map((material, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-muted/30 border border-border"
                    >
                      <h4 className="font-semibold text-foreground mb-1">
                        {material.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {material.details}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Client Testimonial */}
              {project.testimonial && (
                <section className="p-8 rounded-2xl bg-primary/5 border border-primary/20">
                  <blockquote className="text-lg italic text-foreground mb-4">
                    "{project.testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold">
                        {project.testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {project.testimonial.author}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {project.testimonial.role}
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                {/* Project Details Card */}
                <div className="p-6 rounded-2xl bg-background border border-border shadow-lg">
                  <h3 className="font-semibold text-foreground mb-4">
                    Project Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs uppercase tracking-wider">Location</p>
                        <p className="text-foreground">{project.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Ruler className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs uppercase tracking-wider">Area</p>
                        <p className="text-foreground">{project.area}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs uppercase tracking-wider">Duration</p>
                        <p className="text-foreground">{project.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Palette className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs uppercase tracking-wider">Style</p>
                        <p className="text-foreground">{project.style}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs uppercase tracking-wider">Year</p>
                        <p className="text-foreground">{project.year}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">Budget Range</p>
                    <p className="text-lg font-semibold text-primary">{project.budget}</p>
                  </div>
                </div>

                {/* CTA Card */}
                <div className="p-6 rounded-2xl bg-primary text-primary-foreground">
                  <h3 className="font-semibold mb-2">Interested in Similar Design?</h3>
                  <p className="text-primary-foreground/80 text-sm mb-4">
                    Get a free consultation for your project
                  </p>
                  <Link to="/contact-us">
                    <Button
                      variant="secondary"
                      className="w-full bg-background text-foreground hover:bg-background/90"
                    >
                      Get Free Consultation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Navigation */}
        <div className="border-t border-border">
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center">
              {prevProject ? (
                <button
                  onClick={() => navigate(`/portfolio/${prevProject.slug}`)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <div className="text-left">
                    <p className="text-xs uppercase tracking-wider">Previous</p>
                    <p className="font-medium text-foreground">{prevProject.title}</p>
                  </div>
                </button>
              ) : (
                <div />
              )}

              <Link
                to="/gallery"
                className="hidden sm:block text-muted-foreground hover:text-primary transition-colors"
              >
                Back to Portfolio
              </Link>

              {nextProject ? (
                <button
                  onClick={() => navigate(`/portfolio/${nextProject.slug}`)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wider">Next</p>
                    <p className="font-medium text-foreground">{nextProject.title}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-8">
                Related Projects
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedProjects.map((rp) => (
                  <Link
                    key={rp.id}
                    to={`/portfolio/${rp.slug}`}
                    className="group"
                  >
                    <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4">
                      <img
                        src={rp.heroImage}
                        alt={rp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {rp.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{rp.location}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default ProjectPage;
