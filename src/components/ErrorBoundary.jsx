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
          <div className="max-w-xl w-full bg-[#FFFDF8] p-8 rounded-3xl border-2 border-gold/30 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-burgundy/10 text-burgundy flex items-center justify-center mx-auto text-xl font-bold font-serif">
              ✝
            </div>
            <h2 className="font-serif font-bold text-2xl text-[#17202B]">CNI Church Mahasamund</h2>
            <p className="text-xs text-[#6E6A63] leading-relaxed">
              Something went wrong loading this view.
            </p>

            {/* Error Message Details */}
            <div className="p-3 bg-red-50 text-red-700 text-xs font-mono rounded-xl border border-red-200 text-left overflow-x-auto">
              <strong>Error:</strong> {this.state.error?.toString() || 'Unknown runtime error'}
            </div>

            <div className="pt-2 flex justify-center space-x-3">
              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href = '/';
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-burgundy shadow-md"
              >
                Clear Storage & Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
