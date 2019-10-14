import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";

class UserAvatar extends React.Component {
  render() {
    const { user, classes, size = 60, ...other } = this.props;

    return user.photoUrl ? (
      <Avatar
        src={user.photoUrl}
        style={{ width: size, height: size }}
        {...other}
      />
    ) : (
      <Avatar style={{ width: size, height: size }} {...other}>
        {user.name
          .split(" ")
          .map(word => word[0])
          .slice(0, 2)
          .join("")}
      </Avatar>
    );
  }
}

export default UserAvatar;
