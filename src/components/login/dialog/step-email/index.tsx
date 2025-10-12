'use client'

type Props = {
  onValidate: (email: string, hasEmail:boolean) => void;
}

export const StepEmail = ({onValidate}: Props) => {

  return (
    <div>
      <h2 className="text-2xl font-bold">Step 1: Email</h2>
      <p className="text-sm text-gray-500">
        We&apos;ll need your email to create an account.
      </p>
    </div>
  );
};  