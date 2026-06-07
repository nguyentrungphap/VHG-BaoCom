import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen w-full bg-slate-50">
      <header className="w-full px-6 py-16 lg:px-10">
        <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[1.4fr_1fr] items-center">
          <div className="space-y-8">
            <div className="inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Đặt cơm cho công ty
            </div>
            <div className="space-y-5">
              <h1 className="text-5xl font-semibold leading-tight text-slate-950 md:text-6xl">
                Cham Cơm
              </h1>
              <p className="max-w-xl text-lg leading-8 text-slate-600">
                Ứng dụng đặt suất ăn cho nhà máy và công ty sản xuất. Nhanh chóng, rõ ràng và dễ vận hành.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/order"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5"
              >
                Đặt cơm ngay
              </Link>
              <Link
                to="/orders"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Xem lịch sử
              </Link>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-10 shadow-[0_32px_80px_rgba(15,23,42,0.08)]">
              <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
                Ăn ngon - Làm tốt hơn mỗi ngày
              </span>
              <h2 className="mt-6 text-3xl font-semibold text-slate-950 lg:text-4xl">
                Chào mừng đến với Cham Cơm
              </h2>
              <p className="mt-4 text-slate-600 leading-7">
                Đặt cơm nhanh chóng, quản lý dễ dàng cho công ty và nhà máy của bạn.
              </p>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-b from-sky-100 via-slate-100 to-white p-8 shadow-[0_30px_70px_rgba(15,23,42,0.08)]">
              <div className="h-72 rounded-[1.75rem] bg-gradient-to-br from-sky-400 via-indigo-400 to-slate-300 shadow-inner" />
              <div className="mt-6 flex flex-col gap-3 rounded-[1.5rem] bg-white p-6 shadow-sm">
                <span className="font-semibold text-slate-900">Đa dạng món ăn</span>
                <p className="text-sm leading-6 text-slate-600">Thực đơn thay đổi mỗi ngày.</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Home
