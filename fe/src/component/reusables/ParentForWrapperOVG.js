import React from 'react'
import WrapperForParentOVG from './WrapperForParentOVG'

export default function ParentForWrapperOVG({family_details}) {
  const rules = {
    affluence: { type: 'str', display: true },
    current_location: { type: 'str', display: true },
    native_location: { type: 'str', display: true },
    no_of_brothers: { type: 'num', display: false },
    no_of_married_brothers: { type: 'num', display: false },
    no_of_married_sisters: { type: 'num', display: false },
    no_of_sisters: { type: 'num', display: false },
  };

  return (
    <div>

        <div>ParentForWrapperOVG head</div>
        <WrapperForParentOVG family_details={family_details} rules={rules}>
            <div>child1</div>
            <div>child2</div>

        </WrapperForParentOVG>
    </div>
  )
}
