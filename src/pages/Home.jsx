import Hero from '../components/Hero'
import CourseSection from '../components/CourseSection'
import Newsletter from '../components/Newsletter'

/**
 * Home.jsx
 * Halaman beranda yang menggabungkan semua section.
 *
 * Kenapa dipisah jadi page?
 * Karena dengan React Router, setiap "halaman" adalah komponen.
 * Home hanya bertanggung jawab menyusun section-section.
 * Ini membuat code lebih rapi & mudah di-maintain.
 */
function Home() {
  return (
    <>
      <Hero />
      <CourseSection />
      <Newsletter />
    </>
  )
}

export default Home
