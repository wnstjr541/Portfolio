import {
  AspectRatio,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Heading,
  HStack,
  Image,
  Img,
  Link,
  ListItem,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Mousewheel,
  FreeMode,
} from "swiper/modules";

import ellipseBg from "../assets/img/ellipse_bg.png";
import ellipseAllow from "../assets/img/ellipse_allow.png";
import workBar from "../assets/img/work_bar.png";
import darkStar from "../assets/img/dark_star.png";

import schoolWork from "../assets/img/school_work.png";
import adminPage from "../assets/img/admin.png";
import kobacoWork from "../assets/img/kobaco_work.png";
import JigyeongWork from "../assets/img/Jigyeong_work.png";
import calculatingWork from "../assets/img/calculating_work.png";
import metaRex from "../assets/img/metaREX.png";
import climateWork from "../assets/img/climate_work.png";
import redcrossWork from "../assets/img/redcross_work.png";

import progressLabel from "../assets/img/progress_label.png";
import mainBgVideo from "../assets/video/main_bg.mp4";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CreateScene from "./organisme/CreateScene";
import { Canvas } from "@react-three/fiber";

// ScrollTrigger를 GSAP에 등록
gsap.registerPlugin(ScrollTrigger);

const Main = () => {
  const lineRef = useRef(null); // useRef 훅으로 DOM 요소를 참조합니다.

  useEffect(() => {
    function startAnimation() {
      gsap.to(lineRef.current, {
        top: "-0.6rem",
        repeat: -1,
        duration: 1.3,
        ease: "power2.inOut",
      });
    }

    startAnimation();

    return () => {
      gsap.killTweensOf(lineRef.current);
    };
  }, []);

  const skillList = [
    "html",
    "css",
    "jquery",
    "javaScript",
    "chakra-ui",
    "react",
    "SCSS",
    "gasp",
    "gulp",
    // "typeScript",
  ];
  const projectList = [
    [
      {
        projectName: "학교체육포털",
        projectSrc: schoolWork,
        projectStack: "UI/UX, Website, Development, Maintenance",
        projectLink: "https://cspep.or.kr/web/main/main",
      },
      {
        projectName: "법무법인 지경",
        projectSrc: JigyeongWork,
        projectStack: "UI/UX, Website, Development, Maintenance",
        projectLink: "https://www.jklawfirm.co.kr/",
      },
    ],
    [
      {
        projectName: "e-기후변화교육센터",
        projectSrc: climateWork,
        projectStack: "UI/UX, Website, Maintenance",
        projectLink: "https://educenter.kcen.kr/",
      },
      {
        projectName: "적십자",
        projectSrc: redcrossWork,
        projectStack: "UI/UX, Website, Maintenance",
        projectLink: "https://www.rch.or.kr/web/rchseoul/main/",
      },
    ],
    [
      {
        projectName: "탄소발자국 계산기",
        projectSrc: calculatingWork,
        projectStack: "UI/UX, Website, Development, Maintenance",
        projectLink: "https://www.kcen.kr/tanso/intro.green",
      },
      {
        projectName: "코바코 ",
        projectSrc: kobacoWork,
        projectStack: "UI/UX, Website, Development, Maintenance",
        projectLink: "https://www.kobaco.co.kr/",
      },
    ],
    [
      {
        projectName: "메타렉스",
        projectSrc: metaRex,
        projectStack: "UI/UX, Website, Development, Maintenance",
        projectLink: "https://metarex.global/map",
      },
      {
        projectName: "관리자, 미출시 페이지",
        projectSrc: adminPage,
        projectStack: "UI/UX, Website, Development, Maintenance",
        projectLink: "#",
      },
    ],
  ];

  const [parentSwiper, setParentSwiper] = useState(null); // 부모 스와이퍼 상태 관리
  const [childSwiper, setChildSwiper] = useState(null); // 자식 스와이퍼 상태 관리
  const [workChildSwiper, setWorkChildSwiper] = useState(null); // 자식 스와이퍼 상태 관리
  const delay = 500; // 지연 시간 (500ms)
  const parentSwiperRef = useRef(null);
  const childSwiperRef = useRef(null);
  const workChildSwiperRef = useRef(null);

  // work 첫 페이지
  const vStackWorkRef = useRef(null);
  const myRef = useRef(null);
  const worksRef = useRef(null);

  // child swiper
  useEffect(() => {
    if (!parentSwiper || !childSwiper || !childSwiper.el) return;

    const handleIntroduceWheel = (event) => {
      if (childSwiper.isEnd && event.deltaY > 0) {
        setTimeout(() => {
          parentSwiper.mousewheel.enable();
        }, delay);

        const tl = gsap.timeline();

        tl.to(vStackWorkRef.current, {
          backgroundColor: "#000",
          duration: 3,
        });

        tl.fromTo(
          myRef.current,
          { x: 500, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
          0
        );

        tl.fromTo(
          worksRef.current,
          { x: -500, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
          0
        );
      } else if (childSwiper.isBeginning && event.deltaY < 0) {
        setTimeout(() => {
          parentSwiper.mousewheel.enable();
        }, delay);
      } else {
        parentSwiper.mousewheel.disable();
      }
    };

    childSwiper.el.addEventListener("wheel", handleIntroduceWheel);

    return () => {
      if (childSwiper.el) {
        childSwiper.el.removeEventListener("wheel", handleIntroduceWheel);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, [parentSwiper, childSwiper]);

  // work
  const [direction, setDirection] = useState("horizontal");

  const updateDirection = () => {
    if (window.innerWidth < 768) {
      setDirection("vertical");
    } else {
      setDirection("horizontal");
    }
  };

  useEffect(() => {
    updateDirection();
    window.addEventListener("resize", updateDirection);
    return () => {
      window.removeEventListener("resize", updateDirection);
    };
  }, []);

  useEffect(() => {
    if (!parentSwiper || !workChildSwiper || !workChildSwiper.el) return;

    const handleWorkWheel = (event) => {
      if (workChildSwiper.isEnd && event.deltaY > 0) {
        // 자식 스와이퍼가 끝에 도달했을 때 지연 후 부모 스와이퍼로 스크롤 넘김
        setTimeout(() => {
          parentSwiper.mousewheel.enable();
        }, delay);

        const tl = gsap.timeline();

        tl.to(vStackWorkRef.current, {
          backgroundColor: "#00000",
          duration: 2,
        });
        tl.fromTo(
          myRef.current,
          { x: 500, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
          0
        );
        tl.fromTo(
          worksRef.current,
          { x: -500, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
          0
        );
      } else if (workChildSwiper.isBeginning && event.deltaY < 0) {
        setTimeout(() => {
          parentSwiper.mousewheel.enable();
        }, delay);
      } else {
        parentSwiper.mousewheel.disable();
      }
    };

    workChildSwiper.el.addEventListener("wheel", handleWorkWheel);

    return () => {
      // 컴포넌트 언마운트 시 이벤트리스너 제거
      if (workChildSwiper.el) {
        workChildSwiper.el.removeEventListener("wheel", handleWorkWheel);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, [parentSwiper, workChildSwiper]);

  const handleWorksClick = () => {
    const tl = gsap.timeline();

    tl.to(vStackWorkRef.current, {
      backgroundColor: "#000", // 어두운 색
      duration: 2,
    });

    tl.fromTo(
      myRef.current,
      { x: 500, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
      0
    );

    tl.fromTo(
      worksRef.current,
      { x: -500, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
      0
    );

    parentSwiper.slideTo(3);
  };

  // footer
  const footerTextRef = useRef(null);

  useEffect(() => {
    const containerWidth = footerTextRef.current.offsetWidth;

    // 애니메이션 설정
    gsap.to(footerTextRef.current, {
      x: `-${containerWidth / 2}`, // 텍스트가 반만 이동하도록 설정
      duration: 14, // 애니메이션 속도
      ease: "linear", // 일정한 속도로 움직임
      repeat: -1, // 무한 반복
      modifiers: {
        x: (x) => `${parseFloat(x) % (containerWidth / 2)}px`, // 텍스트가 자연스럽게 이어지도록 설정
      },
    });
  }, []);

  // progress bar
  const [progress, setProgress] = useState(0);

  const totalSlides = 5; // 실제 슬라이드 개수

  const handleSlideChange = (swiper) => {
    const currentSlide = swiper.realIndex; // 실제 슬라이드 인덱스
    const newProgress = (currentSlide / (totalSlides - 1)) * 100;
    setProgress(newProgress);
  };

  // 첫 번째 슬라이드로 이동하는 함수
  const goToFirstSlide = () => {
    parentSwiper.slideTo(0); // 첫 번째 페이지로 이동
  };

  const [isFlipped, setIsFlipped] = useState(
    projectList.map((group) => group.map(() => false))
  );

  // 특정 SwiperSlide의 특정 카드 flip 상태를 변경하는 함수 slideIndex는 부모 key, cardIndex 는 자식 key
  const handleFlip = (slideIndex, cardIndex, value) => {
    setIsFlipped((prev) => {
      const newState = prev.map((group, i) =>
        i === slideIndex
          ? group.map((flipped, j) => (j === cardIndex ? value : flipped))
          : group
      );
      return newState;
    });
  };

  return (
    <Container w="100vw" overflow={"hidden"} pos={"relative"} margin={0}>
      {/* header */}
      <HStack
        spacing={"5.8rem"}
        pos={"absolute"}
        top={"4.3rem"}
        right={"4rem"}
        zIndex={"10"}
      >
        <Link
          onClick={() => parentSwiper.slideTo(1)}
          _hover={{ textDecoration: "underline" }}
        >
          <Text
            fontSize={"2rem"}
            fontWeight={"bold"}
            fontFamily={"Helvetica75"}
            lineHeight={"140%"}
            cursor="pointer"
          >
            INTRODUCE
          </Text>
        </Link>
        <Link
          onClick={() => handleWorksClick()}
          _hover={{ textDecoration: "underline" }}
        >
          <Text
            cursor="pointer"
            fontSize={"2rem"}
            fontWeight={"bold"}
            fontFamily={"Helvetica75"}
            lineHeight={"140%"}
          >
            WORKS
          </Text>
        </Link>
        <Link
          onClick={() => parentSwiper.slideTo(4)}
          _hover={{ textDecoration: "underline" }}
        >
          <Text
            cursor="pointer"
            fontSize={"2rem"}
            fontWeight={"bold"}
            fontFamily={"Helvetica75"}
            lineHeight={"140%"}
          >
            CONTACT
          </Text>
        </Link>
      </HStack>

      {/* body */}
      <CircularProgress
        value={progress}
        size="48px"
        color="#09FFE1"
        mt={5}
        pos={"absolute"}
        right={"4rem"}
        bottom={{ base: "8rem", md: "4rem" }}
        zIndex={"99"}
        cursor={"pointer"}
        onClick={goToFirstSlide} // 클릭 이벤트 추가
      >
        <CircularProgressLabel
          display={"flex"}
          justifyContent={"center"}
          alignItems={"cneter"}
        >
          <Image src={progressLabel} w="3rem" h="3rem" alt=""></Image>
        </CircularProgressLabel>
      </CircularProgress>
      <Swiper
        onSwiper={setParentSwiper} // 부모 스와이퍼가 초기화되면 저장
        ref={parentSwiperRef}
        modules={[Navigation, Pagination, Scrollbar, A11y, Mousewheel]}
        spaceBetween={50}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        direction="vertical"
        slidesPerView={1}
        parallax={true}
        mousewheel={{ enabled: true }}
        style={{ height: "100vh" }}
        onSlideChange={handleSlideChange}
      >
        {/* main */}
        <SwiperSlide pos={"relative"}>
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            overflow="hidden"
            zIndex="-1" // 비디오를 배경으로 설정
          >
            <video
              autoPlay
              loop
              muted
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source src={mainBgVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
          <VStack
            maxW={"1435px"}
            h={"100%"}
            justifyContent={"center"}
            m={"0 auto"}
            p={{ base: "2rem", md: "0" }}
          >
            <HStack w={"100%"} zIndex={"3"} maxW={"100%"}>
              <Text
                fontFamily={"Helvetica75"}
                fontSize={{ base: "10.8rem", md: "17.8rem" }}
                lineHeight={"100%"}
                fontWeight={"bold"}
              >
                YOUR VISION,
              </Text>
            </HStack>
            <HStack justifyContent={"space-between"} w={"100%"}>
              <Text
                fontFamily={"Helvetica75"}
                fontSize={"2.2rem"}
                maxW={"23.7rem"}
                pos={"relative"}
                top={"5.5rem"}
                display={{ base: "none", md: "flex" }}
              >
                I turn your ideas into reality with seamless coding. Let’s
                create together.
              </Text>
              <Text
                fontFamily={"Helvetica75"}
                fontSize={{ base: "10.8rem", md: "17.8rem" }}
                lineHeight={"100%"}
                fontWeight={"bold"}
              >
                MY
              </Text>
            </HStack>
            <HStack
              w={"100%"}
              justifyContent={{ base: "flex-start", md: "center" }}
            >
              <Text
                fontFamily={"Helvetica75"}
                fontSize={{ base: "10.8rem", md: "17.8rem" }}
                lineHeight={"100%"}
                fontWeight={"bold"}
              >
                Code
              </Text>
            </HStack>

            <Box
              pos={"absolute"}
              bottom={"0"}
              left="50%"
              transform="translateX(-50%);"
            >
              <Box
                bg={`url(${ellipseBg})`}
                bgSize="cover"
                bgRepeat="no-repeat"
                bgPosition="center"
                w="23rem"
                h="11.5rem"
                pos={"relative"}
              >
                <Img
                  ref={lineRef}
                  src={ellipseAllow}
                  w="6.3rem"
                  h="9.7rem"
                  pos={"absolute"}
                  top={"-4.7rem"}
                  left="50%"
                  transform="translateX(-50%);"
                ></Img>
              </Box>
              <Box></Box>
            </Box>
          </VStack>
        </SwiperSlide>

        {/* 자기소개 */}
        <SwiperSlide>
          <VStack
            maxW={"1768px"}
            h="100%"
            justifyContent={"center"}
            margin={"0 auto"}
            spacing={{ base: "5rem", md: "10rem" }}
            p={{ base: "2rem", xl: "0" }}
          >
            <VStack
              w={"100%"}
              fontSize={{ base: "5rem", md: "6.4rem" }}
              justify={"flex-end"}
              align={{ base: "flex-start", xl: "flex-end" }}
              fontWeight={"bold"}
              fontFamily={"Inter"}
              lineHeight={{ base: "140%", md: "100%" }}
              flexWrap={"wrap"}
              spacing="1.5rem"
            >
              <Text as={"span"} whiteSpace={"normal"}>
                저의 소통 능력으로
              </Text>
              <Text as={"span"} whiteSpace={"normal"}>
                완성도 높은 결과물을 만들고,
              </Text>
              <Text as={"span"} whiteSpace={"normal"}>
                최신 웹 트렌드와 기술을 빠르게 적용합니다.
              </Text>
              <Text as={"span"} whiteSpace={"normal"}>
                탁월한 팀워크와 커뮤니케이션으로
              </Text>
              <Text as={"span"} whiteSpace={"normal"}>
                성공적인 프로젝트를 이끌어왔습니다.
              </Text>
            </VStack>
            <VStack
              w={"100%"}
              fontSize={{ base: "2rem", md: "2.8rem" }}
              fontWeight={"medium"}
              fontFamily={"Inter"}
              lineHeight={"140%"}
              color={"rgba(255, 255, 255, 0.7)"}
              align={{ base: "flex-start", xl: "flex-end" }}
            >
              <Text as={"span"}>
                I deliver high-quality results through design-development
                synergy, rapidly applying
              </Text>
              <Text as={"span"}>
                the latest web trends and technologies while leading projects
                with strong teamwork
              </Text>
              <Text as={"span"}>and communication.</Text>
            </VStack>
          </VStack>
        </SwiperSlide>

        {/* 기술소개 */}
        <SwiperSlide>
          <HStack justifyContent={"center"} h="100%">
            <Swiper
              onSwiper={setChildSwiper} // 자식 스와이퍼가 초기화되면 저장
              ref={childSwiperRef}
              modules={[FreeMode, Pagination, Scrollbar, A11y, Mousewheel]}
              spaceBetween={"134rem"}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              slidesPerView={"auto"}
              mousewheel={{ enabled: true }}
              style={{
                height: "calc(100vh - 24rem)",
                minH: "max-content",
                padding: "0 4rem",
              }}
              direction={direction}
            >
              <SwiperSlide
                style={{ width: "max-content", height: "max-content" }}
              >
                <VStack
                  w="max-content"
                  h="100%"
                  spacing={"4.8rem"}
                  justifyItems={"center"}
                  maxW="100%"
                >
                  <Heading
                    fontWeight={"bold"}
                    fontSize={"12rem"}
                    as={"h2"}
                    fontFamily={"Helvetica75"}
                    lineHeight={"100%"}
                  >
                    Junseok Ahn
                  </Heading>
                  <VStack spacing={"1.6rem"} w="100%" align={"flex-start"}>
                    <Text
                      fontFamily={"Inter"}
                      lineHeight={"140%"}
                      fontSize={"2.6rem"}
                      color={"rgba(255, 255, 255, 0.8)"}
                    >
                      안녕하세요. 퍼블리셔 안준석입니다.
                    </Text>
                    <UnorderedList
                      fontWeight={"medium"}
                      fontSize={"2.6rem"}
                      lineHeight={"150%"}
                      color={"rgba(255, 255, 255, 0.4)"}
                    >
                      <ListItem>1995.03.03(만29세)</ListItem>
                      <ListItem>서울 거주</ListItem>
                    </UnorderedList>
                  </VStack>
                </VStack>
              </SwiperSlide>
              <SwiperSlide
                style={{ width: "max-content", height: "max-content" }}
              >
                <Img src={workBar} w="20.2rem" h="9.7rem"></Img>
              </SwiperSlide>

              <SwiperSlide
                style={{ width: "max-content", height: "max-content" }}
              >
                <VStack
                  w="max-content"
                  h="100%"
                  spacing={"4.8rem"}
                  justifyItems={"center"}
                  align={"flex-start"}
                >
                  <Heading
                    fontWeight={"bold"}
                    fontSize={"12rem"}
                    as={"h2"}
                    fontFamily={"Helvetica75"}
                    lineHeight={"100%"}
                  >
                    Activity
                  </Heading>
                  <VStack spacing={"1.6rem"}>
                    <UnorderedList
                      spacing={"3.2rem"}
                      fontSize=" 2.3rem;"
                      color={"rgba(255, 255, 255, 0.4)"}
                    >
                      <ListItem>
                        <VStack spacing={"1.2rem"} alignItems={"flex-start"}>
                          <Text
                            fontWeight={"medium"}
                            fontSize={"2rem"}
                            lineHeight={"140%"}
                            color={"rgba(255, 255, 255, 0.6)"}
                          >
                            2011. 03 ~ 2014. 02(9개월)
                          </Text>
                          <Text
                            fontWeight={"medium"}
                            fontSize={"2.6rem"}
                            fontFamily={"Inter"}
                            lineHeight={"140%"}
                            color={"rgba(255, 255, 255, 0.8)"}
                          >
                            온양고등학교
                          </Text>
                        </VStack>
                      </ListItem>
                      <ListItem>
                        <VStack spacing={"1.2rem"} alignItems={"flex-start"}>
                          <Text
                            fontWeight={"medium"}
                            fontSize={"2rem"}
                            lineHeight={"140%"}
                            color={"rgba(255, 255, 255, 0.6)"}
                          >
                            2014. 03 ~ 2019.02
                          </Text>
                          <Text
                            fontWeight={"medium"}
                            fontSize={"2.6rem"}
                            fontFamily={"Inter"}
                            lineHeight={"140%"}
                            color={"rgba(255, 255, 255, 0.8)"}
                          >
                            신성대학교(정보통신과)
                          </Text>
                        </VStack>
                      </ListItem>
                      <ListItem>
                        <VStack spacing={"1.2rem"} alignItems={"flex-start"}>
                          <Text
                            fontWeight={"medium"}
                            fontSize={"2rem"}
                            lineHeight={"140%"}
                            color={"rgba(255, 255, 255, 0.6)"}
                          >
                            2021.02 ~ 2021.07
                          </Text>
                          <Text
                            fontWeight={"medium"}
                            fontSize={"2.6rem"}
                            fontFamily={"Inter"}
                            lineHeight={"140%"}
                            color={"rgba(255, 255, 255, 0.8)"}
                          >
                            더휴먼 컴퓨터아트아카데미
                          </Text>
                          <Text
                            fontWeight={"medium"}
                            fontSize={"2.4rem"}
                            lineHeight={"140%"}
                            color={"rgba(255, 255, 255, 0.7)"}
                          >
                            (웹퍼블리셔/프론트엔드 웹개발자 과정 수료)
                          </Text>
                        </VStack>
                      </ListItem>
                    </UnorderedList>
                  </VStack>
                </VStack>
              </SwiperSlide>

              <SwiperSlide
                style={{ width: "max-content", height: "max-content" }}
              >
                <Img src={workBar} w="20.2rem" h="9.7rem"></Img>
              </SwiperSlide>

              <SwiperSlide
                style={{ width: "max-content", height: "max-content" }}
              >
                <VStack
                  w="max-content"
                  h="100%"
                  spacing={"4.8rem"}
                  justifyItems={"center"}
                  align={"flex-start"}
                >
                  <Heading
                    fontWeight={"bold"}
                    fontSize={"12rem"}
                    as={"h2"}
                    fontFamily={"Helvetica75"}
                    lineHeight={"100%"}
                  >
                    Work
                  </Heading>
                  <VStack spacing={"1.6rem"}>
                    <UnorderedList
                      spacing={"3.2rem"}
                      fontSize=" 2.3rem;"
                      color={"rgba(255, 255, 255, 0.4)"}
                    >
                      <ListItem>
                        <VStack spacing={"1.2rem"} alignItems={"flex-start"}>
                          <Text
                            fontWeight={"medium"}
                            fontSize={"2rem"}
                            lineHeight={"140%"}
                            color={"rgba(255, 255, 255, 0.6)"}
                          >
                            2021. 08 ~ 2022. 04(9개월)
                          </Text>
                          <Text
                            fontWeight={"medium"}
                            fontSize={"2.6rem"}
                            fontFamily={"Inter"}
                            lineHeight={"140%"}
                            color={"rgba(255, 255, 255, 0.8)"}
                          >
                            (주)티에스네트
                          </Text>
                        </VStack>
                      </ListItem>
                      <ListItem>
                        <VStack spacing={"1.2rem"} alignItems={"flex-start"}>
                          <Text
                            fontWeight={"medium"}
                            fontSize={"2rem"}
                            lineHeight={"140%"}
                            color={"rgba(255, 255, 255, 0.6)"}
                          >
                            2023. 03 ~ 2024.08(1년 6개월)
                          </Text>
                          <Text
                            fontWeight={"medium"}
                            fontSize={"2.6rem"}
                            fontFamily={"Inter"}
                            lineHeight={"140%"}
                            color={"rgba(255, 255, 255, 0.8)"}
                          >
                            주식회사코드명인
                          </Text>
                        </VStack>
                      </ListItem>
                    </UnorderedList>
                  </VStack>
                </VStack>
              </SwiperSlide>

              <SwiperSlide
                style={{ width: "max-content", height: "max-content" }}
              >
                <Img src={workBar} w="20.2rem" h="9.7rem"></Img>
              </SwiperSlide>

              <SwiperSlide
                style={{ width: "max-content", height: "max-content" }}
              >
                <VStack
                  w="max-content"
                  h="100%"
                  spacing={"4.8rem"}
                  justifyItems={"center"}
                  align={"flex-start"}
                  pr="20rem"
                >
                  <Heading
                    fontWeight={"bold"}
                    fontSize={"12rem"}
                    as={"h2"}
                    fontFamily={"Helvetica75"}
                    lineHeight={"100%"}
                  >
                    Skill
                  </Heading>
                  <VStack
                    spacing={"1.2rem"}
                    alignItems={"flex-start"}
                    cursor={"pointer"}
                    maxW={"300px"}
                  >
                    <Canvas>
                      <CreateScene />
                    </Canvas>
                    <HStack flexWrap={"wrap"}>
                      {skillList.map((tech, index) => (
                        <Text
                          key={index}
                          fontWeight={"medium"}
                          fontSize={"2.6rem"}
                          fontFamily={"Inter"}
                          lineHeight={"140%"}
                          color={"rgba(255, 255, 255, 0.8)"}
                        >
                          {tech}
                          {index !== skillList.length - 1 ? " ," : ""}
                        </Text>
                      ))}
                    </HStack>
                  </VStack>
                </VStack>
              </SwiperSlide>
            </Swiper>
          </HStack>
        </SwiperSlide>

        {/* work */}
        <SwiperSlide>
          <VStack
            pos={"relative"}
            ref={vStackWorkRef}
            w="100%"
            m="0 auto"
            h="100vh"
            bg={{ base: "#000", md: "#fff" }}
          >
            <Swiper
              onSwiper={setWorkChildSwiper} // 자식 스와이퍼가 초기화되면 저장
              ref={workChildSwiperRef}
              modules={[FreeMode, Pagination, Scrollbar, A11y, Mousewheel]}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              slidesPerView={"auto"}
              mousewheel={{ enabled: true }}
              direction="vertical"
              style={{ width: "100%", height: "100%" }}
            >
              <SwiperSlide
                style={{
                  width: "100%",
                }}
              >
                <VStack
                  ref={vStackWorkRef}
                  align="center"
                  w="100%"
                  h="100vh"
                  justifyContent={"center"}
                >
                  <Heading
                    ref={myRef}
                    as="h2"
                    lineHeight="100%"
                    fontFamily="Helvetica75"
                    fontSize={{ base: "15rem", md: "20rem" }}
                    fontWeight="bold"
                  >
                    My
                  </Heading>
                  <Heading
                    ref={worksRef}
                    as="h2"
                    lineHeight="100%"
                    fontFamily="Platypi"
                    fontSize={{ base: "15rem", md: "20rem" }}
                    fontStyle="Italic"
                  >
                    Works
                  </Heading>
                </VStack>
              </SwiperSlide>
              {projectList.map((projects, slideIndex) => (
                <SwiperSlide key={slideIndex} pos="relative">
                  <HStack
                    w="100%"
                    h="100%"
                    pos="absolute"
                    left="50%"
                    transform={"translateX(-50%)"}
                    maxW="1604px"
                    flexDirection={{ base: "column", md: "row" }}
                    justifyContent={{ base: "center", md: "space-between" }}
                    p={{ base: "6rem 2rem", md: "2rem" }}
                  >
                    {projects.map((project, cardIndex) => (
                      <Box
                        key={cardIndex}
                        w="100%"
                        maxW={"686px"}
                        h={{ base: "50%", md: "100%" }}
                      >
                        <VStack
                          spacing="1.5rem"
                          w="100%"
                          maxH={"500px"}
                          h={{ base: "100%", md: "calc(50% - 2.5rem)" }}
                          align="flex-start"
                          cursor="pointer"
                          pos="relative"
                          top={"50%"}
                          transform={"translateY(-50%)"}
                          onClick={() =>
                            window.open(project.projectLink, "_blank")
                          }
                          onMouseEnter={() =>
                            !(cardIndex === 1 && slideIndex === 3) &&
                            handleFlip(slideIndex, cardIndex, true)
                          }
                          onMouseLeave={() =>
                            handleFlip(slideIndex, cardIndex, false)
                          }
                        >
                          {/* 앞면 */}
                          <VStack
                            maxW={"686px"}
                            h="100%"
                            w={"100%"}
                            transition="transform 0.6s"
                            transform={
                              isFlipped[slideIndex][cardIndex]
                                ? "rotateY(180deg)"
                                : "rotateY(0deg)"
                            }
                            bg={"transparent"}
                            zIndex={
                              isFlipped[slideIndex][cardIndex] ? "1" : "2"
                            }
                          >
                            <AspectRatio
                              w="100%"
                              h="calc(100% - 7.6rem)"
                              ratio={7 / 5}
                            >
                              <Image
                                w="100%"
                                h="100%"
                                src={project.projectSrc}
                                alt={project.projectName}
                              />
                            </AspectRatio>
                            <VStack
                              w="100%"
                              h="7.6rem"
                              alignItems="flex-start"
                              justify={"flex-end"}
                            >
                              <Heading
                                as="h4"
                                fontFamily="Inter"
                                fontSize="2.8rem"
                                lineHeight="140%"
                              >
                                {project.projectName}
                              </Heading>
                              <Text
                                fontFamily="Inter"
                                fontWeight="Medium"
                                fontSize="1.6rem"
                                color="rgba(255, 255, 255, 0.4)"
                                lineHeight="140%"
                              >
                                {project.projectStack}
                              </Text>
                            </VStack>
                          </VStack>

                          {/* 뒷면 */}
                          <VStack
                            pos="absolute"
                            left="-0.5px"
                            w="calc(100% + 1px)"
                            h="100%"
                            transition="transform 0.6s"
                            transform={
                              isFlipped[slideIndex][cardIndex]
                                ? "rotateY(0deg)"
                                : "rotateY(-180deg)"
                            }
                            zIndex={
                              isFlipped[slideIndex][cardIndex] ? "2" : "1"
                            }
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            bg={
                              isFlipped[slideIndex][cardIndex]
                                ? "gray.800"
                                : "transparent"
                            }
                            color="white"
                            maxW={"687px"}
                          >
                            <Text fontSize="2xl">More Info</Text>
                          </VStack>
                        </VStack>
                      </Box>
                    ))}
                  </HStack>
                </SwiperSlide>
              ))}
            </Swiper>
          </VStack>
        </SwiperSlide>

        {/* footer */}
        <SwiperSlide>
          <VStack spacing={"7.9rem"} h="100%" justifyContent={"flex-end"}>
            <Box
              whiteSpace="nowrap"
              h="6rem"
              bg="#fff"
              w="100vw"
              position="relative"
              display="flex"
              alignItems="center"
              overflow="hidden" // 텍스트가 화면을 넘어가도 숨기기
            >
              <HStack ref={footerTextRef} spacing="5.2rem">
                {Array(15)
                  .fill()
                  .map((_, arrIndex) => (
                    <HStack
                      key={arrIndex}
                      alignItems={"center"}
                      spacing={"2.1rem"}
                    >
                      <Text
                        fontSize="4.8rem"
                        fontWeight="bold"
                        lineHeight="100%"
                        fontFamily="Helvetica75"
                        color="#101010"
                      >
                        CONTACT ME
                      </Text>
                      <Image src={darkStar} alt="" w="16px" h="16px" />
                    </HStack>
                  ))}
                {/* 두 번째 반복 */}
                {Array(15)
                  .fill()
                  .map((_, arrIndex) => (
                    <HStack
                      key={arrIndex + 15}
                      alignItems={"center"}
                      spacing={"2.1rem"}
                    >
                      <Text
                        fontSize="4.8rem"
                        fontWeight="bold"
                        lineHeight="100%"
                        fontFamily="Helvetica75"
                        color="#101010"
                      >
                        CONTACT ME
                      </Text>
                      <Image src={darkStar} alt="" w="16px" h="16px" />
                    </HStack>
                  ))}
              </HStack>
            </Box>

            <HStack
              w="100%"
              justifyContent={"space-between"}
              p="0 4rem 14rem"
              flexDirection={{ base: "column", lg: "row" }}
              gap="3rem"
            >
              <VStack alignItems={"flex-start"}>
                <Text
                  fontSize={"12rem"}
                  fontFamily={"Helvetica75"}
                  lineHeight={"120%"}
                  color={"#fff"}
                  fontWeight={"bold"}
                >
                  ARE YOU
                </Text>
                <Text
                  fontSize={"12rem"}
                  fontFamily={"Helvetica75"}
                  lineHeight={"120%"}
                  fontWeight={"bold"}
                  color={"#000"}
                  textShadow={`2px 2px 0px #fff, 
                             -2px -2px 0px #fff, 
                             2px -2px 0px #fff, 
                             -2px 2px 0px #fff`}
                >
                  WITH ME?
                </Text>
              </VStack>
              <VStack alignItems={"flex-end"}>
                <Text
                  fontSize={"5.6rem"}
                  fontFamily={"Inter"}
                  lineHeight={"140%"}
                  color={"#fff"}
                  borderBottom={"3px solid #fff"}
                >
                  +82)10 4589 9727
                </Text>
                <Text
                  fontSize={"5.6rem"}
                  fontFamily={"Inter"}
                  lineHeight={"140%"}
                  color={"#fff"}
                  borderBottom={"3px solid #fff"}
                >
                  wnstjr541@naver.com
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

export default Main;
