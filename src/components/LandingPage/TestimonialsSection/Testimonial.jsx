const Testimonial = ({ text, author, image, title }) => {
  return (
    <div className="testimonial">
      <p className="testimonial-text">{text}</p>
      <div className="testimonial-author">
        <img src={image} alt={`${author}'s avatar`} />
        <div style={{ marginLeft: "10px", display: "flex", flexDirection: "column" }}>
          <span><b>{author}</b></span>
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
