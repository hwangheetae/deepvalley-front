import { FC, useEffect, useState } from 'react';
import Logo from '../../assets/images/Logo.png';
import './Carousel.css'; // CSS 파일을 임포트
interface CarouselProps {
  isLarge?: boolean;
  title: string;
  fetchUrl: string;
  id: string;
}
const Carousel: FC<CarouselProps> = ({ isLarge, title, id, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  return (
    <section className="banner">
      <h2 className="banner__title">{title}</h2>
      <div className="banner__container">
        <div className="banner__arrow-left">
          <span
            onClick={() =>
              (document.getElementById(id)!.scrollLeft -=
                window.innerWidth - 80)
            }
            className="arrow"
          >
            {'<'}
          </span>
        </div>

        <div id={id} className="banner__slider">
          <img className="banner__image" src={Logo} alt="1" />
          <img className="banner__image" src={Logo} alt="2" />
          <img className="banner__image" src={Logo} alt="3" />
          <img className="banner__image" src={Logo} alt="4" />
          <img className="banner__image" src={Logo} alt="5" />
        </div>

        <div className="banner__arrow-right">
          <span
            onClick={() =>
              (document.getElementById(id)!.scrollLeft +=
                window.innerWidth - 80)
            }
            className="arrow"
          >
            {'>'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
