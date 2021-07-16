import React from 'react';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Skeleton,
  Box,
} from "@chakra-ui/react"

import styles from './Table.module.scss';

const TableRow = ({ columns, data, index, isLoading, key = '' }) => {
  const renderContent = (content) => {
    if (React.isValidElement(content)) return content;
    if (typeof content === 'string') return content
    if (typeof content === 'function') return renderContent(content(data));
    if (Array.isArray(content)) return <div>{content}</div>
  };

  const renderSkeleton = () => <Skeleton height="20px" />;
  const avatarStyle = (column) => column?.label === '' ? styles['avatar-row'] : null
  return (
    <Tr key={key}>
      {columns.map((column, index) =>
        <Td
          key={`${key}-content-${index}-${renderContent(column.content)?.toString()}`}
          className={avatarStyle(column)}
          isNumeric={column.isNumeric}
        >
          {isLoading ? renderSkeleton() : renderContent(column.content)}
        </Td>)}
    </Tr>);
}
const CustomTable = ({ columns, data, isLoading, footerLabel, className }) => {
  const tableHeaders = (columns) => {
    return columns.map((column, index) =>
      <Th key={`table-header-row-${column.label}-${index}`} isNumeric={column.isNumeric}>
        {column.label}
      </Th>)
  }
  return (
    <Box
      className={className}
      borderWidth="1px"
      borderRadius="lg"
      paddingTop="8px"
    >
      <Table>
        {footerLabel ? (
          <TableCaption key="footer-caption">
            {footerLabel}
          </TableCaption>
        ) : null}
        <Thead key="table-header">
          <Tr key="table-header-row">
            {tableHeaders(columns)}
          </Tr>
        </Thead>
        <Tbody key="table-body">
          {data && data.map((element, index) => (
            <TableRow
              index={index}
              key={`table-body-row-${index}`}
              columns={columns}
              data={element}
              isLoading={isLoading}
            />
          ))}
        </Tbody>
      </Table>
    </Box>
  )
};

export default CustomTable