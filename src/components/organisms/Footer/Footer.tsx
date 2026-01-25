import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-warm-gray/50 bg-soft-gray/50">
      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* 상단 영역 */}
        <div className="flex flex-col items-center gap-4 text-center">
          {/* 로고 */}
          <Link
            to="/"
            className="font-heading text-lg font-semibold text-text-primary"
          >
            <span className="text-rose">Turtle</span>
            <span>Love</span>
          </Link>

          {/* 설명 */}
          <p className="max-w-md font-body text-sm leading-relaxed text-text-secondary">
            대학생들을 위한 익명 연애 상담 커뮤니티.
            <br />
            따뜻한 공감과 진심 어린 조언을 나눠보세요.
          </p>
        </div>

        {/* 구분선 */}
        <div className="my-6 border-t border-warm-gray/50" />

        {/* 하단 영역 */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="flex items-center gap-1 font-ui text-xs text-text-muted">
            Made with <Heart size={12} className="text-rose" fill="currentColor" /> by TurtleLove Team
          </p>
          <p className="font-ui text-xs text-text-muted">
            &copy; {currentYear} TurtleLove. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
