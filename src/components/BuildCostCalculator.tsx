import { useId, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  ESTIMATE_AREA_DEFAULT,
  ESTIMATE_AREA_MAX,
  ESTIMATE_AREA_MIN,
  ESTIMATE_RATE_DEFAULT,
  ESTIMATE_RATE_MAX,
  ESTIMATE_RATE_MIN,
  estimateBuildCost,
  formatCad,
  formatSqFt,
} from "@/lib/build-estimate";

function fill(value: number, min: number, max: number) {
  const percent = ((value - min) / (max - min)) * 100;
  return {
    background: `linear-gradient(to right, var(--forest) ${percent}%, var(--line) ${percent}%)`,
  };
}

export default function BuildCostCalculator() {
  const areaId = useId();
  const rateId = useId();
  const [area, setArea] = useState(ESTIMATE_AREA_DEFAULT);
  const [rate, setRate] = useState(ESTIMATE_RATE_DEFAULT);
  const total = estimateBuildCost(area, rate);

  return (
    <div className="build-estimator">
      <div className="build-estimator-controls">
        <label className="build-estimator-field" htmlFor={areaId}>
          <span>
            Floor area
            <strong>{formatSqFt(area)}</strong>
          </span>
          <input
            id={areaId}
            className="build-estimator-range"
            type="range"
            min={ESTIMATE_AREA_MIN}
            max={ESTIMATE_AREA_MAX}
            step={50}
            value={area}
            style={fill(area, ESTIMATE_AREA_MIN, ESTIMATE_AREA_MAX)}
            onChange={(event) => setArea(Number(event.target.value))}
          />
          <span className="build-estimator-ends">
            <span>{formatSqFt(ESTIMATE_AREA_MIN)}</span>
            <span>{formatSqFt(ESTIMATE_AREA_MAX)}</span>
          </span>
        </label>
        <label className="build-estimator-field" htmlFor={rateId}>
          <span>
            Rate per sq ft
            <strong>{formatCad(rate)}</strong>
          </span>
          <input
            id={rateId}
            className="build-estimator-range"
            type="range"
            min={ESTIMATE_RATE_MIN}
            max={ESTIMATE_RATE_MAX}
            step={10}
            value={rate}
            style={fill(rate, ESTIMATE_RATE_MIN, ESTIMATE_RATE_MAX)}
            onChange={(event) => setRate(Number(event.target.value))}
          />
          <span className="build-estimator-ends">
            <span>{formatCad(ESTIMATE_RATE_MIN)}</span>
            <span>{formatCad(ESTIMATE_RATE_MAX)}</span>
          </span>
        </label>
      </div>
      <div className="build-estimator-result">
        <p className="eyebrow">Project estimate</p>
        <dl>
          <div>
            <dt>Floor area</dt>
            <dd>{formatSqFt(area)}</dd>
          </div>
          <div>
            <dt>Rate</dt>
            <dd>{formatCad(rate)} / sq ft</dd>
          </div>
        </dl>
        <p className="build-estimator-total">{formatCad(total)}</p>
        <p className="build-estimator-note">
          Floor area × rate. A planning figure only. Property, design,
          approvals, finishes and timing set what the project actually costs.
        </p>
        <button
          type="button"
          className="solid-link w-full"
          onClick={() => window.dispatchEvent(new Event("hic:open-enquiry"))}
        >
          Get a custom quote
        </button>
      </div>
    </div>
  );
}
