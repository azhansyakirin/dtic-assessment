import React from "react";
import styles from "./Table.module.scss";

interface Column {
    key: string;
    caption: string;
    render?: (record: any) => React.ReactNode;
}

interface TableHead {
    columns: Column[];
}

const TableHead: React.FC<TableHead> = ({ columns }) => {
    return (
        <thead>
            <tr>
                {columns.map((column) => (
                    <th key={column.key} scope="col">
                        {column.caption}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

interface TableBodyProps {
    data: { [key: string]: string | number }[];
    columns: Column[];
}

const TableBody: React.FC<TableBodyProps> = ({ data, columns }) => {
    return (
        <tbody>
            {data.map((row, rowKey) => {
                return (
                    <tr key={rowKey}>
                        {columns.map((column, columnKey) => (
                            <td key={columnKey}>
                                {column.render ? column.render(row) : row[column.key]}
                            </td>
                        ))}
                    </tr>
                );
            })}
        </tbody>
    );
};

export interface TableProps {
    data?: Record<string, any>[];
    columns?: Column[];
    caption?: string;
}

const Table: React.FC<TableProps> = ({ data, columns, caption }) => {
    return (
        <table className={styles.tbl}>
            {caption && <caption>{caption}</caption>}
            {columns && <TableHead columns={columns} />}
            {columns && data && <TableBody data={data} columns={columns} />}
        </table>
    );
};

export default Table;
