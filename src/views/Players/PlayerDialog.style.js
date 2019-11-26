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
  },
  player__dropZone: {
    display: "none",
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1200
  },
  player__dropZoneOpen: {
    display: "block"
  },
  player__dropZoneText: {
    fontSize: "30px",
    color: "#000",
    display: "none"
  },
  player__dropZoneTextActive: {
    display: "block"
  },
  player__dropZoneInner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 9999,
    pointerEvents: "none"
  },
  player__dropZoneInnerActive: {
    background: "rgba(255, 255, 255, 0.75)",
    border: "5px dashed #fff"
  }
});

export default styles;
