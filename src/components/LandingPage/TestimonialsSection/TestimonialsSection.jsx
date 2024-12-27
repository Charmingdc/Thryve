import Testimonial from "./Testimonial";
import "./TestimonialsSection.css";
const TestimonialsSection = () => {
  return (
    <section className="testimonials-section">
      <h2 className="section-title">People loves us</h2>
      <div className="testimonials">
        <Testimonial
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor."
          author="John Doe"
          image="https://via.placeholder.com/400"
          title="Developer"
        />
        <Testimonial
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor."
          author="Jane Doe"
          image="https://via.placeholder.com/400"
          title="Designer"
        />
        <Testimonial
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor."
          author="John Smith"
          image="https://via.placeholder.com/400"
          title="CEO"
        />
      </div>
    </section>
  );
}
export default TestimonialsSection;
