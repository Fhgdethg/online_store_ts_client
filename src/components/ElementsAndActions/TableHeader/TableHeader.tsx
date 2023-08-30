import React from 'react';

import SCTableHeader from './SCTableHeader';

interface ITableHeaderProps {
  headerItems: string[];
  gridTemplate: string;
}

const TableHeader: React.FC<ITableHeaderProps> = ({
  headerItems,
  gridTemplate,
}) => {
  return (
    <SCTableHeader grid_template={gridTemplate}>
      {headerItems.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </SCTableHeader>
  );
};

export default TableHeader;
