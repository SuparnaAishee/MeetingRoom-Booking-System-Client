import React from "react";
import { Row, Col } from "antd";
import "../styles/custom.css";

const brandLogos = [
  {
    src: "https://res.cloudinary.com/dwelabpll/image/upload/v1725557407/technical-logo-design_1424-40_ad3bk7.avif",
    alt: "logo1",
  },
  {
    src: "https://res.cloudinary.com/dwelabpll/image/upload/v1725557214/abstract-colors-waves-logo_1043-106_qbr32r.avif",
    alt: "logo2",
  },
  {
    src: "https://res.cloudinary.com/dwelabpll/image/upload/v1725557418/technological-logo-design_1424-39_nbp2u2.avif",
    alt: "logo3",
  },
  {
    src: "https://res.cloudinary.com/dwelabpll/image/upload/v1725557870/geometrical-logo-warm-tones_1043-156_y4kdz5.avif",
    alt: "logo4",
  },
  {
    src: "https://res.cloudinary.com/dwelabpll/image/upload/v1725557932/social-network-logo-template_1071-54_pbyh24.avif",
    alt: "logo5",
  },
  {
    src: "https://res.cloudinary.com/dwelabpll/image/upload/v1725557956/search-engine-logo_1071-76_vs2ecu.avif",
    alt: "logo6",
  },
];

const BrandSection: React.FC = () => {
  return (
    <section className="brand-section">
      <Row className="brand-slider" gutter={[16, 16]}>
        {brandLogos.map((logo, index) => (
          <Col key={index} className="brand-slide">
            <img src={logo.src} alt={logo.alt} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default BrandSection;
