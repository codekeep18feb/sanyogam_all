import React from "react";
import ChildForParentOVG from "./ChildForParentOVG";

function evaluateExpression(expression, values) {
  try {
    return expression.replace(/\${(\w+)}/g, (_, variable) => values[variable]);
  } catch (error) {
    console.error('Error evaluating expression:', error.message);
    return null;
  }
}

export default function ParentForWrapperOVG({ family_details }) {
  const transform_content =(expression,values)=>{
    console.log('asdfasdf',expression,values)
    // return args.join('');
    try {
      return expression.replace(/\${(\w+)}/g, (_, variable) => values[variable]);
    } catch (error) {
      console.error('Error evaluating expression:', error.message);
      return null;
    }

  }
  const rules = {
    affluence: { type: "str", display: true,iconName:"affluence"},
    current_location: { type: "str", display: true,iconName:"location" },
    native_location: { type: "str", display: true ,iconName:"location",label:"native location"},
    no_of_brothers: { type: "num", display: false,iconName:"affluence" },
    no_of_married_brothers: { type: "num", display: false,iconName:"affluence" },
    no_of_married_sisters: { type: "num", display: false,iconName:"affluence" },
    no_of_sisters: { type: "num", display: false,iconName:"affluence" },
    extra:{
      family_members:{
        type: "str", 
        display: true ,
        iconName:"people",
        label:"Family Members",
        depends_on:['no_of_brothers', 'no_of_married_brothers','no_of_married_sisters', 'no_of_sisters'],
        transform:transform_content,
        exp: "Total Siblings - ${no_of_married_brothers}, ${no_of_married_sisters}, ${no_of_brothers}, ${no_of_sisters}"
      }
    }
  };

  return (
    <div>
      <div>ParentForWrapperOVG head</div>
      <ChildForParentOVG family_details={family_details} rules={rules} />
    </div>
  );
}
