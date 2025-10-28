"use client";

import { Button, Field, HStack, Input, Stack, Steps } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface FormValues {
  jobTitle: string;
  companyName: string;
  yearsOfExperience: string;
}

interface WorkInfoProps {
  onNext?: (data: FormValues) => void;
}

const formSchema = z.object({
  jobTitle: z.string().min(2, { message: "Please enter your job title" }),
  companyName: z.string().min(2, { message: "Please enter your company name" }),
  yearsOfExperience: z
    .string()
    .min(2, { message: "Provide your years of experience" }),
});

export default function WorkInfo(props: WorkInfoProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    props.onNext?.(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={4}>
        <Field.Root invalid={!!errors.jobTitle}>
          <Field.Label>Job Title</Field.Label>
          <Input {...register("jobTitle")} />
          <Field.ErrorText>{errors.jobTitle?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.companyName}>
          <Field.Label>Company Name</Field.Label>
          <Input {...register("companyName")} />
          <Field.ErrorText>{errors.companyName?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.yearsOfExperience}>
          <Field.Label>Years of Experience</Field.Label>
          <Input {...register("yearsOfExperience")} />
          <Field.ErrorText>{errors.yearsOfExperience?.message}</Field.ErrorText>
        </Field.Root>

        <HStack gap={4}>
          <Steps.PrevTrigger flex={1} asChild>
            <Button variant={"outline"}>Previous</Button>
          </Steps.PrevTrigger>
          <Button type="submit" flex={1}>Next</Button>
        </HStack>
      </Stack>
    </form>
  );
}
