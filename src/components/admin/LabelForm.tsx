import React from 'react';

const LabelForm: React.FC<{ title: string }> = ({ title }) => {
  return <label className="mt-1 font-semibold text-black dark:text-red-400">{title}</label>;
};

export default LabelForm;
