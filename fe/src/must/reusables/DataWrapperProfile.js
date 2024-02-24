import React from "react";
import UIWrapperProfile from "./UIWrapperProfile";

function evaluateExpression(expression, values) {
  try {
    return expression.replace(/\${(\w+)}/g, (_, variable) => values[variable]);
  } catch (error) {
    console.error("Error evaluating expression:", error.message);
    return null;
  }
}

export default function DataWrapperProfile({ family_details }) {
  const transform_content = (expression, values) => {
    console.log("asdfasdf", expression, values);
    // return args.join('');
    try {
      return expression.replace(
        /\${(\w+)}/g,
        (_, variable) => values[variable]
      );
    } catch (error) {
      console.error("Error evaluating expression:", error.message);
      return null;
    }
  };
  const rules = {
    family_location: {
      type: "str",
      edit_type: "dropdown",
      display: true,
      iconName: "location",
    },
    affluence: {
      type: "str",
      edit_type: "dropdown",
      display: true,
      iconName: "affluence",
    },
    no_of_brothers: {
      type: "num",
      edit_type: "num_input",
      display: false,
      iconName: "affluence",
    },
    native_place: {
      type: "str",
      edit_type: "dropdown",
      display: true,
      iconName: "location",
      label: "native location",
    },
    married_brother: {
      type: "num",
      edit_type: "num_input",
      display: false,
      iconName: "affluence",
    },
    married_sister: {
      type: "num",
      edit_type: "num_input",
      display: false,
      iconName: "affluence",
    },
    no_of_sisters: {
      type: "num",
      edit_type: "num_input",
      display: false,
      iconName: "affluence",
    },
    extra: {
      family_members: {
        type: "str",
        display: true,
        iconName: "people",
        label: "Family Members",
        depends_on: [
          "no_of_brothers",
          "married_brother",
          "married_sister",
          "no_of_sisters",
        ],
        transform: transform_content,
        exp: "Total Siblings - ${married_brother}, ${married_sister}, ${no_of_brothers}, ${no_of_sisters}",
      },
    },
  };

  const locations = [{ title: "Noida" }, { title: "Delhi" }];
  const affluenceOptions = [
    { title: "LOWER_MIDDLE_CLASS" },
    { title: "MIDDLE_CLASS" },
    { title: "UPPER_MIDDLE_CLASS" },
  ];

  const opt_obj = {
    family_location: locations,
    native_place: locations,
    affluence: affluenceOptions,
  };

  
  return (
    <div>
      <UIWrapperProfile family_details={family_details} rules={rules} opt_obj={opt_obj}/>
    </div>
  );
}
