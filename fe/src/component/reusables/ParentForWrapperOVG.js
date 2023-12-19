import React from "react";
import ChildForParentOVG from "./ChildForParentOVG";

export default function ParentForWrapperOVG({ family_details }) {
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
        type: "str", display: true ,iconName:"location",label:"Family Members",val:'this is the str value'
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
