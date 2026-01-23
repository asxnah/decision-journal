import { Input } from "@ui/input";

interface DecisionStepProps {
  decision: string;
  thoughts: string;
  onDecisionChange: (decision: string) => void;
  onThoughtsChange: (thoughts: string) => void;
}

export const DecisionStep = ({
  decision,
  thoughts,
  onDecisionChange,
  onThoughtsChange,
}: DecisionStepProps) => {
  return (
    <section className="grid gap-5">
      <h2 className="text-3xl font-semibold whitespace-pre-line">
        What decision
        {"\n"}
        are you facing?
      </h2>
      <label htmlFor="decision" className="sr-only">
        Decision
      </label>
      <Input
        id="decision"
        placeholder="Change jobs"
        value={decision}
        onChange={(value) => onDecisionChange(value)}
      />
      <div className="grid gap-2.5">
        <h4 className="">What makes this decision important at this moment?</h4>
        <Input
          variant="textarea"
          id="thoughts"
          placeholder="I am feeling unfullfilled in my current role"
          value={thoughts}
          onChange={(value) => onThoughtsChange(value)}
          aria-describedby="thoughts-help"
        />
        <small className="text-sm text-darkgray" id="thoughts-help">
          Describe the situation as it is right now. No analysis yet.
        </small>
      </div>
    </section>
  );
};
