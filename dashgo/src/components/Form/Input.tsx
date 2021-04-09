import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import {
  Input as ChakraInput,
  FormLabel,
  FormControl,
  InputProps as ChakraInputProps,
  FormErrorMessage,
} from "@chakra-ui/react";

interface IputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IputProps> = (
  { name, label, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraInput
        bgColor="gray.900"
        focusBorderColor="pink.500"
        name={name}
        id={name}
        variant="filled"
        _hover={{
          bgColor: "gray.900",
        }}
        size="lg"
        ref={ref}
        {...rest}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
