import React, {
    Children,
    FC,
    useCallback,
    useEffect,
    useMemo,
    useRef,
  } from "react";
  import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
  import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
  import "swiper/css";
  import "swiper/css/pagination";
  import "swiper/css/navigation";
  import { useMediaQuery } from "react-responsive";
  
  interface SliderProps {
    children: React.ReactNode;
    slideTo: number;
    autoHeight?: boolean;
    className?: string;
    isShowNavigation?: boolean;
    isShowPagination?: boolean;
    isAutoPlay?: boolean;
    isAllowManualSlide?: boolean;
    slidesPerView?: number;
    onPageChange?: (pageIndex: number) => void;
    onLoad?: (totalPages: number) => void;
  }
  
  const Slider: FC<SliderProps> = ({
    children,
    slideTo,
    autoHeight = true,
    className,
    isShowNavigation = false,
    isShowPagination = false,
    isAutoPlay = true,
    isAllowManualSlide = true,
    slidesPerView = 4,
    onPageChange,
    onLoad,
  }) => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const swiperRef = useRef<SwiperClass>(null);
  
    useEffect(() => {
      if (swiperRef.current) {
        swiperRef.current.slideTo(slideTo);
      }
    }, [slideTo]);
  
    useEffect(() => {
      if (swiperRef.current?.slides?.length > 0) {
        onLoad?.(swiperRef.current?.slides?.length);
      }
    }, [swiperRef.current?.slides?.length]);
  
    const numberOfSlidesPerView =
      Children.count(children) <= 2 && Children.count(children) < slidesPerView ? 1 : slidesPerView;
  
    return (
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={isMobile ? numberOfSlidesPerView : slidesPerView}
        pagination={
          isShowPagination
            ? {
                dynamicBullets: true,
                clickable: true,
              }
            : false
        }
        noSwiping={!isAllowManualSlide}
        allowTouchMove={isAllowManualSlide}
        autoHeight={autoHeight}
        autoplay={
          isAutoPlay
            ? {
                delay: 2500,
                disableOnInteraction: false,
              }
            : isAutoPlay
        }
        navigation={isShowNavigation}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={() => onPageChange?.(swiperRef.current?.activeIndex)}
        className={className}
      >
        {Children.map(children, (child, index) => (
          <SwiperSlide key={`slide-${index}`}>{child}</SwiperSlide>
        ))}
      </Swiper>
    );
  };
  
  export default Slider;