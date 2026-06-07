import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import OrderForm from './pages/OrderForm'
import OrderList from './pages/OrderList'
import Logo from './assets/logo.jpg'

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-slate-50 text-slate-900">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/orders" element={<OrderList />} />
        </Routes>
      </div>
    </Router>
  )
}

function Navigation() {
  const location = useLocation()
  const linkBase = 'font-semibold text-2xl px-4 py-2 rounded-full transition duration-200'

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-900/95 shadow-xl backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <Link to="/" className="inline-flex items-center gap-3 text-lg font-semibold text-white">
          <img src={Logo} alt="Logo" className="h-20 w-20 rounded-full object-cover" />
          <span className="text-4xl font-bold">VHG</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/"
            className={`${linkBase}  ${location.pathname === '/' ? 'bg-white/15 text-white' : 'text-slate-200 hover:bg-white/10'}`}
          >
            Trang chủ
          </Link>
          <Link
            to="/order"
            className={`${linkBase}  ${location.pathname === '/order' ? 'bg-white/15 text-white' : 'text-slate-200 hover:bg-white/10'}`}
          >
            Đặt cơm
          </Link>
          <Link
            to="/orders"
            className={`${linkBase}  ${location.pathname === '/orders' ? 'bg-white/15 text-white' : 'text-slate-200 hover:bg-white/10'}`}
          >
            Danh sách
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default App