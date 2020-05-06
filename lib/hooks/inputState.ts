
import {
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export type inputState = {
  value: string;
  heading: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  set: Dispatch<SetStateAction<string>>;
};
export type checkboxState = {
  value: boolean;
  heading: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  set: Dispatch<SetStateAction<boolean>>;
};

export const useInput: (initialValue: string, heading: string) => inputState = (
  initialValue: string,
  heading: string
) => {
  const [value, set] = useState(initialValue);
  return {
    value,
    heading,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      set(e.target.value);
    },
    set,
  };
};

export const useCheckbox: (initialValue: boolean, heading: string) => checkboxState = (
  initialValue: boolean,
  heading: string
) => {
  const [value, set] = useState(initialValue);
  return {
    value,
    heading,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      console.log(e.target.checked)
      set(e.target.checked);
    },
    set,
  };
};
