import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does an interior design project typically take?",
    answer:
      "Project timelines vary based on scope and complexity. A single room redesign typically takes 4-6 weeks, while a full home renovation can take 3-6 months. We provide detailed timelines during our initial consultation.",
  },
  {
    question: "What is included in your design consultation?",
    answer:
      "Our initial consultation includes a thorough assessment of your space, discussion of your style preferences and functional needs, preliminary design concepts, and a detailed project proposal with budget estimates.",
  },
  {
    question: "Do you work with existing furniture or only new pieces?",
    answer:
      "We're flexible! We can incorporate your existing furniture and sentimental pieces into the new design, source all new furnishings, or create a blend of both to achieve your vision while respecting your budget.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We primarily serve Jamshedpur and Kolkata, but we're open to projects across India. For remote locations, we offer virtual design consultations and collaborate with local contractors for implementation.",
  },
  {
    question: "How do you handle project budgets?",
    answer:
      "We work within your budget constraints while maximizing value. During consultation, we discuss your budget range and provide transparent cost breakdowns. We offer solutions across various price points without compromising on quality.",
  },
  {
    question: "Can I be involved in the design process?",
    answer:
      "Absolutely! We believe in collaborative design. You'll be involved in every major decision, from concept approval to material selection. We provide regular updates and seek your feedback throughout the project.",
  },
  {
    question: "Do you provide 3D visualizations?",
    answer:
      "Yes, we create detailed 3D renderings and walkthroughs so you can visualize the final result before implementation. This helps ensure the design meets your expectations and reduces surprises.",
  },
  {
    question: "What happens after the design is complete?",
    answer:
      "We oversee the entire implementation process, coordinating with contractors, managing deliveries, and ensuring quality. We also offer post-project support for any adjustments and maintenance guidance.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <span className="text-primary font-medium tracking-wider uppercase text-sm">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Find answers to common questions about our interior design services
            and process.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-lg px-6 data-[state=open]:shadow-lg transition-shadow"
            >
              <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
