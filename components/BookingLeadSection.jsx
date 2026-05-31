const BOOKING_DEFAULTS = {
  eyebrow: "Book Free Salon Audit",
  title: "Let us map what is blocking your salon growth.",
  description:
    "Fill in the short form and we will contact you to schedule a 30-45 minute Zoom audit. No pressure, just clarity.",
  points: [
    "Personalized review of numbers, structure, and bottlenecks",
    "Actionable next steps tailored to your salon stage",
    "For qualified salon owners with active teams",
  ],
  buttonLabel: "Request Audit",
  responseMeta: "We reply within 1-2 business days.",
};

function BookingLeadSection(props) {
  const data = { ...BOOKING_DEFAULTS, ...(props || {}) };
  return (
    <section className="section booking-hero">
      <div className="container booking-shell">
        <div className="booking-intro">
          <p className="eyebrow with-line">{data.eyebrow}</p>
          <h1 className="booking-title">{data.title}</h1>
          <p className="booking-copy">{data.description}</p>
          <ul className="check-list booking-points">
            {(Array.isArray(data.points) ? data.points : []).map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <form className="booking-form" onSubmit={(event) => event.preventDefault()}>
          <div className="form-grid">
            <label className="form-field">
              <span>Full name</span>
              <input type="text" name="name" placeholder="Your full name" required />
            </label>

            <label className="form-field">
              <span>Email address</span>
              <input type="email" name="email" placeholder="you@salon.com" required />
            </label>

            <label className="form-field">
              <span>Phone / WhatsApp</span>
              <input type="tel" name="phone" placeholder="+32 ..." required />
            </label>

            <label className="form-field">
              <span>Salon location</span>
              <input type="text" name="location" placeholder="City, Country" required />
            </label>

            <label className="form-field">
              <span>Monthly revenue range</span>
              <select name="revenue" defaultValue="" required>
                <option value="" disabled>
                  Select range
                </option>
                <option value="25-40">EUR25k-EUR40k</option>
                <option value="40-60">EUR40k-EUR60k</option>
                <option value="60-plus">EUR60k+</option>
              </select>
            </label>

            <label className="form-field">
              <span>Team size</span>
              <select name="teamSize" defaultValue="" required>
                <option value="" disabled>
                  Select team size
                </option>
                <option value="2-3">2-3 employees</option>
                <option value="4-6">4-6 employees</option>
                <option value="7-plus">7+ employees</option>
              </select>
            </label>

            <label className="form-field form-field-full">
              <span>What is your biggest challenge right now?</span>
              <textarea
                name="challenge"
                rows="4"
                placeholder="Share what feels most urgent in your salon operations or profitability."
                required
              />
            </label>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn">
              {data.buttonLabel}
            </button>
            <p>{data.responseMeta}</p>
          </div>
        </form>
      </div>
    </section>
  );
}

window.BookingLeadSection = BookingLeadSection;
