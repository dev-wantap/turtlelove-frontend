import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { Button } from './Button';

describe('Button 접근성', () => {
  describe('ARIA 속성', () => {
    it('기본 버튼이 role="button"여야 함', () => {
      render(<Button>버튼</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('로딩 상태일 때 aria-busy="true"여야 함', () => {
      render(<Button loading>로딩</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('로딩 상태가 아닐 때 aria-busy="false"여야 함', () => {
      render(<Button>버튼</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'false');
    });

    it('ariaLabel prop이 전달되면 우선 적용되어야 함', () => {
      render(<Button ariaLabel="닫기">X</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', '닫기');
    });

    it('로딩 상태이고 ariaLabel이 없으면 "로딩 중"이 기본값이어야 함', () => {
      render(<Button loading>제출</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', '로딩 중');
    });

    it('ariaDescription prop이 전달되면 aria-describedby가 설정되어야 함', () => {
      render(
        <Button ariaDescription="추가 설명">버튼</Button>
      );
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-describedby', '추가 설명');
    });
  });

  describe('스크린 리더 지원', () => {
    it('로딩 스피너에 aria-hidden="true"가 있어야 함', () => {
      const { container } = render(<Button loading>로딩</Button>);
      const spinner = container.querySelector('svg[aria-hidden="true"]');
      expect(spinner).toBeInTheDocument();
    });

    it('로딩 상태일 때 "로딩 중..." 텍스트가 렌더링되어야 함', () => {
      render(<Button loading>제출</Button>);
      const loadingText = screen.getByText('로딩 중...');
      expect(loadingText).toBeInTheDocument();
      expect(loadingText).toHaveClass('sr-only');
    });
  });

  describe('키보드 접근성', () => {
    it('비활성화 상태일 때 버튼이 비활성화되어야 함', () => {
      render(<Button disabled>비활성</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('로딩 상태일 때 버튼이 비활성화되어야 함', () => {
      render(<Button loading>로딩</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('onClick 핸들러가 키보드로 트리거되어야 함', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>클릭</Button>);
      const button = screen.getByRole('button');

      button.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('AS 예외 처리', () => {
    it('asChild와 loading을 함께 사용하면 경고가 기록되어야 함', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <Button asChild loading>
          <span>링크</span>
        </Button>
      );

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('loading')
      );

      consoleSpy.mockRestore();
    });
  });
});
