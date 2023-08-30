import React from 'react';

import CreateFolder from './CreateFolder/CreateFolder';

export const modalNames = {
  createFolder: 'create_folder',
};

export const getModalByType = (modalName: string) => {
  switch (modalName) {
    case modalNames.createFolder:
      return <CreateFolder />;
    default:
      return '';
  }
};
