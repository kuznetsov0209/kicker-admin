import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  select: {
    padding: 10
  }
}));

const TournamentSelect = ({ tournament }) => {
  const classes = useStyles();
  const [team, setTeam] = React.useState("all");
  const [open, setOpen] = React.useState(false);

  const handleChange = event => {
    setTeam(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          variant="outlined"
          classes={{ select: classes.select }}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={team}
          onChange={handleChange}
        >
          <MenuItem value="all">All teams</MenuItem>
          {tournament.stats.map((item, index) => (
            <MenuItem key={index} value={index}>
              {item.team.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default TournamentSelect;
