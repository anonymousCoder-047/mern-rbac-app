// index.tsx
import React, { useState } from "react";
import { Table } from "antd";
import { DatatableProps } from "../../data/interface"; // Ensure correct path
import _ from 'lodash';

const Datatable: React.FC<DatatableProps> = ({ columns, dataSource, handleBulkAction, ...rest }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  const onSelectChange = (newSelectedRowKeys: any[]) => {
    setSelectedRowKeys(newSelectedRowKeys);

    const selectedIds = _(dataSource)
    ?.keyBy('key')
    ?.at(newSelectedRowKeys)
    ?.map('_id')
    ?.filter(Boolean) // optional, in case some keys don't match
    ?.value();

    handleBulkAction(selectedIds);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Table
      className="table datanew dataTable no-footer"
      rowSelection={rowSelection}
      columns={columns}
      dataSource={dataSource}
       // Assuming `id` is the unique identifier of each record
       {...rest}
    />
  );
};

export default Datatable;
