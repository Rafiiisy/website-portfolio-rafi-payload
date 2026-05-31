function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h4>Veronica.</h4>
          <p>
            Salon business advisory for owners ready to lead, structure, and
            scale.
          </p>
        </div>
        <div>
          <h5>Navigate</h5>
          <a href="#results">Results</a>
          <a href="#process">Process</a>
          <a href="#gallery">Gallery</a>
          <a href="#blog">Blog</a>
          <a href="#about">About</a>
        </div>
        <div>
          <h5>Legal</h5>
          <a href="#">Imprint</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
        </div>
        <div>
          <h5>Contact</h5>
          <p>hello@veronica.studio</p>
          <p>+32 478 22 11 88</p>
          <p>Antwerp . Berlin</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>Copyright 2026 Veronica Advisory. All rights reserved.</p>
        <p>Built for salon owners who are ready.</p>
      </div>
    </footer>
  );
}

window.SiteFooter = SiteFooter;
