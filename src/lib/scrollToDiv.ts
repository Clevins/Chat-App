const scrollToDiv = (divRef: React.MutableRefObject<HTMLDivElement | null>) => {
  if (divRef.current) {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }
};

export default scrollToDiv;
