import React, { useState, useEffect } from "react";
import { IoArrowUpCircle } from "react-icons/io5";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      // Tampilkan tombol jika scroll lebih dari 300px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // <button
    //   onClick={scrollToTop}
    //   style={{
    //     position: "fixed",
    //     bottom: "30px",
    //     right: "30px",
    //     backgroundColor: "#007bff",
    //     color: "#fff",
    //     border: "none",
    //     borderRadius: "50%",
    //     padding: "10px 15px",
    //     cursor: "pointer",
    //     display: isVisible ? "inline" : "none",
    //     zIndex: 1000,
    //   }}>
    // </button>
    <IoArrowUpCircle
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        // backgroundColor: "#007bff",
        color: "#6495ED",
        border: "none",
        fontSize: "3rem",
        // borderRadius: "50%",
        padding: "10px 15px",
        cursor: "pointer",
        display: isVisible ? "inline" : "none",
        zIndex: 1000,
      }}
    />
  );
};

export default ScrollToTop;
