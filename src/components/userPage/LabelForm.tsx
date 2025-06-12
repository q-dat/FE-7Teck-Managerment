import React from 'react';

const LabelForm: React.FC<{ title: string }> = ({ title }) => {
  return <label className="text-sm">{title}</label>;
};

export default LabelForm;
