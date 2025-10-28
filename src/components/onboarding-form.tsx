"use client";

import { Box, Heading, Steps } from "@chakra-ui/react";
import PersonalInfo from "./personal-info";
import WorkInfo from "./work-info";
import MoreDetails from "./more-details";
import { useState } from "react";

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
  const [step, setStep] = useState(0);

  const goToNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  }

  return (
    <Box mx={"auto"} maxW={"560px"} p={6} textAlign={"center"}>
      <Heading mb={12}>Onboarding Form</Heading>
      <Steps.Root
        step={step}
        onStepChange={(event) => setStep(event.step)}
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
