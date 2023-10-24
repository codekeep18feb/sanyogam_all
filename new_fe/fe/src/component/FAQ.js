import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqData = [
  {
    question: 'What is React?',
    answer:
      'React is a JavaScript library for building user interfaces. It allows you to create reusable UI components and manage the state of your application efficiently.',
  },
  {
    question: 'How do I install React?',
    answer:
      'You can install React by using npm or yarn. Run the following command: npm install react react-dom or yarn add react react-dom',
  },
  {
    question: 'What is JSX?',
    answer:
      'JSX (JavaScript XML) is a syntax extension for JavaScript. It allows you to write HTML-like code in your JavaScript files when working with React components.',
  },
  // Add more FAQ items as needed
];

function FAQ() {
  return (
    <div>
      {faqData.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{faq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default FAQ;
