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
    <section className="brand-section py-12">
      <div className="container mx-auto px-6">
        <Row
          className="brand-slider justify-center"
          gutter={[16, 16]}
          justify="center"
        >
          {brandLogos.map((logo, index) => (
            <Col
              key={index}
              xs={12}
              sm={8}
              md={6}
              lg={4}
              className="flex justify-center items-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="brand-logo w-full max-w-xs object-contain"
              />
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
};

export default BrandSection;
