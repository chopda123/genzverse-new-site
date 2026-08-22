

// app/about/page.js
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import OurStory from '../../components/OurStory'

export const metadata = {
  title: 'Our Story',
  description: 'We didn\'t start GenZverse to sell anime t-shirts. We started it because we couldn\'t find one we actually wanted to wear.',
  alternates: {
    canonical: 'https://www.genzverse.shop/about',
  },
  openGraph: {
    title: 'Our Story',
    description: 'We didn\'t start GenZverse to sell anime t-shirts. We started it because we couldn\'t find one we actually wanted to wear.',
    type: 'website',
  },
}

export default function About() {
  return (
    <>
      <Header />
      <main>
        <OurStory />
      </main>
      <Footer />
    </>
  )
}