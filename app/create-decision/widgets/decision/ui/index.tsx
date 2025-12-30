import { Input } from "@ui/input";

interface DecisionStep {
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
}: DecisionStep) => {
  return (
    <section className="grid gap-5">
      <h2 className="text-3xl font-semibold">
        What decision
        <br />
        are you facing?
      </h2>
      <Input
        id="decision"
        placeholder="Change jobs"
        value={decision}
        onChange={(value) => onDecisionChange(value)}
      />
      <div className="grid gap-2.5">
        <h4 className="">What makes this decision important at this moment?</h4>
        <Input
          type="textarea"
          id="thoughts"
          placeholder="I am feeling unfullfilled in my current role"
          value={thoughts}
          onChange={(value) => onThoughtsChange(value)}
        />
        <small className="text-sm text-darkgray">
          Describe the situation as it is right now. No analysis yet.
        </small>
      </div>
    </section>
  );
};
