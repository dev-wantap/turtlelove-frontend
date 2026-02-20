import { Link } from 'react-router-dom';
import { Heart, HeartHandshake, MessageCircle, Shield, Sparkles, Users } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { GradientOrb } from '@/components/atoms/GradientOrb';
import { FeatureCard } from '@/components/molecules/FeatureCard';
import { cn } from '@/shared/utils/cn';

export function LandingHero({ className }: { className?: string }) {
  return (
    <div className={cn('w-full', className)}>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] overflow-hidden px-4 py-16 md:py-24">
        {/* Gradient Mesh Base Layer */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(247, 232, 231, 0.8) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(232, 242, 237, 0.6) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(245, 208, 197, 0.4) 0%, transparent 60%)
            `
          }}
        />

        {/* Background Gradient Orbs - Fixed positioning for depth */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {/* Top right - sunset, large */}
          <div className="absolute -right-20 -top-20 opacity-20 animate-pulse">
            <GradientOrb variant="sunset" size="xl" />
          </div>
          {/* Bottom left - blossom, large */}
          <div className="absolute -bottom-20 -left-20 opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>
            <GradientOrb variant="blossom" size="xl" />
          </div>
          {/* Top left - dawn, medium */}
          <div className="absolute top-20 left-10 opacity-15 animate-pulse" style={{ animationDelay: '0.5s' }}>
            <GradientOrb variant="dawn" size="lg" />
          </div>
          {/* Bottom right - ocean, medium */}
          <div className="absolute bottom-20 right-10 opacity-15 animate-pulse" style={{ animationDelay: '1.5s' }}>
            <GradientOrb variant="ocean" size="lg" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          {/* Brand Logo */}
          <div className="mb-10 flex items-center justify-center gap-4">
            {/* HeartHandshake Icon - Flat, Monochrome */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose to-rose-deep shadow-rose">
              <HeartHandshake size={32} strokeWidth={2} className="text-white" />
            </div>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-rose relative inline-block">
                Anon
                <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-rose to-transparent opacity-60" />
              </span>
              <span>Love</span>
            </h1>
          </div>

          {/* Main Heading */}
          <h2 className="mb-6 font-heading text-2xl md:text-4xl font-semibold text-text-primary leading-tight">
            대학생들을 위한<br className="md:hidden" />
            <span className="text-rose">익명 연애 상담</span> 커뮤니티
          </h2>

          {/* Subheading */}
          <p className="mb-10 max-w-xl mx-auto font-body text-lg md:text-xl text-text-secondary leading-relaxed">
            따뜻한 조언과 익명의 공간에서<br />
            마음 편하게 이야기해보세요
          </p>

          {/* CTA Buttons */}
          <div className="relative mb-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              variant="primary"
              size="lg"
              className="w-full sm:w-auto min-w-[160px]"
            >
              <Link to="/signup">회원가입</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto min-w-[160px]"
            >
              <Link to="/posts">게시글 둘러보기</Link>
            </Button>

            {/* Floating Decorative Icons - Repositioned around CTA */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden md:block animate-float" style={{ animationDelay: '0s' }} aria-hidden="true">
              <Heart size={20} strokeWidth={2} className="text-rose/20" />
            </div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:block animate-float" style={{ animationDelay: '0.5s' }} aria-hidden="true">
              <Sparkles size={20} strokeWidth={2} className="text-rose/20" />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 hidden md:block animate-float" style={{ animationDelay: '1s' }} aria-hidden="true">
              <MessageCircle size={20} strokeWidth={2} className="text-rose/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 pb-16 md:pb-24" aria-labelledby="features-heading">
        <div className="mx-auto max-w-5xl">
          <h2 id="features-heading" className="sr-only">
            AnonLove의 주요 기능
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<Shield size={28} strokeWidth={2} className="text-white/90" />}
              title="완전한 익명 보장"
              description="대학 인증으로 회원만 참여하는 안전한 공간"
              orbVariant="forest"
              className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100"
            />
            <FeatureCard
              icon={<MessageCircle size={28} strokeWidth={2} className="text-white/90" />}
              title="따뜻한 실시간 상담"
              description="1:1 채팅으로 진심 어린 조언을 나눠보세요"
              orbVariant="sunset"
              className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200"
            />
            <FeatureCard
              icon={<Users size={28} strokeWidth={2} className="text-white/90" />}
              title="대학생만의 공간"
              description="같은 고민을 가진 친구들과 응원을 주고받아요"
              orbVariant="dawn"
              className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
