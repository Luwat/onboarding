"use client";

import { Box, Heading, Steps } from "@chakra-ui/react";
import PersonalInfo from "./personal-info";
import WorkInfo from "./work-info";
import MoreDetails from "./more-details";
import { useRouter, useSearchParams } from "next/navigation";

const onboardingSteps = [
  {
    title: "Personal Info",
    id: "personal-info",
  },
  {
    title: "Work Info",
    id: "work-info",
  },
  {
    title: "More Details",
    id: "more-details",
  },
];

export function OnboardingFormSteps() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const stepId = searchParams.get("step");
  let step = onboardingSteps.findIndex((step) => step.id === stepId);
  if (step === -1) step = 0;
  if (stepId === "done") step = onboardingSteps.length;

  const goToNextStep = () => {
    const nextStep = onboardingSteps[step + 1];
    router.push(`?step=${nextStep?.id ?? "done"}`)
  }

  const goToStep = (step: number) => {
    const nextStep = onboardingSteps[step];
    if (nextStep) {
      router.push(`?step=${nextStep.id}`)
    }
  }

  return (
    <Box mx={"auto"} maxW={"560px"} p={6} textAlign={"center"}>
      <Heading mb={12}>Onboarding Form</Heading>
      <Steps.Root
        step={step}
        onStepChange={(event) => goToStep(event.step)}
        count={onboardingSteps.length}
      >
        <Steps.List>
          {onboardingSteps.map((step, index) => (
            <Steps.Item key={index} index={index} title={step.title}>
              <Steps.Indicator />
              <Steps.Title>{step.title}</Steps.Title>
              <Steps.Separator />
            </Steps.Item>
          ))}
        </Steps.List>
        <Steps.Content index={0}>
          <PersonalInfo
            onNext={(data) => {
              goToNextStep();
              console.log(data);
            }}
          />
        </Steps.Content>
        <Steps.Content index={1}>
          <WorkInfo
            onNext={(data) => {
              goToNextStep();
              console.log(data);
            }}
          />
        </Steps.Content>
        <Steps.Content index={2}>
          <MoreDetails
            onNext={(data) => {
              goToNextStep();
              console.log(data);
            }}
          />
        </Steps.Content>

        <Steps.CompletedContent mt={6}>Thank you for completing your onboarding</Steps.CompletedContent>
      </Steps.Root>
    </Box>
  );
}
