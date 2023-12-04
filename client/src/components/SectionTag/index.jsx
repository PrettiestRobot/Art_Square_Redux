import "./SectionTag.css";

const SectionTag = ({ tagName }) => {
  return (
    <div className="section-tag-container">
      <div className="section-tag">{tagName}</div>
    </div>
  );
};

export default SectionTag;
