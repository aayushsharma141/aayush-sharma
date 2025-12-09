import { ArrowUpRight, Eye } from "lucide-react";
import portfolioBedroom from "@/assets/portfolio-bedroom.jpg";
import portfolioKitchen from "@/assets/portfolio-kitchen.jpg";
import portfolioOffice from "@/assets/portfolio-office.jpg";

const projects = [
  {
    image: portfolioBedroom,
    title: "Serene Master Suite",
    category: "Residential",
    description: "A calming bedroom retreat with neutral tones and natural materials",
    year: "2024",
  },
  {
    image: portfolioKitchen,
    title: "Modern Culinary Space",
    category: "Residential",
    description: "Contemporary kitchen design with marble finishes and designer fixtures",
    year: "2024",
  },
  {
    image: portfolioOffice,
    title: "Executive Workspace",
    category: "Commercial",
    description: "Professional office environment promoting creativity and productivity",
    year: "2023",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-32 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 border border-primary/10 rounded-full" />
      <div className="absolute bottom-20 right-20 w-48 h-48 border border-primary/10 rounded-full" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="inline-block text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4 border-b-2 border-primary pb-2">
              Our Work
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Explore our portfolio of stunning interior transformations that
              showcase our commitment to excellence and attention to detail.
            </p>
          </div>
          <button className="group flex items-center gap-3 text-primary font-medium hover:gap-4 transition-all duration-300">
            View All Projects 
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <article
              key={index}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* View Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                    <Eye className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>

                {/* Year Badge */}
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.year}
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <span className="bg-primary text-primary-foreground text-xs font-medium uppercase tracking-wider px-3 py-1.5 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="px-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-px bg-primary" />
                  <span className="text-primary text-sm font-medium uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-muted-foreground mb-6">Want to see more of our work?</p>
          <button className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-1">
            Explore Full Portfolio
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
