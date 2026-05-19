import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Softer animation values on mobile for a smoother, less dramatic effect
  const scaleDimensions = () => {
    return isMobile ? [0.85, 0.98] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], isMobile ? [8, 0] : [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], isMobile ? [0, -40] : [0, -100]);

  return (
    <div
      className="h-[50rem] md:h-[80rem] flex items-center justify-center relative px-1 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-6 md:py-40 w-full relative"
        style={{
          perspective: isMobile ? "600px" : "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl -mt-8 md:-mt-12 mx-auto h-[25rem] md:h-[40rem] w-full border-2 md:border-4 border-[#6C6C6C] p-1 md:p-6 bg-[#222222] rounded-[20px] md:rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-xl md:rounded-2xl bg-gray-100 dark:bg-zinc-900 md:p-4">
        {children}
      </div>
    </motion.div>
  );
};
