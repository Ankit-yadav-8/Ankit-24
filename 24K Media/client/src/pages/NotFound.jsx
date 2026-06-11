import Button from '../components/ui/Button.jsx'

export default function NotFound() {
  return (
    <section className="notfound container">
      <div>
        <h1 className="display">404</h1>
        <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', marginTop: '-1rem' }}>This page didn’t make the cut.</h2>
        <p className="text-soft" style={{ margin: '1rem auto 2rem', maxWidth: '42ch' }}>
          The link may be broken or the page moved. Let’s get you back to something premium.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button to="/" arrow>Back to home</Button>
          <Button to="/contact" variant="ghost">Book a call</Button>
        </div>
      </div>
    </section>
  )
}
