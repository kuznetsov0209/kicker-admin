import { TableRow } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const StyledTableRow = withStyles(() => ({
  root: {
    backgroundColor: grey[200],

    "&:hover": {
      backgroundColor: grey[300],
    }
  },
}))(TableRow);

const styles = () => ({
  circularProgress: {
    margin: "15px auto"
  },
  container: {
    padding: "15px 0"
  },
  message: {
    marginTop: "15px",
    textAlign: "center",
    display: "block"
  },
  table: {
    borderCollapse: "separate",
    borderSpacing: "0 10px"
  },
  tableHeaderCell: {
    border: "none",
  },
  tableHeaderTitle: {
    textTransform: "capitalize",
  },
  tournamentsTitle: {
    textDecoration: "none",
    color: "light"
  },
});

export { StyledTableRow, styles }