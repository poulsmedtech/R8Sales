import { audiences, partners } from '../data/content'

export default function AboutHao() {
  return (
    <section className="about" id="about">
      <div className="container about-grid">
        <figure className="about-photo">
          <img src="/images/hao-zhang.jpg" alt="Portrait of Hao Zhang, founder of R8 Sales" />
        </figure>

        <div className="about-copy">
          <p className="eyebrow">About Hao Zhang</p>
          <h2>20+ Years. Millions of Customers. Thousands of Agents.</h2>
          <p>
            Hao Zhang has built, managed and scaled some of the largest sales organizations
            in the wireless and direct sales industries.
          </p>

          <ul className="partner-grid">
            {partners.map((partner) => (
              <li key={partner.name}>
                <p className={`partner-mark mark-${partner.name.toLowerCase()}`}>
                  {partner.mark}
                </p>
                <p>{partner.description}</p>
              </li>
            ))}
          </ul>

          <p className="about-close">
            Today, Hao brings together the experience, relationships and nationwide network
            he has built throughout his career through R8 Sales—one platform to put
            exceptional opportunities in the hands of exceptional people.
          </p>
        </div>

        <div className="audience-panel">
          {audiences.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
