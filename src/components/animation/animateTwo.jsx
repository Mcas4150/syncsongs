import {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import gsap from "gsap";
import "../../Animate.css";

const Circle = forwardRef(({ size, delay }, ref) => {
  const el = useRef();

  useImperativeHandle(
    ref,
    () => {
      // return our API
      return {
        moveTo(x, y) {
          gsap.to(el.current, { x, y, delay });
        },
      };
    },
    [delay]
  );

  return <div className={`circle ${size}`} ref={el}></div>;
});

function AnimateTwo() {
  const circleRefs = useRef([]);

  // reset on re-renders
  circleRefs.current = [];

  // const onEnter = ({ currentTarget }) => {
  //   gsap.to(currentTarget, { backgroundColor: "#e77614", scale: 1.2 });
  // };
  // const onLeave = ({ currentTarget }) => {
  //   gsap.to(currentTarget, { backgroundColor: "#28a92b", scale: 1 });
  // };

  useEffect(() => {
    circleRefs.current.forEach((ref) =>
      ref.moveTo(window.innerWidth / 2, window.innerHeight / 2)
    );

    const onMove = ({ clientX, clientY }) => {
      circleRefs.current.forEach((ref) => ref.moveTo(clientX, clientY));
    };

    window.addEventListener("pointermove", onMove);

    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const addCircleRef = (ref) => {
    if (ref) {
      circleRefs.current.push(ref);
    }
  };

  return (
    <div className="mousearea">
      <p>Move your mouse around</p>
      <Circle size="sm" ref={addCircleRef} delay={0} />
      <Circle size="md" ref={addCircleRef} delay={0.1} />
      <Circle size="lg" ref={addCircleRef} delay={0.2} />
    </div>
  );
}

export default AnimateTwo;
