import React, { Component } from "react"
import { store } from "../../store/userStore";
import { 
  Container, 
  TextField,
  InputAdornment,
  Checkbox,
  Grid,
  Paper,
  withStyles,
  Avatar,
  Box,
  FormControlLabel,
  Typography,
  IconButton,
  CircularProgress
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2)
  },
  grid: {
    marginTop: "16px"
  },
  boxTitle: {
    color: "#ccc",
    fontSize: "14px"
  }
});


class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  async loadUsersIfNeeded() {
    try {
      this.setState({ isLoading: true });
      await store.getUsers();
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.loadUsersIfNeeded();
  }

  render() {
    const { classes } = this.props;
    const { users } = store;

    if (this.state.isLoading) {
      return <CircularProgress style={{ margin: "15px auto" }} />;
    }

    return (
      <Container>
        <Grid className={classes.grid} container justify="space-between">
          <TextField
            variant="outlined"
            placeholder="Search"
            InputProps={{
              startAdornment: <InputAdornment position="start">
                <SearchIcon />
                </InputAdornment>,
            }}
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Show only active players"
            labelPlacement="start"
          />
        </Grid>
        <Grid className={classes.grid} container spacing={1} direction="column">
          <Grid item xs={12}>
            <Box display="flex" p={1} alignItems="flex-end">
              <Box display="flex" width={100} justifyContent="center" color="grey">
                <Typography className={classes.boxTitle}>
                  Photo
                </Typography>
              </Box>
              <Box display="flex" minWidth={300}>
                <Typography className={classes.boxTitle}>
                  Name
                </Typography>
              </Box>
              <Box display="flex" minWidth={500}>
                <Typography className={classes.boxTitle}>
                  E-mail
                </Typography>
              </Box>
            </Box>
          </Grid>
          {users && users.map(user => (
            <Grid item xs={12} key={user.id}>
              <Box display="flex" p={1} bgcolor="grey.300" alignItems="center">
                <Box display="flex" width={100} justifyContent="center">
                  <Avatar alt="Player avatar" src={user.photoUrl} className={classes.avatar} />
                </Box>
                <Box display="flex" minWidth={300}>
                  <Typography>
                    {user.name}
                  </Typography>
                </Box>
                <Box display="flex" minWidth={500}>
                  <Typography>
                    {user.email}
                  </Typography>
                </Box>
                <Box ml="auto">
                <IconButton className={classes.button}>
                  <EditIcon />
                </IconButton>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    )
  }
}

export default withStyles(styles)(Players);