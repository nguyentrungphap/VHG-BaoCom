import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface Order {
  id: string
  department: string
  mealTime: string
  mainDishes: number
  vegDishes: number
  date: string
  time: string
}

function OrderList() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    setOrders(savedOrders)
  }, [])

  const getDepartmentLabel = (value: string) => {
    const normalizedValue = value?.toLowerCase().trim()
    const departments: Record<string, string> = {
      'van-phong': 'Văn Phòng',
      vanphong: 'Văn Phòng',
      qc: 'QC',
      kho: 'Kho',
      'bao-tri': 'Bảo Trì',
      baotri: 'Bảo Trì',
      'bao-hanh': 'Bảo Trì',
      son: 'Sơn',
      'nhan-su': 'Nhân sự',
      'san-xuat': 'Sản xuất',
      sanxuat: 'Sản xuất',
      it: 'IT',
    }
    return departments[normalizedValue] || value
  }

  const getMealTimeLabel = (value: string) => {
    const mealTimes: Record<string, string> = {
      sang: 'Sáng',
      trua: 'Trưa',
      chieu: 'Chiều',
      toi: 'Tối',
    }
    return mealTimes[value] || value
  }

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa đơn này?')) {
      const updatedOrders = orders.filter((order) => order.id !== id)
      setOrders(updatedOrders)
      localStorage.setItem('orders', JSON.stringify(updatedOrders))
    }
  }
  // Calculate totals by meal time with main/veg breakdown
  const mealTimeStats = {
    trua: {
      main: orders.filter((o) => o.mealTime === 'trua' || o.mealTime === 'sang').reduce((sum, o) => sum + o.mainDishes, 0),
      veg: orders.filter((o) => o.mealTime === 'trua' || o.mealTime === 'sang').reduce((sum, o) => sum + o.vegDishes, 0),
    },
    chieu: {
      main: orders.filter((o) => o.mealTime === 'chieu').reduce((sum, o) => sum + o.mainDishes, 0),
      veg: orders.filter((o) => o.mealTime === 'chieu').reduce((sum, o) => sum + o.vegDishes, 0),
    },
    toi: {
      main: orders.filter((o) => o.mealTime === 'toi').reduce((sum, o) => sum + o.mainDishes, 0),
      veg: orders.filter((o) => o.mealTime === 'toi').reduce((sum, o) => sum + o.vegDishes, 0),
    },
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 px-6 py-16 lg:px-10">
      <div className="mx-auto w-full max-w-[1600px] space-y-10">
        <div className="flex flex-col gap-4 rounded-[2rem] bg-white p-8 shadow-[0_30px_70px_rgba(15,23,42,0.08)] lg:flex-row lg:items-center lg:justify-between">
          <h1 className="text-3xl font-semibold text-slate-950">📊 Danh sách đã đặt cơm</h1>
          <Link
            to="/order"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5"
          >
            ➕ Đặt cơm mới
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-14 text-center shadow-[0_30px_70px_rgba(15,23,42,0.08)]">
            <div className="mb-6 text-6xl">📭</div>
            <h2 className="text-2xl font-semibold text-slate-950">Chưa có đơn đặt cơm nào</h2>
            <p className="mt-3 text-slate-600">Hãy đặt cơm cho bộ phận của bạn ngay bây giờ</p>
            <Link
              to="/order"
              className="mt-8 inline-flex rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5"
            >
              Đặt cơm ngay
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-[1.75rem] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">☀️ Buổi trưa</p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Món mặn</span>
                    <span className="text-2xl font-semibold text-slate-950">{mealTimeStats.trua.main}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-slate-600">Món chay</span>
                    <span className="text-2xl font-semibold text-slate-950">{mealTimeStats.trua.veg}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.75rem] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">🍽️ Bữa trưa</p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Món mặn</span>
                    <span className="text-2xl font-semibold text-slate-950">{mealTimeStats.chieu.main}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-slate-600">Món chay</span>
                    <span className="text-2xl font-semibold text-slate-950">{mealTimeStats.chieu.veg}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.75rem] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">🌙 Bữa tối</p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Món mặn</span>
                    <span className="text-2xl font-semibold text-slate-950">{mealTimeStats.toi.main}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-slate-600">Món chay</span>
                    <span className="text-2xl font-semibold text-slate-950">{mealTimeStats.toi.veg}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              {orders.map((order) => (
                <article key={order.id} className="rounded-[2rem] bg-white p-7 shadow-[0_30px_70px_rgba(15,23,42,0.08)]">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Mã đơn</p>
                      <p className="mt-2 text-sm font-semibold text-sky-600">{order.id}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(order.id)}
                      title="Xóa đơn"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-red-100 text-red-600 transition hover:bg-red-200"
                    >
                      🗑️
                    </button>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Bộ phận</p>
                      <p className="mt-2 text-lg font-semibold text-slate-950">{getDepartmentLabel(order.department)}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Thời gian</p>
                      <p className="mt-2 text-lg font-semibold text-slate-950">{getMealTimeLabel(order.mealTime)}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Món mặn</p>
                      <p className="mt-2 text-lg font-semibold text-slate-950">{order.mainDishes}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Món chay</p>
                      <p className="mt-2 text-lg font-semibold text-slate-950">{order.vegDishes}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Ngày đặt</p>
                      <p className="mt-2 text-lg font-semibold text-slate-950">{order.date}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Giờ đặt</p>
                      <p className="mt-2 text-lg font-semibold text-slate-950">{order.time}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex justify-center">
              <Link
                to="/order"
                className="inline-flex rounded-full bg-gradient-to-r from-sky-600 to-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5"
              >
                ➕ Đặt cơm mới
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderList
