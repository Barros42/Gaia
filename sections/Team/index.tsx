/* eslint-disable react-hooks/exhaustive-deps */
import MemberCard from '../../components/MemberCard';
import styles from './style.module.css';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { useEffect, useMemo, useState } from 'react';
import GetAllMembersUseCase from '../../use-cases/GetAllMembersUseCase';

const TeamSection = () => {
  const getAllMembersUseCase = new GetAllMembersUseCase();
  const [width, setWidth] = useState(0);
  const DEFAULT_SLIDES_INTERVAL = 3000;

  const members = useMemo(
    () => getAllMembersUseCase.run(),
    [getAllMembersUseCase],
  );

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  };

  const handleWindowResize = () => {
    const dimensions = getWindowDimensions();
    setWidth(dimensions.width);
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  });

  const getVisibleSlides = (): number => {
    const BREAKPOINTS = {
      MINI: 400,
      SMALL: 500,
      MEDIUM: 700,
      LARGE: 1200,
    };

    const ITEMS_PER_BLOCK = {
      ONE: 1,
      TWO: 2,
      THREE: 3,
      FOUR: 4,
      FIVE: 5,
      SIX: 6,
    };

    if (width <= BREAKPOINTS.MINI) {
      return ITEMS_PER_BLOCK.ONE;
    }

    if (width <= BREAKPOINTS.SMALL) {
      return ITEMS_PER_BLOCK.TWO;
    }

    if (width <= BREAKPOINTS.MEDIUM) {
      return ITEMS_PER_BLOCK.THREE;
    }

    if (width <= BREAKPOINTS.LARGE) {
      return ITEMS_PER_BLOCK.FOUR;
    }

    return ITEMS_PER_BLOCK.SIX;
  };

  return (
    <section id="team">
      <div id={styles.container}>
        <div id={styles.title}>Quem faz</div>
      </div>

      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={200}
        totalSlides={members.length}
        infinite={true}
        visibleSlides={getVisibleSlides()}
        className={styles.carousel}
        interval={DEFAULT_SLIDES_INTERVAL}
        isPlaying={true}
        isIntrinsicHeight={true}
      >
        <Slider>
          {members.map((x, i) => (
            <Slide key={i} index={i} innerClassName={styles.innerSlide}>
              <MemberCard
                profilePictureUrl={x.profilePictureUrl}
                description={x.description}
                linkedInUrl={x.linkedInUrl}
                name={x.name}
              />
            </Slide>
          ))}
        </Slider>
      </CarouselProvider>
    </section>
  );
};

export default TeamSection;
