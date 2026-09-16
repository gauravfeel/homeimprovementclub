import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import BuildCostCalculator from "@/components/BuildCostCalculator";
import Reveal from "@/components/Reveal";

export default function BuildEstimator() {
  return (
    <Layout>
      <SEO
        title="Project Estimator | Home Improvement Club"
        description="Use the HIC project estimator to size a custom home or multiplex. Set floor area and a rate from $150 to $700 per square foot. A planning figure, not a quote."
        canonical="/estimator"
      />
      <section className="editorial-section estimator-opening">
        <div>
          <p className="eyebrow">Project estimator</p>
          <Reveal variant="heading">
            <h1>
              Size the work.
              <br />
              <em>See a planning figure.</em>
            </h1>
          </Reveal>
        </div>
        <Reveal variant="copy">
          <p>
            Set floor area and a rate from $150 to $700 per sq ft. The estimator
            multiplies those two numbers. Use it to test whether a custom home
            or multiplex sits in a budget you can live with, before drawings or
            a site visit. It is not a quote, bid or fixed price.
          </p>
        </Reveal>
      </section>
      <section className="editorial-section estimator-board">
        <BuildCostCalculator />
      </section>
    </Layout>
  );
}
