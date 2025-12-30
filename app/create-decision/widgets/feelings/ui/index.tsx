import { ConfidenceSlider } from "./confidence-slider";

interface OptionsStep {
  confidence: number;
  onChange: (confidence: number) => void;
}

export const FeelingsStep = ({ confidence, onChange }: OptionsStep) => {
  return (
    <section className="grid gap-5">
      <h2 className="text-3xl font-semibold">
        How do you feel
        <br />
        about this decision?
      </h2>
      <p>Your confidence and emotions matter.</p>
      <div className="grid gap-6">
        <ConfidenceSlider value={confidence} onChange={onChange} />
        <small className="text-sm text-darkgray">
          This is how it feels now — not how it “should” feel.
        </small>
      </div>
    </section>
  );
};
