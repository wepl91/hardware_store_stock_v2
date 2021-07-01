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
    <Tr key={`column-${index}-${key}`}>
      {columns.map(column =>
        <Td className={avatarStyle(column)} key={`row-${column.label}`} isNumeric={column.isNumeric}>
          {isLoading ? renderSkeleton() : renderContent(column.content)}
        </Td>)}
    </Tr>);
}
const CustomTable = ({ columns, data, isLoading, footerLabel, className }) => {
  const tableHeaders = (columns) => {
    return columns.map(column =>
      <Th key={`header-${column.label}`} isNumeric={column.isNumeric}>
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
        <Thead key="headers">
          <Tr key="header">
            {tableHeaders(columns)}
          </Tr>
        </Thead>
        <Tbody key="content">
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
    </Box>
  )
};

export default CustomTable