const styles = theme => ({
  player__avatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  player__avatar: {
    width: 100,
    height: 100
  },
  player__avatarIcon: {
    width: 50,
    height: 50
  },
  player__uploadPhoto: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  player__inactivateButton: {
    marginRight: "auto"
  }
});

export default styles;
