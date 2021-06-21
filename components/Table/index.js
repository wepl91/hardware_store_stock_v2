import React from 'react';

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Skeleton,
} from "@chakra-ui/react"

const TableRow = ({ columns, data, index, isLoading, footerLabel }) => {
  const renderContent = (content) => {
    if (React.isValidElement(content)) return content;
    if (typeof content === 'string') return content
    if (typeof content === 'function') return renderContent(content(data));
    if (Array.isArray(content)) return <div>{content}</div>
  };

  const renderSkeleton = () => <Skeleton height="20px" />;

  return (
    <Tr>
      {columns.map(column =>
        <Td key={`row-${column.label}`}>
          {isLoading ? renderSkeleton() : renderContent(column.content)}
        </Td>)}
    </Tr>);
}
const CustomTable = ({ columns, data, isLoading, footerLabel }) => {
  const tableHeaders = (columns) => {
    return columns.map(column =>
      <Th key={`header-${column.label}`}>
        {column.label}
      </Th>)
  }
  return (
    <Table>
      {footerLabel ? (
        <TableCaption>
          {footerLabel}
        </TableCaption>
      ): null}
      <Thead>
        <Tr>
          {tableHeaders(columns)}
        </Tr>
      </Thead>
      <Tbody>
        {data && data.map((element, index) => (
          <TableRow
            index={index}
            key={element.id}
            columns={columns}
            data={element}
            isLoading={isLoading}
          />
        ))}
      </Tbody>
    </Table>
  )
};

export default CustomTable