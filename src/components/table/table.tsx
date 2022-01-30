import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";
import { Column, useSortBy, useTable } from "react-table";

type TableProps = {
  columns: Column[];
  data: any;
  fetching?: boolean;
  showItem?: number;
  rowProps?: any;
};

export const Table = ({
  columns,
  data,
  rowProps = () => ({}),
}: TableProps): JSX.Element => {
  const { getTableProps, getTableBodyProps, headers, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  if (data) {
    return (
      <Box
        minWidth="100%"
        borderRadius=".75rem"
        border="1px solid #DFDFDF"
        overflow="hidden"
      >
        <Box as="table" minWidth="100%" {...getTableProps()}>
          <Box as="thead">
            <Box
              as="tr"
              textAlign="left"
              fontSize=".75rem"
              fontWeight="700"
              color="mono.dark-grey"
              height="3.5rem"
            >
              {headers.map((column, index) => (
                <Box
                  as="th"
                  width={column.width}
                  m={0}
                  p="0.5rem"
                  borderBottom={1}
                  borderBottomStyle="solid"
                  borderColor="gray.200"
                  backgroundColor="white"
                  color="mono.grey-3"
                  _first={{
                    paddingLeft: "3rem",
                  }}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <Box as="span" display="flex" alignItems="center">
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""}
                    </span>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Box as="tbody" {...getTableBodyProps()}>
            {rows &&
              rows.map((row, i) => {
                prepareRow(row);
                return (
                  <Box
                    as="tr"
                    height="6rem"
                    {...row.getRowProps(rowProps(row))}
                  >
                    {row.cells.map((cell, index) => {
                      return (
                        <Box
                          as="td"
                          m={0}
                          h="100%"
                          p="1rem"
                          borderBottom={1}
                          borderBottomStyle="solid"
                          borderBottomColor="gray.200"
                          backgroundColor="white"
                          _first={{
                            paddingLeft: "3rem",
                          }}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </Box>
                      );
                    })}
                  </Box>
                );
              })}
          </Box>
        </Box>
      </Box>
    );
  } else {
    return (
      <Center>
        <Text> It is Empty</Text>
      </Center>
    );
  }
};
