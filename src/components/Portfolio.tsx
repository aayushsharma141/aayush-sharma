import { ArrowUpRight } from "lucide-react";
import portfolioBedroom from "@/assets/portfolio-bedroom.jpg";
import portfolioKitchen from "@/assets/portfolio-kitchen.jpg";
import portfolioOffice from "@/assets/portfolio-office.jpg";

const projects = [
  {
    image: portfolioBedroom,
    title: "Serene Master Suite",
    category: "Residential",
    description: "A calming bedroom retreat with neutral tones and natural materials",
  },
  {
    image: portfolioKitchen,
    title: "Modern Culinary Space",
    category: "Residential",
    description: "Contemporary kitchen design with marble finishes and designer fixtures",
  },
  {
    image: portfolioOffice,
    title: "Executive Workspace",
    category: "Commercial",
    description: "Professional office environment promoting creativity and productivity",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-medium tracking-wider uppercase text-sm">
            Our Work
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our portfolio of stunning interior transformations that
            showcase our commitment to excellence and attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <article
              key={index}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
                    <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
              </div>
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                {project.category}
              </span>
              <h3 className="font-serif text-xl font-semibold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground">
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
