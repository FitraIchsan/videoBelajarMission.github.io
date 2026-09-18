import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchCourses } from '../features/courses/courseSlice'
import './DetailProduk.css'

const fallbackImage = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80'

function DetailProduk() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: courses, loading } = useSelector((state) => state.courses)
  const course = courses.find((item) => String(item.id) === String(id))

  useEffect(() => {
    if (!course && courses.length === 0) {
      dispatch(fetchCourses())
    }
  }, [course, courses.length, dispatch])

  if (loading && !course) {
    return <div className="detail-status">Memuat detail kursus...</div>
  }

  if (!course) {
    return (
      <div className="detail-status">
        <h1>Kursus tidak ditemukan</h1>
        <p>Kursus yang Anda pilih belum tersedia atau sudah tidak aktif.</p>
        <button type="button" className="detail-button" onClick={() => navigate('/semua-produk')}>
          Kembali ke Semua Produk
        </button>
      </div>
    )
  }

  const rating = Number(course.rating) || 0
  const instructor = course.instructor || 'Instruktur Videobelajar'
  const description = course.description || 'Pelajari materi ini secara bertahap bersama instruktur profesional.'

  return (
    <main className="detail-page">
      <div className="detail-container">
        <nav className="detail-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Beranda</Link><span>/</span>
          <Link to="/semua-produk">Semua Produk</Link><span>/</span>
          <span>{course.title}</span>
        </nav>

        <section className="detail-hero">
          <img src={course.image || fallbackImage} alt={course.title} className="detail-hero__image" />
          <div className="detail-hero__overlay">
            <p className="detail-eyebrow">{course.category || 'Kelas Online'}</p>
            <h1>{course.title}</h1>
            <p>{description}</p>
            <div className="detail-rating">
              <span className="detail-stars">{'★'.repeat(Math.round(rating))}</span>
              <span>{rating.toFixed(1)} / 5</span>
            </div>
          </div>
        </section>

        <div className="detail-layout">
          <div className="detail-main">
            <section className="detail-section">
              <h2>Deskripsi</h2>
              <p>{description} Kelas ini dirancang untuk membantu Anda memahami konsep, mencoba praktik langsung, dan menerapkan materi dalam pekerjaan atau proyek pribadi.</p>
            </section>

            <section className="detail-section">
              <h2>Belajar bersama Tutor Profesional</h2>
              <div className="instructor-card">
                <div className="instructor-avatar">{instructor.charAt(0).toUpperCase()}</div>
                <div>
                  <h3>{instructor}</h3>
                  <p>Instruktur profesional dan berpengalaman di bidangnya.</p>
                </div>
              </div>
            </section>

            <section className="detail-section">
              <h2>Kamu akan mempelajari</h2>
              <div className="learning-list">
                <p>Memahami dasar dan konsep utama materi</p>
                <p>Mengerjakan latihan dan studi kasus praktis</p>
                <p>Menerapkan pengetahuan melalui proyek akhir</p>
                <p>Membangun portofolio yang relevan</p>
              </div>
            </section>

            <section className="detail-section">
              <h2>Rating dan Review</h2>
              <div className="review-summary">
                <strong>{rating.toFixed(1)}</strong>
                <span className="detail-stars">{'★'.repeat(Math.round(rating))}</span>
                <span>Berdasarkan ulasan peserta</span>
              </div>
              <div className="review-item">
                <div className="instructor-avatar instructor-avatar--small">A</div>
                <div><h3>Andi Pratama</h3><p>Materinya jelas, runtut, dan mudah dipraktikkan.</p></div>
              </div>
            </section>
          </div>

          <aside className="detail-sidebar">
            <div className="purchase-card">
              <img src={course.image || fallbackImage} alt="" className="purchase-card__image" />
              <p className="purchase-card__label">Mulai belajar sekarang</p>
              <div className="purchase-card__price">{course.price || 'Rp 300K'}</div>
              <button type="button" className="detail-button detail-button--full">Beli Sekarang</button>
              <p className="purchase-card__note">Akses kelas setelah pembayaran berhasil.</p>
              <div className="course-meta"><span>Durasi belajar</span><strong>{course.duration || '12 Jam'}</strong></div>
              <div className="course-meta"><span>Level</span><strong>{course.level || 'Semua Level'}</strong></div>
              <div className="course-meta"><span>Bahasa</span><strong>Indonesia</strong></div>
            </div>
          </aside>
        </div>

        <section className="detail-related">
          <h2>Video Pembelajaran Terkait Lainnya</h2>
          <p>Pilihan kelas lain yang mungkin relevan untuk Anda.</p>
          <div className="detail-related__grid">
            {courses.filter((item) => String(item.id) !== String(id)).slice(0, 3).map((item) => (
              <Link to={`/detail-produk/${item.id}`} key={item.id} className="related-card">
                <img src={item.image || fallbackImage} alt={item.title} />
                <h3>{item.title}</h3>
                <span>{item.price || 'Rp 300K'}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default DetailProduk
