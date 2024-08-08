import React, { Component } from 'react';
type Props = {
  children?: React.ReactNode;
};

class ErrorBoundary extends Component<Props> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    // 오류가 발생하면 상태를 업데이트하여 폴백 UI를 렌더링합니다.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // 오류를 로깅할 수 있습니다 (예: Sentry 등)
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
