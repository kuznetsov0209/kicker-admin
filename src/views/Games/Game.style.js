const styles = {
  listItem: {
    backgroundColor: "#ebebeb",
    borderRadius: 10,
    marginBottom: 10,
    display: "flex"
  },
  listItem__container: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  },
  listItem__dateContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flexShrink: 0,
    alignItems: "flex-start",
    maxWidth: 100,
  },
  listItem__date: {
    fontWeight: "bold",
    fontSize: 14
  },
  listItem__teamsContainer: {
    display: "flex",
    flex: "1 1 100%"
  },
  listItem__content_red: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  listItem__content_blue: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  listItem__userNames: {
    marginLeft: 5,
    fontWeight: "bold"
  },
  listItem__badge: {
    marginRight: 10
  },
  listItem__goalCount: {
    backgroundColor: "#26ae5f"
  },
  listItem__deleteButton: {
    marginLeft: 10
  },
  listItem__score: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold"
  },
};

export default styles;
