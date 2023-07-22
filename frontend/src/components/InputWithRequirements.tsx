import * as React from "react";
import FormInput from "./FormInput";
import styled from "styled-components";

interface InputWithRequirementsProps {
  placeholder: string;
  requirements: string[];
  pattern: string;
  type: string;
  refer: React.RefObject<HTMLInputElement> | null;
}

const InputWithRequirements = ({
  placeholder,
  requirements,
  pattern,
  type,
  refer,
}: InputWithRequirementsProps) => {
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  return (
    <InputField>
      <FormInput
        refer={refer}
        placeholder={placeholder}
        type={type}
        pattern={pattern}
        errorMessage={`${placeholder} invalid}`}
        autoComplete={placeholder}
        hasNoPadding={true}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && (
        <RequirementsContainer>
          {requirements.map((requirement, index) => (
            <Requirements key={index}>{requirement}</Requirements>
          ))}
        </RequirementsContainer>
      )}
    </InputField>
  );
};

export default InputWithRequirements;

interface InputFieldProps {
  isLast?: boolean;
  hasNoPadding?: boolean;
}
const InputField = styled.div<InputFieldProps>`
  width: 100%;
  padding-bottom: ${({ isLast }) => (isLast ? 0 : 1.75)}rem;
  ${({ hasNoPadding }) => hasNoPadding && "padding: 0;"}
`;

const RequirementsContainer = styled.div`
  margin-top: 0.5rem;
  padding-left: 0.3rem;
`;

const Requirements = styled.p`
  padding: 0;
  padding-top: 0.2rem;
  margin: 0;
  font-size: 0.9rem;
  font-weight: 500;
`;
