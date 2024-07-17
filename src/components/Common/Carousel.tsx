import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import Logo from '../../assets/images/Logo.png';
import { Text, Flex, Image } from '@chakra-ui/react';
interface BannerProps {
  isLarge: boolean;
  title: string;
  fetchUrl: string;
  id: string;
}
const Banner: FC<BannerProps> = ({ isLarge, title, id, fetchUrl }) => {
  const [items, setItems] = useState([]);
  const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
      api_key: '886dba6c33e264d34c0abd935132f119',
      language: 'ko-KR',
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const request = await instance.get(fetchUrl);
    console.log('request', request);
    setItems(request.data.results);
  };
  return (
    <section>
      {/* <span
        onClick={() => {
          document.getElementById(item.id).scrollLeft -=
            window.innerWidth - 430;
        }}
      >
        {'<'}
      </span> */}
      <div></div>
    </section>
  );
};

export default Banner;
