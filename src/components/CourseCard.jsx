import '../styles/CourseCard.css'

/**
 * CourseCard.jsx
 * Komponen kartu kursus yang reusable.
 *
 * Props:
 * - image: path gambar
 * - title: judul kursus
 * - description: deskripsi singkat
 * - instructor: nama instruktur
 * - rating: angka rating (misal 3.5)
 * - price: harga string (misal "Rp 300K")
 *
 * Kenapa komponen terpisah?
 * Supaya bisa dipakai berulang di grid, dan mudah diubah styling-nya di satu tempat.
 * Juga memudahkan nanti kalau mau tambah fitur klik ke detail course.
 */
function CourseCard({ image, title, description, instructor, rating, price }) {
  // Generate bintang berdasarkan rating (sederhana, max 5)
  const fullStars = Math.floor(rating)
  const hasHalf = rating % 1 >= 0.5

  return (
    <article className="course-card">
      <div className="course-card__image-wrapper">
        <img
          src={image}
          alt={title}
          className="course-card__image"
          loading="lazy"
        />
      </div>

      <div className="course-card__body">
        <h3 className="course-card__title">{title}</h3>
        <p className="course-card__desc">{description}</p>

        <div className="course-card__instructor">
          <span className="course-card__avatar" aria-hidden="true">
            {instructor.charAt(0)}
          </span>
          <span className="course-card__instructor-name">{instructor}</span>
        </div>

        <div className="course-card__footer">
          <div className="course-card__rating">
            {/* Bintang penuh */}
            {Array.from({ length: fullStars }).map((_, i) => (
              <span key={`full-${i}`} className="star star--full">★</span>
            ))}
            {/* Setengah bintang (opsional) */}
            {hasHalf && <span className="star star--half">★</span>}
            {/* Bintang kosong */}
            {Array.from({ length: 5 - fullStars - (hasHalf ? 1 : 0) }).map((_, i) => (
              <span key={`empty-${i}`} className="star star--empty">★</span>
            ))}
            <span className="course-card__rating-number">({rating.toFixed(1)})</span>
          </div>
          <div className="course-card__price">{price}</div>
        </div>
      </div>
    </article>
  )
}

export default CourseCard
