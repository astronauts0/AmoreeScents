import React, { Fragment } from "react";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

const CheckoutStep = ({ activeStep }) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
        },
        {
            label: <Typography>Confirm Order</Typography>,
        },
    ];

    const stepStyles = {
        boxSizing: "border-box",
    };

    return (
        <div className="w-full mb-20">
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {steps.map((item, index) => (
                    <Step
                        key={index}
                        active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                    >
                        <StepLabel
                            style={{
                                color: activeStep >= index ? "purple" : "rgba(0, 0, 0, 0.649)",
                            }}
                        >
                            {item.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default CheckoutStep;