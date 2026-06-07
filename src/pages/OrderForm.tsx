import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Order {
  id: string
  department: string
  mealTime: string
  mainDishes: number
  vegDishes: number
  date: string
  time: string
}

function OrderForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    department: 'nhan-su',
    mealTime: 'sang',
    mainDishes: 5,
    vegDishes: 5,
  })
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const departments = [
    { value: 'san-xuat', label: 'Sản xuất' },
    { value: 'kho', label: 'Kho/Logistics' },
    { value: 'bao-hanh', label: 'Bảo trì' },
    { value: 'nhan-su', label: 'Nhân sự' },
    { value: 'it', label: 'IT' },
  ]

  const mealTimes = [
    { value: 'sang', label: 'Sáng' },
    { value: 'chieu', label: 'Chiều' },
    { value: 'toi', label: 'Tối' },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: isNaN(Number(value)) ? value : Number(value),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Get existing orders from localStorage
    const existingOrders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]')

    // Today's date string in same format as stored orders
    const today = new Date().toLocaleDateString('vi-VN')

    // Check if same department already ordered for the SAME meal time on the same day
    const alreadyOrdered = existingOrders.some(
      (o) => o.department === formData.department && o.date === today && o.mealTime === formData.mealTime
    )

    if (alreadyOrdered) {
      setErrorMessage('Bộ phận này đã đặt cơm ca này hôm nay. Không thể đặt lại.')
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
        setErrorMessage(null)
      }, 3000)
      return
    }

    // Create new order
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      department: formData.department,
      mealTime: formData.mealTime,
      mainDishes: formData.mainDishes,
      vegDishes: formData.vegDishes,
      date: today,
      time: new Date().toLocaleTimeString('vi-VN'),
    }

    existingOrders.push(newOrder)
    localStorage.setItem('orders', JSON.stringify(existingOrders))

    // Show success message
    setShowSuccess(true)
    setTimeout(() => {
      setShowSuccess(false)
      // Redirect to orders page after 2 seconds
      setTimeout(() => navigate('/orders'), 500)
    }, 2000)
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 px-6 py-16 lg:px-10">
      <div className="mx-auto w-full max-w-3xl rounded-[2rem] bg-white p-10 shadow-[0_30px_70px_rgba(15,23,42,0.08)]">
        <div className="mb-10 space-y-3">
          <h1 className="text-4xl font-semibold text-slate-950">Đặt suất ăn cho bộ phận</h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600">Chọn ca (Sáng / Chiều / Tối) và số lượng món mặn / chay</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label htmlFor="department" className="block text-sm font-semibold text-slate-700">Bộ phận *</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            >
              {departments.map((dept) => (
                <option key={dept.value} value={dept.value}>{dept.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label htmlFor="mealTime" className="block text-sm font-semibold text-slate-700">Thời gian xuất ăn *</label>
            <select
              id="mealTime"
              name="mealTime"
              value={formData.mealTime}
              onChange={handleInputChange}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            >
              {mealTimes.map((time) => (
                <option key={time.value} value={time.value}>{time.label}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-3">
              <label htmlFor="mainDishes" className="block text-sm font-semibold text-slate-700">Số lượng Người Ăn Mặn</label>
              <input
                type="number"
                id="mainDishes"
                name="mainDishes"
                value={formData.mainDishes}
                onChange={handleInputChange}
                min="0"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>
            <div className="space-y-3">
              <label htmlFor="vegDishes" className="block text-sm font-semibold text-slate-700">Số lượng Người Ăn Chay</label>
              <input
                type="number"
                id="vegDishes"
                name="vegDishes"
                value={formData.vegDishes}
                onChange={handleInputChange}
                min="0"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
              />
            </div>
          </div>

          <button type="submit" className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5">Đặt cơm ngay</button>
        </form>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-base font-semibold text-slate-900">Quy định đặt suất:</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Chọn ca Sáng / Chiều / Tối theo lịch sản xuất</li>
            <li>Nhập số lượng món mặn và món chay cần đặt</li>
            <li>Một bộ phận chỉ được tạo một đơn cho mỗi ca/ngày</li>
          </ul>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed bottom-6 right-6 z-50 flex max-w-sm items-start gap-4 rounded-3xl bg-white px-5 py-4 shadow-[0_30px_70px_rgba(15,23,42,0.18)]">
          <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-2xl text-emerald-600">✓</span>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Đặt cơm thành công</h4>
            <p className="text-sm text-slate-600">Đơn hàng của bạn đã được tiếp nhận</p>
          </div>
        </div>
      )}

      {showError && (
        <div className="fixed bottom-6 right-6 z-50 flex max-w-sm items-start gap-4 rounded-3xl bg-white px-5 py-4 shadow-[0_30px_70px_rgba(15,23,42,0.18)] border-l-4 border-red-500">
          <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-red-100 text-2xl text-red-600">⚠️</span>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Đặt cơm thất bại</h4>
            <p className="text-sm text-slate-600">{errorMessage ?? 'Vui lòng thử lại'}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderForm
