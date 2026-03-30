/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Calendar, Clock, Share2, Link as LinkIcon, MessageCircle, ChevronLeft, ChevronRight, Phone, Info } from "lucide-react";

// Impressionist-style placeholder images with metadata
const ARTWORKS = [
  {
    url: "https://picsum.photos/seed/monet1/800/1200",
    title: "수련 (Water Lilies)",
    artist: "클로드 모네 (Claude Monet)"
  },
  {
    url: "https://picsum.photos/seed/monet2/800/1000",
    title: "빨래터 (The Laundry)",
    artist: "알프레드 시슬레 (Alfred Sisley)"
  },
  {
    url: "https://picsum.photos/seed/monet3/800/1000",
    title: "아랍 여인 (Arab Woman)",
    artist: "피에르 오귀스트 르누아르 (Pierre-Auguste Renoir)"
  },
  {
    url: "https://picsum.photos/seed/monet4/800/1000",
    title: "베네치아의 대운하 (The Grand Canal, Venice)",
    artist: "클로드 모네 (Claude Monet)"
  },
];

const EXHIBITION_TITLE = "인상파, 모네에서 미국으로";
const EXHIBITION_SUBTITLE = "빛, 바다를 건너다";
const EXHIBITION_DATE = "2025. 2. 15.(토) ~ 2025. 5. 26.(월)";
const EXHIBITION_LOCATION = "더현대 서울 6층 ALT.1 전시장";
const NAVER_MAP_URL = "https://map.naver.com/v5/search/%EB%8D%94%ED%98%84%EB%8C%80%20%EC%84%9C%EC%9A%B8%20ALT.1";

