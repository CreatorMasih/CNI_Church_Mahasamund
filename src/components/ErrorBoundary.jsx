import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#F6F1E7] text-[#17202B]">
          <div className="max-w-md w-full bg-[#FFFDF8] p-8 rounded-3xl border-2 border-gold/30 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center mx-auto text-xl font-bold font-serif">
              ✝
            </div>
            <h2 className="font-serif font-bold text-2xl text-[#17202B]">CNI Church Mahasamund</h2>
            <p className="text-xs text-[#6E6A63] leading-relaxed">
              Something went wrong loading this view. Click below to refresh the page or clear cache.
            </p>
            <div className="pt-2 flex justify-center space-x-3">
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = '/';
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-burgundy shadow-md"
              >
                Reset & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
