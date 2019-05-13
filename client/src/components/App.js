import React from "react";
import { Grid } from "semantic-ui-react";
// import "./App.css";
import { connect } from "react-redux";

import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import SidePanelAdmin from "./SidePanel/SidePanelAdmin"

const ChatApp = ({ currentUser, currentChannel, isPrivateChannel }) => (
  <Grid columns="equal" className="app" style={{ background: "#eee" }}>
    <SidePanel key={currentUser && currentUser.uid} currentUser={currentUser} />

    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages
        key={currentChannel && currentChannel.id}
        currentChannel={currentChannel}
        currentUser={currentUser}
        isPrivateChannel={isPrivateChannel}
      />
    </Grid.Column>

    <Grid.Column width={4}>

    </Grid.Column>
  </Grid>
  // <div class = "col s12">
  // <div class = "row">
  // <div class = "col s4">
  // <SidePanel key={currentUser && currentUser.uid} currentUser={currentUser} />

  // </div>
  // <div class = "col s8">
  // <Messages
  //       key={currentChannel && currentChannel.id}
  //       currentChannel={currentChannel}
  //       currentUser={currentUser}
  //       isPrivateChannel={isPrivateChannel}
  //     />
  // </div>

  // </div>
  // </div>
);

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  isPrivateChannel: state.channel.isPrivateChannel
});

export default connect(mapStateToProps)(ChatApp);
