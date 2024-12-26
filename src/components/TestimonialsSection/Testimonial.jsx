const Testimonial = ({ text, author, image, title }) => {
  return (
    <div className="testimonial">
      <p className="testimonial-text">{text}</p>
      <div className="testimonial-author">
        <img src={image}/>
            <div>
                <span><b>{author}</b></span>
                <span>{title}</span>
            </div>
      </div>
    </div>
  );
}

export default Testimonial;
