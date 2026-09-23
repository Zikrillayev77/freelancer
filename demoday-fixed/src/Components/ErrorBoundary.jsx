import React from "react";

/**
 * Global Error Boundary — app crash bo'lganida foydalanuvchiga
 * tushunarli xato sahifasi ko'rsatadi va qayta urinish imkonini beradi.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary] Xato ushlandi:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-rose-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
            Kutilmagan xato yuz berdi
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-md">
            Ilovada muammo chiqdi. Quyidagi xato tafsilotini ko'rib, sahifani yangilang yoki qayta urinib ko'ring.
          </p>

          {this.state.error && (
            <details open className="mb-6 max-w-lg w-full text-left">
              <summary className="text-xs font-semibold text-slate-500 dark:text-slate-400 cursor-pointer select-none mb-1">
                Texnik tafsilotlar:
              </summary>
              <pre className="text-[11px] bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 overflow-auto text-rose-600 dark:text-rose-400 whitespace-pre-wrap break-all font-mono">
                {this.state.error.toString()}
              </pre>
            </details>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={this.handleReset}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition cursor-pointer shadow-md"
            >
              Qayta urinish
            </button>
            <button
              onClick={() => window.location.assign("/")}
              className="bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 transition cursor-pointer"
            >
              Bosh sahifaga
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
