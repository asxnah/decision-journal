import { Input } from "@ui/input";

interface OptionsStepProps {
  options: string;
  onChange: (options: string) => void;
}

export const OptionsStep = ({ options, onChange }: OptionsStepProps) => {
  return (
    <section className="grid gap-5">
      <h2 className="text-3xl font-semibold whitespace-pre-line">
        What options
        {"\n"}
        are you considering?
      </h2>
      <p>List realistic alternatives you could actually choose.</p>
      <div className="grid gap-2.5">
        <Input
          variant="textarea"
          bulleted
          id="thoughts"
          placeholder={`• Accept the new offer\n• Stay in my current role\n• Take a break and reassess`}
          value={options}
          onChange={onChange}
          aria-describedby="options-help"
        />
        <small className="text-sm text-darkgray" id="options-help">
          2–5 options is usually enough.
        </small>
      </div>
    </section>
  );
};
