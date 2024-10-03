import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Register from '../../pages/Auth/Register';
import { vi, describe, it, expect } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockUseRegisterMutation = vi.fn();
vi.mock('../../queries/useRegisterMutation', () => ({
  default: () => ({
    mutate: mockUseRegisterMutation,
  }),
}));

describe('회원가입 테스트', () => {
  const queryClient = new QueryClient();
  const renderWithQueryClient = (ui: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
    );
  };

  test('렌더링 테스트', () => {
    renderWithQueryClient(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );

    // 로고 이미지 및 텍스트가 렌더링되는지 확인
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('깊은산골짜기')).toBeInTheDocument();

    // 이메일, 닉네임, 비밀번호, 비밀번호 확인 필드가 렌더링되는지 확인
    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('닉네임')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호 확인')).toBeInTheDocument();
  });

  it('이메일을 입력하지 않으면 "이메일을 입력해주세요" 표시', async () => {
    renderWithQueryClient(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByText('회원가입'));
    expect(
      await screen.findByText('이메일을 입력해주세요'),
    ).toBeInTheDocument();
  });

  it('이메일 입력 형식이 잘못되었을 때', async () => {
    renderWithQueryClient(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: '이상한 이메일' },
    });
    fireEvent.blur(screen.getByPlaceholderText('이메일'));

    fireEvent.click(screen.getByText('회원가입'));
    expect(
      await screen.findByText('올바른 이메일 형식을 지켜주세요'),
    ).toBeInTheDocument();
  });

  it('닉네임을 입력하지 않으면 "닉네임을 입력해주세요" 표시', async () => {
    renderWithQueryClient(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByPlaceholderText('닉네임'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByText('회원가입'));
    expect(
      await screen.findByText('닉네임을 입력해주세요'),
    ).toBeInTheDocument();
  });

  it('비밀번호를 입력하지 않으면 "비밀번호를 입력해주세요" 표시', async () => {
    renderWithQueryClient(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByText('회원가입'));
    expect(
      await screen.findByText('비밀번호를 입력해주세요'),
    ).toBeInTheDocument();
  });

  test('올바른 데이터 제출', async () => {
    renderWithQueryClient(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );
    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: 'testcode@test.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('닉네임'), {
      target: { value: 'testcodeUser' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: 'Password123!' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호 확인'), {
      target: { value: 'Password123!' },
    });

    fireEvent.click(screen.getByText('회원가입'));
    await waitFor(() => expect(mockUseRegisterMutation).toHaveBeenCalled());

    await expect(mockUseRegisterMutation).toHaveBeenCalledWith({
      login_email: 'testcode@test.com',
      name: 'testcodeUser',
      password: 'Password123!',
      checkPassword: 'Password123!',
    });
  });
});
