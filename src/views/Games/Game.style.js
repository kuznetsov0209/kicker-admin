const styles = {
  listItem: {
    width: "100%",
    display: "flex"
  },
  listItem__dateContainer: {
    width: 100
  },
  listItem__teamsContainer: {
    flex: 1,
    display: "flex",
    overflow: "hidden",
    alignItems: "center"
  },
  listItem__content_red: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
    padding: "10px 0"
  },
  listItem__content_blue: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    overflow: "hidden",
    padding: "10px 0"
  },
  listItem__userNames: {
    margin: "0 10px"
  },
  listItem__badge: {
    marginRight: 10
  },
  listItem__goalCount: {
    backgroundColor: "#26ae5f"
  },
  listItem__score: {
    margin: "0 10px"
  }
};

export default styles;