export default function App() {
  const [currentImage, setCurrentImage] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % ARTWORKS.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + ARTWORKS.length) % ARTWORKS.length);

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const shareKakao = () => {
    // Basic KakaoTalk share intent (works on mobile)
    const text = `[초대장] ${EXHIBITION_TITLE}\n${EXHIBITION_DATE}\n${EXHIBITION_LOCATION}`;
    const url = window.location.href;
    const kakaoUrl = `kakaolink://send?text=${encodeURIComponent(text + "\n" + url)}`;
    window.location.href = kakaoUrl;
    
    // Fallback if intent fails (or for desktop)
    setTimeout(() => {
      alert("카카오톡 앱이 설치되어 있어야 합니다.");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#333] font-sans selection:bg-blue-100">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-black/80 text-white px-6 py-3 rounded-full text-sm shadow-xl"
          >
            링크가 복사되었습니다.
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex flex-col justify-end p-8 overflow-hidden bg-[#e5e7eb]">
          <motion.div 
            initial={{ scale: 1.05, opacity: 0.3 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={ARTWORKS[0].url} 
              alt="Main Exhibition" 
              className="w-full h-full object-cover brightness-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </motion.div>

          <div className="relative z-10 text-white">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm tracking-[0.3em] uppercase mb-2 font-light"
            >
              VIP INVITATION
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-4xl font-serif leading-tight mb-2"
            >
              {EXHIBITION_TITLE}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-xl font-light italic mb-6 opacity-90"
            >
              {EXHIBITION_SUBTITLE}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col gap-1 text-sm font-light opacity-80"
            >
              <p>{EXHIBITION_DATE}</p>
              <p>{EXHIBITION_LOCATION}</p>
            </motion.div>
          </div>
        </section>

        {/* Invitation Text Section */}
        <section className="py-20 px-8 text-center bg-[#fdfcf9]">
          <div className="border border-[#e5e1d8] p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#fdfcf9] px-4">
              <span className="text-[#c4a484] text-xs tracking-widest uppercase">Invitation</span>
            </div>
            
            <h2 className="text-2xl font-serif mb-8 text-[#5a5a5a]">초대합니다</h2>
            
            <div className="space-y-6 text-[#666] leading-relaxed font-light text-[15px]">
              <p>
                한국경제신문과 우스터미술관이<br />
                인상주의 탄생 150주년을 기념해<br />
                특별전 <strong>《인상파, 모네에서 미국으로 :<br />
                빛, 바다를 건너다》</strong>를 개최합니다.
              </p>
              <p>
                한국 최초로 유럽과 미국 인상주의의<br />
                가교 역할을 한 미국 우스터미술관의<br />
                소장품 53점이 공개되며<br />
                특히 클로드 모네의 〈수련〉, 알프레드 시슬레의 〈빨래터〉,<br />
                피에르 오귀스트 르누아르의 〈아랍 여인〉과 같은<br />
                명작들이 전시됩니다.
              </p>
              <p>
                인상주의의 정수를 보여줄 본 전시의<br />
                프리뷰에 여러분을 초대합니다.<br />
                부디 참석하셔서 자리를 빛내 주시기 바랍니다.
              </p>
            </div>
          </div>
        </section>

        {/* Information Section */}
        <section className="py-16 px-8 bg-white">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <div className="h-[1px] w-8 bg-[#ddd]" />
            <h3 className="text-lg font-serif tracking-widest text-[#888]">INFORMATION</h3>
            <div className="h-[1px] w-8 bg-[#ddd]" />
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#f0f4f8] flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-[#5a7d9a]" />
              </div>
              <div>
                <p className="text-xs text-[#999] uppercase tracking-wider mb-1">Date</p>
                <p className="text-lg font-medium">2025년 2월 14일 (금)</p>
                <p className="text-sm text-[#666]">오후 3시 ~ 8시 (프리뷰)</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#f0f4f8] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#5a7d9a]" />
              </div>
              <div>
                <p className="text-xs text-[#999] uppercase tracking-wider mb-1">Location</p>
                <p className="text-lg font-medium">더현대 서울 6층 ALT.1 전시장</p>
                <p className="text-sm text-[#666]">서울 영등포구 여의대로 108</p>
              </div>
            </div>
          </div>
        </section>

        {/* Program Section */}
        <section className="py-16 px-8 bg-[#f0f4f8]">
          <h4 className="text-lg font-serif mb-8 text-center text-[#4a6a8a]">전시 프리뷰 안내</h4>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center gap-2 mb-4 text-[#5a7d9a]">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-bold">입장 안내</span>
            </div>
            <ul className="space-y-3 text-sm text-[#666]">
              <li className="flex justify-between">
                <span className="font-medium">시간</span>
                <span>14:30 - 19:20 (*19:20 입장 마감)</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">내용</span>
                <span>명단 확인 및 주차 등록 (2시간 무료)</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">장소</span>
                <span>전시장 입구 등록데스크</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-[#5a7d9a]">
              <Info className="w-4 h-4" />
              <span className="text-sm font-bold">프로그램</span>
            </div>
            <ul className="space-y-4 text-sm text-[#666]">
              <li className="flex gap-4">
                <span className="font-mono text-[#5a7d9a] shrink-0">15:00 - 15:10</span>
                <span>행사 시작 안내</span>
              </li>
              <li className="flex gap-4">
                <span className="font-mono text-[#5a7d9a] shrink-0">15:10 - 15:20</span>
                <span>주최기관장 환영사 및 축사</span>
              </li>
              <li className="flex gap-4">
                <span className="font-mono text-[#5a7d9a] shrink-0">15:20 - 20:00</span>
                <span>전시 자유관람</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-white">
          <div className="px-8 mb-10 text-center">
            <h3 className="text-xl font-serif mb-2">주요 작품 소개</h3>
            <p className="text-xs text-[#999] tracking-widest uppercase">Photo Gallery</p>
          </div>

          <div className="relative group">
            <div className="aspect-[3/4] overflow-hidden relative bg-[#f0f0f0]">
              <AnimatePresence initial={false}>
                <motion.img
                  key={currentImage}
                  src={ARTWORKS[currentImage].url}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </div>

            <div className="mt-4 px-8 text-center">
              <motion.h4 
                key={`title-${currentImage}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-medium text-[#333] mb-1"
              >
                {ARTWORKS[currentImage].title}
              </motion.h4>
              <motion.p 
                key={`artist-${currentImage}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-[#888]"
              >
                {ARTWORKS[currentImage].artist}
              </motion.p>
            </div>
            
            <button 
              onClick={prevImage}
              className="absolute left-4 top-[37.5%] -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-md"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-[37.5%] -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-md"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {ARTWORKS.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentImage ? "w-6 bg-[#5a7d9a]" : "w-1.5 bg-[#ddd]"}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 px-8 bg-[#fdfcf9]">
          <div className="text-center mb-10">
            <h3 className="text-xl font-serif mb-2">오시는 길</h3>
            <p className="text-xs text-[#999] tracking-widest uppercase">Location</p>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-medium mb-1">더현대 서울 6층 ALT.1</h4>
            <p className="text-sm text-[#666] mb-2">서울 영등포구 여의대로 108 (여의도동 22)</p>
            <div className="flex items-center gap-2 text-sm text-[#888]">
              <Phone className="w-3 h-3" />
              <a href="tel:02-3277-0610" className="hover:underline">02-3277-0610</a>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="rounded-xl overflow-hidden shadow-md h-[300px] mb-8 relative border border-[#eee]">
            <iframe
              title="Exhibition Location"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              src="https://maps.google.com/maps?q=더현대서울%20ALT.1&t=&z=16&ie=UTF8&iwloc=&output=embed"
            ></iframe>
            {/* Direct link for mobile users who prefer native apps */}
            <div className="absolute bottom-4 right-4">
              <a 
                href={NAVER_MAP_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/90 backdrop-blur px-4 py-2 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-lg border border-green-100 text-green-700 uppercase tracking-tight"
              >
                <MapPin className="w-3 h-3" />
                Naver Map
              </a>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <p className="text-xs font-bold text-[#5a7d9a] mb-2 uppercase tracking-wider">Public Transport</p>
              <div className="space-y-3">
                <div className="flex gap-3 text-sm">
                  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-[10px] font-bold shrink-0 h-fit mt-0.5">5</span>
                  <p className="text-[#666]">여의나루역 1번 출구 (도보 5분)</p>
                </div>
                <div className="flex gap-3 text-sm">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold shrink-0 h-fit mt-0.5">9</span>
                  <p className="text-[#666]">여의도역 3번 출구 (무빙워크 이용)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Summary Info Section */}
        <section className="py-20 px-8 bg-white border-t border-[#eee]">
          <div className="space-y-6 text-sm">
            <div className="grid grid-cols-[80px_1fr] gap-4">
              <span className="text-[#999] font-medium">전시명</span>
              <span className="text-[#333]">{EXHIBITION_TITLE} : {EXHIBITION_SUBTITLE}</span>
            </div>
            <div className="grid grid-cols-[80px_1fr] gap-4">
              <span className="text-[#999] font-medium">전시기간</span>
              <span className="text-[#333]">{EXHIBITION_DATE}</span>
            </div>
            <div className="grid grid-cols-[80px_1fr] gap-4">
              <span className="text-[#999] font-medium">전시장소</span>
              <span className="text-[#333]">{EXHIBITION_LOCATION}</span>
            </div>
            <div className="grid grid-cols-[80px_1fr] gap-4">
              <span className="text-[#999] font-medium">주최</span>
              <span className="text-[#333]">한국경제신문, 우스터미술관</span>
            </div>
            <div className="grid grid-cols-[80px_1fr] gap-4">
              <span className="text-[#999] font-medium">휴관일</span>
              <span className="text-[#333]">더현대 서울 휴점일에 따라 변동</span>
            </div>
            <div className="grid grid-cols-[80px_1fr] gap-4">
              <span className="text-[#999] font-medium">관람시간</span>
              <div className="text-[#333]">
                <p>월-목 10:30 ~ 20:00 (입장마감 19:00)</p>
                <p>금-일 10:30 ~ 20:30 (입장마감 19:30)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Share Section */}
        <section className="py-20 px-8 bg-[#f8f9fa] text-center">
          <p className="text-xs text-[#999] tracking-widest uppercase mb-8">Contact & Share</p>
          
          <div className="flex justify-center gap-8">
            <button 
              onClick={copyUrl}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md group-hover:shadow-lg transition-all text-[#5a7d9a]">
                <LinkIcon className="w-6 h-6" />
              </div>
              <span className="text-xs text-[#666]">URL 복사</span>
            </button>
            
            <button 
              onClick={shareKakao}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-14 h-14 rounded-full bg-[#fee500] flex items-center justify-center shadow-md group-hover:shadow-lg transition-all text-[#3c1e1e]">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <span className="text-xs text-[#666]">카톡 공유</span>
            </button>
          </div>

          <div className="mt-20 text-[10px] text-[#bbb] uppercase tracking-widest">
            Copyright © 2025 All Rights Reserved.
          </div>
        </section>
      </main>
    </div>
  );
}
