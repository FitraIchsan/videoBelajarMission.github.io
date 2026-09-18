import { useState, useEffect } from 'react'
import CourseCard from './CourseCard'
import courseApi from '../api/courseApi' // Import API service
import '../styles/CourseSection.css'

function CourseSection() {
  const [courses, setCourses] = useState([]) // Ubah jadi state kosong
  const [loading, setLoading] = useState(true) // Tambah state loading
  const [activeCategory, setActiveCategory] = useState('Semua Kelas')

  // Ambil data dari API saat komponen dimuat
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const data = await courseApi.getAllCourses()
        setCourses(data)
      } catch (error) {
        console.error('Gagal memuat kursus:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const categories = [
    'Semua Kelas',
    'Pemasaran',
    'Desain',
    'Pengembangan Diri',
    'Bisnis',
  ]

  // Filter courses berdasarkan kategori aktif
  const filteredCourses =
    activeCategory === 'Semua Kelas'
      ? courses
      : courses.filter((c) => c.category === activeCategory)

  return (
    <section className="course-section">
      <div className="container">
        {/* Header section */}
        <div className="course-section__header">
          <h2 className="course-section__title">Koleksi Video Pembelajaran Unggulan</h2>
          <p className="course-section__subtitle">
            Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
          </p>
        </div>

        {/* Filter tabs */}
        <div className="course-section__filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <p className="text-center py-10">Memuat kursus unggulan...</p>
        ) : (
          <>
            {/* Grid courses */}
            <div className="course-section__grid">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  image={course.image}
                  title={course.title}
                  description={course.description}
                  instructor={course.instructor}
                  rating={course.rating}
                  price={course.price}
                />
              ))}
            </div>

            {/* Jika filter kosong */}
            {filteredCourses.length === 0 && (
              <p className="course-section__empty">Belum ada kursus di kategori ini.</p>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default CourseSection