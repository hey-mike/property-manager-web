import React from 'react';
import { Form } from 'antd';
import { EditableContext } from './EditableContext';

// const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
export default EditableFormRow;
