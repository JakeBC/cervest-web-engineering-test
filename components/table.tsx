import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export type Props = {
  header: string[];
  rows: (string|number)[][];
  name?: string;
};

const RainfallTable = ({ header, rows, name = 'rainfall data table' }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label={name}>
        <TableHead>
          <TableRow>
            { header.map((cell) => <TableCell key={cell}>{cell}</TableCell>) }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row[0]}>
              { row.map((cell, i) => <TableCell key={i}>{cell}</TableCell>) }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RainfallTable;