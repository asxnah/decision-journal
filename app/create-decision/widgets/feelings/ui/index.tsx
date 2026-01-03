import { ConfidenceSlider } from "./confidence-slider";

interface FeelingsStepProps {
  confidence: number;
  onChange: (confidence: number) => void;
}

export const FeelingsStep = ({ confidence, onChange }: FeelingsStepProps) => {
  return (
    <section className="grid gap-5">
      <h2 className="text-3xl font-semibold whitespace-pre-line">
        How do you feel
        {"\n"}
        about this decision?
      </h2>
      <p>Your confidence and emotions matter.</p>
      <div className="grid gap-6">
        <ConfidenceSlider
          value={confidence}
          onChange={onChange}
          aria-describedby="confidence-help"
        />
        <small className="text-sm text-darkgray" id="confidence-help">
          This is how it feels now — not how it “should” feel.
        </small>
      </div>
    </section>
  );
};
