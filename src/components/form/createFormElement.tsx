import { Label } from 'components/Label'
import { useId } from 'hooks/useId'
import React from 'react'
import {
  useFormContext,
  UseFormReturn,
  Controller,
  RegisterOptions,
} from 'react-hook-form'
import { FormInfoMessage, FormErrorInfoMessage } from './components'

export type FormElement<T> = {
  label?: string
  id?: string
  helpText?: React.ReactNode
  containerClassName?: string
  name: string
} & T

export type NonNativeOnChange<T> = (
  setValue: UseFormReturn['setValue'],
  field: string,
) => (value: T) => void

export function createFormElement<TFromElement, TNonNativeOnChange = any>(
  Component: React.FC<any>,
  nonNativeOnChange?: NonNativeOnChange<TNonNativeOnChange>,
) {
  return React.forwardRef<
    HTMLInputElement,
    FormElement<TFromElement> & {
      rules?: Omit<
        RegisterOptions,
        'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
      labelHelperText?: string
    }
  >(
    (
      {
        label,
        helpText,
        containerClassName,
        name,
        rules,
        id: propId,
        labelHelperText,
        ...props
      },
      ref,
    ) => {
      const id = useId(propId)
      const {
        formState: { errors },
        setValue,
      } = useFormContext()

      const nameProps = name.split('.')

      const isError = Boolean(
        errors[name] ||
          (errors[nameProps[0]] as any)?.[nameProps[1]]?.[nameProps[2]],
      )

      return (
        <div className={containerClassName}>
          {label && (
            <Label className="mb-1" htmlFor={id}>
              {label}
            </Label>
          )}
          <Controller
            name={name}
            render={(controllerProps) => (
              <Component
                {...controllerProps.field}
                {...props}
                ref={ref}
                aria-invalid={isError}
                id={id}
                invalid={isError}
                label={label}
                onChange={
                  nonNativeOnChange
                    ? nonNativeOnChange(setValue, name)
                    : controllerProps.field.onChange
                }
              />
            )}
            rules={rules}
          />

          {isError ? (
            <FormErrorInfoMessage>
              {errors[name]?.message
                ? (errors[name]?.message as string)
                : ((errors?.[nameProps[0]] as any)?.[nameProps[1]]?.[
                    nameProps[2]
                  ]?.message as string)}
            </FormErrorInfoMessage>
          ) : null}

          {!isError && helpText ? (
            <FormInfoMessage>{helpText}</FormInfoMessage>
          ) : null}
        </div>
      )
    },
  )
}

export default createFormElement
