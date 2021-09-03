import React from "react";
import styled from "styled-components/macro";

const Input = styled.input.attrs({ type: "text" })`
  height: 30px;
  font-size: 20px;
  margin-left: 5px;
`;

const Label = styled.label`
  font-size: 25px;
  margin-left: 10px;
`;

export default function TextInput({ label, value, onChange, ...props }) {
  return (
    <Label {...props}>
      {label}
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </Label>
  );
}
