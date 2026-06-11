import Reveal from '../ui/Reveal.jsx'
import Marquee from '../ui/Marquee.jsx'

const U = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`

const ROW_A = [
  'photo-1605810230434-7631ac76ec81',
  'photo-1593720213428-28a5b9e94613',
  'photo-1611162617474-5b21e879e113',
  'photo-1542744094-3a31f272c490',
  'photo-1556761175-b413da4baf72',
  'photo-1598550874175-4d0ef436c909',
].map(U)

const ROW_B = [
  'photo-1551434678-e076c223a692',
  'photo-1600880292089-90a7e086ee0c',
  'photo-1574717024653-61fd2cf4d44d',
  'photo-1492619375914-88005aa9e8fb',
  'photo-1579632652768-6cb9dcf85912',
  'photo-1626785774573-4b799315345d',
].map(U)

// Full-bleed auto-scrolling gallery — two rows drifting in opposite directions.
export default function ShowReel() {
  return (
    <section className="showreel">
      <Reveal className="showreel__label container">
        <span className="eyebrow">Work in Motion</span>
      </Reveal>

      <Marquee>
        {ROW_A.map((src, i) => (
          <figure className="showreel__item" key={`a${i}`}>
            <img src={src} alt="" loading="lazy" />
          </figure>
        ))}
      </Marquee>

      <Marquee className="marquee--reverse">
        {ROW_B.map((src, i) => (
          <figure className="showreel__item" key={`b${i}`}>
            <img src={src} alt="" loading="lazy" />
          </figure>
        ))}
      </Marquee>
    </section>
  )
}
