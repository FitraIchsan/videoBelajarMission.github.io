import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourses } from '../features/courses/courseSlice'
import CourseCard from '../components/CourseCard'

function SemuaProduk() {
  const dispatch = useDispatch()
  const { data: courses, loading } = useSelector((state) => state.courses)

  // ===== STATE =====
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedDurations, setSelectedDurations] = useState([])
  const [sortBy, setSortBy] = useState('default')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    dispatch(fetchCourses())
  }, [dispatch])

  // Filter sections open/close
  const [openSections, setOpenSections] = useState({
    bidang: true,
    harga: true,
    durasi: true,
  })

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
    setCurrentPage(1)
  }

  const handleDurationChange = (dur) => {
    setSelectedDurations((prev) =>
      prev.includes(dur) ? prev.filter((d) => d !== dur) : [...prev, dur]
    )
    setCurrentPage(1)
  }

  const handleReset = () => {
    setSelectedCategories([])
    setSelectedDurations([])
    setSortBy('default')
    setSearchQuery('')
    setCurrentPage(1)
  }

  // ===== FILTER + SORT (Aman karena menggunakan useMemo berdasarkan state allCourses) =====
  const filteredCourses = useMemo(() => {
    let result = [...courses]

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (c) =>
          c.title?.toLowerCase().includes(q) ||
          c.instructor?.toLowerCase().includes(q) ||
          c.category?.toLowerCase().includes(q)
      )
    }

    // Category
    if (selectedCategories.length > 0) {
      result = result.filter((c) => selectedCategories.includes(c.category))
    }

    // Duration
    if (selectedDurations.length > 0) {
      result = result.filter((c) => selectedDurations.includes(c.duration))
    }

    // Sort
    switch (sortBy) {
      case 'harga-rendah':
        result.sort((a, b) => (a.priceValue || 0) - (b.priceValue || 0))
        break
      case 'harga-tinggi':
        result.sort((a, b) => (b.priceValue || 0) - (a.priceValue || 0))
        break
      case 'a-z':
        result.sort((a, b) => (a.title || '').localeCompare(b.title || ''))
        break
      case 'z-a':
        result.sort((a, b) => (b.title || '').localeCompare(a.title || ''))
        break
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      default:
        break
    }

    return result
  }, [courses, selectedCategories, selectedDurations, sortBy, searchQuery])

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage) || 1
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const sortOptions = [
    { value: 'default', label: 'Urutkan' },
    { value: 'harga-rendah', label: 'Harga Rendah' },
    { value: 'harga-tinggi', label: 'Harga Tinggi' },
    { value: 'a-z', label: 'A to Z' },
    { value: 'z-a', label: 'Z to A' },
    { value: 'rating', label: 'Rating Tertinggi' },
  ]

  const currentSortLabel =
    sortOptions.find((o) => o.value === sortBy)?.label || 'Urutkan'

  return (
    <div className="semua-produk">
      <div className="container">
        {/* Header Section */}
        <div className="semua-produk__header">
          <h1 className="semua-produk__title">Koleksi Video Pembelajaran Unggulan</h1>
          <p className="semua-produk__subtitle">
            Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
          </p>
        </div>

        <div className="semua-produk__layout">
          {/* ===== SIDEBAR FILTER ===== */}
          <aside className="semua-produk__sidebar">
            <div className="filter-panel">
              <div className="filter-panel__top">
                <h3 className="filter-panel__title">Filter</h3>
                <button
                  type="button"
                  className="filter-panel__reset"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>

              {/* Bidang Studi */}
              <div className="filter-section">
                <button
                  type="button"
                  className="filter-section__header"
                  onClick={() => toggleSection('bidang')}
                >
                  <span>Bidang Studi</span>
                  <span className={`filter-section__chevron ${openSections.bidang ? 'is-open' : ''}`}>
                    ▾
                  </span>
                </button>
                {openSections.bidang && (
                  <div className="filter-section__body">
                    {['Pemasaran', 'Digital & Teknologi', 'Pengembangan Diri', 'Bisnis Manajemen'].map(
                      (cat) => (
                        <label key={cat} className="filter-checkbox">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat)}
                            onChange={() => handleCategoryChange(cat)}
                          />
                          <span className="filter-checkbox__box"></span>
                          <span className="filter-checkbox__label">{cat}</span>
                        </label>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Durasi */}
              <div className="filter-section">
                <button
                  type="button"
                  className="filter-section__header"
                  onClick={() => toggleSection('durasi')}
                >
                  <span>Durasi</span>
                  <span className={`filter-section__chevron ${openSections.durasi ? 'is-open' : ''}`}>
                    ▾
                  </span>
                </button>
                {openSections.durasi && (
                  <div className="filter-section__body">
                    {[
                      { value: 'kurang-4', label: 'Kurang dari 4 Jam' },
                      { value: '4-8', label: '4 - 8 Jam' },
                      { value: 'lebih-8', label: 'Lebih dari 8 Jam' },
                    ].map((item) => (
                      <label key={item.value} className="filter-checkbox filter-checkbox--radio">
                        <input
                          type="checkbox"
                          checked={selectedDurations.includes(item.value)}
                          onChange={() => handleDurationChange(item.value)}
                        />
                        <span className="filter-checkbox__box filter-checkbox__box--circle"></span>
                        <span className="filter-checkbox__label">{item.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* ===== MAIN CONTENT ===== */}
          <div className="semua-produk__main">
            {/* Toolbar: Sort + Search */}
            <div className="semua-produk__toolbar">
              {/* Dropdown Sort (A to Z, Harga, dll) */}
              <div className="sort-dropdown">
                <button
                  type="button"
                  className="sort-dropdown__trigger"
                  onClick={() => setIsSortOpen((prev) => !prev)}
                >
                  {currentSortLabel}
                  <span className="sort-dropdown__arrow">▾</span>
                </button>
                {isSortOpen && (
                  <ul className="sort-dropdown__menu">
                    {sortOptions.map((opt) => (
                      <li key={opt.value}>
                        <button
                          type="button"
                          className={`sort-dropdown__item ${sortBy === opt.value ? 'is-active' : ''}`}
                          onClick={() => {
                            setSortBy(opt.value)
                            setIsSortOpen(false)
                            setCurrentPage(1)
                          }}
                        >
                          {opt.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Kotak Pencarian / Search */}
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Cari Kelas"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="search-box__input"
                />
              </div>
            </div>

            {/* Grid Cards / Loading State */}
            {loading ? (
              <p className="text-center py-10">Memuat data produk...</p>
            ) : (
              <>
                <div className="semua-produk__grid">
                  {paginatedCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      image={course.image}
                      title={course.title}
                      description={course.description}
                      instructor={course.instructor}
                      role={course.role}
                      rating={course.rating}
                      price={course.price}
                      originalPrice={course.originalPrice}
                    />
                  ))}
                </div>

                {paginatedCourses.length === 0 && (
                  <p className="semua-produk__empty">Tidak ada kelas yang cocok dengan filter Anda.</p>
                )}
              </>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="pagination">
                <button
                  type="button"
                  className="pagination__btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    className={`pagination__btn ${currentPage === page ? 'is-active' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
                <button
                  type="button"
                  className="pagination__btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SemuaProduk